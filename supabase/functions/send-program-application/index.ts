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
    const { applicantName, applicantEmail, applicantPhone, programName } = await req.json();

    await resend.emails.send({
      from: "CCIF Applications <applications@sundrycapitalsolutions.com>",
      to: ["sundrycapitalsolutions@gmail.com"],
      subject: `New Loan Application: ${programName}`,
      html: `
        <h2>New Loan Application</h2>
        <p><strong>Program:</strong> ${programName}</p>
        <p><strong>Name:</strong> ${applicantName}</p>
        <p><strong>Email:</strong> ${applicantEmail}</p>
        <p><strong>Phone:</strong> ${applicantPhone}</p>
      `,
    });

    await resend.emails.send({
      from: "CCIF Applications <applications@sundrycapitalsolutions.com>",
      to: [applicantEmail],
      subject: `Application Received: ${programName}`,
      html: `
        <h2>Application Received</h2>
        <p>Dear ${applicantName},</p>
        <p>Thank you for submitting your application for ${programName}. We'll review it and contact you within 24-48 hours.</p>
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