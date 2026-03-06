import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loanPrograms } from "@/data/loanPrograms";
import commercialMortgageImage from "@/assets/commercial-mortgage.jpg";
import commercialDscrImage from "@/assets/commercial-dscr-rental.jpg";
import rehabPropertyImage from "@/assets/rehab-property.jpg";
import rvParkImage from "@/assets/rv-park-campground.jpg";
import mobileHomeParkImage from "@/assets/mobile-home-park.jpg";
import constructionSiteImage from "@/assets/construction-site.jpg";
import selfStorageImage from "@/assets/self-storage-facility.jpg";
import seniorLivingImage from "@/assets/senior-living-facility.jpg";
import residentialInvestmentImage from "@/assets/residential-investment.jpg";

const programImages: Record<string, string> = {
  "rv-park-financing": rvParkImage,
  "commercial-mortgage": commercialMortgageImage,
  "commercial-dscr-loan": commercialDscrImage,
  "rehab-loan": rehabPropertyImage,
  "mobile-home-park-financing": mobileHomeParkImage,
  "acquisition-development-construction": constructionSiteImage,
  "self-storage-financing": selfStorageImage,
  "senior-living-financing": seniorLivingImage,
  "residential-investment-loan": residentialInvestmentImage,
  "business-acquisition": commercialMortgageImage,
};

export default function LoanPrograms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="loan-program-container container mx-auto">
        <div className="text-center mb-12">
          <h1 className="loan-program-header bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Commercial Loan Programs
          </h1>
          <p className="loan-program-body text-muted-foreground max-w-3xl mx-auto">
            Explore our comprehensive range of commercial lending solutions designed to fuel your business growth and real estate investments.
          </p>
        </div>

        <div className="loan-program-grid mb-12">
          {loanPrograms.map((program) => (
            <Card key={program.id} className="loan-program-card h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-t-lg">
                {programImages[program.id] && (
                  <img
                    src={programImages[program.id]}
                    alt={program.name}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
              </div>
              <CardContent className="flex-1 p-6">
                <h2 className="loan-program-subheader text-foreground mb-4">{program.name}</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Interest Rate:</span>
                    <span className="font-semibold text-primary">{program.interestRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Min. Loan:</span>
                    <span className="font-semibold text-primary">{program.minimumLoanAmount}</span>
                  </div>
                </div>
                <p className="loan-program-body text-muted-foreground mb-6">{program.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="loan-program-button w-full h-12"
                    onClick={() => navigate(`/loan-programs/${program.id}`)}
                  >
                    View Details
                  </Button>
                  <Button
                    className="loan-program-button w-full h-12"
                    onClick={() => navigate(`/loan-programs/${program.id}`)}
                  >
                    Apply Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
