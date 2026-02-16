import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Users, UserPlus, MessageSquare, Volume2 } from 'lucide-react';

interface Applicant {
  id: string;
  borrower_name: string;
  borrower_email: string;
  program_name: string;
  status: string;
  created_at: string;
  program_specific_data?: any;
}

export default function AdminFeatures() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchApplicants();
    }
  }, [profile]);

  const fetchApplicants = async () => {
    try {
      const { data, error } = await supabase
        .from('loan_program_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplicants(data || []);
    } catch (error) {
      console.error('Error fetching applicants:', error);
    } finally {
      setLoading(false);
    }
  };

  if (profile?.role !== 'admin') return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Recent Applications
          </CardTitle>
          <CardDescription>Overview of recent loan applications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {applicants.slice(0, 5).map((applicant) => (
              <div key={applicant.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{applicant.borrower_name}</p>
                  <p className="text-sm text-muted-foreground">{applicant.program_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{applicant.status}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(applicant.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
