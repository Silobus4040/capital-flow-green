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

const formatTelegramLabel = (key: string) =>
  key
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();

const flattenTelegramDetails = (
  value: unknown,
  parentKey = '',
  output: Record<string, string> = {}
): Record<string, string> => {
  if (value === null || value === undefined || value === '') {
    return output;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const nextKey = parentKey ? `${parentKey} ${index + 1}` : String(index + 1);
      flattenTelegramDetails(item, nextKey, output);
    });
    return output;
  }

  if (typeof value === 'object') {
    Object.entries(value as Record<string, unknown>).forEach(([key, nestedValue]) => {
      const nextKey = parentKey ? `${parentKey} ${formatTelegramLabel(key)}` : formatTelegramLabel(key);
      flattenTelegramDetails(nestedValue, nextKey, output);
    });
    return output;
  }

  output[parentKey || 'value'] = String(value);
  return output;
};

const buildLoanTelegramExtras = (applicationData: ProgramApplicationData) => {
  const baseDetails: Record<string, unknown> = {
    'Program ID': applicationData.programId,
    'Property City': applicationData.propertyCity,
    'Property State': applicationData.propertyState,
    'Property ZIP': applicationData.propertyZip,
    'Loan Purpose': applicationData.loanPurpose,
  };

  const mergedDetails = {
    ...baseDetails,
    ...(applicationData.programSpecificData && typeof applicationData.programSpecificData === 'object'
      ? applicationData.programSpecificData
      : {}),
  };

  return flattenTelegramDetails(mergedDetails);
};

export const usePublicApplications = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const submitPublicApplication = async (applicationData: ProgramApplicationData) => {
    setIsSubmitting(true);

    try {
      const { data: insertedApplication, error: dbError } = await supabase
        .from('loan_program_applications')
        .insert({
          user_id: user?.id || null,
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
        .select('id, loan_id')
        .single();

      if (dbError) {
        throw new Error(`Database error: ${dbError.message}`);
      }

      const propertyAddress = [
        applicationData.propertyAddress,
        applicationData.propertyCity,
        applicationData.propertyState,
        applicationData.propertyZip,
      ]
        .filter(Boolean)
        .join(', ');

      const { data: telegramResult, error: telegramError } = await supabase.functions.invoke<{
        success: boolean;
        error?: string;
      }>('send-telegram-notification', {
        body: {
          applicationType: 'loan',
          borrowerName: applicationData.borrowerName,
          borrowerEmail: applicationData.borrowerEmail,
          borrowerPhone: applicationData.borrowerPhone,
          programName: applicationData.programName,
          requestedAmount: applicationData.requestedAmount,
          propertyAddress,
          extras: {
            'Loan ID': insertedApplication?.loan_id,
            ...buildLoanTelegramExtras(applicationData),
          },
        },
      });

      if (telegramError || !telegramResult?.success) {
        throw new Error(
          telegramError?.message ||
            telegramResult?.error ||
            'Application saved, but Telegram delivery failed. Please submit again so our team is notified.'
        );
      }

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
      }

      return { success: true, emailResult, telegramResult };
    } catch (error: any) {
      console.error('Application submission error:', error);
      toast({
        title: 'Submission Failed',
        description: error.message || 'Failed to submit your application. Please try again.',
        variant: 'destructive',
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
