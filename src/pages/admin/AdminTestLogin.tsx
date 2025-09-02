import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Scorecard } from '@/components/ui/scorecard';
import { Eye, EyeOff, Shield, Play, RotateCcw } from 'lucide-react';

interface TestResult {
  id: string;
  timestamp: Date;
  duration: number;
  passed: boolean;
  phase: string;
}

export default function AdminTestLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testHistory, setTestHistory] = useState<TestResult[]>([]);
  const [currentTest, setCurrentTest] = useState<TestResult | undefined>();
  const [isRunningMultiTest, setIsRunningMultiTest] = useState(false);
  const [multiTestProgress, setMultiTestProgress] = useState({ completed: 0, total: 0 });
  const { signIn, adminSignIn, user, profile } = useAuth();
  const { toast } = useToast();

  // INSTANT ADMIN CHECK - Don't wait for profile loading
  const ADMIN_EMAILS = ['sundrycapitalsolutions@gmail.com'];
  const isAdminUser = user && ADMIN_EMAILS.includes(user.email || '');
  
  // Redirect if already admin and not testing
  if (isAdminUser && !loading && !isRunningMultiTest) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const runSingleTest = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing Credentials',
        description: 'Please enter email and password first',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    const testId = `test-${Date.now()}`;
    const startTime = Date.now();

    try {
      const { error } = await adminSignIn(email, password);
      const endTime = Date.now();
      const duration = endTime - startTime;
      const passed = duration < 1000 && !error;

      const testResult: TestResult = {
        id: testId,
        timestamp: new Date(),
        duration,
        passed,
        phase: 'Phase 1 - Admin Login'
      };

      setCurrentTest(testResult);
      setTestHistory(prev => [...prev, testResult]);

      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: passed ? '✅ Test PASSED' : '❌ Test FAILED',
          description: `Login completed in ${duration}ms ${passed ? '(Under 1000ms target)' : '(Over 1000ms target)'}`,
          variant: passed ? 'default' : 'destructive'
        });

        if (passed) {
          // Successful test - redirect briefly to show it works, then come back
          setTimeout(() => {
            window.history.pushState({}, '', '/admin-dashboard');
            setTimeout(() => {
              window.history.pushState({}, '', '/admin-test-login');
              window.location.reload();
            }, 500);
          }, 1000);
        }
      }
    } catch (error) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      
      const testResult: TestResult = {
        id: testId,
        timestamp: new Date(),
        duration,
        passed: false,
        phase: 'Phase 1 - Admin Login'
      };

      setCurrentTest(testResult);
      setTestHistory(prev => [...prev, testResult]);

      toast({
        title: '❌ Test FAILED',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const runMultipleTests = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing Credentials',
        description: 'Please enter email and password first',
        variant: 'destructive'
      });
      return;
    }

    setIsRunningMultiTest(true);
    setMultiTestProgress({ completed: 0, total: 10 });

    for (let i = 0; i < 10; i++) {
      setMultiTestProgress(prev => ({ ...prev, completed: i }));
      
      const testId = `multi-test-${Date.now()}-${i}`;
      const startTime = Date.now();

      try {
        // Clear any existing session first
        setCurrentTest(undefined);
        
        const { error } = await adminSignIn(email, password);
        const endTime = Date.now();
        const duration = endTime - startTime;
        const passed = duration < 1000 && !error;

        const testResult: TestResult = {
          id: testId,
          timestamp: new Date(),
          duration,
          passed,
          phase: 'Phase 1 - Multi Test'
        };

        setCurrentTest(testResult);
        setTestHistory(prev => [...prev, testResult]);

        // Brief pause between tests
        await new Promise(resolve => setTimeout(resolve, 200));

      } catch (error) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        const testResult: TestResult = {
          id: testId,
          timestamp: new Date(),
          duration,
          passed: false,
          phase: 'Phase 1 - Multi Test'
        };

        setCurrentTest(testResult);
        setTestHistory(prev => [...prev, testResult]);
      }
    }

    setMultiTestProgress(prev => ({ ...prev, completed: 10 }));
    setIsRunningMultiTest(false);

    const recentTests = testHistory.slice(-10);
    const passedTests = recentTests.filter(t => t.passed).length;
    const successRate = Math.round((passedTests / 10) * 100);

    toast({
      title: 'Multi-Test Complete',
      description: `${passedTests}/10 tests passed (${successRate}% success rate)`,
      variant: successRate >= 90 ? 'default' : 'destructive'
    });
  };

  const resetTests = () => {
    setTestHistory([]);
    setCurrentTest(undefined);
    setMultiTestProgress({ completed: 0, total: 0 });
    toast({
      title: 'Tests Reset',
      description: 'All test history cleared',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="border-blue-200">
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-800">Phase 1: Admin Login Speed Test</CardTitle>
            <CardDescription className="text-blue-600">
              Testing instant admin portal access - Target: &lt; 1000ms every single time
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Test Controls */}
          <Card className="shadow-strong border-blue-200">
            <CardHeader>
              <CardTitle className="text-lg">Test Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="space-y-3 pt-4">
                <Button 
                  onClick={runSingleTest}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading || isRunningMultiTest}
                >
                  {loading ? 'Testing...' : 'Run Single Test'}
                </Button>

                <Button 
                  onClick={runMultipleTests}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={loading || isRunningMultiTest}
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunningMultiTest ? 'Running 10 Tests...' : 'Run 10 Consecutive Tests'}
                </Button>

                <Button 
                  onClick={resetTests}
                  variant="outline"
                  className="w-full border-gray-300"
                  disabled={loading || isRunningMultiTest}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset All Tests
                </Button>
              </div>

              <div className="pt-4 text-center text-sm text-blue-600">
                <p className="mb-1">✅ Success: Portal opens in &lt; 1000ms</p>
                <p>❌ Fail: Portal takes &gt; 1000ms or login error</p>
              </div>
            </CardContent>
          </Card>

          {/* Scorecard */}
          <Scorecard
            phase="Phase 1 - Admin Login"
            targetTime={1000}
            currentTest={currentTest}
            testHistory={testHistory}
            isRunning={loading || isRunningMultiTest}
            totalTests={multiTestProgress.total}
            completedTests={multiTestProgress.completed}
          />
        </div>
      </div>
    </div>
  );
}