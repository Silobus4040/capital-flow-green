import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { loanPrograms } from "@/data/loanPrograms";
import ProgramApplicationForm from "@/components/ProgramApplicationForm";
import LoanProgramTerms from "@/components/LoanProgramTerms";
import { ArrowLeft, CheckCircle2, Mail, FileText } from "lucide-react";
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

export default function LoanProgramDetail() {
  const { programId } = useParams<{ programId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const isApplyRoute = location.pathname.endsWith('/apply');
  const [showApplicationForm, setShowApplicationForm] = useState(isApplyRoute);
  const [submitted, setSubmitted] = useState(false);

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
    setSubmitted(true);
  };

  const selectedImage = programImages[program.id as keyof typeof programImages];

  // Full-page success screen
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, hsl(142 71% 35%), hsl(142 71% 25%))' }}>
        <div className="max-w-2xl w-full text-center space-y-8">

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 space-y-6 border border-white/20">
            <CheckCircle2 className="h-20 w-20 text-white mx-auto" />

            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Thank you for choosing Commercial Capital & Investment Inc for your financing needs!
            </h1>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-white/90 text-lg text-left max-w-lg mx-auto">
                <FileText className="h-6 w-6 mt-1 shrink-0" />
                <p>We've received your loan request and will review it shortly.</p>
              </div>

              <div className="flex items-start gap-3 text-white/90 text-lg text-left max-w-lg mx-auto">
                <Mail className="h-6 w-6 mt-1 shrink-0" />
                <p>
                  Expect a tailored <strong>Term Sheet & Loan Estimate</strong> in your email within{" "}
                  <strong>1–2 business days</strong>, detailing your potential rates, terms, and clear next steps.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={() => navigate("/loan-programs")}
              size="lg"
              className="bg-white text-green-800 hover:bg-white/90 font-semibold px-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Loan Programs
            </Button>
            <Button
              onClick={() => {
                setSubmitted(false);
                setShowApplicationForm(false);
              }}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-semibold px-8"
            >
              Apply for Another Program
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
          {showApplicationForm && (
            <div className="mb-12">
              <Button
                variant="outline"
                onClick={() => {
                  setShowApplicationForm(false);
                  navigate(`/loan-programs/${programId}`);
                }}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Program Details
              </Button>
              <ProgramApplicationForm
                program={program}
                onSubmitSuccess={handleApplicationFormSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
