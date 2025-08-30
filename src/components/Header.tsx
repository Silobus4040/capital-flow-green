import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import ccifLogo from "@/assets/ccif-logo-new.png";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Loan Programs", href: "/loan-programs" },
  { name: "Investors Portal", href: "/investors-portal" },
  { name: "Referral Program", href: "/referral-program" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Draw Request", href: "/draw-request" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <img 
              src={ccifLogo} 
              alt="CCIF - Commercial Capital & Investment Finance Logo" 
              className="h-14 w-14 object-contain flex-shrink-0" 
            />
            <div className="hidden lg:block">
              <div className="text-xl font-bold text-primary leading-tight whitespace-nowrap">
                COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.
              </div>
            </div>
            <div className="hidden sm:block lg:hidden">
              <div className="text-lg font-bold text-primary leading-tight whitespace-nowrap">
                COMMERCIAL CAPITAL & INVESTMENT FINANCE
              </div>
            </div>
            <div className="text-lg font-bold text-primary sm:hidden leading-tight">
              CCIF
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/applicant-login"
              className="px-4 py-2 rounded-md text-sm font-medium bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors ml-2"
            >
              Borrower Portal
            </Link>
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/applicant-login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Borrower Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}