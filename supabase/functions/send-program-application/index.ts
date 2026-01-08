import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Retry function with exponential backoff
const sendWithRetry = async (resend: Resend, emailData: any, maxRetries = 3): Promise<any> => {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📧 Email attempt ${attempt}/${maxRetries}...`);
      const result = await resend.emails.send(emailData);
      console.log(`✅ Email sent successfully on attempt ${attempt}:`, result);
      return result;
    } catch (error: any) {
      lastError = error;
      console.error(`❌ Email attempt ${attempt} failed:`, error.message);
      
      if (attempt < maxRetries) {
        const delay = 1000 * Math.pow(2, attempt - 1); // Exponential backoff: 1s, 2s, 4s
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  }
  
  throw lastError;
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("❌ RESEND_API_KEY not configured");
      throw new Error("Email service not configured");
    }

    const resend = new Resend(resendApiKey);
    const adminEmail = Deno.env.get("ADMIN_EMAIL") || "sundrycapitalsolutions@gmail.com";
    
    console.log(`📬 Admin email configured: ${adminEmail}`);

    const rawData = await req.json();
    const {
      borrowerName,
      borrowerEmail,
      borrowerPhone,
      programName,
      propertyAddress,
      propertyCity,
      propertyState,
      propertyZip,
      requestedAmount,
      loanPurpose,
      programSpecificData,
    } = rawData;

    // Validate required fields
    if (!borrowerName || !borrowerEmail || !programName) {
      console.error("❌ Missing required fields:", { borrowerName: !!borrowerName, borrowerEmail: !!borrowerEmail, programName: !!programName });
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(borrowerEmail)) {
      console.error("❌ Invalid email format:", borrowerEmail);
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Sanitize inputs
    const sanitize = (str: string) => str?.replace(/[<>\"'&]/g, (match) => {
      const map: { [key: string]: string } = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' };
      return map[match];
    }) || '';

    const sanitizedName = sanitize(borrowerName.trim());
    const sanitizedEmail = borrowerEmail.trim().toLowerCase();
    const sanitizedPhone = sanitize(borrowerPhone?.trim() || 'Not provided');
    const sanitizedProgram = sanitize(programName.trim());

    // Build property address
    const fullAddress = [propertyAddress, propertyCity, propertyState, propertyZip]
      .filter(Boolean)
      .map(s => sanitize(s.trim()))
      .join(', ') || 'Not provided';

    // Format amount
    const formattedAmount = requestedAmount 
      ? `$${Number(requestedAmount).toLocaleString()}` 
      : 'Not specified';

    // Format program-specific data
    let programDataHtml = '';
    if (programSpecificData && Object.keys(programSpecificData).length > 0) {
      programDataHtml = '<h3 style="color: #1a365d; margin-top: 20px;">Program-Specific Details</h3><ul>';
      for (const [key, value] of Object.entries(programSpecificData)) {
        if (value) {
          const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          programDataHtml += `<li><strong>${sanitize(formattedKey)}:</strong> ${sanitize(String(value))}</li>`;
        }
      }
      programDataHtml += '</ul>';
    }

    console.log(`📝 Processing application for ${sanitizedProgram} from ${sanitizedName}`);

    // Send email with retry logic
    const emailResult = await sendWithRetry(resend, {
      from: "CCIF Applications <applications@ccif-inc.com>",
      to: [adminEmail],
      subject: `🆕 New ${sanitizedProgram} Application - ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Loan Application</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">${sanitizedProgram}</p>
          </div>
          
          <div style="padding: 20px; background: #f7fafc;">
            <h2 style="color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Borrower Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #4a5568;"><strong>Name:</strong></td><td>${sanitizedName}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a5568;"><strong>Email:</strong></td><td><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #4a5568;"><strong>Phone:</strong></td><td>${sanitizedPhone}</td></tr>
            </table>

            <h2 style="color: #1a365d; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 20px;">Loan Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #4a5568;"><strong>Program:</strong></td><td>${sanitizedProgram}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a5568;"><strong>Requested Amount:</strong></td><td style="font-weight: bold; color: #2c5282;">${formattedAmount}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a5568;"><strong>Property Address:</strong></td><td>${fullAddress}</td></tr>
              <tr><td style="padding: 8px 0; color: #4a5568;"><strong>Loan Purpose:</strong></td><td>${sanitize(loanPurpose || 'Not specified')}</td></tr>
            </table>

            ${programDataHtml}
          </div>
          
          <div style="background: #1a365d; color: white; padding: 15px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This application was submitted via the CCIF website.</p>
            <p style="margin: 5px 0 0 0;">Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
          </div>
        </div>
      `,
    });

    console.log(`✅ Application email sent successfully to ${adminEmail}`);

    return new Response(JSON.stringify({ success: true, emailId: emailResult.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });

  } catch (error: any) {
    console.error("❌ Error in send-program-application:", error);
    
    return new Response(JSON.stringify({ 
      error: "Failed to send notification email",
      details: error.message 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);