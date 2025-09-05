import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Users, UserPlus, MessageSquare, FileText, Settings, BarChart3, UserCheck, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface Client {
  id: string;
  borrower_name: string;
  borrower_email: string;
  loan_amount: number;
  status: string;
  created_at: string;
  type?: string;
  project_name?: string;
}

interface Assignment {
  id: string;
  loan_officer_id: string;
  client_id: string;
  status: string;
  assigned_at: string;
  officer_name: string;
  client_name: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('loan_officer');
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedOfficer, setSelectedOfficer] = useState('');
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();
  const { toast } = useToast();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalClients: 0,
    totalApplications: 0,
    pendingApplications: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      // Load clients (loan applications and program applications)
      const { data: clientsData } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: false });

      // Load loan program applications
      const { data: programApplicationsData } = await supabase
        .from('loan_program_applications')
        .select('*')
        .order('created_at', { ascending: false });

      // Load assignments - simplified approach
      const { data: assignmentsData } = await supabase
        .from('client_assignments')
        .select('*')
        .order('assigned_at', { ascending: false });

      // Load referral signups for admin dashboard
      const { data: referralData } = await supabase
        .from('referral_signups')
        .select('*')
        .order('created_at', { ascending: false });

      // Load contact submissions for admin dashboard 
      const { data: contactData } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      setUsers(usersData || []);
      
      // Combine both types of applications
      const allApplications = [
        ...(clientsData || []).map(app => ({ ...app, type: 'loan_application' })),
        ...(programApplicationsData || []).map(app => ({ 
          ...app, 
          type: 'program_application',
          loan_amount: app.requested_amount,
          project_name: app.program_name
        }))
      ];
      setClients(allApplications);
      
      // Format assignments data with manual lookups
      const formattedAssignments = assignmentsData?.map(assignment => {
        const officer = usersData?.find(u => u.id === assignment.loan_officer_id);
        const client = clientsData?.find(c => c.id === assignment.client_id);
        return {
          ...assignment,
          officer_name: officer?.full_name || 'Unknown',
          client_name: client?.borrower_name || 'Unknown'
        };
      }) || [];
      setAssignments(formattedAssignments);

      // Calculate stats
      setStats({
        totalUsers: usersData?.length || 0,
        totalClients: allApplications?.length || 0,
        totalApplications: allApplications?.length || 0,
        pendingApplications: allApplications?.filter(c => c.status === 'pending').length || 0
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

  const generatePassword = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const createLoanOfficer = async () => {
    if (!newUserEmail || !newUserName) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        variant: 'destructive'
      });
      return;
    }

    const generatedPassword = generatePassword();

    try {
      // Create the actual user account in Supabase
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: newUserEmail,
        password: generatedPassword,
        email_confirm: true,
        user_metadata: {
          full_name: newUserName
        }
      });

      if (createError) {
        throw new Error(`Failed to create user: ${createError.message}`);
      }

      // Update the user's profile with the correct role
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          role: newUserRole,
          full_name: newUserName
        })
        .eq('user_id', newUser.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      }

      toast({
        title: 'User Created Successfully',
        description: (
          <div className="space-y-2">
            <p>New {newUserRole} account created:</p>
            <p><strong>Email:</strong> {newUserEmail}</p>
            <p><strong>Temporary Password:</strong> {generatedPassword}</p>
            <p>Credentials copied to clipboard. Direct them to /loan-officer-login</p>
          </div>
        ),
        duration: 15000
      });
      
      // Copy to clipboard
      navigator.clipboard.writeText(`Email: ${newUserEmail}\nPassword: ${generatedPassword}\nLogin: ${window.location.origin}/loan-officer-login`);
      
      setNewUserEmail('');
      setNewUserName('');
      setNewUserRole('loan_officer');
      
      // Reload dashboard data to show the new user
      loadDashboardData();
      
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create user',
        variant: 'destructive'
      });
    }
  };

  const updateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'User role updated successfully'
      });
      
      loadDashboardData();
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive'
      });
    }
  };

  const assignClientToOfficer = async () => {
    if (!selectedClient || !selectedOfficer) {
      toast({
        title: 'Error',
        description: 'Please select both a client and loan officer',
        variant: 'destructive'
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('client_assignments')
        .insert({
          loan_officer_id: selectedOfficer,
          client_id: selectedClient,
          assigned_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Client assigned to loan officer successfully'
      });
      
      setSelectedClient('');
      setSelectedOfficer('');
      loadDashboardData();
    } catch (error) {
      console.error('Error assigning client:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign client',
        variant: 'destructive'
      });
    }
  };

  // No loading screen - instant access

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
                <p className="text-slate-600">Manage users, clients, and system settings</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/tts-test">
                <Button variant="outline" size="sm">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Test TTS
                </Button>
              </Link>
              <Link to="/loan-officer-dashboard">
                <Button variant="outline" size="sm">
                  Officer Portal
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
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClients}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApplications}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="clients">Client Management</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create New User */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Create New User
                  </CardTitle>
                  <CardDescription>
                    Add new loan officers or admins to the system
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      placeholder="user@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={newUserRole} onValueChange={setNewUserRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="loan_officer">Loan Officer</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => {
                      const password = generatePassword();
                      navigator.clipboard.writeText(password);
                      toast({
                        title: 'Password Generated',
                        description: `Generated password: ${password} (copied to clipboard)`,
                        duration: 5000
                      });
                    }} variant="outline" className="flex-1">
                      Generate Password
                    </Button>
                    <Button onClick={createLoanOfficer} className="flex-1">
                      Create User
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Users List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage user roles and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.full_name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user.role === 'admin' ? 'destructive' : user.role === 'loan_officer' ? 'default' : 'secondary'}>
                            {user.role}
                          </Badge>
                          <Select 
                            value={user.role} 
                            onValueChange={(newRole) => updateUserRole(user.id, newRole)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="borrower">Borrower</SelectItem>
                              <SelectItem value="loan_officer">Loan Officer</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Client Applications</CardTitle>
                <CardDescription>View and manage all loan applications</CardDescription>
              </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {clients.map((client) => (
                      <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <p className="font-medium">{client.borrower_name}</p>
                          <p className="text-sm text-muted-foreground">{client.borrower_email}</p>
                          <p className="text-sm">Loan Amount: ${client.loan_amount?.toLocaleString()}</p>
                          <p className="text-xs text-blue-600 font-medium">
                            {client.type === 'loan_application' ? 'Loan Application' : `Loan Application - ${client.project_name}`}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={client.status === 'approved' ? 'default' : client.status === 'pending' ? 'secondary' : 'destructive'}>
                            {client.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {new Date(client.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Assignment */}
              <Card>
                <CardHeader>
                  <CardTitle>Assign Client to Loan Officer</CardTitle>
                  <CardDescription>Connect clients with loan officers for personalized service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Client</Label>
                    <Select value={selectedClient} onValueChange={setSelectedClient}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.borrower_name} - ${client.loan_amount?.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Loan Officer</Label>
                    <Select value={selectedOfficer} onValueChange={setSelectedOfficer}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a loan officer" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.filter(u => u.role === 'loan_officer').map((officer) => (
                          <SelectItem key={officer.id} value={officer.id}>
                            {officer.full_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={assignClientToOfficer} className="w-full">
                    Create Assignment
                  </Button>
                </CardContent>
              </Card>

              {/* Current Assignments */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Assignments</CardTitle>
                  <CardDescription>Active client-officer assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{assignment.client_name}</p>
                            <p className="text-sm text-muted-foreground">→ {assignment.officer_name}</p>
                            <p className="text-xs text-muted-foreground">
                              Assigned: {new Date(assignment.assigned_at).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant={assignment.status === 'active' ? 'default' : 'secondary'}>
                            {assignment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Message Center
                </CardTitle>
                <CardDescription>Communicate with clients and manage conversations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Message Center Coming Soon</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced messaging functionality with text-to-speech will be available here.
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