import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [mode, setMode] = useState<'request' | 'update' | 'checking'>('checking');
  const [errorMsg, setErrorMsg] = useState('');
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase puts recovery tokens in the URL hash: #access_token=...&type=recovery
    const hash = window.location.hash;
    const search = window.location.search;

    // Check for error in hash or query (e.g., otp_expired)
    const params = new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : '');
    const queryParams = new URLSearchParams(search);
    const errCode = params.get('error_code') || queryParams.get('error_code');
    const errDesc = params.get('error_description') || queryParams.get('error_description');

    if (errCode) {
      setErrorMsg(
        errCode === 'otp_expired'
          ? 'This reset link has expired. Please request a new one below.'
          : (errDesc || 'Invalid or expired reset link. Please request a new one.').replace(/\+/g, ' ')
      );
      setMode('request');
      // Clean the URL
      window.history.replaceState({}, '', '/reset-password');
      return;
    }

    // Detect recovery session
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (session && params.get('type') === 'recovery')) {
        setMode('update');
      }
    });

    // Also check existing session in case event already fired
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (params.get('type') === 'recovery' || (session && hash.includes('type=recovery'))) {
        setMode('update');
      } else if (mode === 'checking') {
        setMode('request');
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await resetPassword(email);
      if (error) {
        toast({ title: 'Reset Failed', description: error.message, variant: 'destructive' });
      } else {
        setSent(true);
        toast({ title: 'Reset Email Sent', description: 'Check your email for the reset link.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast({ title: 'Password too short', description: 'Use at least 8 characters.', variant: 'destructive' });
      return;
    }
    if (password !== confirmPassword) {
      toast({ title: 'Passwords do not match', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast({ title: 'Update failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Password updated', description: 'You can now sign in with your new password.' });
      await supabase.auth.signOut();
      setTimeout(() => navigate('/applicant-login'), 800);
    }
  };

  if (mode === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (mode === 'update') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Set New Password</CardTitle>
            <CardDescription>Enter and confirm your new password below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm Password</Label>
                <Input
                  id="confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  placeholder="Re-enter your new password"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? 'Updating…' : 'Update Password'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/20 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Check Your Email</CardTitle>
            <CardDescription>We've sent password reset instructions to {email}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Click the link in the email to set a new password. The link expires after a short time — use it promptly.
            </p>
            <Link to="/applicant-login">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sign In
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Reset Password</CardTitle>
          <CardDescription>Enter your email address and we'll send you a reset link</CardDescription>
        </CardHeader>
        <CardContent>
          {errorMsg && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/30 text-sm text-destructive">
              {errorMsg}
            </div>
          )}
          <form onSubmit={handleRequest} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
              {loading ? 'Sending…' : 'Send Reset Email'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/applicant-login" className="text-sm text-primary hover:text-primary/80 flex items-center justify-center">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
