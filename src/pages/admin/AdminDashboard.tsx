import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Users, FileText, Settings, BarChart3, Handshake, Volume2, Check, X, Pencil, MessageSquare, Activity, TrendingUp, Download, FolderOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminMessaging from '@/components/AdminMessaging';
import AdminBidManager from '@/components/admin/AdminBidManager';

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

interface BorrowerActivity {
  user_id: string;
  email: string;
  full_name: string | null;
  login_count: number;
  last_login: string | null;
  fingerprint_id: string | null;
  ip_address: string | null;
}

interface AdminDocUpload {
  id: string;
  user_id: string;
  document_name: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  file_type: string | null;
  notes: string | null;
  created_at: string;
  borrower_name?: string;
  borrower_email?: string;
}

export default function AdminDashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [expandedApplications, setExpandedApplications] = useState<Set<string>>(new Set());
  const [editingLoanId, setEditingLoanId] = useState<string | null>(null);
  const [loanIdValue, setLoanIdValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [borrowerActivity, setBorrowerActivity] = useState<BorrowerActivity[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [adminDocs, setAdminDocs] = useState<AdminDocUpload[]>([]);
  const [docsLoading, setDocsLoading] = useState(false);
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

  const loadBorrowerActivity = async () => {
    setActivityLoading(true);
    try {
      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, email, full_name')
        .eq('role', 'borrower');

      const { data: logins } = await supabase
        .from('borrower_logins' as any)
        .select('user_id, fingerprint_id, ip_address, logged_in_at');

      const loginMap: Record<string, { count: number; last: string; fingerprint: string | null; ip: string | null }> = {};
      (logins || []).forEach((l: any) => {
        if (!loginMap[l.user_id]) {
          loginMap[l.user_id] = { count: 0, last: l.logged_in_at, fingerprint: l.fingerprint_id, ip: l.ip_address };
        }
        loginMap[l.user_id].count++;
        if (l.logged_in_at > loginMap[l.user_id].last) {
          loginMap[l.user_id].last = l.logged_in_at;
          loginMap[l.user_id].fingerprint = l.fingerprint_id;
          loginMap[l.user_id].ip = l.ip_address;
        }
      });

      const activity: BorrowerActivity[] = (profiles || []).map((p: any) => ({
        user_id: p.user_id,
        email: p.email,
        full_name: p.full_name,
        login_count: loginMap[p.user_id]?.count || 0,
        last_login: loginMap[p.user_id]?.last || null,
        fingerprint_id: loginMap[p.user_id]?.fingerprint || null,
        ip_address: loginMap[p.user_id]?.ip || null,
      }));

      activity.sort((a, b) => b.login_count - a.login_count);
      setBorrowerActivity(activity);
    } catch (err) {
      console.error('Error loading activity:', err);
    }
    setActivityLoading(false);
  };

  const toggleApplicationDetails = (applicationId: string) => {
    const newExpanded = new Set(expandedApplications);
    if (newExpanded.has(applicationId)) newExpanded.delete(applicationId);
    else newExpanded.add(applicationId);
    setExpandedApplications(newExpanded);
  };

  const saveLoanId = async (applicationId: string) => {
    const { error } = await supabase
      .from('loan_program_applications')
      .update({ loan_id: loanIdValue.trim() || null } as any)
      .eq('id', applicationId);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Loan ID Updated', description: `Loan ID set to "${loanIdValue.trim()}"` });
      setClients(prev => prev.map(c => c.id === applicationId ? { ...c, loan_id: loanIdValue.trim() || undefined } : c));
      setEditingLoanId(null);
    }
  };

  const renderProgramSpecificData = (data: any) => {
    if (!data || typeof data !== 'object') return null;
    return (
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-semibold mb-2">Additional Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(data).map(([key, value]) => {
            if (!value) return null;
            const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            return (<div key={key} className="text-sm"><span className="font-medium text-muted-foreground">{formattedKey}:</span><span className="ml-2">{String(value)}</span></div>);
          })}
        </div>
      </div>
    );
  };

  const isActiveNow = (lastLogin: string | null) => {
    if (!lastLogin) return false;
    return (Date.now() - new Date(lastLogin).getTime()) < 5 * 60 * 1000;
  };

  const loanApplications = clients.filter(c => c.application_type !== 'referral' && c.application_type !== 'contact');
  const referralSignups = clients.filter(c => c.application_type === 'referral');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="border-b bg-background shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-destructive/10 w-10 h-10 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage applications and system settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/admin/term-sheet-generator"><Button variant="default" size="sm" className="bg-primary text-white hover:bg-primary-dark"><FileText className="h-4 w-4 mr-2" />Term Sheet Generator</Button></Link>
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
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="messages" onClick={() => { }}>Messages</TabsTrigger>
            <TabsTrigger value="bidding">Bidding</TabsTrigger>
            <TabsTrigger value="activity" onClick={loadBorrowerActivity}>Activity</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
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
                      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50" onClick={() => toggleApplicationDetails(client.id)}>
                        <div className="flex-1">
                          <p className="font-medium text-lg">{client.borrower_name}</p>
                          <p className="text-sm text-muted-foreground">{client.borrower_email} • {client.borrower_phone}</p>
                          <p className="text-xs text-primary font-medium">Program: {client.program_name}</p>
                          {client.requested_amount && <p className="text-sm font-semibold">Amount: ${client.requested_amount.toLocaleString()}</p>}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                            {editingLoanId === client.id ? (
                              <>
                                <Input value={loanIdValue} onChange={(e) => setLoanIdValue(e.target.value)} placeholder="CCIF-2026-0001" className="h-7 w-40 text-xs" />
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => saveLoanId(client.id)}><Check className="h-3.5 w-3.5 text-green-600" /></Button>
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => setEditingLoanId(null)}><X className="h-3.5 w-3.5 text-destructive" /></Button>
                              </>
                            ) : (
                              <Badge variant={client.loan_id ? 'default' : 'outline'} className="cursor-pointer text-xs" onClick={() => { setEditingLoanId(client.id); setLoanIdValue(client.loan_id || ''); }}>
                                {client.loan_id || <span className="flex items-center gap-1"><Pencil className="h-3 w-3" /> Set Loan ID</span>}
                              </Badge>
                            )}
                          </div>
                          <select
                            className="border rounded px-2 py-1 text-xs bg-background"
                            value={client.status}
                            onClick={(e) => e.stopPropagation()}
                            onChange={async (e) => {
                              const newStatus = e.target.value;
                              const { error } = await supabase
                                .from('loan_program_applications')
                                .update({ status: newStatus } as any)
                                .eq('id', client.id);
                              if (error) {
                                toast({ title: 'Error', description: error.message, variant: 'destructive' });
                              } else {
                                setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: newStatus } : c));
                                toast({ title: 'Status Updated', description: `Set to "${newStatus}"` });
                              }
                            }}
                          >
                            <option value="pending">Under Review</option>
                            <option value="approved">Approved</option>
                            <option value="closing">Closing</option>
                            <option value="funded">Funded</option>
                            <option value="declined">Declined</option>
                          </select>
                          <p className="text-xs text-muted-foreground">{new Date(client.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {expandedApplications.has(client.id) && (
                        <div className="border-t p-4 bg-muted/30">
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

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><MessageSquare className="h-5 w-5 mr-2" />Borrower Messaging</CardTitle>
                <CardDescription>Send text and voice messages to borrowers</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminMessaging />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bidding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><TrendingUp className="h-5 w-5 mr-2" />Investor Bid Management</CardTitle>
                <CardDescription>Manage up to 9 investor bids per application</CardDescription>
              </CardHeader>
              <CardContent>
                <AdminBidManager />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Activity className="h-5 w-5 mr-2" />Borrower Activity</CardTitle>
                <CardDescription>Login tracking and device fingerprints</CardDescription>
              </CardHeader>
              <CardContent>
                {activityLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading activity...</div>
                ) : borrowerActivity.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">No borrower logins recorded yet.</div>
                ) : (
                  <div className="space-y-3">
                    {borrowerActivity.map(b => (
                      <div key={b.user_id} className="border rounded-lg p-4 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{b.full_name || b.email}</p>
                            {isActiveNow(b.last_login) && (
                              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active Now
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{b.email}</p>
                          {b.fingerprint_id && <p className="text-xs text-muted-foreground font-mono">FP: {b.fingerprint_id.slice(0, 12)}...</p>}
                          {b.ip_address && <p className="text-xs text-muted-foreground font-mono">IP: {b.ip_address}</p>}
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{b.login_count}</p>
                          <p className="text-xs text-muted-foreground">logins</p>
                          {b.last_login && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Last: {new Date(b.last_login).toLocaleString()}
                            </p>
                          )}
                        </div>
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
                        <p className="text-xs text-primary">{client.program_name}</p>
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
