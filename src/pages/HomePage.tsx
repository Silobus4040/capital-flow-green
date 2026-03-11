import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section — Split layout on desktop, Overlaid on mobile */}
      <section className="relative w-full bg-slate-900 border-b border-white/10 min-h-[600px] md:min-h-0">
        <div className="mx-auto max-w-[1400px] md:grid md:grid-cols-2 lg:grid-cols-[1.2fr_1fr] md:items-stretch h-full">

          {/* Left Side: Image Container */}
          <div className="absolute inset-0 md:relative w-full h-full md:min-h-[500px] lg:min-h-[650px] overflow-hidden">
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
          <div className="relative z-10 flex flex-col justify-between md:justify-center px-4 pt-10 pb-8 sm:pt-14 sm:pb-10 md:p-10 lg:p-14 md:bg-[#0a1510] border-l border-white/5 min-h-[600px] md:min-h-0">

            {/* Top/Header: Tagline */}
            <div className="mb-auto md:mb-12">
              <div className="flex flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap justify-center md:justify-start gap-x-2 lg:gap-x-4 gap-y-2 text-xs sm:text-base font-bold drop-shadow-lg whitespace-nowrap md:whitespace-normal">
                <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent md:text-white md:bg-none tracking-wide">Asset-Based Lending</span>
                <span className="hidden md:inline text-primary">•</span>
                <span className="hidden sm:inline md:hidden text-amber-400">•</span>
                <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent md:text-white md:bg-none tracking-wide">100% Financing</span>
                <span className="hidden md:inline text-primary">•</span>
                <span className="hidden sm:inline md:hidden text-amber-400">•</span>
                <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent md:text-white md:bg-none tracking-wide">All 50 States</span>
              </div>
              <h1 className="hidden md:block text-3xl lg:text-5xl font-bold text-white mt-6 leading-tight">
                Commercial Capital <br /><span className="text-primary">&</span> Investment Finance
              </h1>
              <p className="hidden md:block text-gray-400 mt-4 text-sm lg:text-base max-w-md leading-relaxed">
                Empowering developers and real estate investors with flexible, asset-based financing solutions nationwide. No credit requirements, just deals that make sense.
              </p>
            </div>

            {/* Bottom/Footer: CTA Buttons stacked line by line on desktop */}
            <div className="mt-auto w-full md:max-w-sm ml-auto md:mx-0 flex flex-col items-end md:items-start">
              <div className="flex flex-col gap-3 sm:gap-4 items-end md:items-stretch w-full overflow-visible py-2">
                <Button size="lg" className="w-[260px] sm:w-[280px] md:w-full min-h-[48px] md:min-h-[56px] md:text-lg shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] transition-all duration-300 hover:-translate-y-1 font-bold text-white bg-primary hover:bg-primary border-0 rounded-lg group" asChild>
                  <Link to="/loan-matchmaker" className="flex justify-between items-center px-6">
                    Find Your Perfect Loan <span className="hidden md:inline font-normal ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </Button>

                <Button size="lg" className="w-[260px] sm:w-[280px] md:w-full min-h-[46px] md:min-h-[52px] font-bold text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] transition-all duration-300 hover:-translate-y-1 bg-primary hover:bg-primary border-0 rounded-lg" asChild>
                  <Link to="/deal-analyzer" className="px-6">Analyze a Deal</Link>
                </Button>

                <Button size="lg" className="w-[260px] sm:w-[280px] md:w-full min-h-[46px] md:min-h-[52px] font-bold text-white shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] transition-all duration-300 hover:-translate-y-1 bg-primary hover:bg-primary border-0 rounded-lg" asChild>
                  <Link to="/loan-programs" className="px-6">View All Loan Programs</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}