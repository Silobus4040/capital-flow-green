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
    // Input validation and sanitization
    const rawData = await req.json();
    const { fullName, email, phone, brokerType, address } = rawData;

    // Validate required fields
    if (!fullName || !email) {
      console.error("Missing required fields:", { fullName: !!fullName, email: !!email });
      return new Response(JSON.stringify({ error: "Name and email are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("Invalid email format:", email);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize inputs to prevent XSS
    const sanitize = (str: string) => str?.replace(/[<>\"'&]/g, (match) => {
      const map: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return map[match];
    }) || '';

    const sanitizedName = sanitize(fullName.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = sanitize(phone?.trim() || '');
    const sanitizedBrokerType = sanitize(brokerType?.trim() || '');
    const sanitizedAddress = sanitize(address?.trim() || '');

    // Length validation
    if (sanitizedName.length > 100 || sanitizedEmail.length > 254 || sanitizedPhone.length > 20) {
      console.error("Input length validation failed");
      return new Response(JSON.stringify({ error: "Input too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Processing referral signup:", { email: sanitizedEmail, brokerType: sanitizedBrokerType });

    await resend.emails.send({
      from: "CCIF Referrals <referrals@sundrycapitalsolutions.com>",
      to: [Deno.env.get("ADMIN_EMAIL") || "sundrycapitalsolutions@gmail.com"],
      subject: `New Referral Program Signup`,
      html: `
        <h2>New Referral Program Signup</h2>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
        <p><strong>Broker Type:</strong> ${sanitizedBrokerType}</p>
        <p><strong>Address:</strong> ${sanitizedAddress}</p>
      `,
    });

    await resend.emails.send({
      from: "CCIF Referrals <referrals@sundrycapitalsolutions.com>",
      to: [sanitizedEmail],
      subject: `Welcome to the CCIF Referral Network`,
      html: `
        <h2>Welcome to the CCIF Referral Network</h2>
        <p>Dear ${sanitizedName},</p>
        <p>Thank you for joining our referral program. Our team will reach out shortly with your referral access details.</p>
        <p>Best regards,<br>CCIF Team</p>
      `,
    });

    console.log("Referral signup emails sent successfully for:", sanitizedEmail);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-referral-signup:", error);
    
    // Don't expose internal error details to client
    const userMessage = error.message?.includes("rate limit") ? "Too many requests. Please try again later." : "An error occurred processing your signup.";
    
    return new Response(JSON.stringify({ error: userMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);