import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { loanPrograms } from "@/data/loanPrograms";
import ProgramApplicationForm from "@/components/ProgramApplicationForm";
import DOMPurify from "dompurify";
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
          <ScrollArea className="h-auto">
            <div 
              className="commercial-mortgage-terms prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(program.terms, {
                  ALLOWED_TAGS: ['div', 'h1', 'h2', 'h3', 'h4', 'p', 'span', 'strong', 'em', 'ul', 'li', 'br'],
                  ALLOWED_ATTR: ['class', 'style'],
                  ALLOW_DATA_ATTR: false
                })
                  .replace(/^# (.*$)/gm, '<div class="hero-title text-3xl font-bold bg-gradient-to-r from-primary via-blue-600 to-green-600 bg-clip-text text-transparent mb-6 text-center">$1</div>')
                  .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold text-primary mb-4 mt-8 border-l-4 border-primary pl-4 bg-primary/5 py-2 rounded-r">$1</h2>')
                  .replace(/^### (.*$)/gm, '<h3 class="text-xl font-semibold mb-3 mt-6 text-primary border-b border-primary/30 pb-2">$1</h3>')
                  .replace(/<div class="pain-points">/g, '<div class="pain-points bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r mb-6">')
                  .replace(/<div class="solutions-grid">/g, '<div class="solutions-grid bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r mb-6">')
                  .replace(/<div class="highlight-box">/g, '<div class="highlight-box bg-gradient-to-br from-primary/10 to-blue-600/10 border border-primary/30 rounded-lg p-6 mb-4 shadow-lg">')
                  .replace(/<div class="qualification-grid">/g, '<div class="qualification-grid grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-4 rounded-lg border border-primary/20">')
                  .replace(/<div class="property-types">/g, '<div class="property-types grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">')
                  .replace(/^\*\*(.*?)\*\*/gm, '<div class="font-bold text-primary text-lg mb-2">$1</div>')
                  .replace(/^🔥 (.*$)/gm, '<div class="flex items-center gap-2 mb-3 text-lg font-bold text-orange-600"><span class="text-2xl">🔥</span><span>$1</span></div>')
                  .replace(/^💥 (.*$)/gm, '<div class="flex items-center gap-2 mb-3 text-xl font-bold text-red-600"><span class="text-2xl">💥</span><span>$1</span></div>')
                  .replace(/^🎯 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold text-primary"><span class="text-xl">🎯</span><span>$1</span></div>')
                  .replace(/^⚡ (.*$)/gm, '<div class="flex items-center gap-2 mb-3 text-lg font-semibold text-yellow-600"><span class="text-xl">⚡</span><span>$1</span></div>')
                  .replace(/^💰 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold text-green-600"><span class="text-xl">💰</span><span>$1</span></div>')
                  .replace(/^🏆 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold text-amber-600"><span class="text-xl">🏆</span><span>$1</span></div>')
                  .replace(/^💎 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold text-purple-600"><span class="text-xl">💎</span><span>$1</span></div>')
                  .replace(/^🚀 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold text-blue-600"><span class="text-xl">🚀</span><span>$1</span></div>')
                  .replace(/^📞 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold text-primary"><span class="text-xl">📞</span><span>$1</span></div>')
                  .replace(/^🏢 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span class="text-lg">🏢</span><span>$1</span></div>')
                  .replace(/^❌ (.*$)/gm, '<div class="flex items-start gap-3 mb-3 p-3 bg-red-50 dark:bg-red-900/20 rounded"><span class="text-red-500 font-bold text-lg">❌</span><span class="font-medium">$1</span></div>')
                  .replace(/^✅ (.*$)/gm, '<div class="flex items-start gap-3 mb-2"><span class="text-green-500 font-bold text-lg">✅</span><span class="font-medium">$1</span></div>')
                  .replace(/^💡 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border-l-2 border-yellow-400"><span class="text-yellow-600">💡</span><span class="font-medium italic">$1</span></div>')
                  .replace(/^💳 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded"><span>💳</span><span class="font-medium">$1</span></div>')
                  .replace(/^💵 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 p-2 bg-green-50 dark:bg-green-900/20 rounded"><span>💵</span><span class="font-medium">$1</span></div>')
                  .replace(/^📊 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded"><span>📊</span><span class="font-medium">$1</span></div>')
                  .replace(/^### \*\*(Q: .*?)\*\*/gm, '<div class="faq-question bg-primary/10 border border-primary/20 rounded-lg p-4 mb-3 mt-6"><h4 class="font-bold text-primary text-lg">$1</h4>')
                  .replace(/^\*\*A:\*\* (.*$)/gm, '<div class="faq-answer mt-2 text-muted-foreground font-medium">$1</div></div>')
                  .replace(/^---$/gm, '<div class="divider my-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
                  .replace(/\*(.*?)\*/g, '<em class="italic text-muted-foreground">$1</em>')
                  .replace(/\n\n/g, '<div class="mb-4"></div>')
              }}
            />
          </ScrollArea>
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