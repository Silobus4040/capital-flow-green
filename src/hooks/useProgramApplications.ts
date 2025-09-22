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

      // Insert application into database
      const { data: application, error: dbError } = await supabase
        .from('loan_program_applications')
        .insert({
          user_id: user.id,
          program_id: applicationData.programId,
          program_name: applicationData.programName,
          borrower_name: applicationData.borrowerName,
          borrower_email: applicationData.borrowerEmail,
          borrower_phone: applicationData.borrowerPhone,
          property_address: applicationData.propertyAddress,
          property_city: applicationData.propertyCity,
          property_state: applicationData.propertyState,
          property_zip: applicationData.propertyZip,
          requested_amount: applicationData.requestedAmount,
          loan_purpose: applicationData.loanPurpose,
          program_specific_data: applicationData.programSpecificData || {},
        })
        .select()
        .single();

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      // Send email notification via edge function
      const { data: emailResult, error: emailError } = await supabase.functions.invoke(
        'send-application-notification',
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
        variant: "default",
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