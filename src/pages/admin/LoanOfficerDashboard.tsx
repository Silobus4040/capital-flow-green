import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { UserCheck, FileText, Calendar, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoanOfficerDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) loadDashboardData();
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const { data } = await supabase
        .from('loan_program_applications')
        .select('*')
        .order('created_at', { ascending: false });
      setApplications(data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({ title: 'Error', description: 'Failed to load dashboard data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center"><UserCheck className="h-5 w-5 text-blue-600" /></div>
              <div><h1 className="text-2xl font-bold text-slate-900">Loan Officer Dashboard</h1><p className="text-slate-600">Welcome back, {profile?.full_name}</p></div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/tts-test"><Button variant="outline" size="sm"><Volume2 className="h-4 w-4 mr-2" />Test TTS</Button></Link>
              <Button variant="outline" onClick={signOut}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Applications</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{applications.length}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle><Calendar className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{applications.filter(a => a.status === 'pending').length}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Approved</CardTitle><UserCheck className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{applications.filter(a => a.status === 'approved').length}</div></CardContent></Card>
        </div>

        <Card>
          <CardHeader><CardTitle>All Applications</CardTitle><CardDescription>View and manage loan applications</CardDescription></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div><p className="font-medium">{app.borrower_name}</p><p className="text-sm text-muted-foreground">{app.borrower_email}</p><p className="text-xs text-blue-600">{app.program_name}</p></div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={app.status === 'approved' ? 'default' : app.status === 'pending' ? 'secondary' : 'destructive'}>{app.status}</Badge>
                    <p className="text-xs text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
