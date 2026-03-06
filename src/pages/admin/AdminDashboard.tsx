import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Users, FileText, Settings, BarChart3, Handshake, Volume2, Check, X, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Client {
  id: string;
  borrower_name: string;
  borrower_email: string;
  borrower_phone?: string;
  requested_amount?: number;
  status: string;
  created_at: string;
  program_name?: string;
  application_type?: string;
  property_address?: string;
  property_city?: string;
  property_state?: string;
  property_zip?: string;
  loan_purpose?: string;
  program_specific_data?: any;
  loan_id?: string;
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [expandedApplications, setExpandedApplications] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    totalReferrals: 0,
    totalContacts: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const { data: applicationsData, error } = await supabase
        .from('loan_program_applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading data:', error);
        toast({ title: 'Error', description: 'Failed to load dashboard data', variant: 'destructive' });
        return;
      }

      const allApps = applicationsData || [];
      setClients(allApps);

      const loanApps = allApps.filter(a => a.application_type !== 'referral' && a.application_type !== 'contact');
      const referrals = allApps.filter(a => a.application_type === 'referral');
      const contacts = allApps.filter(a => a.application_type === 'contact');

      setStats({
        totalApplications: loanApps.length,
        pendingApplications: loanApps.filter(c => c.status === 'pending').length,
        totalReferrals: referrals.length,
        totalContacts: contacts.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleApplicationDetails = (applicationId: string) => {
    const newExpanded = new Set(expandedApplications);
    if (newExpanded.has(applicationId)) newExpanded.delete(applicationId);
    else newExpanded.add(applicationId);
    setExpandedApplications(newExpanded);
  };

  const renderProgramSpecificData = (data: any) => {
    if (!data || typeof data !== 'object') return null;
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2 text-gray-800">Additional Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(data).map(([key, value]) => {
            if (!value) return null;
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            return (<div key={key} className="text-sm"><span className="font-medium text-gray-600">{formattedKey}:</span><span className="ml-2 text-gray-800">{String(value)}</span></div>);
          })}
        </div>
      </div>
    );
  };

  const loanApplications = clients.filter(c => c.application_type !== 'referral' && c.application_type !== 'contact');
  const referralSignups = clients.filter(c => c.application_type === 'referral');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-red-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-slate-600">Manage applications and system settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/tts-test"><Button variant="outline" size="sm"><Volume2 className="h-4 w-4 mr-2" />Test TTS</Button></Link>
              <Button variant="outline" onClick={signOut}>Logout</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Loan Applications</CardTitle><FileText className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalApplications}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Pending</CardTitle><BarChart3 className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.pendingApplications}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Referrals</CardTitle><Handshake className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalReferrals}</div></CardContent></Card>
          <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Contact Inquiries</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{stats.totalContacts}</div></CardContent></Card>
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="all">All Submissions</TabsTrigger>
          </TabsList>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>Loan Applications</CardTitle><CardDescription>View and manage all loan applications</CardDescription></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loanApplications.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">No loan applications yet.</div>
                  ) : loanApplications.map((client) => (
                    <div key={client.id} className="border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleApplicationDetails(client.id)}>
                        <div className="flex-1">
                          <p className="font-medium text-lg">{client.borrower_name}</p>
                          <p className="text-sm text-muted-foreground">{client.borrower_email} • {client.borrower_phone}</p>
                          <p className="text-xs text-blue-600 font-medium">Program: {client.program_name}</p>
                          {client.requested_amount && <p className="text-sm font-semibold">Amount: ${client.requested_amount.toLocaleString()}</p>}
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={client.status === 'approved' ? 'default' : client.status === 'pending' ? 'secondary' : 'destructive'}>{client.status}</Badge>
                          <p className="text-xs text-muted-foreground">{new Date(client.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {expandedApplications.has(client.id) && (
                        <div className="border-t p-4 bg-gray-50">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {client.property_address && <p><span className="font-medium">Property:</span> {client.property_address}{client.property_city && `, ${client.property_city}`}{client.property_state && `, ${client.property_state}`}</p>}
                            {client.loan_purpose && <p><span className="font-medium">Purpose:</span> {client.loan_purpose}</p>}
                          </div>
                          {client.program_specific_data && renderProgramSpecificData(client.program_specific_data)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center"><Handshake className="h-5 w-5 mr-2" />Referral Program Signups</CardTitle></CardHeader>
              <CardContent>
                {referralSignups.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground"><Handshake className="h-12 w-12 mx-auto mb-4 opacity-50" /><p>No referral signups yet.</p></div>
                ) : (
                  <div className="space-y-3">
                    {referralSignups.map((referral) => (
                      <div key={referral.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div><p className="font-medium text-lg">{referral.borrower_name}</p><p className="text-sm text-muted-foreground">{referral.borrower_email}</p><p className="text-sm text-muted-foreground">{referral.borrower_phone}</p></div>
                          <div className="text-right">
                            <Badge variant="secondary">{referral.program_specific_data?.brokerType || 'Referral'}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">{new Date(referral.created_at).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {referral.property_address && <p className="text-sm text-muted-foreground mt-2">{referral.property_address}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <Card>
              <CardHeader><CardTitle>All Submissions</CardTitle><CardDescription>Every submission across all forms</CardDescription></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{client.borrower_name}</p>
                        <p className="text-sm text-muted-foreground">{client.borrower_email}</p>
                        <p className="text-xs text-blue-600">{client.program_name}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{client.application_type || 'loan'}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{new Date(client.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
