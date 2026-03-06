import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { usePublicApplications } from "@/hooks/usePublicApplications";
import ConditionalFormFields from "./ConditionalFormFields";

interface DSCRLoanFormData {
  // Basic Information
  entityName: string;
  firstName: string;
  lastName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  
  // DSCR Specific Fields
  loanType: string;
  requestedAmount: string;
  propertyType: string;
  numberOfUnits: string;
  
  // Income Analysis
  grossRentalIncome: string;
  operatingExpenses: string;
  netOperatingIncome: string;
  existingMortgage: string;
  
  // Property Details
  propertyValue: string;
  yearBuilt: string;
  squareFootage: string;
  occupancyRate: string;
  
  // DSCR Calculation
  proposedPayment: string;
  calculatedDSCR: string;
  
  // Additional Info
  experienceLevel: string;
  additionalProperties: string;
  additionalComments: string;
}

interface DSCRLoanFormProps {
  onSubmitSuccess?: () => void;
}

export default function DSCRLoanForm({ onSubmitSuccess }: DSCRLoanFormProps = {}) {
  const { toast } = useToast();
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const [formData, setFormData] = useState<DSCRLoanFormData>({
    entityName: "",
    firstName: "",
    lastName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    loanType: "",
    requestedAmount: "",
    propertyType: "",
    numberOfUnits: "",
    grossRentalIncome: "",
    operatingExpenses: "",
    netOperatingIncome: "",
    existingMortgage: "",
    propertyValue: "",
    yearBuilt: "",
    squareFootage: "",
    occupancyRate: "",
    proposedPayment: "",
    calculatedDSCR: "",
    experienceLevel: "",
    additionalProperties: "",
    additionalComments: ""
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate DSCR when NOI and proposed payment are available
    if ((field === 'netOperatingIncome' || field === 'proposedPayment') && 
        formData.netOperatingIncome && formData.proposedPayment) {
      const noi = parseFloat(field === 'netOperatingIncome' ? value : formData.netOperatingIncome);
      const payment = parseFloat(field === 'proposedPayment' ? value : formData.proposedPayment);
      const monthlyNOI = noi / 12;
      const dscr = monthlyNOI / payment;
      setFormData(prev => ({ ...prev, calculatedDSCR: dscr.toFixed(2) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!formData.entityName && (!formData.firstName || !formData.lastName)) || !formData.borrowerEmail || !formData.loanType || !formData.requestedAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const applicationData = {
        programId: 'commercial-dscr-loan',
        programName: 'Commercial DSCR Loan',
        borrowerName: formData.entityName?.trim() || `${formData.firstName} ${formData.lastName}`.trim(),
        borrowerEmail: formData.borrowerEmail,
        borrowerPhone: formData.borrowerPhone,
        propertyAddress: formData.propertyAddress,
        propertyCity: formData.propertyCity,
        propertyState: formData.propertyState,
        propertyZip: formData.propertyZip,
        requestedAmount: parseFloat(formData.requestedAmount) || 0,
        loanPurpose: formData.loanType,
        programSpecificData: formData,
      };

      await submitPublicApplication(applicationData);

      // Reset form on success  
      setFormData({
        borrowerName: "",
        borrowerEmail: "",
        borrowerPhone: "",
        propertyAddress: "",
        propertyCity: "",
        propertyState: "",
        propertyZip: "",
        loanType: "",
        requestedAmount: "",
        propertyType: "",
        numberOfUnits: "",
        grossRentalIncome: "",
        operatingExpenses: "",
        netOperatingIncome: "",
        existingMortgage: "",
        propertyValue: "",
        yearBuilt: "",
        squareFootage: "",
        occupancyRate: "",
        proposedPayment: "",
        calculatedDSCR: "",
        experienceLevel: "",
        additionalProperties: "",
        additionalComments: ""
      });

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
    } catch (error: any) {
      // Error handling is done in the hook
    }
  };

  const getLoanTypeOptions = () => [
    { value: 'standard-dscr', label: 'Standard Commercial DSCR Loan' },
    { value: '100-financing', label: '100% Financing Option' }
  ];

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Commercial DSCR Application</CardTitle>
        <CardDescription>
          Debt Service Coverage Ratio (DSCR) loans based on property cash flow
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Type Selection */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <Label htmlFor="loanType" className="text-lg font-semibold">DSCR Loan Type *</Label>
            <Select value={formData.loanType || ""} onValueChange={(value) => updateFormData('loanType', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select DSCR loan type" />
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

          {/* Basic Borrower Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Borrower Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="borrowerName">Full Name *</Label>
                <Input
                  id="borrowerName"
                  value={formData.borrowerName}
                  onChange={(e) => updateFormData('borrowerName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="borrowerEmail">Email Address *</Label>
                <Input
                  id="borrowerEmail"
                  type="email"
                  value={formData.borrowerEmail}
                  onChange={(e) => updateFormData('borrowerEmail', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="borrowerPhone">Phone Number *</Label>
                <Input
                  id="borrowerPhone"
                  type="tel"
                  value={formData.borrowerPhone}
                  onChange={(e) => updateFormData('borrowerPhone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="experienceLevel">Real Estate Investment Experience</Label>
                <Select value={formData.experienceLevel || ""} onValueChange={(value) => updateFormData('experienceLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time">First Time Investor</SelectItem>
                    <SelectItem value="1-5-properties">1-5 Properties</SelectItem>
                    <SelectItem value="6-15-properties">6-15 Properties</SelectItem>
                    <SelectItem value="15-plus-properties">15+ Properties</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Property Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="propertyAddress">Property Address *</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => updateFormData('propertyAddress', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="propertyCity">City *</Label>
                <Input
                  id="propertyCity"
                  value={formData.propertyCity}
                  onChange={(e) => updateFormData('propertyCity', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="propertyState">State *</Label>
                <Input
                  id="propertyState"
                  value={formData.propertyState}
                  onChange={(e) => updateFormData('propertyState', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="propertyZip">ZIP Code *</Label>
                <Input
                  id="propertyZip"
                  value={formData.propertyZip}
                  onChange={(e) => updateFormData('propertyZip', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="propertyType">Property Type *</Label>
                <Select value={formData.propertyType || ""} onValueChange={(value) => updateFormData('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="triplex">Triplex</SelectItem>
                    <SelectItem value="fourplex">Fourplex</SelectItem>
                    <SelectItem value="small-multifamily">Small Multifamily (5-49 units)</SelectItem>
                    <SelectItem value="large-multifamily">Large Multifamily (50+ units)</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numberOfUnits">Number of Units</Label>
                <Input
                  id="numberOfUnits"
                  type="number"
                  value={formData.numberOfUnits}
                  onChange={(e) => updateFormData('numberOfUnits', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="propertyValue">Current Property Value ($)</Label>
                <Input
                  id="propertyValue"
                  type="number"
                  value={formData.propertyValue}
                  onChange={(e) => updateFormData('propertyValue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="requestedAmount">Requested Loan Amount ($) *</Label>
                <Input
                  id="requestedAmount"
                  type="number"
                  value={formData.requestedAmount}
                  onChange={(e) => updateFormData('requestedAmount', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* DSCR Analysis */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">DSCR Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grossRentalIncome">Gross Rental Income (Annual $)</Label>
                <Input
                  id="grossRentalIncome"
                  type="number"
                  value={formData.grossRentalIncome}
                  onChange={(e) => updateFormData('grossRentalIncome', e.target.value)}
                  placeholder="Annual rental income"
                />
              </div>
              <div>
                <Label htmlFor="operatingExpenses">Operating Expenses (Annual $)</Label>
                <Input
                  id="operatingExpenses"
                  type="number"
                  value={formData.operatingExpenses}
                  onChange={(e) => updateFormData('operatingExpenses', e.target.value)}
                  placeholder="Taxes, insurance, maintenance, etc."
                />
              </div>
              <div>
                <Label htmlFor="netOperatingIncome">Net Operating Income (Annual $)</Label>
                <Input
                  id="netOperatingIncome"
                  type="number"
                  value={formData.netOperatingIncome}
                  onChange={(e) => updateFormData('netOperatingIncome', e.target.value)}
                  placeholder="Gross income - operating expenses"
                />
              </div>
              <div>
                <Label htmlFor="proposedPayment">Proposed Monthly Payment ($)</Label>
                <Input
                  id="proposedPayment"
                  type="number"
                  value={formData.proposedPayment}
                  onChange={(e) => updateFormData('proposedPayment', e.target.value)}
                  placeholder="Principal + interest + taxes + insurance"
                />
              </div>
              <div>
                <Label htmlFor="calculatedDSCR">Calculated DSCR</Label>
                <Input
                  id="calculatedDSCR"
                  value={formData.calculatedDSCR}
                  readOnly
                  className="bg-gray-100"
                  placeholder="Auto-calculated (minimum 1.15x required)"
                />
              </div>
              <div>
                <Label htmlFor="occupancyRate">Current Occupancy Rate (%)</Label>
                <Input
                  id="occupancyRate"
                  type="number"
                  value={formData.occupancyRate}
                  onChange={(e) => updateFormData('occupancyRate', e.target.value)}
                  placeholder="Current occupancy percentage"
                />
              </div>
            </div>
          </div>

          {/* Conditional Fields Based on Loan Type */}
          {formData.loanType && (
            <ConditionalFormFields 
              loanType={formData.loanType}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="additionalProperties">Additional Properties Owned</Label>
                <Textarea
                  id="additionalProperties"
                  value={formData.additionalProperties}
                  onChange={(e) => updateFormData('additionalProperties', e.target.value)}
                  placeholder="List other investment properties and their performance"
                />
              </div>
              <div>
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => updateFormData('additionalComments', e.target.value)}
                  placeholder="Any additional information about your financing needs"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.loanType} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit DSCR Loan Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}