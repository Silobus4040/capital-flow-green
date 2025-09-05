import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { usePublicApplications, ProgramApplicationData } from "@/hooks/usePublicApplications";
import { LoanProgram } from "@/data/loanPrograms";
import CommercialMortgageForm from "./CommercialMortgageForm";
import EnhancedBusinessLoanForm from "./forms/EnhancedBusinessLoanForm";
import DSCRLoanForm from "./forms/DSCRLoanForm";
import SelfStorageForm from "./forms/SelfStorageForm";
import RehabInvestorForm from "./forms/RehabInvestorForm";
import RVParkForm from "./forms/RVParkForm";
import SeniorLivingForm from "./forms/SeniorLivingForm";
import ConditionalFormFields from "./forms/ConditionalFormFields";

interface ProgramApplicationFormProps {
  program: LoanProgram;
  onSubmitSuccess: () => void;
}

export default function ProgramApplicationForm({ program, onSubmitSuccess }: ProgramApplicationFormProps) {
  // Enhanced forms for specific programs
  if (program.id === 'business-loan' || program.name.toLowerCase().includes('business loan')) {
    return <EnhancedBusinessLoanForm />;
  }

  if (program.id === 'commercial-mortgage' || program.name.toLowerCase().includes('commercial mortgage')) {
    return <CommercialMortgageForm />;
  }

  if (program.id === 'commercial-dscr' || program.name.toLowerCase().includes('dscr')) {
    return <DSCRLoanForm />;
  }

  if (program.id === 'self-storage' || program.name.toLowerCase().includes('self storage')) {
    return <SelfStorageForm />;
  }

  if (program.id === 'rehab-investor' || program.name.toLowerCase().includes('rehab') || program.name.toLowerCase().includes('investor')) {
    return <RehabInvestorForm />;
  }

  if (program.id === 'rv-park-financing' || program.name.toLowerCase().includes('rv park')) {
    return <RVParkForm />;
  }

  if (program.id === 'senior-living' || program.name.toLowerCase().includes('senior living')) {
    return <SeniorLivingForm />;
  }

  const { toast } = useToast();
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    propertyAddress: "",
    requestedAmount: "",
    loanPurpose: "",
    loanType: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.borrowerName || !formData.borrowerEmail || !formData.borrowerPhone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const applicationData: ProgramApplicationData = {
        programId: program.id,
        programName: program.name,
        borrowerName: formData.borrowerName,
        borrowerEmail: formData.borrowerEmail,
        borrowerPhone: formData.borrowerPhone,
        propertyAddress: formData.propertyAddress,
        requestedAmount: formData.requestedAmount ? parseFloat(formData.requestedAmount) : undefined,
        loanPurpose: formData.loanPurpose,
        programSpecificData: { ...formData, loanType: formData.loanType },
      };

      await submitPublicApplication(applicationData);
      onSubmitSuccess();
    } catch (error: any) {
      // Error handling is done in the hook
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getLoanTypeOptions = () => {
    // Define loan type options based on program
    const programSpecificOptions: { [key: string]: Array<{value: string, label: string}> } = {
      'commercial-mortgage': [
        { value: 'first-mortgage', label: 'First Mortgage' },
        { value: 'second-mortgage', label: 'Second Mortgage' },
        { value: 'rate-and-term-refinance', label: 'Rate and Term Refinance' },
        { value: 'cash-out-refinance', label: 'Cash-out Refinance' },
        { value: 'bridge-loan', label: 'Bridge Loan' },
        { value: '100-financing', label: '100% Financing Program' }
      ],
      'business-loan': [
        { value: 'real-estate-security', label: 'Real Estate Security' },
        { value: 'credit-protection-insurance', label: 'Credit Protection Insurance' },
        { value: 'personal-guarantee', label: 'Personal Guarantee' },
        { value: 'bank-guarantee', label: 'Bank Guarantee' },
        { value: 'business-assets', label: 'Business Assets' },
        { value: 'inventory', label: 'Inventory' }
      ],
      'commercial-dscr': [
        { value: 'standard-dscr', label: 'Standard Commercial DSCR Loan' },
        { value: '100-financing', label: '100% Financing Option' }
      ],
      'construction': [
        { value: 'acquisition-development', label: 'Acquisition & Development' },
        { value: 'development-only', label: 'Development-Only' },
        { value: 'construction-only', label: 'Construction-Only' },
        { value: 'construction-to-permanent', label: 'Construction-to-Permanent' }
      ],
      'self-storage': [
        { value: 'purchase', label: 'Standard Purchase Loan' },
        { value: 'rate-and-term-refinance', label: 'Rate and Term Refinance' },
        { value: 'purchase-dscr', label: 'Purchase with DSCR Loan' },
        { value: 'cash-out-refinance', label: 'Cash-out Refinance' },
        { value: 'bridge-loan', label: 'Bridge Loan' },
        { value: '100-financing', label: '100% Financing Program' }
      ],
      'rv-park': [
        { value: 'purchase', label: 'Standard Purchase Loans' },
        { value: 'purchase-dscr', label: 'Purchase with DSCR Loan' },
        { value: 'cash-out-refinance', label: 'Cash-Out Refinance' },
        { value: 'rate-and-term-refinance', label: 'Rate and Term Refinance' },
        { value: 'bridge-financing', label: 'Bridge Financing' },
        { value: '100-financing', label: '100% Financing Program' }
      ],
      'senior-living': [
        { value: 'purchase-loan', label: 'Purchase Loan Program' },
        { value: '100-financing', label: '100% Financing' },
        { value: 'refinance', label: 'Refinance Program' },
        { value: 'bridge-loan', label: 'Bridge Loan Program' },
        { value: 'business-operation', label: 'Business Operation Loans' }
      ],
      'residential-mortgage': [
        { value: 'first-mortgage', label: 'First Mortgage/Purchase' },
        { value: 'rate-and-term-refinance', label: 'Rate and Term Refinance' },
        { value: 'cash-out-refinance', label: 'Cash-out Refinance' },
        { value: 'bridge-loan', label: 'Bridge Loan' },
        { value: '100-financing', label: '100% Financing Program' }
      ],
      'rehab-investor': [
        { value: 'fix-and-flip', label: 'Fix-and-Flip Loan Program' },
        { value: 'rehab-only', label: 'Rehab Only' },
        { value: 'fix-and-hold', label: 'Fix-and-Hold Loan Program' },
        { value: 'zero-down-payment', label: 'Zero Down Payment Program' }
      ]
    };

    return programSpecificOptions[program.id] || [
      { value: 'purchase', label: 'Purchase' },
      { value: 'refinance', label: 'Refinance' },
      { value: 'construction', label: 'Construction' },
      { value: 'bridge-loan', label: 'Bridge Loan' }
    ];
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Type Selection */}
      <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
        <Label htmlFor="loanType" className="text-lg font-semibold">Loan Type Selection *</Label>
        <Select onValueChange={(value) => updateFormData('loanType', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select your loan type to view specific fields" />
          </SelectTrigger>
          <SelectContent>
            {getLoanTypeOptions().map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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

      {/* Conditional Fields Based on Loan Type */}
      {formData.loanType && (
        <ConditionalFormFields 
          loanType={formData.loanType}
          formData={formData}
          updateFormData={updateFormData}
        />
      )}

      <Button type="submit" disabled={isSubmitting || !formData.loanType} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}