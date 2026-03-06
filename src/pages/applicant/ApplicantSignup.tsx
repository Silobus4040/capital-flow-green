import React, { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import ccifLogo from '@/assets/ccif-logo-enhanced.png';

export default function ApplicantSignup() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loanId, setLoanId] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const { signUp, user } = useAuth();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/applicant-dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setVerificationError('');

    try {
      // Step 1: Verify email + Loan ID combo via RPC
      const { data: isValid, error: verifyError } = await supabase.rpc('verify_loan_id', {
        _email: email.trim().toLowerCase(),
        _loan_id: loanId.trim(),
      });

      if (verifyError) {
        setVerificationError('Unable to verify Loan ID. Please try again.');
        setLoading(false);
        return;
      }

      if (!isValid) {
        setVerificationError('Invalid Loan ID or email. Please check your credentials and try again.');
        setLoading(false);
        return;
      }

      // Step 2: Create account with loan_id in metadata
      const { error } = await signUp(email.trim().toLowerCase(), password, fullName, loanId.trim());

      if (error) {
        toast({
          title: 'Signup Failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Account Created!',
          description: 'Please check your email to verify your account before signing in.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center">
            <img src={ccifLogo} alt="CCIF Logo" className="h-14 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Borrower Portal Sign Up</CardTitle>
          <CardDescription className="text-sm">
            Create your account to track your loan application, communicate with your account executive, and manage documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="loanId" className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Loan ID
              </Label>
              <Input
                id="loanId"
                type="text"
                value={loanId}
                onChange={(e) => { setLoanId(e.target.value); setVerificationError(''); }}
                required
                placeholder="e.g. CCIF-2026-0042"
              />
              <p className="text-xs text-muted-foreground">
                Your Loan ID was provided by your account executive.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setVerificationError(''); }}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Create a password (min 6 characters)"
                  minLength={6}
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

            {verificationError && (
              <p className="text-sm text-destructive font-medium">{verificationError}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Verifying & Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/applicant-login" className="text-primary hover:text-primary/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
