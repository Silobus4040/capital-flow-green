import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, AlertCircle, Mail, Lock, BarChart3, FileText, MessageSquare, Shield, CreditCard, CheckCircle2, Archive } from 'lucide-react';
import ccifLogo from '@/assets/ccif-logo-enhanced.png';
import heroImage from '@/assets/loan-management-hero.jpg';

const FEATURES = [
  { icon: BarChart3, label: 'Draw Schedule Management' },
  { icon: CreditCard, label: 'Loan Repayment Tracking' },
  { icon: FileText, label: 'Document Submission & E-Signing' },
  { icon: Shield, label: 'Live Bidding Feed' },
  { icon: MessageSquare, label: 'Secure Communication Portal' },
  { icon: CheckCircle2, label: 'Closing Checklist & Payment Portal' },
  { icon: Archive, label: 'Post-Close Access & Archives' },
];

export default function ApplicantLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn, user } = useAuth();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/applicant-dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMessage(error.message);
      }
    } catch {
      setErrorMessage('An unexpected error occurred.');
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
              Welcome Back
            </h1>
            <p className="text-lg opacity-90 mb-8 max-w-md">
              Access your full-suite closing dashboard — track bids, manage documents, and communicate with your team.
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

          <h2 className="text-2xl font-bold text-foreground mb-1">Sign In</h2>
          <p className="text-muted-foreground mb-6">
            Access your loan applicant dashboard.
          </p>

          {errorMessage && (
            <Alert variant="destructive" className="mb-4 bg-destructive/10 border-destructive/30">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-destructive font-medium">{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter your email"
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
                  placeholder="Enter your password"
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

            <div className="flex justify-end">
              <Link to="/reset-password" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/applicant-signup" className="text-primary hover:text-primary/80 font-medium">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
