import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

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

export const useAuthenticatedApplications = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const submitApplication = async (applicationData: ProgramApplicationData) => {
    console.log('🔥 Starting authenticated application submission:', applicationData.programName);
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to submit an application.",
        variant: "destructive",
      });
      throw new Error('User must be authenticated to submit applications');
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert application into database with authenticated user_id
      const { error: dbError } = await supabase
        .from('loan_program_applications')
        .insert({
          user_id: user.id, // Required for authenticated submissions
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
        });

      if (dbError) {
        console.error('❌ Database insertion failed:', dbError);
        throw new Error(`Database error: ${dbError.message}`);
      }

      console.log('✅ Database insertion successful');

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
        // Don't fail the whole operation if email fails
        toast({
          title: "Application Submitted",
          description: "Your application was saved but email notification failed. We'll still process your request.",
          variant: "default",
        });
      } else {
        console.log('✅ Email notification sent successfully');
        toast({
          title: "Application Submitted Successfully",
          description: "Your loan application request has been submitted. You'll receive a confirmation email shortly.",
        });
      }

      return { success: true, emailResult };
      
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

  return {
    submitApplication,
    isSubmitting,
  };
};