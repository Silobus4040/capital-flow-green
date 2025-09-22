import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { loanPrograms } from "@/data/loanPrograms";
import ProgramApplicationForm from "@/components/ProgramApplicationForm";
import LoanProgramTerms from "@/components/LoanProgramTerms";
import { ArrowLeft } from "lucide-react";
import commercialMortgageImage from "@/assets/commercial-mortgage.jpg";
import commercialDscrImage from "@/assets/commercial-dscr-rental.jpg";
import rehabPropertyImage from "@/assets/rehab-property.jpg";
import rvParkImage from "@/assets/rv-park-campground.jpg";
import mobileHomeParkImage from "@/assets/mobile-home-park.jpg";
import constructionSiteImage from "@/assets/construction-site.jpg";
import selfStorageImage from "@/assets/self-storage-facility.jpg";
import seniorLivingImage from "@/assets/senior-living-facility.jpg";
import residentialInvestmentImage from "@/assets/residential-investment.jpg";

const programImages = {
  "rv-park-financing": rvParkImage,
  "commercial-mortgage": commercialMortgageImage,
  "commercial-dscr-loan": commercialDscrImage,
  "rehab-loan": rehabPropertyImage,
  "mobile-home-park-financing": mobileHomeParkImage,
  "acquisition-development-construction": constructionSiteImage,
  "self-storage-financing": selfStorageImage,
  "senior-living-financing": seniorLivingImage,
  "residential-investment-loan": residentialInvestmentImage,
};

export default function LoanProgramDetail() {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const program = loanPrograms.find(p => p.id === programId);

  if (!program) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <div className="loan-program-container container mx-auto text-center">
          <h1 className="loan-program-subheader text-foreground mb-4">Program Not Found</h1>
          <Button 
            onClick={() => navigate("/loan-programs")}
            className="loan-program-button"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Programs
          </Button>
        </div>
      </div>
    );
  }

  const handleApplicationFormSuccess = () => {
    setShowApplicationForm(false);
  };

  const selectedImage = programImages[program.id as keyof typeof programImages];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="loan-program-container container mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate('/loan-programs')}
          className="loan-program-button mb-6 hover:bg-primary/10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Loan Programs
        </Button>

        <div className="max-w-6xl mx-auto">
          <Card className="loan-program-card shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="loan-program-grid">
                <div>
                  <h1 className="loan-program-header bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
                    {program.name}
                  </h1>
                  
                  <div className="space-y-6 mb-8">
                    <div className="bg-primary/5 p-6 rounded-xl">
                      <h2 className="loan-program-subheader text-primary mb-4">Key Information</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                          <p className="loan-program-subheader text-primary">{program.interestRate}</p>
                        </div>
                        <div className="text-center p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Minimum Loan</p>
                          <p className="loan-program-subheader text-primary">{program.minimumLoanAmount}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="loan-program-subheader text-foreground mb-3">Program Description</h3>
                      <p className="loan-program-body text-muted-foreground">{program.description}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  {selectedImage && (
                    <img 
                      src={selectedImage} 
                      alt={program.name}
                      className="w-full h-80 object-cover rounded-xl shadow-lg mb-6"
                    />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full-Width Terms & Conditions Section */}
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <h3 className="loan-program-subheader text-foreground mb-8 text-center">Terms & Conditions</h3>
          <LoanProgramTerms 
            terms={program.terms}
            className=""
          />
        </div>
      </div>

      <div className="loan-program-container container mx-auto">
        <div className="max-w-6xl mx-auto">
          <Card className="loan-program-card shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl">
                  <h2 className="loan-program-header text-foreground mb-4">Ready to Apply?</h2>
                  <p className="loan-program-body text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Start your application process today and take advantage of our competitive rates and flexible terms.
                  </p>
                  <Button 
                    onClick={() => setShowApplicationForm(true)}
                    size="lg"
                    className="loan-program-button text-lg px-8 py-3 hover:scale-105 transition-transform"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Form Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Application for {program.name}</DialogTitle>
          </DialogHeader>
          <ProgramApplicationForm 
            program={program} 
            onSubmitSuccess={handleApplicationFormSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}