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
        if (!resendApiKey) throw new Error("RESEND_API_KEY not configured");

        const resend = new Resend(resendApiKey);
        const { borrowerEmail, borrowerName, messagePreview, messageType } = await req.json();

        if (!borrowerEmail) {
            return new Response(JSON.stringify({ error: "borrowerEmail is required" }), {
                status: 400,
                headers: { "Content-Type": "application/json", ...corsHeaders },
            });
        }

        const isVoice = messageType === 'voice';
        const preview = isVoice
            ? '🎧 You received a new voice note from your account manager. Log in to your portal to listen to it.'
            : '💬 You have a new secure message from your account manager. Log in to your portal to read it.';

        console.log(`📝 Sending message notification to ${borrowerEmail}`);

        await sendWithRetry(resend, {
            from: "CCIF Notifications <notifications@ccif-inc.com>",
            to: [borrowerEmail],
            subject: isVoice ? `🎧 New Voice Note from CCIF` : `💬 New Message from CCIF`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f7fafc;">
          <div style="background: linear-gradient(135deg, #1a6b3c 0%, #2d8a56 100%); color: white; padding: 30px; text-align: center;">
            <img src="https://capital-flow-green.lovable.app/lovable-uploads/7a51105a-a80d-4bc0-8f7b-c8e5b6b783c3.png" alt="CCIF Logo" style="height: 40px; margin-bottom: 15px; display: inline-block;" />
            <h1 style="margin: 0; font-size: 24px; color: #ffffff;">${isVoice ? 'New Voice Note' : 'New Message'}</h1>
            <p style="margin: 8px 0 0; color: #e0e0e0; font-size: 14px;">CCIF Account Manager</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px; color: #2d3748;">Dear ${borrowerName || 'Borrower'},</p>
            <p style="font-size: 16px; color: #2d3748;">${preview}</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://ccif-inc.com/applicant-messages" style="background: #1a6b3c; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">View Messages</a>
            </div>
          </div>
          <div style="background: #1a6b3c; color: white; padding: 16px; text-align: center; font-size: 12px;">
            <p style="margin: 0;">This is an automated notification from CCIF Inc. Please do not reply to this email.</p>
          </div>
        </div>
      `,
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json", ...corsHeaders },
        });
    } catch (error: any) {
        console.error("❌ Error in send-message-notification:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
        });
    }
};

serve(handler);
