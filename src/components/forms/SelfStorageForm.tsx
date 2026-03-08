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

interface SelfStorageFormData {
  // Basic Information
  entityName: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  
  // Facility Information
  facilityName: string;
  facilityAddress: string;
  facilityCity: string;
  facilityState: string;
  facilityZip: string;
  
  // Loan Information
  loanType: string;
  requestedAmount: string;
  
  // Facility Details
  totalUnits: string;
  totalSquareFootage: string;
  averageUnitSize: string;
  facilityAge: string;
  
  // Financial Performance
  monthlyRevenue: string;
  occupancyRate: string;
  averageRentPerUnit: string;
  operatingExpenses: string;
  netOperatingIncome: string;
  
  // Market Information
  competitorAnalysis: string;
  marketDemand: string;
  expansionOpportunities: string;
  
  // Management
  managementType: string;
  onSiteManager: string;
  securityFeatures: string;
  
  // Additional Information
  additionalComments: string;
}

interface SelfStorageFormProps {
  onSubmitSuccess?: () => void;
}

export default function SelfStorageForm({ onSubmitSuccess }: SelfStorageFormProps = {}) {
  const { toast } = useToast();
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const [formData, setFormData] = useState<SelfStorageFormData>({
    entityName: "",
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    facilityName: "",
    facilityAddress: "",
    facilityCity: "",
    facilityState: "",
    facilityZip: "",
    loanType: "",
    requestedAmount: "",
    totalUnits: "",
    totalSquareFootage: "",
    averageUnitSize: "",
    facilityAge: "",
    monthlyRevenue: "",
    occupancyRate: "",
    averageRentPerUnit: "",
    operatingExpenses: "",
    netOperatingIncome: "",
    competitorAnalysis: "",
    marketDemand: "",
    expansionOpportunities: "",
    managementType: "",
    onSiteManager: "",
    securityFeatures: "",
    additionalComments: ""
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      const applicationData = {
        programId: 'self-storage-financing',
        programName: 'Self Storage Financing',
        borrowerName: (formData as any).entityName?.trim() || formData.borrowerName,
        borrowerEmail: formData.borrowerEmail,
        borrowerPhone: formData.borrowerPhone,
        propertyAddress: formData.facilityAddress,
        propertyCity: formData.facilityCity,
        propertyState: formData.facilityState,
        propertyZip: formData.facilityZip,
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
        facilityName: "",
        facilityAddress: "",
        facilityCity: "",
        facilityState: "",
        facilityZip: "",
        loanType: "",
        requestedAmount: "",
        totalUnits: "",
        totalSquareFootage: "",
        averageUnitSize: "",
        facilityAge: "",
        monthlyRevenue: "",
        occupancyRate: "",
        averageRentPerUnit: "",
        operatingExpenses: "",
        netOperatingIncome: "",
        competitorAnalysis: "",
        marketDemand: "",
        expansionOpportunities: "",
        managementType: "",
        onSiteManager: "",
        securityFeatures: "",
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
    { value: 'purchase', label: 'Standard Purchase Loan' },
    { value: 'rate-and-term-refinance', label: 'Rate and Term Refinance' },
    { value: 'purchase-dscr', label: 'Purchase with DSCR Loan' },
    { value: 'cash-out-refinance', label: 'Cash-out Refinance' },
    { value: 'bridge-loan', label: 'Bridge Loan' },
    { value: '100-financing', label: '100% Financing Program' }
  ];

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Self Storage Financing Application</CardTitle>
        <CardDescription>
          Specialized financing for self storage facilities and operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Type Selection */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <Label htmlFor="loanType" className="text-lg font-semibold">Self Storage Loan Type *</Label>
            <Select value={formData.loanType || ""} onValueChange={(value) => updateFormData('loanType', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select loan type for self storage facility" />
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
              <div className="md:col-span-2">
                <Label htmlFor="entityName">Company/Entity Name</Label>
                <Input
                  id="entityName"
                  value={(formData as any).entityName}
                  onChange={(e) => updateFormData('entityName', e.target.value)}
                  placeholder="If borrowing as a company/entity"
                />
              </div>
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

          {/* Facility Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Self Storage Facility Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facilityName">Facility Name</Label>
                <Input
                  id="facilityName"
                  value={formData.facilityName}
                  onChange={(e) => updateFormData('facilityName', e.target.value)}
                  placeholder="Storage facility business name"
                />
              </div>
              <div>
                <Label htmlFor="totalUnits">Total Number of Units</Label>
                <Input
                  id="totalUnits"
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) => updateFormData('totalUnits', e.target.value)}
                  placeholder="Total storage units"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="facilityAddress">Facility Address</Label>
                <Input
                  id="facilityAddress"
                  value={formData.facilityAddress}
                  onChange={(e) => updateFormData('facilityAddress', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="facilityCity">City</Label>
                <Input
                  id="facilityCity"
                  value={formData.facilityCity}
                  onChange={(e) => updateFormData('facilityCity', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="facilityState">State</Label>
                <Input
                  id="facilityState"
                  value={formData.facilityState}
                  onChange={(e) => updateFormData('facilityState', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="facilityZip">ZIP Code</Label>
                <Input
                  id="facilityZip"
                  value={formData.facilityZip}
                  onChange={(e) => updateFormData('facilityZip', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="totalSquareFootage">Total Square Footage</Label>
                <Input
                  id="totalSquareFootage"
                  type="number"
                  value={formData.totalSquareFootage}
                  onChange={(e) => updateFormData('totalSquareFootage', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="facilityAge">Facility Age (years)</Label>
                <Input
                  id="facilityAge"
                  type="number"
                  value={formData.facilityAge}
                  onChange={(e) => updateFormData('facilityAge', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Financial Performance */}
          <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800">Financial Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyRevenue">Monthly Revenue ($)</Label>
                <Input
                  id="monthlyRevenue"
                  type="number"
                  value={formData.monthlyRevenue}
                  onChange={(e) => updateFormData('monthlyRevenue', e.target.value)}
                  placeholder="Average monthly income"
                />
              </div>
              <div>
                <Label htmlFor="occupancyRate">Current Occupancy Rate (%)</Label>
                <Input
                  id="occupancyRate"
                  type="number"
                  value={formData.occupancyRate}
                  onChange={(e) => updateFormData('occupancyRate', e.target.value)}
                  placeholder="Percentage of units rented"
                />
              </div>
              <div>
                <Label htmlFor="averageRentPerUnit">Average Rent Per Unit ($)</Label>
                <Input
                  id="averageRentPerUnit"
                  type="number"
                  value={formData.averageRentPerUnit}
                  onChange={(e) => updateFormData('averageRentPerUnit', e.target.value)}
                  placeholder="Average monthly rent per unit"
                />
              </div>
              <div>
                <Label htmlFor="operatingExpenses">Monthly Operating Expenses ($)</Label>
                <Input
                  id="operatingExpenses"
                  type="number"
                  value={formData.operatingExpenses}
                  onChange={(e) => updateFormData('operatingExpenses', e.target.value)}
                  placeholder="Total monthly expenses"
                />
              </div>
              <div>
                <Label htmlFor="netOperatingIncome">Net Operating Income (Monthly $)</Label>
                <Input
                  id="netOperatingIncome"
                  type="number"
                  value={formData.netOperatingIncome}
                  onChange={(e) => updateFormData('netOperatingIncome', e.target.value)}
                  placeholder="Monthly revenue - expenses"
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

          {/* Management & Operations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Management & Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="managementType">Management Type</Label>
                <Select value={formData.managementType || ""} onValueChange={(value) => updateFormData('managementType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select management type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner-operated">Owner Operated</SelectItem>
                    <SelectItem value="professional-management">Professional Management Company</SelectItem>
                    <SelectItem value="onsite-manager">On-Site Manager</SelectItem>
                    <SelectItem value="remote-management">Remote Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="onSiteManager">On-Site Manager</Label>
                <Select value={formData.onSiteManager || ""} onValueChange={(value) => updateFormData('onSiteManager', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Manager availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Full Time</SelectItem>
                    <SelectItem value="part-time">Yes - Part Time</SelectItem>
                    <SelectItem value="no">No - Remote Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="securityFeatures">Security Features</Label>
                <Textarea
                  id="securityFeatures"
                  value={formData.securityFeatures}
                  onChange={(e) => updateFormData('securityFeatures', e.target.value)}
                  placeholder="Describe security systems, cameras, access controls, lighting, etc."
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Market & Growth Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="competitorAnalysis">Local Competition Analysis</Label>
                <Textarea
                  id="competitorAnalysis"
                  value={formData.competitorAnalysis}
                  onChange={(e) => updateFormData('competitorAnalysis', e.target.value)}
                  placeholder="Describe nearby self storage facilities, their rates, and occupancy"
                />
              </div>
              <div>
                <Label htmlFor="marketDemand">Market Demand Assessment</Label>
                <Textarea
                  id="marketDemand"
                  value={formData.marketDemand}
                  onChange={(e) => updateFormData('marketDemand', e.target.value)}
                  placeholder="Local market conditions, population growth, housing trends"
                />
              </div>
              <div>
                <Label htmlFor="expansionOpportunities">Expansion Opportunities</Label>
                <Textarea
                  id="expansionOpportunities"
                  value={formData.expansionOpportunities}
                  onChange={(e) => updateFormData('expansionOpportunities', e.target.value)}
                  placeholder="Additional land, building expansion, unit size optimization"
                />
              </div>
              <div>
                <Label htmlFor="additionalComments">Additional Comments</Label>
                <Textarea
                  id="additionalComments"
                  value={formData.additionalComments}
                  onChange={(e) => updateFormData('additionalComments', e.target.value)}
                  placeholder="Any additional information about your self storage financing needs"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.loanType} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit Self Storage Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}