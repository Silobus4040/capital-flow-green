import React, { useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ShieldCheck, AlertCircle, Info, Mail, Lock, KeyRound } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import ccifLogo from '@/assets/ccif-logo-enhanced.png';

type SignupStep = 'credentials' | 'otp' | 'loan-id';

export default function ApplicantSignup() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<SignupStep>('credentials');
  const [email, setEmail] = useState(searchParams.get('email') || '');
  const [password, setPassword] = useState('');
  const [loanId, setLoanId] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/applicant-dashboard" replace />;
  }

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/applicant-dashboard`,
        }
      });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setStep('otp');
        toast({
          title: 'Verification Code Sent',
          description: 'Please check your email for a 6-digit verification code.',
        });
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: otpCode,
        type: 'signup',
      });

      if (error) {
        setErrorMessage('Invalid or expired verification code. Please try again.');
      } else {
        setStep('loan-id');
        toast({
          title: 'Email Verified!',
          description: 'Now enter your Loan ID to link your application.',
        });
      }
    } catch {
      setErrorMessage('Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoanIdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const normalizedEmail = email.trim().toLowerCase();

      // Verify Loan ID
      const { data: isValid, error: verifyError } = await supabase.rpc('verify_loan_id', {
        _email: normalizedEmail,
        _loan_id: loanId.trim(),
      });

      if (verifyError || !isValid) {
        setErrorMessage('Invalid Loan ID or email combination. Please check your credentials and try again.');
        setLoading(false);
        return;
      }

      // Get display name from the loan application
      const { data: displayName } = await (supabase.rpc as any)('get_borrower_display_name', {
        _email: normalizedEmail,
        _loan_id: loanId.trim(),
      });

      // Update user metadata with loan_id and display name
      await supabase.auth.updateUser({
        data: {
          loan_id: loanId.trim(),
          borrower_display_name: displayName || normalizedEmail,
        }
      });

      // Update profile with the correct name
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        await supabase
          .from('profiles')
          .update({ full_name: displayName || normalizedEmail })
          .eq('user_id', currentUser.id);

        // Link the application
        await supabase
          .from('loan_program_applications')
          .update({ user_id: currentUser.id })
          .eq('borrower_email', normalizedEmail)
          .eq('loan_id', loanId.trim());
      }

      toast({
        title: 'Account Linked Successfully!',
        description: 'Your loan application has been linked to your account.',
      });

      // Redirect
      window.location.href = '/applicant-dashboard';
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
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
          <CardTitle className="text-2xl font-bold text-primary">Loan Applicant Portal Sign Up</CardTitle>
          <CardDescription className="text-sm">
            {step === 'credentials' && 'Create your account to track your loan application.'}
            {step === 'otp' && 'Enter the 6-digit code sent to your email.'}
            {step === 'loan-id' && 'Enter your Loan ID to link your application.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Error at top in red */}
          {errorMessage && (
            <Alert variant="destructive" className="mb-4 bg-destructive/10 border-destructive/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-destructive font-medium">{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Info banner */}
          {step === 'credentials' && (
            <Alert className="mb-4 bg-primary/5 border-primary/20">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                Please use the <strong>same email address</strong> that was used for your loan application.
              </AlertDescription>
            </Alert>
          )}

          {/* Step indicators */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {['credentials', 'otp', 'loan-id'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step === s ? 'bg-primary text-primary-foreground' :
                  ['credentials', 'otp', 'loan-id'].indexOf(step) > i ? 'bg-primary/20 text-primary' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {i + 1}
                </div>
                {i < 2 && <div className="w-8 h-0.5 bg-muted" />}
              </div>
            ))}
          </div>

          {/* Step 1: Email + Password */}
          {step === 'credentials' && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-primary" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrorMessage(''); }}
                  required
                  placeholder="Enter your loan application email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-primary" />
                  Password
                </Label>
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

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending Verification Code...' : 'Continue'}
              </Button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleOtpVerify} className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">
                We sent a 6-digit code to <strong>{email}</strong>
              </p>
              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button type="submit" className="w-full" disabled={loading || otpCode.length !== 6}>
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full text-sm"
                onClick={() => { setStep('credentials'); setOtpCode(''); setErrorMessage(''); }}
              >
                Back to email entry
              </Button>
            </form>
          )}

          {/* Step 3: Loan ID */}
          {step === 'loan-id' && (
            <form onSubmit={handleLoanIdSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loanId" className="flex items-center gap-1.5">
                  <KeyRound className="h-4 w-4 text-primary" />
                  Loan ID
                </Label>
                <Input
                  id="loanId"
                  type="text"
                  value={loanId}
                  onChange={(e) => { setLoanId(e.target.value); setErrorMessage(''); }}
                  required
                  placeholder="e.g. CCIF-2026-0042"
                />
                <p className="text-xs text-muted-foreground">
                  Your Loan ID was provided by your account executive.
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Linking Application...' : 'Link My Application'}
              </Button>
            </form>
          )}

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
