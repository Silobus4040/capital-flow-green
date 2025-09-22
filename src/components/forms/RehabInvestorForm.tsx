import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { usePublicApplications } from "@/hooks/usePublicApplications";
import ConditionalFormFields from "./ConditionalFormFields";

interface RehabInvestorFormData {
  // Basic Information
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  
  // Project Information
  projectType: string;
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  
  // Loan Information
  loanType: string;
  requestedAmount: string;
  
  // Property Details
  propertyType: string;
  currentCondition: string;
  squareFootage: string;
  bedrooms: string;
  bathrooms: string;
  
  // Financial Analysis
  purchasePrice: string;
  rehabBudget: string;
  afterRepairValue: string;
  totalProjectCost: string;
  
  // Rehab Scope
  majorRehab: string;
  kitchenRehab: string;
  bathroomRehab: string;
  flooringRehab: string;
  exteriorWork: string;
  
  // Timeline & Strategy
  projectTimeline: string;
  exitStrategy: string;
  
  // Experience
  investorExperience: string;
  previousProjects: string;
  
  // Contractor Information
  contractorSelected: string;
  contractorName: string;
  contractorLicense: string;
  
  // Additional Information
  additionalComments: string;
}

interface RehabInvestorFormProps {
  onSubmitSuccess?: () => void;
}

export default function RehabInvestorForm({ onSubmitSuccess }: RehabInvestorFormProps = {}) {
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const { toast } = useToast();
  const [formData, setFormData] = useState<RehabInvestorFormData>({
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    projectType: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    loanType: "",
    requestedAmount: "",
    propertyType: "",
    currentCondition: "",
    squareFootage: "",
    bedrooms: "",
    bathrooms: "",
    purchasePrice: "",
    rehabBudget: "",
    afterRepairValue: "",
    totalProjectCost: "",
    majorRehab: "",
    kitchenRehab: "",
    bathroomRehab: "",
    flooringRehab: "",
    exteriorWork: "",
    projectTimeline: "",
    exitStrategy: "",
    investorExperience: "",
    previousProjects: "",
    contractorSelected: "",
    contractorName: "",
    contractorLicense: "",
    additionalComments: ""
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate total project cost
    if ((field === 'purchasePrice' || field === 'rehabBudget') && 
        formData.purchasePrice && formData.rehabBudget) {
      const purchase = parseFloat(field === 'purchasePrice' ? value : formData.purchasePrice) || 0;
      const rehab = parseFloat(field === 'rehabBudget' ? value : formData.rehabBudget) || 0;
      const total = purchase + rehab;
      setFormData(prev => ({ ...prev, totalProjectCost: total.toString() }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.borrowerName || !formData.borrowerEmail || !formData.loanType || !formData.requestedAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      await submitPublicApplication({
        programId: 'rehab-investor',
        programName: 'Rehab/Investor Financing',
        borrowerName: formData.borrowerName,
        borrowerEmail: formData.borrowerEmail,
        borrowerPhone: formData.borrowerPhone,
        propertyAddress: formData.propertyAddress,
        propertyCity: formData.propertyCity,
        propertyState: formData.propertyState,
        propertyZip: formData.propertyZip,
        requestedAmount: formData.requestedAmount ? parseFloat(formData.requestedAmount) : null,
        loanPurpose: formData.loanType,
        programSpecificData: formData as any
      });

      // Reset form on success
      setFormData({
        borrowerName: "",
        borrowerEmail: "",
        borrowerPhone: "",
        projectType: "",
        propertyAddress: "",
        propertyCity: "",
        propertyState: "",
        propertyZip: "",
        loanType: "",
        requestedAmount: "",
        propertyType: "",
        currentCondition: "",
        squareFootage: "",
        bedrooms: "",
        bathrooms: "",
        purchasePrice: "",
        rehabBudget: "",
        afterRepairValue: "",
        totalProjectCost: "",
        majorRehab: "",
        kitchenRehab: "",
        bathroomRehab: "",
        flooringRehab: "",
        exteriorWork: "",
        projectTimeline: "",
        exitStrategy: "",
        investorExperience: "",
        previousProjects: "",
        contractorSelected: "",
        contractorName: "",
        contractorLicense: "",
        additionalComments: ""
      });

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      console.error('Rehab form submission error:', error);
    }
  };

  const getLoanTypeOptions = () => [
    { value: 'fix-and-flip', label: 'Fix-and-Flip Loan Program' },
    { value: 'rehab-only', label: 'Rehab Only' },
    { value: 'fix-and-hold', label: 'Fix-and-Hold Loan Program' },
    { value: 'zero-down-payment', label: 'Zero Down Payment Program' }
  ];

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Rehab/Investor Financing Application</CardTitle>
        <CardDescription>
          Specialized financing for fix-and-flip, rehab, and investment properties
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Type Selection */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <Label htmlFor="loanType" className="text-lg font-semibold">Rehab/Investment Loan Type *</Label>
            <Select value={formData.loanType || ""} onValueChange={(value) => updateFormData('loanType', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select your rehab/investment loan type" />
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

          {/* Basic Information */}
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
                <Label htmlFor="investorExperience">Investment Experience Level</Label>
                <Select value={formData.investorExperience || ""} onValueChange={(value) => updateFormData('investorExperience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time">First Time Investor</SelectItem>
                    <SelectItem value="1-3-flips">1-3 Completed Flips</SelectItem>
                    <SelectItem value="4-10-flips">4-10 Completed Flips</SelectItem>
                    <SelectItem value="10-plus-flips">10+ Completed Flips</SelectItem>
                    <SelectItem value="professional">Professional Investor</SelectItem>
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
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => updateFormData('propertyAddress', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="propertyCity">City</Label>
                <Input
                  id="propertyCity"
                  value={formData.propertyCity}
                  onChange={(e) => updateFormData('propertyCity', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="propertyState">State</Label>
                <Input
                  id="propertyState"
                  value={formData.propertyState}
                  onChange={(e) => updateFormData('propertyState', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="propertyZip">ZIP Code</Label>
                <Input
                  id="propertyZip"
                  value={formData.propertyZip}
                  onChange={(e) => updateFormData('propertyZip', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="propertyType">Property Type</Label>
                <Select value={formData.propertyType || ""} onValueChange={(value) => updateFormData('propertyType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single-family">Single Family Home</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                    <SelectItem value="duplex">Duplex</SelectItem>
                    <SelectItem value="small-multifamily">Small Multifamily</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="currentCondition">Current Condition</Label>
                <Select value={formData.currentCondition || ""} onValueChange={(value) => updateFormData('currentCondition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="good">Good - Minor cosmetic work needed</SelectItem>
                    <SelectItem value="fair">Fair - Moderate rehab required</SelectItem>
                    <SelectItem value="poor">Poor - Major renovation needed</SelectItem>
                    <SelectItem value="distressed">Distressed - Extensive work required</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="squareFootage">Square Footage</Label>
                <Input
                  id="squareFootage"
                  type="number"
                  value={formData.squareFootage}
                  onChange={(e) => updateFormData('squareFootage', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => updateFormData('bedrooms', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  step="0.5"
                  value={formData.bathrooms}
                  onChange={(e) => updateFormData('bathrooms', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Financial Analysis */}
          <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-800">Financial Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={(e) => updateFormData('purchasePrice', e.target.value)}
                  placeholder="Property acquisition cost"
                />
              </div>
              <div>
                <Label htmlFor="rehabBudget">Rehab Budget ($)</Label>
                <Input
                  id="rehabBudget"
                  type="number"
                  value={formData.rehabBudget}
                  onChange={(e) => updateFormData('rehabBudget', e.target.value)}
                  placeholder="Total renovation costs"
                />
              </div>
              <div>
                <Label htmlFor="afterRepairValue">After Repair Value (ARV) ($)</Label>
                <Input
                  id="afterRepairValue"
                  type="number"
                  value={formData.afterRepairValue}
                  onChange={(e) => updateFormData('afterRepairValue', e.target.value)}
                  placeholder="Expected value after repairs"
                />
              </div>
              <div>
                <Label htmlFor="totalProjectCost">Total Project Cost ($)</Label>
                <Input
                  id="totalProjectCost"
                  value={formData.totalProjectCost}
                  readOnly
                  className="bg-gray-100"
                  placeholder="Auto-calculated: Purchase + Rehab"
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
              <div>
                <Label htmlFor="exitStrategy">Exit Strategy</Label>
                <Select value={formData.exitStrategy || ""} onValueChange={(value) => updateFormData('exitStrategy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exit strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail-sale">Retail Sale</SelectItem>
                    <SelectItem value="rental-property">Keep as Rental Property</SelectItem>
                    <SelectItem value="wholesale">Wholesale</SelectItem>
                    <SelectItem value="refinance-hold">Refinance and Hold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Rehab Scope */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Renovation Scope</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kitchenRehab">Kitchen Renovation</Label>
                <Select value={formData.kitchenRehab || ""} onValueChange={(value) => updateFormData('kitchenRehab', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kitchen work needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Work Needed</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic Updates</SelectItem>
                    <SelectItem value="moderate">Moderate Renovation</SelectItem>
                    <SelectItem value="full-remodel">Full Kitchen Remodel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="bathroomRehab">Bathroom Renovation</Label>
                <Select value={formData.bathroomRehab || ""} onValueChange={(value) => updateFormData('bathroomRehab', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bathroom work needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Work Needed</SelectItem>
                    <SelectItem value="cosmetic">Cosmetic Updates</SelectItem>
                    <SelectItem value="moderate">Moderate Renovation</SelectItem>
                    <SelectItem value="full-remodel">Full Bathroom Remodel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="flooringRehab">Flooring Work</Label>
                <Select value={formData.flooringRehab || ""} onValueChange={(value) => updateFormData('flooringRehab', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Flooring work needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Work Needed</SelectItem>
                    <SelectItem value="refinish">Refinish Existing</SelectItem>
                    <SelectItem value="partial-replacement">Partial Replacement</SelectItem>
                    <SelectItem value="full-replacement">Full Flooring Replacement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="exteriorWork">Exterior Work</Label>
                <Select value={formData.exteriorWork || ""} onValueChange={(value) => updateFormData('exteriorWork', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Exterior work needed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Work Needed</SelectItem>
                    <SelectItem value="paint-landscaping">Paint & Landscaping</SelectItem>
                    <SelectItem value="roof-siding">Roof/Siding Work</SelectItem>
                    <SelectItem value="major-exterior">Major Exterior Renovation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="projectTimeline">Project Timeline</Label>
                <Select value={formData.projectTimeline || ""} onValueChange={(value) => updateFormData('projectTimeline', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Expected completion time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-days">30 Days or Less</SelectItem>
                    <SelectItem value="60-days">60 Days</SelectItem>
                    <SelectItem value="90-days">90 Days</SelectItem>
                    <SelectItem value="120-days">120 Days</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                  </SelectContent>
                </Select>
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

          {/* Contractor Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contractor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contractorSelected">Contractor Selected</Label>
                <Select value={formData.contractorSelected || ""} onValueChange={(value) => updateFormData('contractorSelected', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Contractor status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Contractor Selected</SelectItem>
                    <SelectItem value="no">No - Still Searching</SelectItem>
                    <SelectItem value="diy">DIY - Doing Work Myself</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.contractorSelected === 'yes' && (
                <>
                  <div>
                    <Label htmlFor="contractorName">Contractor Name/Company</Label>
                    <Input
                      id="contractorName"
                      value={formData.contractorName}
                      onChange={(e) => updateFormData('contractorName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contractorLicense">Contractor License Number</Label>
                    <Input
                      id="contractorLicense"
                      value={formData.contractorLicense}
                      onChange={(e) => updateFormData('contractorLicense', e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Experience & Additional Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="previousProjects">Previous Projects Description</Label>
                <Textarea
                  id="previousProjects"
                  value={formData.previousProjects}
                  onChange={(e) => updateFormData('previousProjects', e.target.value)}
                  placeholder="Describe your previous rehab/investment projects and outcomes"
                />
              </div>
              <div>
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => updateFormData('additionalComments', e.target.value)}
                  placeholder="Any additional information about your project or financing needs"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.loanType} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit Rehab/Investor Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}