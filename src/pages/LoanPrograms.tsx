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
                      
                      {selectedProgram?.id === "commercial-mortgage" && (
                        <div className="mb-4">
                          <img 
                            src={commercialMortgageImage} 
                            alt="Commercial Real Estate Property" 
                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      )}
                      
                      <ScrollArea className="max-h-[60vh] pr-4">
                        <div className="prose prose-sm max-w-none dark:prose-invert">
                          <div 
                            className="whitespace-pre-wrap text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: selectedProgram?.terms
                                .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold text-primary mb-4 mt-6">$1</h1>')
                                .replace(/^## (.*$)/gm, '<h2 class="text-xl font-semibold text-primary mb-3 mt-5">$1</h2>')
                                .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
                                .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-semibold text-primary">$1</strong>')
                                .replace(/^✅ (.*$)/gm, '<div class="flex items-start gap-2 mb-2"><span class="text-green-500 font-bold">✅</span><span>$1</span></div>')
                                .replace(/^🎯 (.*$)/gm, '<div class="flex items-center gap-2 mb-3 text-lg font-semibold"><span>🎯</span><span>$1</span></div>')
                                .replace(/^📋 (.*$)/gm, '<div class="flex items-center gap-2 mb-3 text-lg font-semibold"><span>📋</span><span>$1</span></div>')
                                .replace(/^🏢 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>🏢</span><span>$1</span></div>')
                                .replace(/^🏗️ (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>🏗️</span><span>$1</span></div>')
                                .replace(/^🔄 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>🔄</span><span>$1</span></div>')
                                .replace(/^💰 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>💰</span><span>$1</span></div>')
                                .replace(/^⚡ (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>⚡</span><span>$1</span></div>')
                                .replace(/^🏆 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>🏆</span><span>$1</span></div>')
                                .replace(/^💼 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>💼</span><span>$1</span></div>')
                                .replace(/^💎 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>💎</span><span>$1</span></div>')
                                .replace(/^📞 (.*$)/gm, '<div class="flex items-center gap-2 mb-2 font-semibold"><span>📞</span><span>$1</span></div>')
                                .replace(/^---$/gm, '<hr class="border-border my-6">')
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                .replace(/\n\n/g, '<br/><br/>')
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