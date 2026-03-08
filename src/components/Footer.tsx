import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Send, Twitter, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Commercial Capital & Investment Finance</h3>
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner for 100% commercial real estate financing with no credit requirements and fast approval.
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4" />
              <span>Serving all 50 states nationwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/loan-programs" className="hover:text-primary-light transition-colors">
                Loan Programs
              </Link>
              <Link to="/about-us" className="hover:text-primary-light transition-colors">
                About Us
              </Link>
              <Link to="/investors-portal" className="hover:text-primary-light transition-colors">
                Investors Portal
              </Link>
              <Link to="/referral-program" className="hover:text-primary-light transition-colors">
                Referral Program
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Our Services</h4>
            <nav className="flex flex-col space-y-2 text-sm">
              <span className="text-primary-foreground/80">Asset-Based Lending</span>
              <span className="text-primary-foreground/80">Commercial Mortgages</span>
              <span className="text-primary-foreground/80">DSCR Loans</span>
              <span className="text-primary-foreground/80">100% Financing Solutions</span>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-base font-semibold">Contact & Connect</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>619 343 3609</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>admin@ccif-inc.com</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.facebook.com/share/17FknQvsu7/?mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/commercialcapitalfinance"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/company/commercial-capital-finance"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://t.me/commercialcapitalfinance"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Join our Telegram channel"
              >
                <Send className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/CCIF_INC?t=ZmHYoDv78lkKUfjkih8zTQ&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Follow us on X"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-primary-foreground/70">
              © {currentYear} Commercial Capital & Investment Finance, Inc. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/70 hover:text-primary-light transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/70 hover:text-primary-light transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact-us" className="text-primary-foreground/70 hover:text-primary-light transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}