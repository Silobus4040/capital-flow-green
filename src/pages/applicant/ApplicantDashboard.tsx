import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { DollarSign, MapPin, Calendar, AlertCircle, FileText, MessageSquare, User, TrendingUp } from 'lucide-react';
import LiveBiddingFeed from '@/components/closing/LiveBiddingFeed';
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
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      submitted: { label: 'Under Review', variant: 'secondary' },
      under_review: { label: 'Under Review', variant: 'secondary' },
      pending: { label: 'Under Review', variant: 'secondary' },
      approved: { label: 'Approved', variant: 'default' },
      declined: { label: 'Declined', variant: 'destructive' },
    };
    return statusMap[status] || { label: 'Under Review', variant: 'secondary' };
  };

  const getDayProgress = (createdAt: string) => {
    const days = Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24));
    const capped = Math.min(days, 14);
    return { days: capped, percent: (capped / 14) * 100 };
  };

  const fullAddress = (app: LoanApplication) => {
    return [app.property_address, app.property_city, app.property_state, app.property_zip]
      .filter(Boolean)
      .join(', ');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-0">Welcome, {profile?.full_name || 'Loan Applicant'}!</h1>
      </div>

      {applications.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No applications found. Visit our <a href="/loan-programs" className="text-primary underline">Loan Programs</a> page to submit your first application.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const statusInfo = getStatusDisplay(app.status);
            const progress = getDayProgress(app.created_at);
            const address = fullAddress(app);

            return (
              <Card key={app.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-lg">{app.program_name || 'Loan Application'}</span>
                    <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-start space-x-3">
                      <User className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Borrower Name</p>
                        <p className="font-semibold">{app.borrower_name}</p>
                      </div>
                    </div>

                    {app.requested_amount != null && (
                      <div className="flex items-start space-x-3">
                        <DollarSign className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Loan Amount</p>
                          <p className="font-semibold">${app.requested_amount.toLocaleString()}</p>
                        </div>
                      </div>
                    )}

                    {address && (
                      <div className="flex items-start space-x-3">
                        <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                        <div>
                          <p className="text-xs text-muted-foreground">Property Address</p>
                          <p className="font-semibold text-sm">{address}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start space-x-3">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Program Type</p>
                        <p className="font-semibold text-sm">{app.program_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Day progress removed */}

                  {/* Live Bids for all applications with a requested amount */}
                  {app.requested_amount && (
                    <div className="pt-2">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-sm">Live Investor Bids</span>
                      </div>
                      <LiveBiddingFeed applicationId={app.id} requestedAmount={app.requested_amount} />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <a href="/applicant-messages" className="inline-flex items-center px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                      <MessageSquare className="mr-2 h-4 w-4" />Messages
                    </a>
                    <a href="/applicant-documents" className="inline-flex items-center px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90">
                      <FileText className="mr-2 h-4 w-4" />Documents
                    </a>
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
