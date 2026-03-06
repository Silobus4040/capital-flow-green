import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { trackLogin } from '@/hooks/useLoginTracking';

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
  signUp: (email: string, password: string) => Promise<{ error: any }>;
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
    if (profileFetched) return;
    
    try {
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Profile fetch error:', error);
        setProfile({
          id: userId, user_id: userId, email: userEmail || '',
          full_name: userMetadata?.full_name || userEmail, role: 'borrower'
        } as Profile);
      } else if (profileData) {
        setProfile(profileData as unknown as Profile);
      } else {
        setProfile({
          id: userId, user_id: userId, email: userEmail || '',
          full_name: userMetadata?.full_name || userEmail, role: 'borrower'
        } as Profile);
      }
    } catch (error) {
      console.error('Profile fetch failed:', error);
      setProfile({
        id: userId, user_id: userId, email: userEmail || '',
        full_name: userMetadata?.full_name || userEmail, role: 'borrower'
      } as Profile);
    } finally {
      setProfileFetched(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            if (!profileFetched) {
              fetchProfile(session.user.id, session.user.email || '', session.user.user_metadata);
            }
          }, 0);
        } else {
          setProfile(null);
          setProfileFetched(false);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email, password,
      options: {
        emailRedirectTo: `${window.location.origin}/applicant-dashboard`,
      }
    });
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        setUser(data.user);
        setSession(data.session);
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
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error && data.user) {
        setUser(data.user);
        setSession(data.session);
        setTimeout(async () => {
          setProfileFetched(false);
          await fetchProfile(data.user.id, data.user.email || '', data.user.user_metadata);
        }, 0);
      }
      return { error };
    } catch (err) {
      setLoading(false);
      return { error: err };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/applicant-login?reset=true`
    });
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, adminSignIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
