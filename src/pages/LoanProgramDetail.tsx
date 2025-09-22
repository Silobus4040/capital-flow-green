import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
      <div className="min-h-screen py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <Button onClick={() => navigate("/loan-programs")}>
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

  const programImage = programImages[program.id as keyof typeof programImages];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button 
          variant="outline" 
          onClick={() => navigate("/loan-programs")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Programs
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{program.name}</h1>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
              <p className="text-2xl font-bold text-primary">{program.interestRate}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Minimum Loan Amount</p>
              <p className="text-2xl font-bold">{program.minimumLoanAmount}</p>
            </div>
          </div>
          <p className="text-lg text-muted-foreground mb-6">{program.description}</p>
        </div>

        {programImage && (
          <div className="mb-8">
            <img 
              src={programImage} 
              alt={`${program.name} visual representation`}
              className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Program Terms - Full detailed view */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Complete Terms & Conditions</h2>
          <LoanProgramTerms 
            terms={program.terms} 
            className="h-auto" 
          />
        </div>

        {/* Submit Application Button - Prominently placed after terms */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-600/10 border border-primary/30 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4 text-primary">Ready to Apply?</h3>
          <p className="text-muted-foreground mb-6">
            Submit your application for {program.name} and get started with your commercial real estate financing.
          </p>
          <Button 
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => setShowApplicationForm(true)}
          >
            Submit Application for {program.name}
          </Button>
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
    </div>
  );
}