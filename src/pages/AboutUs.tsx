import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Target, Clock, Handshake } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen py-12 px-4 bg-accent/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Commercial Capital and Investment Finance Inc.
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="pt-8">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-xl leading-relaxed mb-6">
                  At Commercial Capital and Investment Finance Inc., we help investors, developers, and business owners 
                  move from opportunity to execution. Our team blends institutional experience with entrepreneurial 
                  agility to structure financing that meets real-world timelines and objectives.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  What sets us apart is our commitment to clarity, speed, and partnership. From initial conversation 
                  to closing, we communicate proactively, underwrite thoughtfully, and align our solutions with your 
                  strategy. Whether you're acquiring, refinancing, developing, or repositioning assets, we bring the 
                  market knowledge and responsiveness you need to compete.
                </p>
                
                <p className="text-lg leading-relaxed mb-8">
                  Our capabilities span bridge, rehab, construction, and permanent financing across a range of 
                  commercial asset types. We leverage deep capital relationships and disciplined underwriting to 
                  deliver outcomes with fewer surprises and more certainty.
                </p>
                
                <div className="bg-primary/5 rounded-lg p-6 mb-8">
                  <p className="text-lg font-semibold text-primary mb-4">
                    Your vision deserves momentum. We're here to help you build it.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-3xl font-bold text-center mb-8">What We Deliver</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Target className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Tailored Capital Solutions</h3>
                      <p className="text-muted-foreground">
                        Custom financing structures designed for complex scenarios and unique opportunities.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Clock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Efficient Underwriting</h3>
                      <p className="text-muted-foreground">
                        Streamlined processes and quick closings without compromising on thoroughness.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Transparent Terms</h3>
                      <p className="text-muted-foreground">
                        Clear, honest communication and dependable execution you can count on.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <Handshake className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Long-term Partnership</h3>
                      <p className="text-muted-foreground">
                        Portfolio-minded advice and ongoing support for your investment strategy.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}