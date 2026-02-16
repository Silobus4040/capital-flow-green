import { useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface SecurityEvent {
  type: 'login_attempt' | 'data_access' | 'suspicious_activity' | 'rate_limit_exceeded';
  details?: Record<string, any>;
  risk_level?: 'low' | 'medium' | 'high' | 'critical';
}

export const useSecurityMonitoring = () => {
  const { user, profile } = useAuth();

  const logSecurityEvent = useCallback(async (event: SecurityEvent) => {
    console.log('Security event:', event.type, event.details);
  }, []);

  const monitorLoginAttempts = useCallback(() => {
    if (user) {
      logSecurityEvent({ type: 'login_attempt', details: { success: true, user_id: user.id }, risk_level: 'low' });
    }
  }, [user, logSecurityEvent]);

  const monitorDataAccess = useCallback((tableName: string, recordCount?: number) => {
    if (user && recordCount && recordCount > 10) {
      logSecurityEvent({ type: 'data_access', details: { table_name: tableName, record_count: recordCount }, risk_level: recordCount > 50 ? 'high' : 'medium' });
    }
  }, [user, logSecurityEvent]);

  const monitorSuspiciousActivity = useCallback((activity: string, details?: Record<string, any>) => {
    logSecurityEvent({ type: 'suspicious_activity', details: { activity, ...details }, risk_level: 'high' });
  }, [logSecurityEvent]);

  return { logSecurityEvent, monitorLoginAttempts, monitorDataAccess, monitorSuspiciousActivity };
};
