import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Resend with proper error handling
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY environment variable is not set");
      return new Response(JSON.stringify({ error: "Email service configuration error" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    const resend = new Resend(resendApiKey);
    const rawData = await req.json();
    // Handle both parameter naming conventions for backward compatibility
    const { 
      borrowerName, 
      applicantName,
      borrowerEmail, 
      applicantEmail,
      borrowerPhone, 
      applicantPhone,
      programName, 
      propertyAddress,
      propertyCity,
      propertyState,
      propertyZip,
      requestedAmount,
      loanPurpose,
      programSpecificData
    } = rawData;

    // Use consistent naming - prefer borrower* parameters
    const finalBorrowerName = borrowerName || applicantName;
    const finalBorrowerEmail = borrowerEmail || applicantEmail;
    const finalBorrowerPhone = borrowerPhone || applicantPhone;

    // Validate required fields
    if (!finalBorrowerName || !finalBorrowerEmail || !finalBorrowerPhone || !programName) {
      console.error("Missing required fields:", { 
        borrowerName: !!finalBorrowerName, 
        borrowerEmail: !!finalBorrowerEmail, 
        borrowerPhone: !!finalBorrowerPhone, 
        programName: !!programName 
      });
      return new Response(JSON.stringify({ error: "All basic fields are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(finalBorrowerEmail)) {
      console.error("Invalid email format:", finalBorrowerEmail);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize inputs
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

    const sanitizedName = sanitize(finalBorrowerName.trim());
    const sanitizedEmail = finalBorrowerEmail.trim().toLowerCase();
    const sanitizedPhone = sanitize(finalBorrowerPhone.trim());
    const sanitizedProgram = sanitize(programName.trim());

    console.log("Processing program application:", { 
      programName: sanitizedProgram, 
      email: sanitizedEmail 
    });

    // Build property address string
    const fullAddress = [propertyAddress, propertyCity, propertyState, propertyZip]
      .filter(Boolean)
      .join(', ');

    // Format program specific data for email
    let programDataHtml = '';
    if (programSpecificData && Object.keys(programSpecificData).length > 0) {
      programDataHtml = '<h3>Additional Details:</h3><ul>';
      Object.entries(programSpecificData).forEach(([key, value]) => {
        if (value) {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          programDataHtml += `<li><strong>${sanitize(formattedKey)}:</strong> ${sanitize(String(value))}</li>`;
        }
      });
      programDataHtml += '</ul>';
    }

    // Send notification email to admin
    await resend.emails.send({
      from: "CCIF-INC <applications@ccif-inc.com>",
      to: [Deno.env.get("ADMIN_EMAIL") || "sundrycapitalsolutions@gmail.com"],
      subject: `New Program Application: ${sanitizedProgram}`,
      html: `
        <h2>New Program Application Received</h2>
        <p><strong>Program:</strong> ${sanitizedProgram}</p>
        <h3>Borrower Information:</h3>
        <p><strong>Name:</strong> ${sanitizedName}</p>
        <p><strong>Email:</strong> ${sanitizedEmail}</p>
        <p><strong>Phone:</strong> ${sanitizedPhone}</p>
        ${fullAddress ? `<p><strong>Property Address:</strong> ${sanitize(fullAddress)}</p>` : ''}
        ${requestedAmount ? `<p><strong>Requested Amount:</strong> $${requestedAmount.toLocaleString()}</p>` : ''}
        ${loanPurpose ? `<p><strong>Loan Purpose:</strong> ${sanitize(loanPurpose)}</p>` : ''}
        ${programDataHtml}
        <p><em>Application submitted at ${new Date().toLocaleString()}</em></p>
      `,
    });

    // Send confirmation email to borrower
    await resend.emails.send({
      from: "CCIF-INC <applications@ccif-inc.com>",
      to: [sanitizedEmail],
      subject: `Application Received: ${sanitizedProgram}`,
      html: `
        <h2>Application Received</h2>
        <p>Dear ${sanitizedName},</p>
        <p>Thank you for submitting your application for <strong>${sanitizedProgram}</strong>. We have received your request and will review it within 24-48 hours.</p>
        <p>Our team will contact you at ${sanitizedPhone} or reply to this email with next steps.</p>
        <p>Best regards,<br>CCIF Team<br>Sundry Capital Solutions</p>
      `,
    });

    console.log("Emails sent successfully for program application:", sanitizedProgram);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-program-application:", error);
    
    const userMessage = error.message?.includes("rate limit") 
      ? "Too many requests. Please try again later." 
      : "An error occurred processing your application.";
    
    return new Response(JSON.stringify({ error: userMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);