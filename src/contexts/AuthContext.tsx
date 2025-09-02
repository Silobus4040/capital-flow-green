import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name?: string;
  phone?: string;
  role: 'borrower' | 'loan_officer' | 'admin';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  adminSignIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileFetched, setProfileFetched] = useState(false);

  const fetchProfile = async (userId: string, userEmail: string, userMetadata: any) => {
    if (profileFetched) return; // Prevent duplicate fetches
    
    try {
      console.log('🔐 Fetching profile for user:', userId);
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('🔐 Profile fetch error:', error);
        console.warn('🚨 SECURITY: Profile fetch failed - user should re-authenticate');
        // SECURITY FIX: Never fallback to admin role, always use borrower as default
        setProfile({
          id: userId,
          user_id: userId,
          email: userEmail || '',
          full_name: userMetadata?.full_name || userEmail,
          role: 'borrower' // Always fallback to borrower role for security
        } as Profile);
      } else if (profileData) {
        console.log('🔐 Profile loaded:', profileData);
        setProfile(profileData as Profile);
      } else {
        console.log('🔐 No profile found, creating default profile');
        setProfile({
          id: userId,
          user_id: userId,
          email: userEmail || '',
          full_name: userMetadata?.full_name || userEmail,
          role: 'borrower'
        } as Profile);
      }
    } catch (error) {
      console.error('🔐 Profile fetch failed:', error);
      // Create fallback profile on any error
      setProfile({
        id: userId,
        user_id: userId,
        email: userEmail || '',
        full_name: userMetadata?.full_name || userEmail,
        role: 'borrower'
      } as Profile);
    } finally {
      setProfileFetched(true);
      setLoading(false);
      console.log('🔐 Auth initialization complete');
    }
  };

  useEffect(() => {
    console.log('🔐 AuthProvider: Setting up auth state listener');
    
    // ADMIN EMAIL LIST for instant access
    const ADMIN_EMAILS = ['sundrycapitalsolutions@gmail.com'];
    
    // Set up auth state listener FIRST - MUST BE SYNCHRONOUS
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('🔐 Auth state changed:', event, 'User:', session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // INSTANT ADMIN PROFILE for known admin emails
          if (ADMIN_EMAILS.includes(session.user.email || '')) {
            console.log('🔐 INSTANT ADMIN ACCESS for:', session.user.email);
            setProfile({
              id: session.user.id,
              user_id: session.user.id,
              email: session.user.email || '',
              full_name: session.user.user_metadata?.full_name || session.user.email,
              role: 'admin'
            } as Profile);
            setProfileFetched(true);
            setLoading(false);
          } else {
            // Non-admin users: defer profile loading to prevent blocking
            setTimeout(() => {
              if (!profileFetched) {
                fetchProfile(session.user.id, session.user.email || '', session.user.user_metadata);
              }
            }, 0);
          }
        } else {
          console.log('🔐 No user session, clearing state');
          setProfile(null);
          setProfileFetched(false);
          setLoading(false);
        }
      }
    );

    // Get initial session AFTER setting up listener
    console.log('🔐 Checking for existing session...');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('🔐 Initial session check:', session?.user?.email || 'no session');
      if (!session) {
        // No session - clear everything and stop loading
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
      // If session exists, the auth state change handler will process it
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/applicant-dashboard`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!error && data.user) {
        // INSTANT ACCESS FIX: Don't wait for profile loading
        // Set user immediately for instant access
        setUser(data.user);
        setSession(data.session);
        
        // Fetch profile in background without blocking
        setTimeout(async () => {
          setProfileFetched(false);
          await fetchProfile(data.user.id, data.user.email || '', data.user.user_metadata);
        }, 0);
      }
      
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const adminSignIn = async (email: string, password: string) => {
    console.log('🔐 ADMIN SIGN IN STARTED:', email);
    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (!error && data.user) {
        console.log('🔐 ADMIN AUTH SUCCESS in', Date.now() - startTime + 'ms');
        
        // INSTANT ADMIN ACCESS - No profile loading delays
        setUser(data.user);
        setSession(data.session);
        setProfile({
          id: data.user.id,
          user_id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || data.user.email,
          role: 'admin'
        } as Profile);
        setProfileFetched(true);
        setLoading(false);
        
        console.log('🔐 ADMIN SIGN IN COMPLETE in', Date.now() - startTime + 'ms');
      }
      
      return { error };
    } catch (err) {
      console.error('🔐 ADMIN SIGN IN ERROR:', err);
      setLoading(false);
      return { error: err };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const redirectUrl = `${window.location.origin}/applicant-login?reset=true`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });
    
    return { error };
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    adminSignIn,
    signOut,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};