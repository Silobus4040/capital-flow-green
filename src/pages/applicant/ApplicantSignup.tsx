import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, AlertCircle, Info, Mail, Lock, KeyRound, CheckCircle2, BarChart3, FileText, MessageSquare, Shield, CreditCard, Archive } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import ccifLogo from '@/assets/ccif-logo-enhanced.png';
import heroImage from '@/assets/loan-management-hero.jpg';

type SignupStep = 'credentials' | 'otp' | 'loan-id';

const FEATURES = [
  { icon: BarChart3, label: 'Draw Schedule Management' },
  { icon: CreditCard, label: 'Loan Repayment Tracking' },
  { icon: FileText, label: 'Document Submission & E-Signing' },
  { icon: Shield, label: 'Live Bidding Feed' },
  { icon: MessageSquare, label: 'Secure Communication Portal' },
  { icon: CheckCircle2, label: 'Closing Checklist & Payment Portal' },
  { icon: Archive, label: 'Post-Close Access & Archives' },
];

export default function ApplicantSignup() {
  const [step, setStep] = useState<SignupStep>('credentials');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loanId, setLoanId] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showLoanIdDialog, setShowLoanIdDialog] = useState(false);
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
      const normalizedEmail = email.trim().toLowerCase();

      // Check if email exists in applications
      const { data: emailExists, error: checkError } = await supabase.rpc('check_application_email', {
        _email: normalizedEmail,
      });

      if (checkError || !emailExists) {
        setErrorMessage('This email is not associated with any loan application. Please use the email provided during your loan application or contact your account executive.');
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: normalizedEmail,
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
        setShowLoanIdDialog(true);
        setStep('loan-id');
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

      const { data: isValid, error: verifyError } = await supabase.rpc('verify_loan_id', {
        _email: normalizedEmail,
        _loan_id: loanId.trim(),
      });

      if (verifyError || !isValid) {
        setErrorMessage('Invalid Loan ID or email combination. Please check your credentials and try again.');
        setLoading(false);
        return;
      }

      const { data: displayName } = await (supabase.rpc as any)('get_borrower_display_name', {
        _email: normalizedEmail,
        _loan_id: loanId.trim(),
      });

      await supabase.auth.updateUser({
        data: {
          loan_id: loanId.trim(),
          borrower_display_name: displayName || normalizedEmail,
        }
      });

      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (currentUser) {
        await supabase
          .from('profiles')
          .update({ full_name: displayName || normalizedEmail })
          .eq('user_id', currentUser.id);

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

      window.location.href = '/applicant-dashboard';
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Hero */}
      <div className="relative lg:w-1/2 bg-primary overflow-hidden">
        <img
          src={heroImage}
          alt="Professional managing loan on phone"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col justify-between h-full p-8 lg:p-12 text-primary-foreground">
          <div>
            <img src={ccifLogo} alt="CCIF Logo" className="h-12 w-auto mb-6 brightness-0 invert" />
            <h1 className="text-3xl lg:text-4xl font-bold mb-3 font-serif">
              Your Loan. Your Dashboard.
            </h1>
            <p className="text-lg opacity-90 mb-8 max-w-md">
              A full-suite closing dashboard to manage every aspect of your loan — from draw schedules to post-close access.
            </p>
          </div>

          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium opacity-90">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-xs opacity-60 mt-8">
            © {new Date().getFullYear()} CCIF Capital. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <img src={ccifLogo} alt="CCIF Logo" className="h-10 w-auto mx-auto mb-4" />
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Create Your Account</h2>
          <p className="text-muted-foreground mb-6">
            {step === 'credentials' && 'Sign up to access your loan applicant dashboard.'}
            {step === 'otp' && 'Enter the 6-digit code sent to your email.'}
          </p>

          {errorMessage && (
            <Alert variant="destructive" className="mb-4 bg-destructive/10 border-destructive/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-destructive font-medium">{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Step 1: Email + Password */}
          {step === 'credentials' && (
            <>
              <Alert className="mb-5 bg-primary/5 border-primary/20">
                <Info className="h-4 w-4 text-primary" />
                <AlertDescription className="text-sm">
                  Use the <strong>same email address</strong> from your loan application.
                </AlertDescription>
              </Alert>

              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-primary" /> Email
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
                    <Lock className="h-4 w-4 text-primary" /> Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Create a secure password"
                      minLength={8}
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
                  <p className="text-xs text-muted-foreground">
                    Min 8 characters with a mix of letters, numbers & symbols.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Verifying Email...' : 'Continue'}
                </Button>
              </form>
            </>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && !showLoanIdDialog && (
            <form onSubmit={handleOtpVerify} className="space-y-5">
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

          {/* Loan ID Dialog - "One Last Step!" */}
          <Dialog open={showLoanIdDialog} onOpenChange={() => {}}>
            <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                  One Last Step!
                </DialogTitle>
                <DialogDescription>
                  Enter your Loan ID to link your application to this account.
                </DialogDescription>
              </DialogHeader>

              {errorMessage && (
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-destructive font-medium">{errorMessage}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLoanIdSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="loanId" className="flex items-center gap-1.5">
                    <KeyRound className="h-4 w-4 text-primary" /> Loan ID
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
            </DialogContent>
          </Dialog>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/applicant-login" className="text-primary hover:text-primary/80 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
