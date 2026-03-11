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
          <div className="relative z-10 flex flex-col justify-between md:justify-center px-4 pt-10 pb-2 sm:pt-14 sm:pb-4 md:p-10 lg:p-14 md:bg-[#0a1510] border-l border-white/5 min-h-[600px] md:min-h-0">

            {/* Top/Header: Tagline */}
            <div className="mb-auto md:mb-12">
              <div className="flex flex-wrap sm:flex-nowrap md:flex-wrap lg:flex-nowrap justify-center md:justify-start gap-x-2 lg:gap-x-4 gap-y-2 text-xs sm:text-[15px] font-extrabold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] whitespace-nowrap md:whitespace-normal uppercase tracking-wider">
                <span className="bg-gradient-to-r from-white via-slate-300 to-white bg-[length:200%_auto] animate-[pulse_2s_ease-in-out_infinite] bg-clip-text text-transparent md:text-white md:bg-none">Asset-Based Lending</span>
                <span className="hidden md:inline text-primary">•</span>
                <span className="hidden sm:inline md:hidden text-white/70">•</span>
                <span className="bg-gradient-to-r from-white via-slate-300 to-white bg-[length:200%_auto] animate-[pulse_2s_ease-in-out_infinite] bg-clip-text text-transparent md:text-white md:bg-none">100% Financing</span>
                <span className="hidden md:inline text-primary">•</span>
                <span className="hidden sm:inline md:hidden text-white/70">•</span>
                <span className="bg-gradient-to-r from-white via-slate-300 to-white bg-[length:200%_auto] animate-[pulse_2s_ease-in-out_infinite] bg-clip-text text-transparent md:text-white md:bg-none">All 50 States</span>
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
                <Button size="lg" className="w-[260px] sm:w-[280px] md:w-full min-h-[48px] md:min-h-[56px] text-base md:text-lg shadow-[0_8px_30px_rgba(15,118,74,0.5)] hover:shadow-[0_15px_40px_rgba(15,118,74,0.8)] transition-all duration-500 hover:-translate-y-1 font-bold text-white bg-gradient-to-r from-primary via-emerald-600 to-primary bg-[length:200%_auto] hover:bg-right border border-white/10 rounded-full group overflow-hidden relative" asChild>
                  <Link to="/loan-matchmaker" className="flex justify-between items-center px-6 z-10">
                    Find Your Perfect Loan <span className="hidden md:inline font-normal ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </Link>
                </Button>

                <Button size="lg" className="w-[260px] sm:w-[280px] md:w-full min-h-[48px] md:min-h-[56px] text-base md:text-lg font-bold text-white shadow-[0_6px_20px_rgba(15,118,74,0.4)] hover:shadow-[0_10px_30px_rgba(15,118,74,0.7)] transition-all duration-500 hover:-translate-y-1 bg-gradient-to-r from-primary via-emerald-600 to-primary bg-[length:200%_auto] hover:bg-right border border-white/10 rounded-full group overflow-hidden relative" asChild>
                  <Link to="/deal-analyzer" className="px-6 relative z-10 w-full text-center md:text-left">Analyze a Deal</Link>
                </Button>

                <Button size="lg" className="w-[260px] sm:w-[280px] md:w-full min-h-[48px] md:min-h-[56px] text-base md:text-lg font-bold text-white shadow-[0_6px_20px_rgba(15,118,74,0.4)] hover:shadow-[0_10px_30px_rgba(15,118,74,0.7)] transition-all duration-500 hover:-translate-y-1 bg-gradient-to-r from-primary via-emerald-600 to-primary bg-[length:200%_auto] hover:bg-right border border-white/10 rounded-full group overflow-hidden relative" asChild>
                  <Link to="/loan-programs" className="px-6 relative z-10 w-full text-center md:text-left">View All Loan Programs</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}