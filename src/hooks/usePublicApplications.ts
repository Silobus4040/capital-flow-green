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

export const usePublicApplications = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const submitPublicApplication = async (applicationData: ProgramApplicationData) => {
    console.log('🔥 Starting form submission:', applicationData.programName);
    
    setIsSubmitting(true);
    
    try {
      // Insert application into database (supports both authenticated and anonymous users)
      const { error: dbError } = await supabase
        .from('loan_program_applications')
        .insert({
          user_id: user?.id || null, // Use authenticated user ID if available, null for anonymous
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
        },
      }).catch(err => console.error('⚠️ Telegram notification failed:', err));

      // Send email notification via edge function (now requires JWT)
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
        console.log('📝 Application saved successfully, email notification failed (will be handled by admin team)');
      } else {
        console.log('✅ Email notification sent successfully');
      }

      toast({
        title: "Application Submitted Successfully",
        description: "Your application has been submitted securely. Our team will review your application and contact you within 24-48 hours.",
        variant: "default",
      });

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
    submitPublicApplication,
    isSubmitting,
    isAuthenticated: !!user,
  };
};