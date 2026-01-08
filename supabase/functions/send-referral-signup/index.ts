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
        const delay = 1000 * Math.pow(2, attempt - 1);
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

    const rawData = await req.json();
    const { fullName, email, phone, brokerType, address } = rawData;

    // Validate required fields
    if (!fullName || !email) {
      console.error("❌ Missing required fields:", { fullName: !!fullName, email: !!email });
      return new Response(JSON.stringify({ error: "Name and email are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.error("❌ Invalid email format:", email);
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

    const sanitizedName = sanitize(fullName.trim());
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedPhone = sanitize(phone?.trim() || 'Not provided');
    const sanitizedBrokerType = sanitize(brokerType?.trim() || 'Not specified');
    const sanitizedAddress = sanitize(address?.trim() || 'Not provided');

    // Length validation
    if (sanitizedName.length > 100 || sanitizedEmail.length > 254 || sanitizedPhone.length > 20) {
      console.error("❌ Input length validation failed");
      return new Response(JSON.stringify({ error: "Input too long" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    console.log(`📝 Processing referral signup from ${sanitizedName}`);

    // Send admin notification with retry
    await sendWithRetry(resend, {
      from: "CCIF Referrals <referrals@ccif-inc.com>",
      to: [adminEmail],
      subject: `🤝 New Referral Program Signup - ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Referral Partner</h1>
          </div>
          <div style="padding: 20px; background: #f7fafc;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0;"><strong>Name:</strong></td><td>${sanitizedName}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Email:</strong></td><td><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></td></tr>
              <tr><td style="padding: 8px 0;"><strong>Phone:</strong></td><td>${sanitizedPhone}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Broker Type:</strong></td><td>${sanitizedBrokerType}</td></tr>
              <tr><td style="padding: 8px 0;"><strong>Address:</strong></td><td>${sanitizedAddress}</td></tr>
            </table>
          </div>
          <div style="background: #1a365d; color: white; padding: 10px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET</p>
          </div>
        </div>
      `,
    });

    // Send welcome email to new referral partner
    await sendWithRetry(resend, {
      from: "CCIF Referrals <referrals@ccif-inc.com>",
      to: [sanitizedEmail],
      subject: `Welcome to the CCIF Referral Network`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1a365d 0%, #2c5282 100%); color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">Welcome to CCIF!</h1>
          </div>
          <div style="padding: 20px;">
            <p>Dear ${sanitizedName},</p>
            <p>Thank you for joining our referral program. Our team will reach out shortly with your referral access details and partnership information.</p>
            <p>We look forward to working with you!</p>
            <p>Best regards,<br>The CCIF Team</p>
          </div>
        </div>
      `,
    });

    console.log(`✅ Referral signup emails sent successfully for ${sanitizedEmail}`);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("❌ Error in send-referral-signup:", error);
    
    const userMessage = error.message?.includes("rate limit") 
      ? "Too many requests. Please try again later." 
      : "An error occurred processing your signup.";
    
    return new Response(JSON.stringify({ error: userMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);