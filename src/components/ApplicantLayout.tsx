import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import NewsTicker from './NewsTicker';
import { 
  MessageSquare, 
  LayoutDashboard, 
  FileText, 
  User, 
  LogOut,
  Building2,
  Gavel,
  Calendar,
  DollarSign,
  Shield
} from 'lucide-react';

interface ApplicantLayoutProps {
  children: ReactNode;
}

export default function ApplicantLayout({ children }: ApplicantLayoutProps) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force clear local storage and reload
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    } catch (error) {
      console.error('Sign out error:', error);
      // Force clear even on error
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = '/';
    }
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/applicant-dashboard' },
    { icon: Gavel, label: 'Closing Dashboard', path: '/applicant-closing' },
    { icon: MessageSquare, label: 'Messages', path: '/applicant-messages' },
    { icon: FileText, label: 'Documents', path: '/applicant-documents' },
    { icon: Calendar, label: 'Draw Schedule', path: '/applicant-draw-schedule' },
    { icon: DollarSign, label: 'Repayments', path: '/applicant-repayment' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewsTicker />
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-soft">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">Borrower Portal</h1>
                <p className="text-sm opacity-90">
                  Welcome, {profile?.full_name || profile?.email}
                </p>
              </div>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="ghost" 
              size="sm"
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-64 bg-card border-r border-border">
          <div className="p-4">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}