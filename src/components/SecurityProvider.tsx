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
    metaFrameOptions.content = 'DENY';
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
    
    // In production, send to security monitoring service
    // For now, just log to console with clear security warning
    if (process.env.NODE_ENV === 'production') {
      // TODO: Implement security incident reporting to external service
      fetch('/api/security-incident', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ incident, details, timestamp: new Date().toISOString() })
      }).catch(err => console.error('Failed to report security incident:', err));
    }
  };

  const sanitizeUserInput = (input: string): string => {
    return input
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