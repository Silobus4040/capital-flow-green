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
    const { applicantName, applicantEmail, applicantPhone, programName } = rawData;

    // Validate required fields
    if (!applicantName || !applicantEmail || !applicantPhone || !programName) {
      console.error("Missing required fields:", { applicantName: !!applicantName, applicantEmail: !!applicantEmail, applicantPhone: !!applicantPhone, programName: !!programName });
      return new Response(JSON.stringify({ error: "All fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicantEmail)) {
      console.error("Invalid email format:", applicantEmail);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize inputs to prevent XSS
    const sanitize = (str: string) => str.replace(/[<>\"'&]/g, (match) => {
      const map: { [key: string]: string } = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return map[match];
    });

    const sanitizedName = sanitize(applicantName.trim());
    const sanitizedEmail = applicantEmail.trim().toLowerCase();
    const sanitizedPhone = sanitize(applicantPhone.trim());
    const sanitizedProgram = sanitize(programName.trim());

    // Length validation
    if (sanitizedName.length > 100 || sanitizedEmail.length > 254 || sanitizedPhone.length > 20 || sanitizedProgram.length > 100) {
      console.error("Input length validation failed");
      return new Response(JSON.stringify({ error: "Input too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log("Processing loan application:", { programName: sanitizedProgram, email: sanitizedEmail });

    await resend.emails.send({
      from: "CCIF Applications <applications@sundrycapitalsolutions.com>",
      to: ["sundrycapitalsolutions@gmail.com"],
      subject: `New Loan Application: ${sanitizedProgram}`,
      html: `
        <h2>New Loan Application</h2>
        <p><strong>Program:</strong> ${sanitizedProgram}</p>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
      `,
    });

    await resend.emails.send({
      from: "CCIF Applications <applications@sundrycapitalsolutions.com>",
      to: [sanitizedEmail],
      subject: `Application Received: ${sanitizedProgram}`,
      html: `
        <h2>Application Received</h2>
        <p>Dear ${sanitizedName},</p>
        <p>Thank you for submitting your application for ${sanitizedProgram}. We'll review it and contact you within 24-48 hours.</p>
        <p>Best regards,<br>CCIF Team</p>
      `,
    });

    console.log("Emails sent successfully for application:", sanitizedProgram);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-program-application:", error);
    
    // Don't expose internal error details to client
    const userMessage = error.message?.includes("rate limit") ? "Too many requests. Please try again later." : "An error occurred processing your application.";
    
    return new Response(JSON.stringify({ error: userMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);