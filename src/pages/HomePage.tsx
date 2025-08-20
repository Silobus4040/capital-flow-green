import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle, DollarSign, CreditCard, TrendingUp } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary to-primary-dark text-primary-foreground">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Commercial Capital & Investment Finance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Your Trusted Asset-Based Commercial Real Estate Lender
          </p>
          
          {/* Key Value Propositions */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <CreditCard className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Credit Requirements</h3>
              <p className="text-sm opacity-90">Asset-based lending focused on property value, not credit scores</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <DollarSign className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">100% Financing Available</h3>
              <p className="text-sm opacity-90">Complete financing solutions for qualified commercial properties</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <TrendingUp className="h-8 w-8 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Fast Approval Process</h3>
              <p className="text-sm opacity-90">Quick decisions and streamlined closing process</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/loan-programs">View Loan Programs</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link to="/contact-us">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Asset-Based Lending Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Asset-Based Commercial Lending</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We specialize in asset-based lending, focusing on the value and cash flow potential of your commercial property rather than traditional credit requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Credit Requirements</h3>
                <p className="text-sm text-muted-foreground">
                  Approval based on property value and income potential
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Competitive Rates</h3>
                <p className="text-sm text-muted-foreground">
                  Market-competitive interest rates for all loan programs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Flexible Terms</h3>
                <p className="text-sm text-muted-foreground">
                  Customized loan structures to meet your specific needs
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fast Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Quick approval and closing process for urgent opportunities
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-accent">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Contact our experienced lending team today to discuss your commercial real estate financing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact-us">Contact Us</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/loan-programs">Browse Loan Programs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}