import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram } from "lucide-react";
import ccifLogo from "@/assets/ccif-logo-enhanced.png";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Loan Programs", href: "/loan-programs" },
  { name: "Investors Portal", href: "/investors-portal" },
  { name: "Referral Program", href: "/referral-program" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Draw Request", href: "/draw-request" },
  { name: "Document Submission", href: "/document-submission" },
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
          {/* Logo - repositioned for better balance */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={ccifLogo} 
              alt="CCIF - Commercial Capital & Investment Finance Logo" 
              className="h-12 w-12 object-contain flex-shrink-0" 
            />
            <div className="hidden lg:block">
              <div className="text-lg font-bold text-primary leading-tight whitespace-nowrap">
                COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.
              </div>
            </div>
            <div className="hidden sm:block lg:hidden">
              <div className="text-base font-bold text-primary leading-tight whitespace-nowrap">
                COMMERCIAL CAPITAL & INVESTMENT FINANCE
              </div>
            </div>
            <div className="text-base font-bold text-primary sm:hidden leading-tight">
              CCIF
            </div>
          </Link>

          {/* Desktop Navigation - arranged in straight horizontal line */}
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex items-center space-x-1">
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
            </nav>
            
            {/* Social Media Links */}
            <div className="flex items-center space-x-2 ml-4 border-l pl-4">
              <a
                href="https://www.instagram.com/ccif_inc?igsh=MThybmhkOW55aXpwdg=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/CCIF_INC?t=QvdQBwzeJc7bJeDQTUmmIw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Follow us on X (Twitter)"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

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
              
              {/* Mobile Social Links */}
              <div className="flex items-center space-x-4 px-3 py-4 border-t">
                <a
                  href="https://www.instagram.com/ccif_inc?igsh=MThybmhkOW55aXpwdg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Instagram className="h-4 w-4" />
                  <span className="text-sm">Instagram</span>
                </a>
                <a
                  href="https://x.com/CCIF_INC?t=QvdQBwzeJc7bJeDQTUmmIw&s=09"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-sm">X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}