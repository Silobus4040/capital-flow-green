import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loanPrograms, LoanProgram } from "@/data/loanPrograms";
import { useToast } from "@/hooks/use-toast";

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
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>{selectedProgram?.name} - Full Terms</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <Textarea
                          value={selectedProgram?.terms || ""}
                          onChange={(e) => {
                            if (selectedProgram) {
                              const updatedProgram = { ...selectedProgram, terms: e.target.value };
                              setSelectedProgram(updatedProgram);
                              // In a real app, you'd save this to a database
                            }
                          }}
                          className="min-h-[400px] font-mono text-sm"
                          placeholder="Edit loan terms here..."
                        />
                        <div className="flex justify-end mt-4">
                          <Button onClick={() => {
                            toast({
                              title: "Terms Updated",
                              description: "Loan terms have been saved successfully.",
                            });
                          }}>
                            Save Terms
                          </Button>
                        </div>
                      </div>
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