import { createClient } from 'npm:@supabase/supabase-js@2';

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
    const { email, code, password } = await req.json();
    const normalized = String(email || '').trim().toLowerCase();
    const codeStr = String(code || '').trim();
    const pw = String(password || '');

    if (!normalized || !/^\d{6}$/.test(codeStr) || pw.length < 8) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: otp, error: otpErr } = await supabase
      .from('signup_otps')
      .select('*')
      .eq('email', normalized)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (otpErr || !otp) {
      return new Response(JSON.stringify({ error: 'No verification code found. Please request a new one.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (new Date(otp.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: 'Verification code expired. Please request a new one.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (otp.attempts >= 5) {
      return new Response(JSON.stringify({ error: 'Too many attempts. Please request a new code.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const codeHash = await sha256(codeStr);
    if (codeHash !== otp.code_hash) {
      await supabase.from('signup_otps').update({ attempts: otp.attempts + 1 }).eq('id', otp.id);
      return new Response(JSON.stringify({ error: 'Invalid verification code.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create user (email_confirm: true so they can immediately sign in)
    const { data: created, error: createErr } = await supabase.auth.admin.createUser({
      email: normalized,
      password: pw,
      email_confirm: true,
    });

    if (createErr) {
      // If user already exists, surface a clear message
      const msg = createErr.message?.toLowerCase() || '';
      if (msg.includes('already') || msg.includes('registered') || msg.includes('exists')) {
        await supabase.from('signup_otps').delete().eq('id', otp.id);
        return new Response(JSON.stringify({ error: 'An account with this email already exists. Please sign in instead.' }), {
          status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(createErr.message);
    }

    // Cleanup OTP
    await supabase.from('signup_otps').delete().eq('email', normalized);

    return new Response(JSON.stringify({ success: true, user_id: created.user?.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('verify-signup-otp error', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'Unknown error' }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
