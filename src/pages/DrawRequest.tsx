import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Construction, Clock, CheckCircle, FileText } from "lucide-react";

export default function DrawRequest() {
  const [formData, setFormData] = useState({
    loanId: "",
    password: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    // Return "Login Failed" for ALL sign-in requests as required
    toast({
      title: "Login Failed",
      description: "The login information is incorrect",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-accent/20">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Rehab and Construction Draws</h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Accessing your rehab and construction draws should be straightforward and predictable. 
            Our draw process is designed for speed and transparency—submit your request, upload 
            supporting details, and track approvals in real time. We coordinate inspections quickly 
            and release funds upon verification, so your project keeps moving.
          </p>
        </div>

        {/* Process Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="pt-6 text-center">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Simple Online Submission</h3>
              <p className="text-sm text-muted-foreground">Easy-to-use portal for all draw requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fast Inspection Scheduling</h3>
              <p className="text-sm text-muted-foreground">Quick coordination and inspection setup</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Clear Status Updates</h3>
              <p className="text-sm text-muted-foreground">Real-time tracking at every step</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Construction className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Prompt Fund Release</h3>
              <p className="text-sm text-muted-foreground">Funds released quickly upon approval</p>
            </CardContent>
          </Card>
        </div>

        {/* Sign-In Form */}
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Sign In to Request a Draw</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="loanId">Loan ID *</Label>
                <Input
                  id="loanId"
                  value={formData.loanId}
                  onChange={(e) => handleInputChange('loanId', e.target.value)}
                  placeholder="Enter your Loan ID"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  className="mt-1"
                  required
                />
              </div>

              <div className="pt-4">
                <Button onClick={handleSignIn} size="lg" className="w-full">
                  Sign In to Request a Draw
                </Button>
              </div>

              <div className="text-center">
                <Button variant="link" className="text-sm">
                  Forgot your password?
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}