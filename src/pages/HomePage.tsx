import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section — Clean lobby image with logo signage */}
      <section className="relative w-full overflow-hidden" style={{ height: "clamp(400px, 60vh, 700px)" }}>
        {/* Full-bleed lobby background */}
        <img
          src="/hero-lobby.png"
          alt="Commercial Capital & Investment Finance Inc. — Corporate Lobby at 600 W Broadway, San Diego"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Subtle dark vignette at bottom for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </section>

      {/* Headline & CTA Section */}
      <section className="py-10 sm:py-14 px-4 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            100% Commercial Real Estate Financing
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-3 sm:mb-4 max-w-3xl mx-auto opacity-90 leading-relaxed px-2">
            Asset-Based Lending for Real Estate Developers & Commercial Investors
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-6 sm:mb-8 max-w-4xl mx-auto opacity-80 leading-relaxed px-2">
            No credit requirements • 100% financing available • Fast approval process • Serving all 50 states
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center max-w-2xl mx-auto px-2">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto min-h-[48px] shadow-lg" asChild>
              <Link to="/loan-programs">View Loan Programs</Link>
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-green-50 w-full sm:w-auto min-h-[48px] shadow-lg font-bold" asChild>
              <Link to="/loan-matchmaker">Find Your Perfect Loan</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/deal-analyzer">Analyze a Deal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Asset-Based Lending Section */}
      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight px-2">Asset-Based Commercial Real Estate Lending</h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed px-2">
              Specializing in asset-based lending for commercial real estate developers and investors across all 50 states. Our financing decisions are based on property value and income potential, not personal credit history.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">No Credit Requirements</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Loan approval based on commercial property value and income potential for developers and investors
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <DollarSign className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">Competitive Rates</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Market-competitive interest rates for all loan programs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <TrendingUp className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">Flexible Terms</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Customized loan structures to meet your specific needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-semibold mb-2 leading-tight">Fast Processing</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Quick approval and closing process for urgent opportunities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight px-2">Ready to Get Started?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Contact our experienced lending team today to discuss your commercial real estate financing needs.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center max-w-2xl mx-auto px-2">
            <Button size="lg" className="w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/loan-matchmaker">Try the Loan Matchmaker</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] border-primary text-primary hover:bg-primary/10" asChild>
              <Link to="/deal-analyzer">Analyze a Deal</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px]" asChild>
              <Link to="/contact-us">Contact Us</Link>
            </Button>
          </div>

        </div>
      </section>
    </div>
  );
}