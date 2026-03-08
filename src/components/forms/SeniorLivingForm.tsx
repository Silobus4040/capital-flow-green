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

interface SeniorLivingFormData {
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
  facilityType: string;
  totalUnits: string;
  totalBeds: string;
  facilityAge: string;
  squareFootage: string;
  
  // Care Levels
  independentLiving: string;
  assistedLiving: string;
  memorycare: string;
  skilledNursing: string;
  
  // Financial Performance
  monthlyRevenue: string;
  occupancyRate: string;
  averageMonthlyRate: string;
  operatingExpenses: string;
  netOperatingIncome: string;
  
  // Staffing & Operations
  totalStaff: string;
  licensedStaff: string;
  staffingModel: string;
  licensingStatus: string;
  
  // Market Information
  marketAnalysis: string;
  waitingList: string;
  competitorAnalysis: string;
  
  // Regulatory & Compliance
  stateLicense: string;
  medicaidCertified: string;
  medicareCertified: string;
  accreditation: string;
  
  // Additional Information
  additionalComments: string;
}

interface SeniorLivingFormProps {
  onSubmitSuccess?: () => void;
}

export default function SeniorLivingForm({ onSubmitSuccess }: SeniorLivingFormProps = {}) {
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SeniorLivingFormData>({
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
    facilityType: "",
    totalUnits: "",
    totalBeds: "",
    facilityAge: "",
    squareFootage: "",
    independentLiving: "",
    assistedLiving: "",
    memorycare: "",
    skilledNursing: "",
    monthlyRevenue: "",
    occupancyRate: "",
    averageMonthlyRate: "",
    operatingExpenses: "",
    netOperatingIncome: "",
    totalStaff: "",
    licensedStaff: "",
    staffingModel: "",
    licensingStatus: "",
    marketAnalysis: "",
    waitingList: "",
    competitorAnalysis: "",
    stateLicense: "",
    medicaidCertified: "",
    medicareCertified: "",
    accreditation: "",
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
      await submitPublicApplication({
        programId: 'senior-living',
        programName: 'Senior Living Financing',
        borrowerName: (formData as any).entityName?.trim() || formData.borrowerName,
        borrowerEmail: formData.borrowerEmail,
        borrowerPhone: formData.borrowerPhone,
        propertyAddress: formData.facilityAddress,
        propertyCity: formData.facilityCity,
        propertyState: formData.facilityState,
        propertyZip: formData.facilityZip,
        requestedAmount: formData.requestedAmount ? parseFloat(formData.requestedAmount) : null,
        loanPurpose: formData.loanType,
        programSpecificData: formData as any
      });

      // Reset form on success
      setFormData({
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
        facilityType: "",
        totalUnits: "",
        totalBeds: "",
        facilityAge: "",
        squareFootage: "",
        independentLiving: "",
        assistedLiving: "",
        memorycare: "",
        skilledNursing: "",
        monthlyRevenue: "",
        occupancyRate: "",
        averageMonthlyRate: "",
        operatingExpenses: "",
        netOperatingIncome: "",
        totalStaff: "",
        licensedStaff: "",
        staffingModel: "",
        licensingStatus: "",
        marketAnalysis: "",
        waitingList: "",
        competitorAnalysis: "",
        stateLicense: "",
        medicaidCertified: "",
        medicareCertified: "",
        accreditation: "",
        additionalComments: ""
      });

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      console.error('Senior Living form submission error:', error);
    }
  };

  const getLoanTypeOptions = () => [
    { value: 'purchase-loan', label: 'Purchase Loan Program' },
    { value: '100-financing', label: '100% Financing' },
    { value: 'refinance', label: 'Refinance Program' },
    { value: 'bridge-loan', label: 'Bridge Loan Program' },
    { value: 'business-operation', label: 'Business Operation Loans' }
  ];

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Senior Living Financing Application</CardTitle>
        <CardDescription>
          Specialized financing for senior living facilities and care operations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Type Selection */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <Label htmlFor="loanType" className="text-lg font-semibold">Senior Living Financing Type *</Label>
            <Select value={formData.loanType || ""} onValueChange={(value) => updateFormData('loanType', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select financing type for your senior living facility" />
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
            <h3 className="text-lg font-semibold border-b pb-2">Senior Living Facility Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="facilityName">Facility Name</Label>
                <Input
                  id="facilityName"
                  value={formData.facilityName}
                  onChange={(e) => updateFormData('facilityName', e.target.value)}
                  placeholder="Senior living facility name"
                />
              </div>
              <div>
                <Label htmlFor="facilityType">Facility Type</Label>
                <Select value={formData.facilityType || ""} onValueChange={(value) => updateFormData('facilityType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select facility type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="independent-living">Independent Living</SelectItem>
                    <SelectItem value="assisted-living">Assisted Living</SelectItem>
                    <SelectItem value="memory-care">Memory Care</SelectItem>
                    <SelectItem value="skilled-nursing">Skilled Nursing</SelectItem>
                    <SelectItem value="ccrc">Continuing Care Retirement Community</SelectItem>
                    <SelectItem value="mixed-care">Mixed Care Levels</SelectItem>
                  </SelectContent>
                </Select>
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
                <Label htmlFor="totalUnits">Total Units/Rooms</Label>
                <Input
                  id="totalUnits"
                  type="number"
                  value={formData.totalUnits}
                  onChange={(e) => updateFormData('totalUnits', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="totalBeds">Total Licensed Beds</Label>
                <Input
                  id="totalBeds"
                  type="number"
                  value={formData.totalBeds}
                  onChange={(e) => updateFormData('totalBeds', e.target.value)}
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
              <div>
                <Label htmlFor="squareFootage">Total Square Footage</Label>
                <Input
                  id="squareFootage"
                  type="number"
                  value={formData.squareFootage}
                  onChange={(e) => updateFormData('squareFootage', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Care Levels */}
          <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800">Care Levels Provided</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="independentLiving">Independent Living Units</Label>
                <Input
                  id="independentLiving"
                  type="number"
                  value={formData.independentLiving}
                  onChange={(e) => updateFormData('independentLiving', e.target.value)}
                  placeholder="Number of independent units"
                />
              </div>
              <div>
                <Label htmlFor="assistedLiving">Assisted Living Units</Label>
                <Input
                  id="assistedLiving"
                  type="number"
                  value={formData.assistedLiving}
                  onChange={(e) => updateFormData('assistedLiving', e.target.value)}
                  placeholder="Number of assisted living units"
                />
              </div>
              <div>
                <Label htmlFor="memorycare">Memory Care Units</Label>
                <Input
                  id="memorycare"
                  type="number"
                  value={formData.memorycare}
                  onChange={(e) => updateFormData('memorycare', e.target.value)}
                  placeholder="Number of memory care units"
                />
              </div>
              <div>
                <Label htmlFor="skilledNursing">Skilled Nursing Beds</Label>
                <Input
                  id="skilledNursing"
                  type="number"
                  value={formData.skilledNursing}
                  onChange={(e) => updateFormData('skilledNursing', e.target.value)}
                  placeholder="Number of skilled nursing beds"
                />
              </div>
            </div>
          </div>

          {/* Financial Performance */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">Financial Performance</h3>
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
                  placeholder="Percentage of occupied units"
                />
              </div>
              <div>
                <Label htmlFor="averageMonthlyRate">Average Monthly Rate ($)</Label>
                <Input
                  id="averageMonthlyRate"
                  type="number"
                  value={formData.averageMonthlyRate}
                  onChange={(e) => updateFormData('averageMonthlyRate', e.target.value)}
                  placeholder="Average resident monthly cost"
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

          {/* Staffing & Operations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Staffing & Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="totalStaff">Total Staff Count</Label>
                <Input
                  id="totalStaff"
                  type="number"
                  value={formData.totalStaff}
                  onChange={(e) => updateFormData('totalStaff', e.target.value)}
                  placeholder="Total employees"
                />
              </div>
              <div>
                <Label htmlFor="licensedStaff">Licensed Healthcare Staff</Label>
                <Input
                  id="licensedStaff"
                  type="number"
                  value={formData.licensedStaff}
                  onChange={(e) => updateFormData('licensedStaff', e.target.value)}
                  placeholder="RNs, LPNs, CNAs"
                />
              </div>
              <div>
                <Label htmlFor="staffingModel">Staffing Model</Label>
                <Select value={formData.staffingModel || ""} onValueChange={(value) => updateFormData('staffingModel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select staffing model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="direct-hire">Direct Hire</SelectItem>
                    <SelectItem value="agency-mix">Mix of Direct & Agency</SelectItem>
                    <SelectItem value="contract-services">Contract Services</SelectItem>
                    <SelectItem value="management-company">Management Company</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="licensingStatus">Licensing Status</Label>
                <Select value={formData.licensingStatus || ""} onValueChange={(value) => updateFormData('licensingStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select licensing status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fully-licensed">Fully Licensed</SelectItem>
                    <SelectItem value="provisional">Provisional License</SelectItem>
                    <SelectItem value="pending">License Pending</SelectItem>
                    <SelectItem value="renewal-process">In Renewal Process</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Regulatory & Compliance */}
          <div className="space-y-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-800">Regulatory & Compliance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="stateLicense">State License Status</Label>
                <Select value={formData.stateLicense || ""} onValueChange={(value) => updateFormData('stateLicense', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="State license status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current & Valid</SelectItem>
                    <SelectItem value="renewal-pending">Renewal Pending</SelectItem>
                    <SelectItem value="provisional">Provisional</SelectItem>
                    <SelectItem value="application-pending">Application Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="medicaidCertified">Medicaid Certified</Label>
                <Select value={formData.medicaidCertified || ""} onValueChange={(value) => updateFormData('medicaidCertified', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Medicaid certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Certified</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Application Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="medicareCertified">Medicare Certified</Label>
                <Select value={formData.medicareCertified || ""} onValueChange={(value) => updateFormData('medicareCertified', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Medicare certification" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes - Certified</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="pending">Application Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accreditation">Accreditation Status</Label>
                <Input
                  id="accreditation"
                  value={formData.accreditation}
                  onChange={(e) => updateFormData('accreditation', e.target.value)}
                  placeholder="Joint Commission, CARF, etc."
                />
              </div>
            </div>
          </div>

          {/* Market Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Market Information</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="marketAnalysis">Local Market Analysis</Label>
                <Textarea
                  id="marketAnalysis"
                  value={formData.marketAnalysis}
                  onChange={(e) => updateFormData('marketAnalysis', e.target.value)}
                  placeholder="Local demographics, senior population trends, market demand"
                />
              </div>
              <div>
                <Label htmlFor="waitingList">Waiting List Status</Label>
                <Input
                  id="waitingList"
                  value={formData.waitingList}
                  onChange={(e) => updateFormData('waitingList', e.target.value)}
                  placeholder="Number of prospects on waiting list"
                />
              </div>
              <div>
                <Label htmlFor="competitorAnalysis">Competitor Analysis</Label>
                <Textarea
                  id="competitorAnalysis"
                  value={formData.competitorAnalysis}
                  onChange={(e) => updateFormData('competitorAnalysis', e.target.value)}
                  placeholder="Other senior living facilities in the area, their rates, occupancy, services"
                />
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            <div>
              <Label htmlFor="additionalComments">Additional Comments</Label>
              <Textarea
                id="additionalComments"
                value={formData.additionalComments}
                onChange={(e) => updateFormData('additionalComments', e.target.value)}
                placeholder="Any additional information about your senior living financing needs, expansion plans, or special circumstances"
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.loanType} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit Senior Living Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}