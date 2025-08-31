import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { LoanProgram } from "@/data/loanPrograms";
import CommercialMortgageForm from "./CommercialMortgageForm";

interface ProgramApplicationFormProps {
  program: LoanProgram;
  onSubmitSuccess: () => void;
}

export default function ProgramApplicationForm({ program, onSubmitSuccess }: ProgramApplicationFormProps) {
  // If this is a commercial mortgage application, use the comprehensive form
  if (program.id === 'commercial-mortgage' || program.name.toLowerCase().includes('commercial mortgage')) {
    return <CommercialMortgageForm />;
  }

  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    propertyAddress: "",
    requestedAmount: "",
    loanPurpose: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to submit an application.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.borrowerName || !formData.borrowerEmail || !formData.borrowerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('loan_program_applications')
        .insert({
          user_id: user.id,
          program_id: program.id,
          program_name: program.name,
          borrower_name: formData.borrowerName,
          borrower_email: formData.borrowerEmail,
          borrower_phone: formData.borrowerPhone,
          property_address: formData.propertyAddress,
          requested_amount: formData.requestedAmount ? parseFloat(formData.requestedAmount) : null,
          loan_purpose: formData.loanPurpose,
          status: 'submitted'
        });

      if (dbError) throw dbError;

      // Send email notifications
      await supabase.functions.invoke('send-program-application', {
        body: {
          applicantName: formData.borrowerName,
          applicantEmail: formData.borrowerEmail,
          applicantPhone: formData.borrowerPhone,
          programName: program.name,
          programId: program.id,
          propertyAddress: formData.propertyAddress,
          requestedAmount: formData.requestedAmount
        }
      });

      toast({
        title: "Application Submitted Successfully",
        description: `Your ${program.name} application has been submitted. We'll contact you within 24-48 hours.`,
      });

      onSubmitSuccess();
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="borrowerName">Full Name *</Label>
          <Input
            id="borrowerName"
            value={formData.borrowerName}
            onChange={(e) => setFormData(prev => ({ ...prev, borrowerName: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="borrowerEmail">Email Address *</Label>
          <Input
            id="borrowerEmail"
            type="email"
            value={formData.borrowerEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, borrowerEmail: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="borrowerPhone">Phone Number *</Label>
          <Input
            id="borrowerPhone"
            type="tel"
            value={formData.borrowerPhone}
            onChange={(e) => setFormData(prev => ({ ...prev, borrowerPhone: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="requestedAmount">Requested Amount</Label>
          <Input
            id="requestedAmount"
            type="number"
            value={formData.requestedAmount}
            onChange={(e) => setFormData(prev => ({ ...prev, requestedAmount: e.target.value }))}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="propertyAddress">Property Address</Label>
        <Input
          id="propertyAddress"
          value={formData.propertyAddress}
          onChange={(e) => setFormData(prev => ({ ...prev, propertyAddress: e.target.value }))}
        />
      </div>
      <div>
        <Label htmlFor="loanPurpose">Loan Purpose</Label>
        <Textarea
          id="loanPurpose"
          value={formData.loanPurpose}
          onChange={(e) => setFormData(prev => ({ ...prev, loanPurpose: e.target.value }))}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}