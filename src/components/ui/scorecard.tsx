import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, Target, TrendingUp } from 'lucide-react';

interface TestResult {
  id: string;
  timestamp: Date;
  duration: number;
  passed: boolean;
  phase: string;
}

interface ScorecardProps {
  phase: string;
  targetTime: number;
  currentTest?: TestResult;
  testHistory: TestResult[];
  isRunning: boolean;
  totalTests?: number;
  completedTests?: number;
}

export function Scorecard({ 
  phase, 
  targetTime, 
  currentTest, 
  testHistory, 
  isRunning, 
  totalTests = 0,
  completedTests = 0 
}: ScorecardProps) {
  const passedTests = testHistory.filter(t => t.passed).length;
  const successRate = testHistory.length > 0 ? Math.round((passedTests / testHistory.length) * 100) : 0;
  const averageTime = testHistory.length > 0 
    ? Math.round(testHistory.reduce((sum, t) => sum + t.duration, 0) / testHistory.length)
    : 0;
  
  const getStatusColor = (passed: boolean) => passed ? 'text-green-600' : 'text-red-600';
  const getStatusIcon = (passed: boolean) => passed 
    ? <CheckCircle className="h-4 w-4 text-green-600" />
    : <XCircle className="h-4 w-4 text-red-600" />;

  const overallPassed = successRate >= 90 && testHistory.length >= 5;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5" />
            {phase} Scorecard
          </CardTitle>
          <Badge variant={overallPassed ? "default" : "destructive"} className="font-semibold">
            {overallPassed ? "PASS" : "IN PROGRESS"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Test Status */}
        {(isRunning || currentTest) && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Current Test:</span>
              {isRunning ? (
                <div className="flex items-center gap-2 text-blue-600">
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Running...</span>
                </div>
              ) : currentTest && (
                <div className="flex items-center gap-2">
                  {getStatusIcon(currentTest.passed)}
                  <span className={`font-mono ${getStatusColor(currentTest.passed)}`}>
                    {currentTest.duration}ms
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Progress Bar (for multi-test runs) */}
        {totalTests > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress:</span>
              <span>{completedTests}/{totalTests} tests</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedTests / totalTests) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <div className={`text-2xl font-bold font-mono ${averageTime < targetTime ? 'text-green-600' : 'text-red-600'}`}>
              {averageTime}ms
            </div>
            <div className="text-sm text-gray-600">Average Time</div>
          </div>
        </div>

        {/* Target Display */}
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <span className="font-medium">Target Time:</span>
          <span className="font-mono text-green-600 font-bold">&lt; {targetTime}ms</span>
        </div>

        {/* Recent Test History */}
        {testHistory.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Recent Tests ({testHistory.slice(-5).length})
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {testHistory.slice(-5).reverse().map((test, index) => (
                <div key={test.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(test.passed)}
                    <span>Test #{testHistory.length - index}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`font-mono ${getStatusColor(test.passed)}`}>
                      {test.duration}ms
                    </span>
                    <span className="text-gray-500 text-xs">
                      {test.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final Status */}
        {testHistory.length >= 5 && (
          <div className={`p-3 rounded-lg text-center font-medium ${
            overallPassed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {overallPassed 
              ? '✅ PHASE 1 PASSED - Admin portal loads instantly!' 
              : '❌ Phase incomplete - Continue testing until 90%+ success rate'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}