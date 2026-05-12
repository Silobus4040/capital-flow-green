import { createClient } from 'npm:@supabase/supabase-js@2';
import { Resend } from 'npm:resend@2.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function sha256(input: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const { email } = await req.json();
    const normalized = String(email || '').trim().toLowerCase();
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // Confirm email belongs to a loan application
    const { data: app } = await supabase
      .from('loan_program_applications')
      .select('id')
      .eq('borrower_email', normalized)
      .limit(1)
      .maybeSingle();

    if (!app) {
      return new Response(JSON.stringify({ error: 'This email is not associated with any loan application.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Generate 6-digit OTP
    const code = String(Math.floor(100000 + Math.random() * 900000));
    const code_hash = await sha256(code);
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    // Clear old codes for this email
    await supabase.from('signup_otps').delete().eq('email', normalized);

    const { error: insErr } = await supabase.from('signup_otps').insert({
      email: normalized, code_hash, expires_at,
    });
    if (insErr) throw new Error(insErr.message);

    // Send via Resend
    const resend = new Resend(Deno.env.get('RESEND_API_KEY'));
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color:#0f172a;">
        <h2 style="color:#15803d; margin:0 0 12px;">Verify your CCIF Borrower Portal account</h2>
        <p>Use the verification code below to complete your signup. This code expires in 10 minutes.</p>
        <div style="font-size:34px; font-weight:bold; letter-spacing:8px; background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; padding:18px; text-align:center; border-radius:10px; margin:20px 0;">
          ${code}
        </div>
        <p style="color:#64748b; font-size:13px;">If you didn't request this, you can ignore this email.</p>
        <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;" />
        <p style="color:#64748b; font-size:12px;">Commercial Capital & Investment Inc. · 619 343 3609</p>
      </div>`;

    const sendRes = await resend.emails.send({
      from: 'CCIF Support <applications@ccif-inc.com>',
      to: normalized,
      subject: `Your CCIF verification code: ${code}`,
      html,
    });

    if (sendRes.error) {
      console.error('Resend error', sendRes.error);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: sendRes.error.message }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('send-signup-otp error', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
