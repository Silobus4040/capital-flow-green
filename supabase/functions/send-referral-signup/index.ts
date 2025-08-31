import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, email, phone, brokerType, address } = await req.json();

    await resend.emails.send({
      from: "CCIF Referrals <referrals@sundrycapitalsolutions.com>",
      to: ["sundrycapitalsolutions@gmail.com"],
      subject: `New Referral Program Signup`,
      html: `
        <h2>New Referral Program Signup</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Broker Type:</strong> ${brokerType}</p>
        <p><strong>Address:</strong> ${address}</p>
      `,
    });

    await resend.emails.send({
      from: "CCIF Referrals <referrals@sundrycapitalsolutions.com>",
      to: [email],
      subject: `Welcome to the CCIF Referral Network`,
      html: `
        <h2>Welcome to the CCIF Referral Network</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for joining our referral program. Our team will reach out shortly with your referral access details.</p>
        <p>Best regards,<br>CCIF Team</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);