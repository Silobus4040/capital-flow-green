import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ApplicationData {
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  programName: string;
  propertyAddress?: string;
  propertyCity?: string;
  propertyState?: string;
  propertyZip?: string;
  requestedAmount?: number;
  loanPurpose?: string;
  programSpecificData?: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const applicationData: ApplicationData = await req.json();

    console.log('Sending application notification:', applicationData);

    // Send notification to admin
    const adminEmailResponse = await resend.emails.send({
      from: "CCIF Loans <noreply@ccifcapital.com>",
      to: ["sundrycapitalsolutions@gmail.com"],
      subject: `New Loan Application - ${applicationData.programName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Loan Application Received</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Applicant Information</h3>
            <p><strong>Name:</strong> ${applicationData.borrowerName}</p>
            <p><strong>Email:</strong> ${applicationData.borrowerEmail}</p>
            <p><strong>Phone:</strong> ${applicationData.borrowerPhone}</p>
            <p><strong>Program:</strong> ${applicationData.programName}</p>
          </div>

          ${applicationData.propertyAddress ? `
          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Property Details</h3>
            <p><strong>Address:</strong> ${applicationData.propertyAddress}</p>
            ${applicationData.propertyCity ? `<p><strong>City:</strong> ${applicationData.propertyCity}</p>` : ''}
            ${applicationData.propertyState ? `<p><strong>State:</strong> ${applicationData.propertyState}</p>` : ''}
            ${applicationData.propertyZip ? `<p><strong>ZIP:</strong> ${applicationData.propertyZip}</p>` : ''}
          </div>
          ` : ''}

          <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Loan Details</h3>
            ${applicationData.requestedAmount ? `<p><strong>Requested Amount:</strong> $${applicationData.requestedAmount.toLocaleString()}</p>` : ''}
            ${applicationData.loanPurpose ? `<p><strong>Loan Purpose:</strong> ${applicationData.loanPurpose}</p>` : ''}
          </div>

          ${applicationData.programSpecificData && Object.keys(applicationData.programSpecificData).length > 0 ? `
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Additional Details</h3>
            ${Object.entries(applicationData.programSpecificData).map(([key, value]) => 
              `<p><strong>${key}:</strong> ${value}</p>`
            ).join('')}
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px;">
              This application is now available in your admin dashboard for review and assignment to loan officers.
            </p>
          </div>
        </div>
      `,
    });

    // Send confirmation to applicant
    const applicantEmailResponse = await resend.emails.send({
      from: "CCIF Loans <noreply@ccifcapital.com>",
      to: [applicationData.borrowerEmail],
      subject: `Application Received - ${applicationData.programName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Application Received</h2>
          
          <p>Dear ${applicationData.borrowerName},</p>
          
          <p>Thank you for submitting your loan application for <strong>${applicationData.programName}</strong>. We have received your application and it is now under review.</p>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb;">
            <h3 style="margin-top: 0; color: #1e40af;">What's Next?</h3>
            <ul style="color: #334155;">
              <li>Our team will review your application within 24-48 hours</li>
              <li>A loan officer will be assigned to your case</li>
              <li>You'll receive an email notification when your application status is updated</li>
              <li>Your assigned loan officer will contact you directly to discuss next steps</li>
            </ul>
          </div>
          
          <p>If you have any questions, please don't hesitate to contact us.</p>
          
          <p>Best regards,<br>
          CCIF Capital Team</p>
        </div>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);
    console.log("Applicant email sent:", applicantEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        adminEmailResult: adminEmailResponse,
        applicantEmailResult: applicantEmailResponse 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-application-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);