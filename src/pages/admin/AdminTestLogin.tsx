import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Shield, CheckCircle, Clock } from 'lucide-react';

export default function AdminTestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginTime, setLoginTime] = useState<number | null>(null);
  const [redirectTime, setRedirectTime] = useState<number | null>(null);
  const { signIn, user, profile } = useAuth();
  const { toast } = useToast();

  if (user && profile?.role === 'admin') {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now();

    try {
      const { error } = await signIn(email, password);
      const loginCompleteTime = Date.now();
      setLoginTime(loginCompleteTime - startTime);
      
      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Login Successful - INSTANT ACCESS TEST',
          description: `Login completed in ${loginCompleteTime - startTime}ms`,
        });
        
        // Test instant redirect timing
        const redirectStart = Date.now();
        window.location.href = '/admin-dashboard';
        setRedirectTime(Date.now() - redirectStart);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-strong border-blue-200">
        <CardHeader className="text-center">
          <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-blue-800">Admin Login Test</CardTitle>
          <CardDescription className="text-blue-600">
            Phase 1: Testing instant login access - No delays allowed
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Performance Metrics Display */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Performance Metrics
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Login Time:</span>
                <span className={`font-mono ${loginTime ? (loginTime < 1000 ? 'text-green-600' : 'text-red-600') : 'text-gray-500'}`}>
                  {loginTime ? `${loginTime}ms` : 'Not tested'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Target:</span>
                <span className="text-green-600 font-mono">&lt; 1000ms</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@ccif-inc.com"
                className="border-blue-200 focus:border-blue-400"
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
                  placeholder="Enter admin password"
                  className="pr-10 border-blue-200 focus:border-blue-400"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Testing Login Speed...' : 'Test Instant Admin Login'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-blue-600 mb-2">
              <CheckCircle className="h-4 w-4" />
              <span>Phase 1 Test: Instant Portal Access</span>
            </div>
            <p className="text-xs text-blue-600 mb-2">
              This test page measures login speed and portal access time.
            </p>
            <p className="text-xs text-blue-500">
              Success criteria: Portal opens in under 1000ms every single time
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}