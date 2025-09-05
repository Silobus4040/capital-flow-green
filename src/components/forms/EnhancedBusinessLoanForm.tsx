import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { usePublicApplications } from "@/hooks/usePublicApplications";
import BusinessLoanSecurityFields from "./BusinessLoanSecurityFields";

interface BusinessLoanFormData {
  // Basic Information
  businessName: string;
  businessType: string;
  yearEstablished: string;
  federalTaxId: string;
  
  // Contact Information
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  businessAddress: string;
  
  // Loan Information
  loanAmount: string;
  loanPurpose: string;
  securityType: string;
  
  // Financial Information
  annualRevenue: string;
  monthlyExpenses: string;
  existingDebts: string;
  businessBankAccount: string;
  
  // Additional Information
  yearsInBusiness: string;
  numberOfEmployees: string;
  businessDescription: string;
  additionalComments: string;
}

interface EnhancedBusinessLoanFormProps {
  onSubmitSuccess?: () => void;
}

export default function EnhancedBusinessLoanForm({ onSubmitSuccess }: EnhancedBusinessLoanFormProps = {}) {
  const { toast } = useToast();
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const [formData, setFormData] = useState<BusinessLoanFormData>({
    businessName: "",
    businessType: "",
    yearEstablished: "",
    federalTaxId: "",
    contactName: "",
    contactTitle: "",
    contactEmail: "",
    contactPhone: "",
    businessAddress: "",
    loanAmount: "",
    loanPurpose: "",
    securityType: "",
    annualRevenue: "",
    monthlyExpenses: "",
    existingDebts: "",
    businessBankAccount: "",
    yearsInBusiness: "",
    numberOfEmployees: "",
    businessDescription: "",
    additionalComments: ""
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData(field, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.businessName || !formData.contactName || !formData.contactEmail || !formData.loanAmount || !formData.securityType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const applicationData = {
        programId: 'enhanced-business-loan',
        programName: 'Enhanced Business Loan',
        borrowerName: formData.contactName,
        borrowerEmail: formData.contactEmail,
        borrowerPhone: formData.contactPhone,
        propertyAddress: formData.businessAddress,
        requestedAmount: parseFloat(formData.loanAmount) || 0,
        loanPurpose: formData.loanPurpose,
        programSpecificData: formData,
      };

      await submitPublicApplication(applicationData);

      // Reset form on success
      setFormData({
        businessName: "",
        businessType: "",
        yearEstablished: "",
        federalTaxId: "",
        contactName: "",
        contactTitle: "",
        contactEmail: "",
        contactPhone: "",
        businessAddress: "",
        loanAmount: "",
        loanPurpose: "",
        securityType: "",
        annualRevenue: "",
        monthlyExpenses: "",
        existingDebts: "",
        businessBankAccount: "",
        yearsInBusiness: "",
        numberOfEmployees: "",
        businessDescription: "",
        additionalComments: ""
      });

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
      setFormData({
        businessName: "",
        businessType: "",
        yearEstablished: "",
        federalTaxId: "",
        contactName: "",
        contactTitle: "",
        contactEmail: "",
        contactPhone: "",
        businessAddress: "",
        loanAmount: "",
        loanPurpose: "",
        securityType: "",
        annualRevenue: "",
        monthlyExpenses: "",
        existingDebts: "",
        businessBankAccount: "",
        yearsInBusiness: "",
        numberOfEmployees: "",
        businessDescription: "",
        additionalComments: ""
      });
      
    } catch (error: any) {
      // Error handling is done in the hook
    }
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Business Loan Application</CardTitle>
        <CardDescription>
          Complete application for business financing with security-based options
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange('businessName')}
                  required
                />
              </div>
              <div>
                <Label htmlFor="businessType">Business Type</Label>
                <Select onValueChange={(value) => updateFormData('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corporation">Corporation</SelectItem>
                    <SelectItem value="llc">LLC</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="yearEstablished">Year Established</Label>
                <Input
                  id="yearEstablished"
                  type="number"
                  value={formData.yearEstablished}
                  onChange={(e) => updateFormData('yearEstablished', e.target.value)}
                  placeholder="YYYY"
                />
              </div>
              <div>
                <Label htmlFor="federalTaxId">Federal Tax ID (EIN)</Label>
                <Input
                  id="federalTaxId"
                  value={formData.federalTaxId}
                  onChange={(e) => updateFormData('federalTaxId', e.target.value)}
                  placeholder="XX-XXXXXXX"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="businessAddress">Business Address</Label>
                <Input
                  id="businessAddress"
                  value={formData.businessAddress}
                  onChange={(e) => updateFormData('businessAddress', e.target.value)}
                  placeholder="Complete business address"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => updateFormData('contactName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactTitle">Title/Position</Label>
                <Input
                  id="contactTitle"
                  value={formData.contactTitle}
                  onChange={(e) => updateFormData('contactTitle', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email Address *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => updateFormData('contactEmail', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Phone Number *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => updateFormData('contactPhone', e.target.value)}
                  required
                />
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
                  placeholder="Up to $10,000,000"
                  required
                />
              </div>
              <div>
                <Label htmlFor="securityType">Security Type *</Label>
                <Select onValueChange={(value) => updateFormData('securityType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select security type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="real-estate-security">Real Estate Security</SelectItem>
                    <SelectItem value="credit-protection-insurance">Credit Protection Insurance</SelectItem>
                    <SelectItem value="personal-guarantee">Personal Guarantee</SelectItem>
                    <SelectItem value="bank-guarantee">Bank Guarantee</SelectItem>
                    <SelectItem value="business-assets">Business Assets</SelectItem>
                    <SelectItem value="inventory">Inventory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="loanPurpose">Loan Purpose</Label>
                <Textarea
                  id="loanPurpose"
                  value={formData.loanPurpose}
                  onChange={(e) => updateFormData('loanPurpose', e.target.value)}
                  placeholder="Describe how the loan will be used"
                />
              </div>
            </div>
          </div>

          {/* Security-Specific Fields */}
          {formData.securityType && (
            <BusinessLoanSecurityFields
              securityType={formData.securityType}
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="annualRevenue">Annual Revenue ($)</Label>
                <Input
                  id="annualRevenue"
                  type="number"
                  value={formData.annualRevenue}
                  onChange={(e) => updateFormData('annualRevenue', e.target.value)}
                  placeholder="Last 12 months revenue"
                />
              </div>
              <div>
                <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={formData.monthlyExpenses}
                  onChange={(e) => updateFormData('monthlyExpenses', e.target.value)}
                  placeholder="Average monthly operating expenses"
                />
              </div>
              <div>
                <Label htmlFor="existingDebts">Existing Debts ($)</Label>
                <Input
                  id="existingDebts"
                  type="number"
                  value={formData.existingDebts}
                  onChange={(e) => updateFormData('existingDebts', e.target.value)}
                  placeholder="Total outstanding business debt"
                />
              </div>
              <div>
                <Label htmlFor="businessBankAccount">Primary Bank</Label>
                <Input
                  id="businessBankAccount"
                  value={formData.businessBankAccount}
                  onChange={(e) => updateFormData('businessBankAccount', e.target.value)}
                  placeholder="Primary business banking institution"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="yearsInBusiness">Years in Business</Label>
                <Input
                  id="yearsInBusiness"
                  type="number"
                  value={formData.yearsInBusiness}
                  onChange={(e) => updateFormData('yearsInBusiness', e.target.value)}
                  placeholder="Years of operation"
                />
              </div>
              <div>
                <Label htmlFor="numberOfEmployees">Number of Employees</Label>
                <Input
                  id="numberOfEmployees"
                  type="number"
                  value={formData.numberOfEmployees}
                  onChange={(e) => updateFormData('numberOfEmployees', e.target.value)}
                  placeholder="Total employees"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => updateFormData('businessDescription', e.target.value)}
                  placeholder="Describe your business operations, industry, services/products"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => updateFormData('additionalComments', e.target.value)}
                  placeholder="Any additional information or special circumstances"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.securityType} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit Business Loan Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}