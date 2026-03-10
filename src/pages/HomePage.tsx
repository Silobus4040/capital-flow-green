import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
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
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-white text-xs sm:text-sm md:text-base font-medium drop-shadow-lg">
            <span>Asset-Based Lending</span>
            <span className="hidden sm:inline">•</span>
            <span>100% Financing Available</span>
            <span className="hidden sm:inline">•</span>
            <span>Serving All 50 States</span>
          </div>
        </div>

        {/* Dark gradient overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Bottom CTA buttons */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pb-6 sm:pb-8 px-4">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] shadow-lg font-bold text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 border-0" asChild>
              <Link to="/loan-programs">View Loan Programs</Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] shadow-lg font-bold text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 border-0" asChild>
              <Link to="/loan-matchmaker">Find Your Perfect Loan</Link>
            </Button>
            <Button size="lg" className="w-full sm:w-auto min-h-[48px] shadow-lg font-bold text-white bg-gradient-to-r from-green-700 to-green-500 hover:from-green-800 hover:to-green-600 border-0" asChild>
              <Link to="/deal-analyzer">Analyze a Deal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}