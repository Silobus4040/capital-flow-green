import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { usePublicApplications } from "@/hooks/usePublicApplications";

interface CommercialMortgageFormData {
  // Borrower Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  entityName: string;
  borrowerType: string;
  
  // Property Information
  propertyAddress: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyType: string;
  propertyDescription: string;
  purchasePrice: string;
  currentValue: string;
  
  // Loan Information
  loanAmount: string;
  loanPurpose: string;
  loanTerm: string;
  downPayment: string;
  
  // Financial Information
  grossAnnualIncome: string;
  netOperatingIncome: string;
  existingMortgage: string;
  liquidAssets: string;
  
  // Additional Information
  experience: string;
  timeframe: string;
  additionalComments: string;
}

interface CommercialMortgageFormProps {
  onSubmitSuccess?: () => void;
}

export default function CommercialMortgageForm({ onSubmitSuccess }: CommercialMortgageFormProps = {}) {
  const { toast } = useToast();
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const [formData, setFormData] = useState<CommercialMortgageFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    entityName: "",
    borrowerType: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    propertyType: "",
    propertyDescription: "",
    purchasePrice: "",
    currentValue: "",
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    downPayment: "",
    grossAnnualIncome: "",
    netOperatingIncome: "",
    existingMortgage: "",
    liquidAssets: "",
    experience: "",
    timeframe: "",
    additionalComments: ""
  });

  const updateFormData = (field: keyof CommercialMortgageFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const applicationData = {
        programId: 'commercial-mortgage',
        programName: 'Commercial Mortgage',
        borrowerName: formData.entityName?.trim() || `${formData.firstName} ${formData.lastName}`,
        borrowerEmail: formData.email,
        borrowerPhone: formData.phone,
        propertyAddress: formData.propertyAddress,
        propertyCity: formData.propertyCity,
        propertyState: formData.propertyState,
        propertyZip: formData.propertyZip,
        requestedAmount: formData.loanAmount ? parseFloat(formData.loanAmount) : undefined,
        loanPurpose: formData.loanPurpose,
        programSpecificData: formData
      };

      await submitPublicApplication(applicationData);
      
      // Reset form on success
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        entityName: "",
        borrowerType: "",
        propertyAddress: "",
        propertyCity: "",
        propertyState: "",
        propertyZip: "",
        propertyType: "",
        propertyDescription: "",
        purchasePrice: "",
        currentValue: "",
        loanAmount: "",
        loanPurpose: "",
        loanTerm: "",
        downPayment: "",
        grossAnnualIncome: "",
        netOperatingIncome: "",
        existingMortgage: "",
        liquidAssets: "",
        experience: "",
        timeframe: "",
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

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Commercial Mortgage Application</CardTitle>
        <CardDescription>
          Complete this comprehensive form to apply for commercial mortgage financing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Borrower Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Borrower Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="entityName">Company/Entity Name</Label>
                <Input
                  id="entityName"
                  value={formData.entityName}
                  onChange={(e) => updateFormData('entityName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="borrowerType">Borrower Type</Label>
                <Select value={formData.borrowerType || ""} onValueChange={(value) => updateFormData('borrowerType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select borrower type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="trust">Trust</SelectItem>
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
                    <SelectItem value="office">Office Building</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="industrial">Industrial/Warehouse</SelectItem>
                    <SelectItem value="multifamily">Multifamily</SelectItem>
                    <SelectItem value="hotel">Hotel/Hospitality</SelectItem>
                    <SelectItem value="self-storage">Self Storage</SelectItem>
                    <SelectItem value="mixed-use">Mixed Use</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="purchasePrice">Purchase Price</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={formData.purchasePrice}
                  onChange={(e) => updateFormData('purchasePrice', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="currentValue">Current Market Value</Label>
                <Input
                  id="currentValue"
                  type="number"
                  value={formData.currentValue}
                  onChange={(e) => updateFormData('currentValue', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="propertyDescription">Property Description</Label>
                <Textarea
                  id="propertyDescription"
                  value={formData.propertyDescription}
                  onChange={(e) => updateFormData('propertyDescription', e.target.value)}
                  placeholder="Describe the property, its condition, tenancy, etc."
                />
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Loan Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="loanAmount">Requested Loan Amount *</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) => updateFormData('loanAmount', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="loanPurpose">Loan Purpose *</Label>
                <Select value={formData.loanPurpose || ""} onValueChange={(value) => updateFormData('loanPurpose', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="refinance">Refinance</SelectItem>
                    <SelectItem value="cash-out-refi">Cash-Out Refinance</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="bridge">Bridge Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="loanTerm">Desired Loan Term</Label>
                <Select value={formData.loanTerm || ""} onValueChange={(value) => updateFormData('loanTerm', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-years">5 Years</SelectItem>
                    <SelectItem value="7-years">7 Years</SelectItem>
                    <SelectItem value="10-years">10 Years</SelectItem>
                    <SelectItem value="15-years">15 Years</SelectItem>
                    <SelectItem value="20-years">20 Years</SelectItem>
                    <SelectItem value="25-years">25 Years</SelectItem>
                    <SelectItem value="30-years">30 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="downPayment">Down Payment Amount</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={formData.downPayment}
                  onChange={(e) => updateFormData('downPayment', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="grossAnnualIncome">Gross Annual Income</Label>
                <Input
                  id="grossAnnualIncome"
                  type="number"
                  value={formData.grossAnnualIncome}
                  onChange={(e) => updateFormData('grossAnnualIncome', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="netOperatingIncome">Net Operating Income (NOI)</Label>
                <Input
                  id="netOperatingIncome"
                  type="number"
                  value={formData.netOperatingIncome}
                  onChange={(e) => updateFormData('netOperatingIncome', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="existingMortgage">Existing Mortgage Balance</Label>
                <Input
                  id="existingMortgage"
                  type="number"
                  value={formData.existingMortgage}
                  onChange={(e) => updateFormData('existingMortgage', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="liquidAssets">Liquid Assets</Label>
                <Input
                  id="liquidAssets"
                  type="number"
                  value={formData.liquidAssets}
                  onChange={(e) => updateFormData('liquidAssets', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="experience">Real Estate Experience</Label>
                <Select value={formData.experience || ""} onValueChange={(value) => updateFormData('experience', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-time">First Time Investor</SelectItem>
                    <SelectItem value="1-5-years">1-5 Years</SelectItem>
                    <SelectItem value="5-10-years">5-10 Years</SelectItem>
                    <SelectItem value="10-plus-years">10+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeframe">Desired Closing Timeframe</Label>
                <Select value={formData.timeframe || ""} onValueChange={(value) => updateFormData('timeframe', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asap">ASAP</SelectItem>
                    <SelectItem value="30-days">Within 30 Days</SelectItem>
                    <SelectItem value="60-days">Within 60 Days</SelectItem>
                    <SelectItem value="90-days">Within 90 Days</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => updateFormData('additionalComments', e.target.value)}
                  placeholder="Any additional information about your financing needs, special circumstances, or questions..."
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit Commercial Mortgage Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}