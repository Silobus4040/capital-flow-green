import { useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface SecurityEvent {
  type: 'login_attempt' | 'data_access' | 'suspicious_activity' | 'rate_limit_exceeded';
  details?: Record<string, any>;
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
}

export const useSecurityMonitoring = () => {
  const { user, profile } = useAuth();

  const logSecurityEvent = useCallback(async (event: SecurityEvent) => {
    try {
      const { error } = await supabase.rpc('log_security_incident', {
        incident_type: event.type,
        details: {
          ...event.details,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          url: window.location.href,
          user_role: profile?.role,
          session_id: (await supabase.auth.getSession()).data.session?.access_token?.slice(-8)
        },
        risk_level: event.risk_level || 'medium'
      });

      if (error) {
        console.error('Failed to log security event:', error);
      }
    } catch (error) {
      console.error('Security logging error:', error);
    }
  }, [profile?.role]);

  const monitorLoginAttempts = useCallback(() => {
    if (user) {
      logSecurityEvent({
        type: 'login_attempt',
        details: {
          success: true,
          user_id: user.id,
          email: user.email
        },
        risk_level: 'low'
      });
    }
  }, [user, logSecurityEvent]);

  const monitorDataAccess = useCallback((tableName: string, recordCount?: number) => {
    if (user && recordCount && recordCount > 10) {
      logSecurityEvent({
        type: 'data_access',
        details: {
          table_name: tableName,
          record_count: recordCount,
          bulk_access: recordCount > 10
        },
        risk_level: recordCount > 50 ? 'high' : 'medium'
      });
    }
  }, [user, logSecurityEvent]);

  const monitorSuspiciousActivity = useCallback((activity: string, details?: Record<string, any>) => {
    logSecurityEvent({
      type: 'suspicious_activity',
      details: {
        activity,
        ...details
      },
      risk_level: 'high'
    });
  }, [logSecurityEvent]);

  // Monitor page visibility changes for session security
  useEffect(() => {
    let hiddenTime: number | null = null;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        hiddenTime = Date.now();
      } else if (hiddenTime && user) {
        const hiddenDuration = Date.now() - hiddenTime;
        
        // Log if user was away for more than 30 minutes
        if (hiddenDuration > 30 * 60 * 1000) {
          logSecurityEvent({
            type: 'suspicious_activity',
            details: {
              activity: 'long_session_inactive',
              inactive_duration_minutes: Math.round(hiddenDuration / 60000)
            },
            risk_level: 'medium'
          });
        }
        hiddenTime = null;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [user, logSecurityEvent]);

  // Monitor for multiple rapid API calls
  useEffect(() => {
    let apiCallCount = 0;
    let resetTimer: NodeJS.Timeout;

    const monitorApiCalls = () => {
      apiCallCount++;
      
      if (apiCallCount > 20) {
        logSecurityEvent({
          type: 'rate_limit_exceeded',
          details: {
            call_count: apiCallCount,
            time_window: '1_minute'
          },
          risk_level: 'high'
        });
      }

      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        apiCallCount = 0;
      }, 60000); // Reset every minute
    };

    // Listen to fetch requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const [url] = args;
      if (typeof url === 'string' && url.includes('supabase')) {
        monitorApiCalls();
      }
      return originalFetch.apply(this, args);
    };

    return () => {
      window.fetch = originalFetch;
      clearTimeout(resetTimer);
    };
  }, [logSecurityEvent]);

  return {
    logSecurityEvent,
    monitorLoginAttempts,
    monitorDataAccess,
    monitorSuspiciousActivity
  };
};