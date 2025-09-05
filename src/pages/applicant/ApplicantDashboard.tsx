import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  MapPin, 
  Calendar, 
  AlertCircle,
  CheckCircle,
  FileText,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LoanApplication {
  id: string;
  borrower_name: string;
  borrower_email: string;
  borrower_phone: string;
  loan_amount?: number;
  requested_amount?: number;
  property_address?: string;
  loan_program?: string;
  program_name?: string;
  status: string;
  created_at: string;
  project_name?: string;
  property_city?: string;
  property_state?: string;
  property_zip?: string;
  type?: 'loan_application' | 'program_application';
}

export default function ApplicantDashboard() {
  const { profile, user } = useAuth();
  const { toast } = useToast();
  const [applications, setApplications] = useState<LoanApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserApplications();
    }
  }, [user]);

  const fetchUserApplications = async () => {
    if (!user) return;

    try {
      // Fetch from loan_applications table
      const { data: loanApps } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Fetch from loan_program_applications table  
      const { data: programApps } = await supabase
        .from('loan_program_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      // Combine and normalize the data
      const allApps = [
        ...(loanApps || []).map(app => ({
          ...app,
          type: 'loan_application' as const,
          loan_program: app.loan_program || 'Loan Application'
        })),
        ...(programApps || []).map(app => ({
          ...app,
          type: 'program_application' as const,
          loan_amount: app.requested_amount,
          loan_program: app.program_name || 'Program Application'
        }))
      ];

      setApplications(allApps);
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your applications',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusDisplay = (status: string) => {
    const statusMap: { [key: string]: { label: string; color: string } } = {
      'submitted': { label: 'Loan Application Under Review', color: 'text-blue-600' },
      'under_review': { label: 'Loan Application Under Review', color: 'text-blue-600' },
      'pending': { label: 'Loan Application Under Review', color: 'text-blue-600' },
      'approved': { label: 'Approved - Ready for Funding', color: 'text-green-600' },
      'funded': { label: 'Funded Successfully', color: 'text-green-600' },
      'declined': { label: 'Application Declined', color: 'text-red-600' },
      'needs_info': { label: 'Additional Information Required', color: 'text-yellow-600' }
    };
    
    return statusMap[status] || { label: 'Loan Application Under Review', color: 'text-blue-600' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {profile?.full_name || 'Borrower'}!
        </h1>
        <p className="text-primary-foreground/80">
          Track your loan progress and manage your applications.
        </p>
      </div>

      {applications.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No loan applications found. Visit our <a href="/loan-programs" className="text-primary underline">Loan Programs</a> page to submit your first application.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => {
            const statusInfo = getStatusDisplay(app.status);
            const displayAddress = app.property_address || 
              (app.property_city && app.property_state ? 
                `${app.property_city}, ${app.property_state}${app.property_zip ? ' ' + app.property_zip : ''}` : 
                'Property address not provided');

            return (
              <Card key={app.id} className="w-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                      {app.program_name || app.loan_program || 'Loan Application'}
                    </div>
                    <span className={`text-sm font-semibold ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Application submitted on {new Date(app.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {(app.loan_amount || app.requested_amount) && (
                      <div className="flex items-center space-x-3">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Loan Amount</p>
                          <p className="font-semibold">
                            ${(app.loan_amount || app.requested_amount)?.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Property Address</p>
                        <p className="font-semibold text-sm">{displayAddress}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Loan Program</p>
                        <p className="font-semibold text-sm">{app.program_name || app.loan_program}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <a 
                      href="/applicant-messages" 
                      className="inline-flex items-center px-3 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message Center
                    </a>
                    <a 
                      href="/applicant-documents" 
                      className="inline-flex items-center px-3 py-2 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Upload Documents
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