import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
const ccifLogo = "/lovable-uploads/7a51105a-a80d-4bc0-8f7b-c8e5b6b783c3.png";

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
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
            <img 
              src={ccifLogo} 
              alt="CCIF - Commercial Capital & Investment Finance Logo" 
              className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 object-contain flex-shrink-0" 
            />
            <div className="hidden xl:block min-w-0">
              <div className="text-lg xl:text-xl font-bold text-primary leading-tight">
                COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.
              </div>
            </div>
            <div className="hidden lg:block xl:hidden min-w-0">
              <div className="text-base lg:text-lg font-bold text-primary leading-tight">
                COMMERCIAL CAPITAL & INVESTMENT FINANCE
              </div>
            </div>
            <div className="hidden sm:block lg:hidden min-w-0">
              <div className="text-sm sm:text-base font-bold text-primary leading-tight">
                CCIF - COMMERCIAL CAPITAL
              </div>
            </div>
            <div className="block sm:hidden text-sm font-bold text-primary leading-tight">
              CCIF
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center justify-center space-x-2 xl:space-x-3 flex-shrink-0">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-2 xl:px-3 py-2 rounded-md text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden flex-shrink-0 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-4 space-y-2 bg-background border-t shadow-lg">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 rounded-md text-base font-medium transition-colors min-h-[44px] flex items-center ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}