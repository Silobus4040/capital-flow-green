import { createContext, useContext, useEffect, ReactNode } from 'react';
import { getSecurityHeaders } from '@/utils/inputValidation';

interface SecurityContextType {
  reportSecurityIncident: (incident: string, details?: any) => void;
  sanitizeUserInput: (input: string) => string;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export const useSecurityContext = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within a SecurityProvider');
  }
  return context;
};

interface SecurityProviderProps {
  children: ReactNode;
}

export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  useEffect(() => {
    // Apply security headers via meta tags (for client-side)
    const headers = getSecurityHeaders();
    
    // Apply Content Security Policy
    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = headers['Content-Security-Policy'];
    document.head.appendChild(metaCSP);

    // Apply other security headers via meta tags where possible
    const metaContentType = document.createElement('meta');
    metaContentType.httpEquiv = 'X-Content-Type-Options';
    metaContentType.content = 'nosniff';
    document.head.appendChild(metaContentType);

    const metaFrameOptions = document.createElement('meta');
    metaFrameOptions.httpEquiv = 'X-Frame-Options';
    metaFrameOptions.content = 'SAMEORIGIN';
    document.head.appendChild(metaFrameOptions);

    // Monitor for potential XSS attempts
    const monitorXSS = () => {
      const originalConsoleError = console.error;
      console.error = (...args) => {
        const errorMessage = args.join(' ');
        if (errorMessage.includes('script') || errorMessage.includes('eval')) {
          reportSecurityIncident('Potential XSS attempt detected', { error: errorMessage });
        }
        originalConsoleError.apply(console, args);
      };
    };

    monitorXSS();

    return () => {
      // Cleanup if needed
    };
  }, []);

  const reportSecurityIncident = (incident: string, details?: any) => {
    console.warn('🚨 SECURITY INCIDENT:', incident, details);
    
    // Log to Supabase security audit system
    if (typeof window !== 'undefined') {
      import('@/integrations/supabase/client').then(({ supabase }) => {
        supabase.rpc('log_security_incident', {
          incident_type: incident,
          details: {
            ...details,
            timestamp: new Date().toISOString(),
            user_agent: navigator.userAgent,
            url: window.location.href,
            referrer: document.referrer
          },
          risk_level: 'high'
        }).then(
          () => {}, // Success - do nothing
          (err) => console.error('Failed to log security incident:', err)
        );
      });
    }
  };

  const sanitizeUserInput = (input: string): string => {
    const sanitized = input
      .replace(/[<>\"'&]/g, (match) => {
        const map: { [key: string]: string } = {
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#x27;',
          '&': '&amp;'
        };
        return map[match] || match;
      })
      .trim();
    
    // Log suspicious input patterns
    if (input.length > 1000 || input.includes('script') || input.includes('javascript:')) {
      reportSecurityIncident('suspicious_input_detected', {
        original_length: input.length,
        sanitized_length: sanitized.length,
        contains_script: input.includes('script'),
        contains_javascript: input.includes('javascript:')
      });
    }
    
    return sanitized;
  };

  const value: SecurityContextType = {
    reportSecurityIncident,
    sanitizeUserInput
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};