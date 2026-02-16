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
    const headers = getSecurityHeaders();
    const metaCSP = document.createElement('meta');
    metaCSP.httpEquiv = 'Content-Security-Policy';
    metaCSP.content = headers['Content-Security-Policy'];
    document.head.appendChild(metaCSP);
  }, []);

  const reportSecurityIncident = (incident: string, details?: any) => {
    console.warn('🚨 SECURITY INCIDENT:', incident, details);
  };

  const sanitizeUserInput = (input: string): string => {
    return input
      .replace(/[<>\"'&]/g, (match) => {
        const map: { [key: string]: string } = {
          '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'
        };
        return map[match] || match;
      })
      .trim();
  };

  return (
    <SecurityContext.Provider value={{ reportSecurityIncident, sanitizeUserInput }}>
      {children}
    </SecurityContext.Provider>
  );
};
