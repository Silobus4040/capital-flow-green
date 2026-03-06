import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { usePublicApplications } from "@/hooks/usePublicApplications";
import { Checkbox } from "@/components/ui/checkbox";

interface BusinessAcquisitionFormData {
  // Loan Type
  loanType: string;
  
  // Business Being Acquired
  targetBusinessName: string;
  targetBusinessType: string;
  targetBusinessAddress: string;
  targetBusinessCity: string;
  targetBusinessState: string;
  targetBusinessZip: string;
  acquisitionType: string;
  
  // Contact Information
  entityName: string;
  firstName: string;
  lastName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  borrowerTitle: string;
  
  // Loan Information
  loanAmount: string;
  loanPurpose: string;
  acquisitionPrice: string;
  downPayment: string;
  
  // Collateral Information
  primaryCollateral: string;
  hasSecondaryCollateral: boolean;
  secondaryCollateralDescription: string;
  ownershipPercentage: string;
  
  // Credit Protection Insurance
  wantsCPI: boolean;
  
  // Financial Information
  targetAnnualRevenue: string;
  targetNOI: string;
  targetDSCR: string;
  
  // Documentation Available
  hasTaxReturns: boolean;
  hasProfitLoss: boolean;
  hasBalanceSheet: boolean;
  hasPurchaseAgreement: boolean;
  hasBusinessValuation: boolean;
  
  // Experience
  yearsExperience: string;
  previousAcquisitions: string;
  
  additionalComments: string;
}

interface BusinessAcquisitionFormProps {
  onSubmitSuccess?: () => void;
}

export default function BusinessAcquisitionForm({ onSubmitSuccess }: BusinessAcquisitionFormProps = {}) {
  const { toast } = useToast();
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const [formData, setFormData] = useState<BusinessAcquisitionFormData>({
    loanType: "",
    targetBusinessName: "",
    targetBusinessType: "",
    targetBusinessAddress: "",
    targetBusinessCity: "",
    targetBusinessState: "",
    targetBusinessZip: "",
    acquisitionType: "",
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    borrowerTitle: "",
    loanAmount: "",
    loanPurpose: "",
    acquisitionPrice: "",
    downPayment: "",
    primaryCollateral: "",
    hasSecondaryCollateral: false,
    secondaryCollateralDescription: "",
    ownershipPercentage: "",
    wantsCPI: false,
    targetAnnualRevenue: "",
    targetNOI: "",
    targetDSCR: "",
    hasTaxReturns: false,
    hasProfitLoss: false,
    hasBalanceSheet: false,
    hasPurchaseAgreement: false,
    hasBusinessValuation: false,
    yearsExperience: "",
    previousAcquisitions: "",
    additionalComments: ""
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!formData.entityName && (!formData.firstName || !formData.lastName)) || !formData.borrowerEmail || !formData.borrowerPhone || !formData.loanAmount || !formData.loanType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const applicationData = {
        programId: 'business-acquisition',
        programName: 'Business Acquisition Financing',
        borrowerName: formData.entityName?.trim() || `${formData.firstName} ${formData.lastName}`.trim(),
        borrowerEmail: formData.borrowerEmail,
        borrowerPhone: formData.borrowerPhone,
        propertyAddress: formData.targetBusinessAddress,
        propertyCity: formData.targetBusinessCity,
        propertyState: formData.targetBusinessState,
        propertyZip: formData.targetBusinessZip,
        requestedAmount: parseFloat(formData.loanAmount) || 0,
        loanPurpose: formData.loanPurpose,
        programSpecificData: formData,
      };

      await submitPublicApplication(applicationData);

      // Reset form on success
      setFormData({
        loanType: "",
        targetBusinessName: "",
        targetBusinessType: "",
        targetBusinessAddress: "",
        targetBusinessCity: "",
        targetBusinessState: "",
        targetBusinessZip: "",
        acquisitionType: "",
        borrowerName: "",
        borrowerEmail: "",
        borrowerPhone: "",
        borrowerTitle: "",
        loanAmount: "",
        loanPurpose: "",
        acquisitionPrice: "",
        downPayment: "",
        primaryCollateral: "",
        hasSecondaryCollateral: false,
        secondaryCollateralDescription: "",
        ownershipPercentage: "",
        wantsCPI: false,
        targetAnnualRevenue: "",
        targetNOI: "",
        targetDSCR: "",
        hasTaxReturns: false,
        hasProfitLoss: false,
        hasBalanceSheet: false,
        hasPurchaseAgreement: false,
        hasBusinessValuation: false,
        yearsExperience: "",
        previousAcquisitions: "",
        additionalComments: ""
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      
    } catch (error: any) {
      // Error handling is done in the hook
    }
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Business Acquisition Loan Application</CardTitle>
        <CardDescription>
          Complete application for business acquisition, management buyout, or partner buy-in financing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Financing Type *</h3>
            <Select value={formData.loanType || ""} onValueChange={(value) => updateFormData('loanType', value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your financing type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard-acquisition">Standard Acquisition Loan (Asset or Stock Purchase)</SelectItem>
                <SelectItem value="management-buyout">Management Buyout (MBO)</SelectItem>
                <SelectItem value="partner-buyin">Partner Buy-In / Buyout Loan</SelectItem>
                <SelectItem value="seller-carry-blend">Seller Carry Blend Program</SelectItem>
                <SelectItem value="bridge-to-acquisition">Bridge-to-Acquisition Loan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Borrower Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
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
                <Label htmlFor="borrowerTitle">Title/Position</Label>
                <Input
                  id="borrowerTitle"
                  value={formData.borrowerTitle}
                  onChange={(e) => updateFormData('borrowerTitle', e.target.value)}
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
                <Label htmlFor="ownershipPercentage">Ownership Percentage (%)</Label>
                <Input
                  id="ownershipPercentage"
                  type="number"
                  value={formData.ownershipPercentage}
                  onChange={(e) => updateFormData('ownershipPercentage', e.target.value)}
                  placeholder="e.g., 51"
                />
              </div>
            </div>
          </div>

          {/* Target Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Business Being Acquired</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="targetBusinessName">Business Name *</Label>
                <Input
                  id="targetBusinessName"
                  value={formData.targetBusinessName}
                  onChange={(e) => updateFormData('targetBusinessName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="targetBusinessType">Business Type/Industry</Label>
                <Input
                  id="targetBusinessType"
                  value={formData.targetBusinessType}
                  onChange={(e) => updateFormData('targetBusinessType', e.target.value)}
                  placeholder="e.g., Manufacturing, Retail, Healthcare"
                />
              </div>
              <div>
                <Label htmlFor="acquisitionType">Acquisition Type</Label>
                <Select value={formData.acquisitionType || ""} onValueChange={(value) => updateFormData('acquisitionType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select acquisition type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asset-purchase">Asset Purchase</SelectItem>
                    <SelectItem value="stock-purchase">Stock Purchase</SelectItem>
                    <SelectItem value="franchise">Franchise Acquisition</SelectItem>
                    <SelectItem value="merger">Merger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="targetBusinessAddress">Business Address</Label>
                <Input
                  id="targetBusinessAddress"
                  value={formData.targetBusinessAddress}
                  onChange={(e) => updateFormData('targetBusinessAddress', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="targetBusinessCity">City</Label>
                <Input
                  id="targetBusinessCity"
                  value={formData.targetBusinessCity}
                  onChange={(e) => updateFormData('targetBusinessCity', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor="targetBusinessState">State</Label>
                  <Input
                    id="targetBusinessState"
                    value={formData.targetBusinessState}
                    onChange={(e) => updateFormData('targetBusinessState', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="targetBusinessZip">ZIP Code</Label>
                  <Input
                    id="targetBusinessZip"
                    value={formData.targetBusinessZip}
                    onChange={(e) => updateFormData('targetBusinessZip', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Loan Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Requested Loan Amount ($) *</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => updateFormData('loanAmount', e.target.value)}
                  placeholder="Minimum $500,000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="acquisitionPrice">Total Acquisition Price ($)</Label>
                <Input
                  id="acquisitionPrice"
                  type="number"
                  value={formData.acquisitionPrice}
                  onChange={(e) => updateFormData('acquisitionPrice', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="downPayment">Down Payment Amount ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => updateFormData('downPayment', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="loanPurpose">Loan Purpose / Use of Funds</Label>
                <Textarea
                  id="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={(e) => updateFormData('loanPurpose', e.target.value)}
                  placeholder="Describe the purpose of this acquisition and how funds will be used"
                />
              </div>
            </div>
          </div>

          {/* Collateral Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Collateral Structure</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our loan structure prioritizes business asset collateral, with secondary collateral only when needed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="primaryCollateral">Primary Collateral (Business Assets)</Label>
                <Select value={formData.primaryCollateral || ""} onValueChange={(value) => updateFormData('primaryCollateral', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary collateral type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="equipment">Equipment & Machinery</SelectItem>
                    <SelectItem value="receivables">Accounts Receivable</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                    <SelectItem value="business-real-estate">Business Real Estate</SelectItem>
                    <SelectItem value="intellectual-property">Intellectual Property (Case-by-Case)</SelectItem>
                    <SelectItem value="combination">Combination of Assets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2 flex items-center space-x-2">
                <Checkbox
                  id="hasSecondaryCollateral"
                  checked={formData.hasSecondaryCollateral}
                  onCheckedChange={(checked) => updateFormData('hasSecondaryCollateral', checked)}
                />
                <Label htmlFor="hasSecondaryCollateral" className="text-sm">
                  I have additional real estate or collateral to offer as secondary security
                </Label>
              </div>
              {formData.hasSecondaryCollateral && (
                <div className="md:col-span-2">
                  <Label htmlFor="secondaryCollateralDescription">Secondary Collateral Description</Label>
                  <Textarea
                    id="secondaryCollateralDescription"
                    value={formData.secondaryCollateralDescription}
                    onChange={(e) => updateFormData('secondaryCollateralDescription', e.target.value)}
                    placeholder="Describe additional collateral (real estate address, estimated value, etc.)"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Credit Protection Insurance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Credit Protection Insurance (Optional)</h3>
            <div className="bg-primary/5 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-4">
                Our in-house Credit Protection Insurance (CPI) covers unforeseen events such as death, disability, 
                or business interruption. Rates are up to 40% lower than third-party coverage.
              </p>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wantsCPI"
                  checked={formData.wantsCPI}
                  onCheckedChange={(checked) => updateFormData('wantsCPI', checked)}
                />
                <Label htmlFor="wantsCPI" className="text-sm">
                  I'm interested in receiving a Credit Protection Insurance quote
                </Label>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                📧 Contact: Insuranceunderwriter@ccif-inc.com
              </p>
            </div>
          </div>

          {/* Target Business Financials */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Target Business Financials</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="targetAnnualRevenue">Annual Revenue ($)</Label>
                <Input
                  id="targetAnnualRevenue"
                  type="number"
                  value={formData.targetAnnualRevenue}
                  onChange={(e) => updateFormData('targetAnnualRevenue', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="targetNOI">Net Operating Income ($)</Label>
                <Input
                  id="targetNOI"
                  type="number"
                  value={formData.targetNOI}
                  onChange={(e) => updateFormData('targetNOI', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="targetDSCR">Estimated DSCR</Label>
                <Input
                  id="targetDSCR"
                  value={formData.targetDSCR}
                  onChange={(e) => updateFormData('targetDSCR', e.target.value)}
                  placeholder="Target: ≥ 1.25x"
                />
              </div>
            </div>
          </div>

          {/* Documentation Available */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Documentation Available</h3>
            <p className="text-sm text-muted-foreground">Check all documents you can provide:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasTaxReturns"
                  checked={formData.hasTaxReturns}
                  onCheckedChange={(checked) => updateFormData('hasTaxReturns', checked)}
                />
                <Label htmlFor="hasTaxReturns" className="text-sm">2 years of business and/or personal tax returns</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasProfitLoss"
                  checked={formData.hasProfitLoss}
                  onCheckedChange={(checked) => updateFormData('hasProfitLoss', checked)}
                />
                <Label htmlFor="hasProfitLoss" className="text-sm">Current Year-to-Date Profit & Loss</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasBalanceSheet"
                  checked={formData.hasBalanceSheet}
                  onCheckedChange={(checked) => updateFormData('hasBalanceSheet', checked)}
                />
                <Label htmlFor="hasBalanceSheet" className="text-sm">Current Balance Sheet</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPurchaseAgreement"
                  checked={formData.hasPurchaseAgreement}
                  onCheckedChange={(checked) => updateFormData('hasPurchaseAgreement', checked)}
                />
                <Label htmlFor="hasPurchaseAgreement" className="text-sm">Purchase agreement or letter of intent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasBusinessValuation"
                  checked={formData.hasBusinessValuation}
                  onCheckedChange={(checked) => updateFormData('hasBusinessValuation', checked)}
                />
                <Label htmlFor="hasBusinessValuation" className="text-sm">Business valuation or asset appraisal</Label>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Borrower Experience</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsExperience">Years of Industry Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => updateFormData('yearsExperience', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="previousAcquisitions">Previous Business Acquisitions</Label>
                <Input
                  id="previousAcquisitions"
                  type="number"
                  value={formData.previousAcquisitions}
                  onChange={(e) => updateFormData('previousAcquisitions', e.target.value)}
                  placeholder="Number of previous acquisitions"
                />
              </div>
            </div>
          </div>

          {/* Additional Comments */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            <div>
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => updateFormData('additionalComments', e.target.value)}
                placeholder="Any additional information about the acquisition, special circumstances, or questions"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.loanType} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit Business Acquisition Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
