import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

export default function InvestorsPortal() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [portalContent, setPortalContent] = useState(`INVESTORS PORTAL

Welcome to Commercial Capital & Investment Finance Investors Portal

At Commercial Capital & Investment Finance, Inc., we provide exclusive investment opportunities for accredited investors seeking stable returns through commercial real estate lending.

Our Investment Programs:

DEBT INVESTMENT OPPORTUNITIES
• Participate in secured commercial real estate loans
• Fixed returns ranging from 8% to 12% annually
• Short to medium-term investment horizons (6 months to 5 years)
• Asset-backed security with first lien positions
• Diversified portfolio across multiple property types

EQUITY PARTICIPATION PROGRAMS
• Joint venture opportunities in premium commercial properties
• Potential for both cash flow and appreciation returns
• Professional asset management and oversight
• Access to institutional-quality deals
• Minimum investment typically $250,000

PREFERRED INVESTOR BENEFITS
• Priority access to new investment opportunities
• Detailed quarterly performance reports
• Direct communication with our investment team
• Exclusive investor webinars and market updates
• Streamlined investment process

INVESTMENT CRITERIA
• Accredited investor status required
• Minimum investment amounts vary by opportunity
• All investments secured by real estate assets
• Comprehensive due diligence on every opportunity
• Professional third-party property management

CURRENT OPPORTUNITIES
• Commercial mortgage participations available
• Development project equity positions
• Portfolio acquisition opportunities
• Bridge loan investments with attractive yields

For more information about current investment opportunities or to schedule a consultation with our investment team, please contact us directly.

IMPORTANT DISCLOSURES
All investments carry risk including potential loss of principal. Past performance does not guarantee future results. This information is for qualified investors only and should not be considered as investment advice. Please consult with your financial advisor before making any investment decisions.

Securities offered through registered representatives. All investments subject to suitability requirements and investor qualification criteria.`);
  const { toast } = useToast();

  const handleLogin = () => {
    // Simple demo authentication - in production, this would be handled by a proper auth system
    if (credentials.username && credentials.password) {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Investors Portal",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter both username and password",
        variant: "destructive",
      });
    }
  };

  const handleSaveContent = () => {
    // In a real application, this would save to a database
    toast({
      title: "Content Saved",
      description: "Portal content has been updated successfully.",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: "", password: "" });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen py-12 px-4 bg-accent/20">
        <div className="container mx-auto max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Investors Portal</CardTitle>
              <p className="text-muted-foreground">
                Secure access for accredited investors
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                />
              </div>
              <Button onClick={handleLogin} className="w-full">
                Sign In
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Access restricted to authorized investors only
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Investors Portal</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Logged in as: {credentials.username}</span>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portal Content (Editable)</CardTitle>
            <p className="text-sm text-muted-foreground">
              You can edit the content below by copying and pasting new information
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                value={portalContent}
                onChange={(e) => setPortalContent(e.target.value)}
                className="min-h-[600px] font-mono text-sm"
                placeholder="Edit portal content here..."
              />
              <div className="flex justify-end">
                <Button onClick={handleSaveContent}>
                  Save Content
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}