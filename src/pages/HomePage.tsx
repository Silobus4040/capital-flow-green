import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section — Split layout on desktop, Overlaid on mobile */}
      <section className="w-full bg-slate-900 border-b border-white/10">
        <div className="mx-auto max-w-[1400px] md:grid md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] md:items-stretch">

          {/* Left Side: Image Container */}
          <div className="relative w-full h-[clamp(400px,60vh,700px)] md:h-auto md:min-h-[500px] lg:min-h-[650px] overflow-hidden">
            <img
              src="/hero-lobby.png"
              alt="Commercial Capital & Investment Finance Inc. — Corporate Lobby at 600 W Broadway, San Diego"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            {/* Dark gradient overlays ONLY on mobile for text readability */}
            <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-0" />
            <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />
          </div>

          {/* Right Side: Content Container */}
          <div className="absolute inset-0 md:relative z-10 flex flex-col justify-between md:justify-center px-4 pt-10 pb-8 sm:pt-14 sm:pb-10 md:p-10 lg:p-14 md:bg-[#0a1510] border-l border-white/5">

            {/* Top/Header: Tagline */}
            <div className="mb-auto md:mb-12">
              <div className="flex flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap justify-center md:justify-start gap-x-2 lg:gap-x-4 gap-y-2 text-white text-[10px] sm:text-sm md:text-sm lg:text-base font-medium drop-shadow-md whitespace-nowrap md:whitespace-normal">
                <span className="text-primary md:text-white">Asset-Based Lending</span>
                <span className="hidden md:inline text-primary">•</span>
                <span className="hidden sm:inline md:hidden">•</span>
                <span className="text-primary md:text-white">100% Financing</span>
                <span className="hidden md:inline text-primary">•</span>
                <span className="hidden sm:inline md:hidden">•</span>
                <span className="text-primary md:text-white">All 50 States</span>
              </div>
              <h1 className="hidden md:block text-3xl lg:text-5xl font-bold text-white mt-6 leading-tight">
                Commercial Capital <br /><span className="text-primary">&</span> Investment Finance
              </h1>
              <p className="hidden md:block text-gray-400 mt-4 text-sm lg:text-base max-w-md leading-relaxed">
                Empowering developers and real estate investors with flexible, asset-based financing solutions nationwide. No credit requirements, just deals that make sense.
              </p>
            </div>

            {/* Bottom/Footer: CTA Buttons stacked line by line on desktop */}
            <div className="mt-auto w-full max-w-xs sm:max-w-md md:max-w-sm mx-auto md:mx-0">
              <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 sm:gap-3 md:gap-4">
                <Button size="lg" className="w-full min-h-[44px] md:min-h-[56px] md:text-lg shadow-[0_0_15px_rgba(34,197,94,0.3)] font-bold text-white bg-gradient-to-r md:bg-gradient-to-br from-green-500 md:from-green-600 to-green-700 hover:from-green-400 hover:to-green-600 border-0 rounded-lg group" asChild>
                  <Link to="/loan-matchmaker" className="flex justify-between items-center px-6">
                    Find Your Perfect Loan <span className="hidden md:inline font-normal">→</span>
                  </Link>
                </Button>

                <Button size="lg" className="w-full min-h-[44px] md:min-h-[52px] font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg" asChild>
                  <Link to="/deal-analyzer">Analyze a Deal</Link>
                </Button>

                <Button size="lg" className="w-full min-h-[44px] md:min-h-[52px] font-bold text-white bg-transparent hover:bg-white/5 border border-white/10 md:border-transparent md:hover:border-white/20 rounded-lg" asChild>
                  <Link to="/loan-programs">View All Loan Programs</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}