import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { UserCheck, FileText, MessageSquare, Calendar, Volume2, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AssignedClient {
  id: string;
  client_id: string;
  borrower_name: string;
  borrower_email: string;
  borrower_phone: string;
  loan_amount: number;
  status: string;
  created_at: string;
  assignment_status: string;
  assigned_at: string;
}

interface Application {
  id: string;
  borrower_name: string;
  borrower_email: string;
  loan_amount: number;
  status: string;
  created_at: string;
  project_name: string;
}

export default function LoanOfficerDashboard() {
  const [assignedClients, setAssignedClients] = useState<AssignedClient[]>([]);
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();

  const [stats, setStats] = useState({
    assignedClients: 0,
    pendingApplications: 0,
    approvedApplications: 0,
    totalVolume: 0
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      // Load assigned clients
      const { data: assignmentsData } = await supabase
        .from('client_assignments')
        .select('*')
        .eq('loan_officer_id', user.id)
        .eq('status', 'active');

      // Load client details separately
      const clientIds = assignmentsData?.map(a => a.client_id) || [];
      const { data: clientsData } = clientIds.length > 0 ? await supabase
        .from('loan_applications')
        .select('*')
        .in('id', clientIds) : { data: [] };

      // Format assigned clients data
      const formattedClients = assignmentsData?.map(assignment => {
        const client = clientsData?.find(c => c.id === assignment.client_id);
        return {
          id: assignment.id,
          client_id: assignment.client_id,
          borrower_name: client?.borrower_name || 'Unknown',
          borrower_email: client?.borrower_email || '',
          borrower_phone: client?.borrower_phone || '',
          loan_amount: client?.loan_amount || 0,
          status: client?.status || 'pending',
          created_at: client?.created_at || '',
          assignment_status: assignment.status,
          assigned_at: assignment.assigned_at
        };
      }) || [];

      setAssignedClients(formattedClients);

      // If admin, also load all applications
      if (profile?.role === 'admin') {
        const { data: applicationsData } = await supabase
          .from('loan_applications')
          .select('*')
          .order('created_at', { ascending: false });

        setAllApplications(applicationsData || []);
      }

      // Calculate stats
      const pendingCount = formattedClients.filter(c => c.status === 'pending').length;
      const approvedCount = formattedClients.filter(c => c.status === 'approved').length;
      const totalVolume = formattedClients.reduce((sum, c) => sum + (c.loan_amount || 0), 0);

      setStats({
        assignedClients: formattedClients.length,
        pendingApplications: pendingCount,
        approvedApplications: approvedCount,
        totalVolume
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('loan_applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Application status updated successfully'
      });
      
      loadDashboardData();
    } catch (error) {
      console.error('Error updating application status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center">
                <UserCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Loan Officer Dashboard</h1>
                <p className="text-slate-600">Welcome back, {profile?.full_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/tts-test">
                <Button variant="outline" size="sm">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Test TTS
                </Button>
              </Link>
              <Button variant="outline" onClick={signOut}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Clients</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.assignedClients}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.approvedApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalVolume.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="clients" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="clients">My Clients</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Clients</CardTitle>
                <CardDescription>Clients assigned to you for personalized service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignedClients.length === 0 ? (
                    <div className="text-center py-8">
                      <UserCheck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Clients Assigned</h3>
                      <p className="text-muted-foreground">
                        You don't have any clients assigned to you yet. Contact your admin to get started.
                      </p>
                    </div>
                  ) : (
                    assignedClients.map((client) => (
                      <div key={client.id} className="p-4 border rounded-lg bg-white shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{client.borrower_name}</h3>
                            <p className="text-sm text-muted-foreground">
                              Assigned: {new Date(client.assigned_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={client.status === 'approved' ? 'default' : client.status === 'pending' ? 'secondary' : 'destructive'}>
                              {client.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{client.borrower_email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">{client.borrower_phone}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Loan Amount: ${client.loan_amount?.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">
                              Applied: {new Date(client.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateApplicationStatus(client.client_id, 'under_review')}
                            >
                              Review
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => updateApplicationStatus(client.client_id, 'approved')}
                            >
                              Approve
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {profile?.role === 'admin' ? 'All Applications' : 'Application Status'}
                </CardTitle>
                <CardDescription>
                  {profile?.role === 'admin' 
                    ? 'View and manage all loan applications in the system'
                    : 'Track the status of applications for your assigned clients'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(profile?.role === 'admin' ? allApplications : assignedClients).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{app.borrower_name}</p>
                        <p className="text-sm text-muted-foreground">{app.borrower_email}</p>
                        <p className="text-sm">Loan Amount: ${app.loan_amount?.toLocaleString()}</p>
                        {profile?.role === 'admin' && 'project_name' in app && (
                          <p className="text-sm text-muted-foreground">Project: {app.project_name}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={app.status === 'approved' ? 'default' : app.status === 'pending' ? 'secondary' : 'destructive'}>
                          {app.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                          {new Date(app.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Communication Center
                </CardTitle>
                <CardDescription>Connect with your assigned clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Communication Center</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced messaging and communication tools will be available here.
                  </p>
                  <Link to="/tts-test">
                    <Button>
                      <Volume2 className="h-4 w-4 mr-2" />
                      Test Text-to-Speech
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}