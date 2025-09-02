import { supabase } from '@/integrations/supabase/client';

export interface AuditLogEntry {
  action: string;
  resource: string;
  resource_id?: string;
  details?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

class AuditLogger {
  private static instance: AuditLogger;
  private logs: AuditLogEntry[] = [];

  private constructor() {
    // Flush logs periodically
    setInterval(() => this.flushLogs(), 30000); // Every 30 seconds
  }

  public static getInstance(): AuditLogger {
    if (!AuditLogger.instance) {
      AuditLogger.instance = new AuditLogger();
    }
    return AuditLogger.instance;
  }

  public async logAction(entry: AuditLogEntry): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const enrichedEntry = {
        ...entry,
        user_id: user?.id,
        timestamp: new Date().toISOString(),
        ip_address: entry.ip_address || await this.getClientIP(),
        user_agent: entry.user_agent || navigator.userAgent,
        session_id: this.generateSessionId()
      };

      this.logs.push(enrichedEntry);

      // For critical actions, log immediately
      if (this.isCriticalAction(entry.action)) {
        await this.flushLogs();
      }

      console.log('🔐 AUDIT LOG:', enrichedEntry);
    } catch (error) {
      console.error('Failed to log audit entry:', error);
    }
  }

  private isCriticalAction(action: string): boolean {
    const criticalActions = [
      'LOGIN_ATTEMPT',
      'LOGIN_FAILURE',
      'ROLE_CHANGE',
      'ADMIN_ACCESS',
      'DATA_EXPORT',
      'USER_DELETE',
      'SECURITY_INCIDENT'
    ];
    return criticalActions.includes(action);
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || 'unknown';
    } catch {
      return 'unknown';
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async flushLogs(): Promise<void> {
    if (this.logs.length === 0) return;

    try {
      // In a real implementation, send to audit log service
      // For now, just store in localStorage for demonstration
      const existingLogs = JSON.parse(localStorage.getItem('audit_logs') || '[]');
      const allLogs = [...existingLogs, ...this.logs];
      localStorage.setItem('audit_logs', JSON.stringify(allLogs.slice(-1000))); // Keep last 1000 entries

      console.log(`🔐 Flushed ${this.logs.length} audit log entries`);
      this.logs = [];
    } catch (error) {
      console.error('Failed to flush audit logs:', error);
    }
  }

  public async getAuditLogs(): Promise<AuditLogEntry[]> {
    try {
      return JSON.parse(localStorage.getItem('audit_logs') || '[]');
    } catch {
      return [];
    }
  }
}

export const auditLogger = AuditLogger.getInstance();

// Convenience functions for common audit events
export const logLoginAttempt = (email: string, success: boolean) => {
  auditLogger.logAction({
    action: success ? 'LOGIN_SUCCESS' : 'LOGIN_FAILURE',
    resource: 'auth',
    details: { email, success }
  });
};

export const logAdminAction = (action: string, resource: string, resourceId?: string, details?: any) => {
  auditLogger.logAction({
    action: `ADMIN_${action.toUpperCase()}`,
    resource,
    resource_id: resourceId,
    details
  });
};

export const logSecurityIncident = (incident: string, details?: any) => {
  auditLogger.logAction({
    action: 'SECURITY_INCIDENT',
    resource: 'security',
    details: { incident, ...details }
  });
};