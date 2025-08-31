import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
  const [loadingTimeout, setLoadingTimeout] = useState(false);

  // Add timeout for stuck loading states
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        console.warn('🔐 ProtectedRoute: Loading timeout reached');
        setLoadingTimeout(true);
      }, 10000); // 10 second timeout

      return () => clearTimeout(timer);
    }
  }, [loading]);

  console.log('🔐 ProtectedRoute state:', { loading, user: !!user, profile: !!profile, allowedRoles });

  if (loading && !loadingTimeout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (loadingTimeout) {
    console.error('🔐 ProtectedRoute: Loading timeout - redirecting to login');
    return <Navigate to={redirectTo} replace />;
  }

  if (!user) {
    console.log('🔐 ProtectedRoute: No user - redirecting to login');
    return <Navigate to={redirectTo} replace />;
  }

  // Wait for profile to load before checking roles, but with timeout
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-sm text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Check if user has required role
  console.log('🔐 ProtectedRoute: Checking role access:', { userRole: profile.role, allowedRoles });
  
  if (!allowedRoles.includes(profile.role as any)) {
    console.warn('🔐 ProtectedRoute: Access denied for role:', profile.role);
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
          <p className="text-sm text-muted-foreground mt-2">Your role: {profile.role}</p>
        </div>
      </div>
    );
  }

  console.log('🔐 ProtectedRoute: Access granted, rendering children');

  return <>{children}</>;
};