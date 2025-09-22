import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Eye, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SecurityAuditLog {
  id: string;
  user_id: string;
  table_name: string;
  operation: string;
  timestamp: string;
  details: any;
  risk_level: string; // Changed from union type to string to match database
}

export const SecurityDashboard = () => {
  const { profile } = useAuth();
  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuditLogs = async () => {
      if (profile?.role !== 'admin') return;

      try {
        const { data, error } = await supabase
          .from('security_audit_logs')
          .select('*')
          .order('timestamp', { ascending: false })
          .limit(50);

        if (error) throw error;
        setAuditLogs(data || []);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuditLogs();
  }, [profile?.role]);

  if (profile?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Admin access required</p>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'critical':
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      case 'medium':
        return <Eye className="h-4 w-4" />;
      case 'low':
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  const criticalLogs = auditLogs.filter(log => log.risk_level === 'critical' || log.risk_level === 'high');
  const recentLogs = auditLogs.slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Security Events</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLogs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Events</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalLogs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan Data Access</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {auditLogs.filter(log => log.table_name === 'loan_program_applications').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Login Attempts</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {auditLogs.filter(log => log.operation === 'login_attempt').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>Latest security audit log entries</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading security logs...</div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {recentLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getRiskIcon(log.risk_level)}
                    <div>
                      <div className="font-medium">{log.operation.replace('_', ' ')}</div>
                      <div className="text-sm text-muted-foreground">
                        {log.table_name} • {new Date(log.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <Badge variant={getRiskColor(log.risk_level)}>
                    {log.risk_level}
                  </Badge>
                </div>
              ))}
              {recentLogs.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No security events recorded yet
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};