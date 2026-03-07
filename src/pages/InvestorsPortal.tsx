import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, TrendingUp, Shield, BarChart3, Users, Briefcase, PiggyBank } from "lucide-react";
import ccifLogo from "@/assets/ccif-logo-enhanced.png";
import heroImage from "@/assets/investors-meeting.jpg";

const FEATURES = [
  { icon: TrendingUp, label: "8%–12% Fixed Annual Returns" },
  { icon: Shield, label: "First Lien Asset-Backed Security" },
  { icon: BarChart3, label: "Quarterly Performance Reports" },
  { icon: Users, label: "Direct Investment Team Access" },
  { icon: Briefcase, label: "Institutional-Quality Deals" },
  { icon: PiggyBank, label: "Diversified CRE Portfolio" },
];

export default function InvestorsPortal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Login Failed",
      description: "The login information is incorrect",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Hero Panel */}
      <div className="relative flex h-[32vh] lg:h-auto lg:w-1/2 bg-primary overflow-hidden">
        <img
          src={heroImage}
          alt="Investors analyzing commercial real estate statistics"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 flex flex-col justify-between h-full w-full p-4 lg:p-12 text-primary-foreground">
          <div>
            <img src={ccifLogo} alt="CCIF Logo" className="h-8 lg:h-12 w-auto mb-2 lg:mb-6 brightness-0 invert" />
            <h1 className="text-xl lg:text-4xl font-bold mb-1 lg:mb-3 font-serif">
              Investors Portal
            </h1>
            <p className="text-xs lg:text-lg opacity-90 mb-2 lg:mb-8 max-w-md hidden lg:block">
              Exclusive investment opportunities for accredited investors seeking stable returns through commercial real estate lending.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 lg:grid-cols-1 lg:gap-y-3">
            {FEATURES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 lg:gap-3">
                <div className="w-5 h-5 lg:w-8 lg:h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-3 w-3 lg:h-4 lg:w-4" />
                </div>
                <span className="text-[10px] lg:text-sm font-bold opacity-90 font-serif">{label}</span>
              </div>
            ))}
          </div>

          <p className="text-xs opacity-60 mt-8 hidden lg:block">
            © {new Date().getFullYear()} CCIF Capital. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-start lg:items-center justify-center p-4 pt-4 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <div className="mx-auto w-12 h-12 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 lg:h-8 lg:w-8 text-primary" />
          </div>
          <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-1 text-center">Investor Sign In</h2>
          <p className="text-muted-foreground text-sm mb-4 lg:mb-6 text-center">
            Secure access for accredited investors
          </p>

          <form onSubmit={handleLogin} className="space-y-3 lg:space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="flex items-center gap-1.5">
                <Mail className="h-4 w-4 text-primary" /> Email / Username
              </Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email or username"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-primary" /> Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            Access restricted to authorized investors only.
          </p>
        </div>
      </div>
    </div>
  );
}
