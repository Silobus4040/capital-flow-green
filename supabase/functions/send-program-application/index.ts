import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ProgramApplicationRequest {
  borrowerName: string;
  email: string;
  phone: string;
  programId: string;
  programName: string;
  propertyDetails?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  loanDetails?: {
    requestedAmount?: number;
    loanPurpose?: string;
  };
  programSpecificData?: any;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestData: ProgramApplicationRequest = await req.json();
    
    console.log("Received program application request:", {
      program: requestData.programName,
      email: requestData.email,
      timestamp: new Date().toISOString()
    });

    // Generate email content based on program type
    const emailSubject = `New ${requestData.programName} Application Request`;
    
    const emailHtml = generateEmailTemplate(requestData);
    
    // Send email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Commercial Capital & Investment Finance <no-reply@commercialcif.com>",
      to: ["admin@commercialcif.com"],
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("Admin email sent successfully:", adminEmailResponse);

    // Send confirmation email to applicant
    const confirmationEmailResponse = await resend.emails.send({
      from: "Commercial Capital & Investment Finance <no-reply@commercialcif.com>",
      to: [requestData.email],
      subject: `Application Request Received - ${requestData.programName}`,
      html: generateConfirmationTemplate(requestData),
    });

    console.log("Confirmation email sent successfully:", confirmationEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Application request sent successfully",
        adminEmailId: adminEmailResponse.data?.id,
        confirmationEmailId: confirmationEmailResponse.data?.id
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
    console.error("Error in send-program-application function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send application request",
        details: error.stack 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function generateEmailTemplate(data: ProgramApplicationRequest): string {
  const propertySection = data.propertyDetails?.address ? `
    <div style="margin: 20px 0;">
      <h3 style="color: #1f2937; margin-bottom: 10px;">Property Information</h3>
      <p><strong>Address:</strong> ${data.propertyDetails.address || 'Not provided'}</p>
      <p><strong>City:</strong> ${data.propertyDetails.city || 'Not provided'}</p>
      <p><strong>State:</strong> ${data.propertyDetails.state || 'Not provided'}</p>
      <p><strong>ZIP Code:</strong> ${data.propertyDetails.zipCode || 'Not provided'}</p>
    </div>
  ` : '';

  const loanSection = data.loanDetails?.requestedAmount ? `
    <div style="margin: 20px 0;">
      <h3 style="color: #1f2937; margin-bottom: 10px;">Loan Information</h3>
      <p><strong>Requested Amount:</strong> $${data.loanDetails.requestedAmount?.toLocaleString() || 'Not provided'}</p>
      <p><strong>Loan Purpose:</strong> ${data.loanDetails.loanPurpose || 'Not provided'}</p>
    </div>
  ` : '';

  const programSpecificSection = data.programSpecificData ? `
    <div style="margin: 20px 0;">
      <h3 style="color: #1f2937; margin-bottom: 10px;">Program-Specific Details</h3>
      <pre style="background: #f3f4f6; padding: 15px; border-radius: 5px; overflow-x: auto;">${JSON.stringify(data.programSpecificData, null, 2)}</pre>
    </div>
  ` : '';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">New Loan Application Request</h1>
        <p style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">${data.programName}</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <div style="margin-bottom: 30px;">
          <h2 style="color: #1f2937; margin-bottom: 15px;">Applicant Information</h2>
          <p><strong>Name:</strong> ${data.borrowerName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Program:</strong> ${data.programName}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        ${propertySection}
        ${loanSection}
        ${programSpecificSection}
        
        <div style="margin-top: 30px; padding: 20px; background: #f9fafb; border-radius: 8px;">
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            This application request was submitted through the Commercial Capital & Investment Finance website.
            Please review and follow up with the applicant within 24 hours.
          </p>
        </div>
      </div>
    </div>
  `;
}

function generateConfirmationTemplate(data: ProgramApplicationRequest): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #059669, #10b981); color: white; padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px;">Application Request Received</h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Thank you for your interest in our financing programs</p>
      </div>
      
      <div style="padding: 30px; background: white;">
        <p>Dear ${data.borrowerName},</p>
        
        <p>Thank you for your interest in our <strong>${data.programName}</strong> program. We have received your application request and will review it promptly.</p>
        
        <div style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 20px; margin: 20px 0;">
          <h3 style="margin: 0 0 10px 0; color: #0c4a6e;">What happens next?</h3>
          <ul style="margin: 0; padding-left: 20px; color: #164e63;">
            <li>Our loan specialists will review your request within 24 hours</li>
            <li>You'll receive a follow-up call to discuss your specific needs</li>
            <li>We'll provide you with a detailed application package</li>
            <li>Our team will guide you through the entire process</li>
          </ul>
        </div>
        
        <div style="margin: 30px 0;">
          <h3 style="color: #1f2937;">Your Request Summary:</h3>
          <p><strong>Program:</strong> ${data.programName}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Contact Email:</strong> ${data.email}</p>
          <p><strong>Contact Phone:</strong> ${data.phone}</p>
        </div>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
          <p style="margin: 0; color: #92400e;">
            <strong>Questions?</strong> Contact our loan specialists at <a href="tel:+1-555-0123" style="color: #92400e;">(555) 012-3456</a> 
            or email us at <a href="mailto:loans@commercialcif.com" style="color: #92400e;">loans@commercialcif.com</a>
          </p>
        </div>
        
        <p>Best regards,<br>
        <strong>Commercial Capital & Investment Finance Team</strong></p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #6b7280; font-size: 14px;">
          Commercial Capital & Investment Finance, Inc. | Asset-Based Commercial Lending Specialists
        </p>
      </div>
    </div>
  `;
}

serve(handler);