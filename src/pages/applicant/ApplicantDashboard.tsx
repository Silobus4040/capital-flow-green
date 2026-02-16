import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DollarSign, MapPin, Calendar, AlertCircle, CheckCircle, FileText, MessageSquare } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LoanApplication {
  id: string;
  borrower_name: string;
  borrower_email: string;
  borrower_phone: string;
  requested_amount?: number;
  property_address?: string;
  program_name?: string;
  status: string;
  created_at: string;
  property_city?: string;
  property_state?: string;
  property_zip?: string;
}

export default function ApplicantDashboard() {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) fetchUserApplications();
  }, [user]);

  const fetchUserApplications = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('loan_program_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setApplications((data || []) as unknown as LoanApplication[]);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({ title: 'Error', description: 'Failed to load your applications', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    const statusMap: { [key: string]: { label: string; color: string } } = {
      'submitted': { label: 'Under Review', color: 'text-blue-600' },
      'under_review': { label: 'Under Review', color: 'text-blue-600' },
      'pending': { label: 'Under Review', color: 'text-blue-600' },
      'approved': { label: 'Approved', color: 'text-green-600' },
      'declined': { label: 'Declined', color: 'text-red-600' },
    };
    return statusMap[status] || { label: 'Under Review', color: 'text-blue-600' };
  };

  if (loading) {
    return (<div className="flex items-center justify-center h-64"><div className="text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div><p>Loading your applications...</p></div></div>);
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {profile?.full_name || 'Borrower'}!</h1>
        <p className="text-primary-foreground/80">Track your loan progress and manage your applications.</p>
      </div>

      {applications.length === 0 ? (
        <Alert><AlertCircle className="h-4 w-4" /><AlertDescription>No applications found. Visit our <a href="/loan-programs" className="text-primary underline">Loan Programs</a> page to submit your first application.</AlertDescription></Alert>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const statusInfo = getStatusDisplay(app.status);
            return (
              <Card key={app.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center"><CheckCircle className="mr-2 h-5 w-5 text-primary" />{app.program_name || 'Loan Application'}</div>
                    <span className={`text-sm font-semibold ${statusInfo.color}`}>{statusInfo.label}</span>
                  </CardTitle>
                  <CardDescription>Submitted on {new Date(app.created_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {app.requested_amount && (
                      <div className="flex items-center space-x-3"><DollarSign className="h-4 w-4 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Loan Amount</p><p className="font-semibold">${app.requested_amount.toLocaleString()}</p></div></div>
                    )}
                    {app.property_address && (
                      <div className="flex items-center space-x-3"><MapPin className="h-4 w-4 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Property</p><p className="font-semibold text-sm">{app.property_address}</p></div></div>
                    )}
                    <div className="flex items-center space-x-3"><FileText className="h-4 w-4 text-muted-foreground" /><div><p className="text-sm text-muted-foreground">Program</p><p className="font-semibold text-sm">{app.program_name}</p></div></div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <a href="/applicant-messages" className="inline-flex items-center px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"><MessageSquare className="mr-2 h-4 w-4" />Messages</a>
                    <a href="/applicant-documents" className="inline-flex items-center px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"><FileText className="mr-2 h-4 w-4" />Documents</a>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
