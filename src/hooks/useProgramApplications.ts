import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ProgramApplicationData {
  programId: string;
  programName: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  propertyAddress?: string;
  propertyCity?: string;
  propertyState?: string;
  propertyZip?: string;
  requestedAmount?: number;
  loanPurpose?: string;
  programSpecificData?: any;
}

export const useProgramApplications = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const submitApplication = async (applicationData: ProgramApplicationData) => {
    setIsSubmitting(true);

    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('You must be logged in to submit an application');
      }

      // Insert application into database via Edge Function to bypass RLS
      const { data: edgeResponse, error: fnError } = await supabase.functions.invoke<{
        success: boolean;
        data?: any;
        error?: string;
      }>('submit-application', {
        body: {
          userId: user.id,
          applicationData,
        },
      });

      if (fnError || !edgeResponse?.success || !edgeResponse?.data) {
        throw new Error(`Submission error: ${fnError?.message || edgeResponse?.error || 'Unknown error'}`);
      }

      const application = edgeResponse.data;

      // Send Telegram notification (fire-and-forget)
      supabase.functions.invoke('send-telegram-notification', {
        body: {
          applicationType: 'loan',
          borrowerName: applicationData.borrowerName,
          borrowerEmail: applicationData.borrowerEmail,
          borrowerPhone: applicationData.borrowerPhone,
          programName: applicationData.programName,
          requestedAmount: applicationData.requestedAmount,
          propertyAddress: [applicationData.propertyAddress, applicationData.propertyCity, applicationData.propertyState, applicationData.propertyZip].filter(Boolean).join(', '),
          extras: {
            'Program ID': applicationData.programId,
            'Property City': applicationData.propertyCity,
            'Property State': applicationData.propertyState,
            'Property ZIP': applicationData.propertyZip,
            'Loan Purpose': applicationData.loanPurpose,
            ...(applicationData.programSpecificData && typeof applicationData.programSpecificData === 'object'
              ? applicationData.programSpecificData
              : {}),
          },
        },
      }).catch(err => console.error('⚠️ Telegram notification failed:', err));

      // Send email notification via edge function
      const { data: emailResult, error: emailError } = await supabase.functions.invoke(
        'send-program-application',
        {
          body: {
            borrowerName: applicationData.borrowerName,
            borrowerEmail: applicationData.borrowerEmail,
            borrowerPhone: applicationData.borrowerPhone,
            programName: applicationData.programName,
            propertyAddress: applicationData.propertyAddress,
            propertyCity: applicationData.propertyCity,
            propertyState: applicationData.propertyState,
            propertyZip: applicationData.propertyZip,
            requestedAmount: applicationData.requestedAmount,
            loanPurpose: applicationData.loanPurpose,
            programSpecificData: applicationData.programSpecificData,
          },
        }
      );

      if (emailError) {
        console.error('⚠️ Email sending failed:', emailError);
        // Log the email failure internally but show professional success message to client
        console.log('📝 Application saved successfully, email notification failed (will be handled by admin team)');
      } else {
        console.log('✅ Email notification sent successfully');
      }

      // Always show professional success message to clients
      toast({
        title: "Thank you! Application Submitted Successfully",
        description: "Your application has been submitted successfully. Our team will review your application and contact you within 24-48 hours.",
        variant: "success" as any,
      });

      return { application, emailResult };

    } catch (error: any) {
      console.error('Application submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit your application. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const getApplications = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error('You must be logged in to view applications');
      }

      const { data, error } = await supabase
        .from('loan_program_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch applications: ${error.message}`);
      }

      return data || [];
    } catch (error: any) {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch your applications.",
        variant: "destructive",
      });
      return [];
    }
  };

  return {
    submitApplication,
    getApplications,
    isSubmitting,
  };
};