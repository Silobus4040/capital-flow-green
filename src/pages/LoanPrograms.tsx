import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { loanPrograms, LoanProgram } from "@/data/loanPrograms";
import { useToast } from "@/hooks/use-toast";
import commercialMortgageImage from "@/assets/commercial-mortgage.jpg";
import commercialDscrImage from "@/assets/commercial-dscr-rental.jpg";
import rehabPropertyImage from "@/assets/rehab-property.jpg";
import rvParkImage from "@/assets/rv-park-campground.jpg";
import mobileHomeParkImage from "@/assets/mobile-home-park.jpg";
import constructionSiteImage from "@/assets/construction-site.jpg";
import selfStorageImage from "@/assets/self-storage-facility.jpg";
import seniorLivingImage from "@/assets/senior-living-facility.jpg";
import residentialInvestmentImage from "@/assets/residential-investment.jpg";

export default function LoanPrograms() {
  const [selectedProgram, setSelectedProgram] = useState<LoanProgram | null>(null);
  const [applicationForm, setApplicationForm] = useState({
    name: "",
    phone: "",
    email: "",
    program: ""
  });
  const { toast } = useToast();

  const handleApplicationSubmit = (program: LoanProgram) => {
    if (!applicationForm.name || !applicationForm.phone || !applicationForm.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the email
    console.log("Application Request:", {
      ...applicationForm,
      program: program.name,
      timestamp: new Date().toISOString()
    });

    toast({
      title: "Application Request Sent",
      description: `Your request for ${program.name} application has been submitted successfully.`,
    });

    setApplicationForm({ name: "", phone: "", email: "", program: "" });
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Loan Programs</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive commercial real estate financing solutions tailored to your specific needs. 
            All programs feature asset-based underwriting with flexible terms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loanPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
                  <p className="text-lg font-bold text-primary">{program.interestRate}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Minimum Loan Amount</p>
                  <p className="text-lg font-bold">{program.minimumLoanAmount}</p>
                </div>

                <p className="text-sm text-muted-foreground">{program.description}</p>

                <div className="flex flex-col gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedProgram(program)}
                        className="w-full"
                      >
                        View Full Terms
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-6xl max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">
                          {selectedProgram?.name} - Complete Terms & Conditions
                        </DialogTitle>
                      </DialogHeader>
                      
                      {selectedProgram?.id === "rv-park-financing" && (
                        <div className="mb-4">
                          <img 
                            src={rvParkImage} 
                            alt="RV Park and Campground Facility with Recreational Vehicles" 
                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                      
                      {selectedProgram?.id === "commercial-mortgage" && (
                        <div className="mb-4">
                          <img 
                            src={commercialMortgageImage} 
                            alt="Commercial Real Estate Property" 
                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                      
                      {selectedProgram?.id === "commercial-dscr-loan" && (
                        <div className="mb-4">
                          <img 
                            src={commercialDscrImage} 
                            alt="Commercial Rental Property for DSCR Loan" 
                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                      
                      {selectedProgram?.id === "rehab-loan" && (
                        <div className="mb-4">
                          <img 
                            src={rehabPropertyImage} 
                            alt="Property Needing Rehabilitation and Renovation" 
                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                      
                      {selectedProgram?.id === "mobile-home-park-financing" && (
                        <div className="mb-4">
                          <img 
                            src={mobileHomeParkImage} 
                            alt="Mobile Home Park Community with Well-Maintained Manufactured Homes" 
                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                       )}
                       
                       {selectedProgram?.id === "acquisition-development-construction" && (
                         <div className="mb-4">
                           <img 
                             src={constructionSiteImage} 
                             alt="Modern Construction Site with Heavy Machinery and Development Activity" 
                             className="w-full h-48 object-cover rounded-lg shadow-lg"
                           />
                         </div>
                        )}
                        
                        {selectedProgram?.id === "self-storage-financing" && (
                          <div className="mb-4">
                            <img 
                              src={selfStorageImage} 
                              alt="Modern Self Storage Facility with Security Features and Climate Control" 
                              className="w-full h-48 object-cover rounded-lg shadow-lg"
                            />
                          </div>
                         )}
                         
                          {selectedProgram?.id === "senior-living-financing" && (
                            <div className="mb-4">
                              <img 
                                src={seniorLivingImage} 
                                alt="Senior Living Care Facility with Caring Staff and Comfortable Environment" 
                                className="w-full h-48 object-cover rounded-lg shadow-lg"
                              />
                            </div>
                          )}
                          
                          {selectedProgram?.id === "residential-investment-loan" && (
                            <div className="mb-4">
                              <img 
                                src={residentialInvestmentImage} 
                                alt="Residential Investment Property Portfolio with Single-Family Homes and Rental Properties" 
                                className="w-full h-48 object-cover rounded-lg shadow-lg"
                              />
                            </div>
                          )}
                      <ScrollArea className="max-h-[65vh] pr-4">
                        <div className="space-y-6">
                          <div 
                            className="commercial-mortgage-terms"
                            dangerouslySetInnerHTML={{
                              __html: selectedProgram?.terms
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
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Request Application Form</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Request Application for {program.name}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={applicationForm.name}
                            onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={applicationForm.phone}
                            onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="Enter your phone number"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={applicationForm.email}
                            onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                        <Button 
                          onClick={() => handleApplicationSubmit(program)}
                          className="w-full"
                        >
                          Submit Request
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}