import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { loanPrograms, LoanProgram } from "@/data/loanPrograms";
import ProgramApplicationForm from "@/components/ProgramApplicationForm";
import LoanProgramTerms from "@/components/LoanProgramTerms";
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
  const [showApplicationForm, setShowApplicationForm] = useState<LoanProgram | null>(null);

  const handleApplicationFormSuccess = () => {
    setShowApplicationForm(null);
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
                      
                      <LoanProgramTerms 
                        terms={selectedProgram?.terms || ""} 
                        className="max-h-[65vh]" 
                      />
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    className="w-full"
                    onClick={() => window.location.href = `/loan-programs/${program.id}`}
                  >
                    View Details & Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Application Form Dialog */}
        <Dialog open={showApplicationForm !== null} onOpenChange={(open) => !open && setShowApplicationForm(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit Application for {showApplicationForm?.name}</DialogTitle>
            </DialogHeader>
            {showApplicationForm && (
              <ProgramApplicationForm 
                program={showApplicationForm} 
                onSubmitSuccess={handleApplicationFormSuccess}
              />
            )}
          </DialogContent>
        </Dialog>

      </div>
    </div>
  );
}