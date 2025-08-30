// Secure email configuration helper
// This module handles secure email configuration without exposing sensitive data

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

// Function to get email configuration securely
export const getEmailConfig = async (): Promise<EmailConfig | null> => {
  try {
    // In a production environment, this should fetch from your edge function
    // For now, return null to disable email functionality until proper setup
    console.warn('Email service not configured. Please set up Supabase edge function for email handling.');
    return null;
  } catch (error) {
    console.error('Failed to get email configuration:', error);
    return null;
  }
};

// Sanitize email content to prevent XSS
export const sanitizeEmailContent = (content: string): string => {
  return content
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};