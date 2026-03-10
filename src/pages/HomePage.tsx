import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section — lobby image with overlaid text at top and CTA buttons at bottom */}
      <section className="relative w-full overflow-hidden hero-section">
        {/* Full-bleed lobby background */}
        <img
          src="/hero-lobby.png"
          alt="Commercial Capital & Investment Finance Inc. — Corporate Lobby at 600 W Broadway, San Diego"
          className="absolute inset-0 w-full h-full object-cover object-center hero-img"
        />

        {/* Top tagline text */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-4 sm:pt-6 px-4">
          <div className="flex flex-wrap sm:flex-nowrap justify-center sm:gap-x-4 gap-x-2 gap-y-1 text-white text-[10px] sm:text-sm md:text-base font-medium drop-shadow-lg whitespace-nowrap">
            <span>Asset-Based Lending</span>
            <span>•</span>
            <span>100% Financing Available</span>
            <span>•</span>
            <span>Serving All 50 States</span>
          </div>
        </div>

        {/* Dark gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Bottom CTA buttons */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-12 px-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3 justify-center max-w-2xl mx-auto">
            <Button size="lg" className="min-h-[44px] px-5 shadow-[0_0_16px_rgba(34,197,94,0.4)] font-bold text-white bg-gradient-to-b from-green-400 via-green-600 to-green-700 hover:from-green-500 hover:via-green-700 hover:to-green-800 border border-green-400/30 rounded-lg w-full sm:w-auto" asChild>
              <Link to="/loan-programs">View Loan Programs</Link>
            </Button>
            <Button size="lg" className="min-h-[44px] px-5 shadow-[0_0_16px_rgba(34,197,94,0.4)] font-bold text-white bg-gradient-to-b from-green-400 via-green-600 to-green-700 hover:from-green-500 hover:via-green-700 hover:to-green-800 border border-green-400/30 rounded-lg w-full sm:w-auto" asChild>
              <Link to="/loan-matchmaker">Find Your Perfect Loan</Link>
            </Button>
            <Button size="lg" className="min-h-[44px] px-5 shadow-[0_0_16px_rgba(34,197,94,0.4)] font-bold text-white bg-gradient-to-b from-green-400 via-green-600 to-green-700 hover:from-green-500 hover:via-green-700 hover:to-green-800 border border-green-400/30 rounded-lg w-full sm:w-auto" asChild>
              <Link to="/deal-analyzer">Analyze a Deal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}