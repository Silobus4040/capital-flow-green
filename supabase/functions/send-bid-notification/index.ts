import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const sendWithRetry = async (resend: Resend, emailData: any, maxRetries = 3): Promise<any> => {
  let lastError: Error | null = null;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`📧 Email attempt ${attempt}/${maxRetries}...`);
      const result = await resend.emails.send(emailData);
      console.log(`✅ Email sent on attempt ${attempt}:`, result);
      return result;
    } catch (error: any) {
      lastError = error;
      console.error(`❌ Attempt ${attempt} failed:`, error.message);
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt - 1)));
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
      throw new Error("RESEND_API_KEY not configured");
    }

    const resend = new Resend(resendApiKey);
    const { borrowerEmail, borrowerName, investorLabel, bidAmount, programName } = await req.json();

    if (!borrowerEmail || !bidAmount) {
      return new Response(JSON.stringify({ error: "borrowerEmail and bidAmount are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency', currency: 'USD', maximumFractionDigits: 0,
    }).format(Number(bidAmount));

    console.log(`📝 Sending bid notification to ${borrowerEmail}: ${investorLabel} bid ${formattedAmount}`);

    await sendWithRetry(resend, {
      from: "CCIF Notifications <notifications@ccif-inc.com>",
      to: [borrowerEmail],
      subject: `💰 New Investor Bid Received - ${formattedAmount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f7fafc;">
          <div style="background: linear-gradient(135deg, #1a6b3c 0%, #2d8a56 100%); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Investor Bid</h1>
            <p style="margin: 8px 0 0; opacity: 0.9; font-size: 14px;">Commercial Capital & Investment Finance</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2d3748;">Dear ${borrowerName || 'Borrower'},</p>
            <p style="font-size: 16px; color: #2d3748;">Great news! An investor has made a bid on your loan application.</p>
            <div style="background: white; border: 2px solid #1a6b3c; border-radius: 12px; padding: 24px; margin: 20px 0; text-align: center;">
              <p style="font-size: 14px; color: #718096; margin: 0 0 8px;">Bid Amount</p>
              <p style="font-size: 36px; font-weight: bold; color: #1a6b3c; margin: 0;">${formattedAmount}</p>
              <p style="font-size: 14px; color: #718096; margin: 8px 0 0;">from ${investorLabel || 'Anonymous Investor'}</p>
            </div>
            ${programName ? `<p style="font-size: 14px; color: #718096;"><strong>Program:</strong> ${programName}</p>` : ''}
            <p style="font-size: 14px; color: #4a5568;">Log in to your borrower portal to view all bids and track your funding progress in real-time.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://ccif-inc.com/applicant-dashboard" style="background: #1a6b3c; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">View My Dashboard</a>
            </div>
          </div>
          <div style="background: #1a6b3c; color: white; padding: 16px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This is an automated notification from CCIF Inc. Please do not reply to this email.</p>
            <p style="margin: 4px 0 0; opacity: 0.7;">Commercial Capital & Investment Finance Inc.</p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("❌ Error in send-bid-notification:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
