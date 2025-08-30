import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('borrower' | 'loan_officer' | 'admin' | 'user')[];
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = ['borrower', 'loan_officer', 'admin', 'user'],
  redirectTo = '/applicant-login'
}: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Wait for profile to load before checking roles
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user has required role
  if (!allowedRoles.includes(profile.role as any)) {
    // Prevent infinite redirects by checking current location
    const currentPath = window.location.pathname;
    if (currentPath !== '/applicant-dashboard' && currentPath !== '/applicant-login') {
      return <Navigate to="/applicant-dashboard" replace />;
    }
    // If already on dashboard or login, show access denied
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};