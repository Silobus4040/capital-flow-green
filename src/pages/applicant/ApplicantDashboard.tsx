import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  MapPin, 
  Calendar, 
  CreditCard,
  AlertCircle,
  CheckCircle,
  FileText,
  MessageSquare
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface LoanStatus {
  id: string;
  loan_amount: number;
  property_address: string;
  loan_program: string;
  status: string;
  status_percentage: number;
  is_funded: boolean;
  estimated_funding_date: string;
  actual_funding_date: string;
  notes: string;
}

export default function ApplicantDashboard() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [loanStatus, setLoanStatus] = useState<LoanStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLoanStatus();
  }, []);

  const fetchLoanStatus = async () => {
    try {
      // For now, create a mock loan status since the table might not exist yet
      const mockLoanStatus: LoanStatus = {
        id: '1',
        loan_amount: 500000,
        property_address: '123 Investment Property Ln, Real Estate City, CA 90210',
        loan_program: 'Commercial Real Estate Loan',
        status: 'underwriting',
        status_percentage: 65,
        is_funded: false,
        estimated_funding_date: '2024-02-15',
        actual_funding_date: '',
        notes: 'Your application is currently under review by our underwriting team. We may need additional documentation soon.'
      };
      
      setLoanStatus(mockLoanStatus);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetupRepayment = () => {
    toast({
      title: 'Setup Failed',
      description: 'Your loan has not been funded yet. Please wait for funding completion.',
      variant: 'destructive'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
      case 'funded':
      case 'completed':
        return 'text-green-600';
      case 'underwriting':
        return 'text-blue-600';
      case 'declined':
        return 'text-red-600';
      default:
        return 'text-yellow-600';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // No loading screen - instant access

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-lg p-6 text-primary-foreground">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {profile?.full_name || 'Borrower'}!
        </h1>
        <p className="text-primary-foreground/80">
          Track your loan progress and manage your application.
        </p>
      </div>

      {!loanStatus ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No loan application found. Please contact your loan officer to set up your loan status.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Loan Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                Loan Progress
              </CardTitle>
              <CardDescription>Current status of your loan application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status</span>
                  <span className={`text-sm font-semibold ${getStatusColor(loanStatus.status)}`}>
                    {formatStatus(loanStatus.status)}
                  </span>
                </div>
                <Progress value={loanStatus.status_percentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {loanStatus.status_percentage}% Complete
                </div>
              </div>
              
              {loanStatus.notes && (
                <div className="mt-4 p-3 bg-accent rounded-md">
                  <p className="text-sm text-accent-foreground">{loanStatus.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Loan Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-primary" />
                Loan Details
              </CardTitle>
              <CardDescription>Your loan information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
                  <p className="font-semibold">
                    ${loanStatus.loan_amount?.toLocaleString() || 'N/A'}
                  </p>
                </div>
              </div>
              
              {loanStatus.property_address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Property Address</p>
                    <p className="font-semibold">{loanStatus.property_address}</p>
                  </div>
                </div>
              )}
              
              {loanStatus.loan_program && (
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Loan Program</p>
                    <p className="font-semibold">{loanStatus.loan_program}</p>
                  </div>
                </div>
              )}
              
              {loanStatus.estimated_funding_date && (
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {loanStatus.is_funded ? 'Funded Date' : 'Estimated Funding'}
                    </p>
                    <p className="font-semibold">
                      {new Date(loanStatus.estimated_funding_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Cards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-primary" />
                Loan Repayment
              </CardTitle>
              <CardDescription>Set up your repayment schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleSetupRepayment}
                className="w-full"
                disabled={!loanStatus.is_funded}
              >
                Setup Loan Repayment
              </Button>
              {!loanStatus.is_funded && (
                <p className="text-xs text-muted-foreground mt-2">
                  Available once your loan is funded
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Loan Officer
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Upload Documents
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Call
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}