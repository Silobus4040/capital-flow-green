import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LoanProgram } from "@/data/loanPrograms";
import { useProgramApplications, ProgramApplicationData } from "@/hooks/useProgramApplications";
import { Loader2 } from "lucide-react";

interface ProgramApplicationFormProps {
  program: LoanProgram;
  onSubmitSuccess?: () => void;
}

export default function ProgramApplicationForm({ program, onSubmitSuccess }: ProgramApplicationFormProps) {
  const { submitApplication, isSubmitting } = useProgramApplications();
  
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    propertyAddress: "",
    propertyCity: "",
    propertyState: "",
    propertyZip: "",
    requestedAmount: "",
    loanPurpose: "",
    // Program-specific fields
    programSpecificData: {} as any
  });

  const updateField = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateProgramSpecificData = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      programSpecificData: {
        ...prev.programSpecificData,
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.borrowerName || !formData.borrowerEmail || !formData.borrowerPhone) {
      return;
    }

    const applicationData: ProgramApplicationData = {
      programId: program.id,
      programName: program.name,
      borrowerName: formData.borrowerName,
      borrowerEmail: formData.borrowerEmail,
      borrowerPhone: formData.borrowerPhone,
      propertyAddress: formData.propertyAddress || undefined,
      propertyCity: formData.propertyCity || undefined,
      propertyState: formData.propertyState || undefined,
      propertyZip: formData.propertyZip || undefined,
      requestedAmount: formData.requestedAmount ? Number(formData.requestedAmount) : undefined,
      loanPurpose: formData.loanPurpose || undefined,
      programSpecificData: formData.programSpecificData
    };

    try {
      await submitApplication(applicationData);
      setFormData({
        borrowerName: "",
        borrowerEmail: "",
        borrowerPhone: "",
        propertyAddress: "",
        propertyCity: "",
        propertyState: "",
        propertyZip: "",
        requestedAmount: "",
        loanPurpose: "",
        programSpecificData: {}
      });
      onSubmitSuccess?.();
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const renderProgramSpecificFields = () => {
    switch (program.id) {
      case "rv-park-financing":
        return (
          <>
            <div>
              <Label htmlFor="siteCount">Number of Sites</Label>
              <Input
                id="siteCount"
                type="number"
                value={formData.programSpecificData.siteCount || ""}
                onChange={(e) => updateProgramSpecificData("siteCount", e.target.value)}
                placeholder="Total number of RV sites"
              />
            </div>
            <div>
              <Label htmlFor="seasonality">Seasonal Operation</Label>
              <Select onValueChange={(value) => updateProgramSpecificData("seasonality", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select seasonality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="year-round">Year-Round</SelectItem>
                  <SelectItem value="seasonal">Seasonal</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amenities">Available Amenities</Label>
              <Textarea
                id="amenities"
                value={formData.programSpecificData.amenities || ""}
                onChange={(e) => updateProgramSpecificData("amenities", e.target.value)}
                placeholder="List main amenities (pool, wifi, laundry, etc.)"
              />
            </div>
          </>
        );

      case "commercial-mortgage":
        return (
          <>
            <div>
              <Label htmlFor="noi">Net Operating Income (Annual)</Label>
              <Input
                id="noi"
                type="number"
                value={formData.programSpecificData.noi || ""}
                onChange={(e) => updateProgramSpecificData("noi", e.target.value)}
                placeholder="Annual NOI in dollars"
              />
            </div>
            <div>
              <Label htmlFor="propertyType">Property Type</Label>
              <Select onValueChange={(value) => updateProgramSpecificData("propertyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Building</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="occupancyRate">Current Occupancy Rate (%)</Label>
              <Input
                id="occupancyRate"
                type="number"
                min="0"
                max="100"
                value={formData.programSpecificData.occupancyRate || ""}
                onChange={(e) => updateProgramSpecificData("occupancyRate", e.target.value)}
                placeholder="Current occupancy percentage"
              />
            </div>
          </>
        );

      case "commercial-dscr-loan":
        return (
          <>
            <div>
              <Label htmlFor="rentalIncome">Monthly Rental Income</Label>
              <Input
                id="rentalIncome"
                type="number"
                value={formData.programSpecificData.rentalIncome || ""}
                onChange={(e) => updateProgramSpecificData("rentalIncome", e.target.value)}
                placeholder="Total monthly rental income"
              />
            </div>
            <div>
              <Label htmlFor="creditScore">Credit Score</Label>
              <Input
                id="creditScore"
                type="number"
                min="300"
                max="850"
                value={formData.programSpecificData.creditScore || ""}
                onChange={(e) => updateProgramSpecificData("creditScore", e.target.value)}
                placeholder="Credit score"
              />
            </div>
            <div>
              <Label htmlFor="downPayment">Down Payment (%)</Label>
              <Input
                id="downPayment"
                type="number"
                min="0"
                max="50"
                value={formData.programSpecificData.downPayment || ""}
                onChange={(e) => updateProgramSpecificData("downPayment", e.target.value)}
                placeholder="Down payment percentage"
              />
            </div>
          </>
        );

      case "mobile-home-park-financing":
        return (
          <>
            <div>
              <Label htmlFor="padCount">Number of Pads</Label>
              <Input
                id="padCount"
                type="number"
                value={formData.programSpecificData.padCount || ""}
                onChange={(e) => updateProgramSpecificData("padCount", e.target.value)}
                placeholder="Total number of mobile home pads"
              />
            </div>
            <div>
              <Label htmlFor="padRent">Average Monthly Pad Rent</Label>
              <Input
                id="padRent"
                type="number"
                value={formData.programSpecificData.padRent || ""}
                onChange={(e) => updateProgramSpecificData("padRent", e.target.value)}
                placeholder="Average monthly rent per pad"
              />
            </div>
            <div>
              <Label htmlFor="occupancy">Current Occupancy Rate (%)</Label>
              <Input
                id="occupancy"
                type="number"
                min="0"
                max="100"
                value={formData.programSpecificData.occupancy || ""}
                onChange={(e) => updateProgramSpecificData("occupancy", e.target.value)}
                placeholder="Current occupancy percentage"
              />
            </div>
          </>
        );

      default:
        return (
          <div>
            <Label htmlFor="additionalDetails">Additional Details</Label>
            <Textarea
              id="additionalDetails"
              value={formData.programSpecificData.additionalDetails || ""}
              onChange={(e) => updateProgramSpecificData("additionalDetails", e.target.value)}
              placeholder="Any additional information about your project"
            />
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Application for {program.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="borrowerName">Full Name *</Label>
                <Input
                  id="borrowerName"
                  value={formData.borrowerName}
                  onChange={(e) => updateField("borrowerName", e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="borrowerEmail">Email Address *</Label>
                <Input
                  id="borrowerEmail"
                  type="email"
                  value={formData.borrowerEmail}
                  onChange={(e) => updateField("borrowerEmail", e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="borrowerPhone">Phone Number *</Label>
                <Input
                  id="borrowerPhone"
                  type="tel"
                  value={formData.borrowerPhone}
                  onChange={(e) => updateField("borrowerPhone", e.target.value)}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Property Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="propertyAddress">Property Address</Label>
                <Input
                  id="propertyAddress"
                  value={formData.propertyAddress}
                  onChange={(e) => updateField("propertyAddress", e.target.value)}
                  placeholder="Property street address"
                />
              </div>
              <div>
                <Label htmlFor="propertyCity">City</Label>
                <Input
                  id="propertyCity"
                  value={formData.propertyCity}
                  onChange={(e) => updateField("propertyCity", e.target.value)}
                  placeholder="City"
                />
              </div>
              <div>
                <Label htmlFor="propertyState">State</Label>
                <Input
                  id="propertyState"
                  value={formData.propertyState}
                  onChange={(e) => updateField("propertyState", e.target.value)}
                  placeholder="State"
                />
              </div>
              <div>
                <Label htmlFor="propertyZip">ZIP Code</Label>
                <Input
                  id="propertyZip"
                  value={formData.propertyZip}
                  onChange={(e) => updateField("propertyZip", e.target.value)}
                  placeholder="ZIP Code"
                />
              </div>
            </div>
          </div>

          {/* Loan Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loan Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="requestedAmount">Requested Loan Amount</Label>
                <Input
                  id="requestedAmount"
                  type="number"
                  value={formData.requestedAmount}
                  onChange={(e) => updateField("requestedAmount", e.target.value)}
                  placeholder="Loan amount requested"
                />
              </div>
              <div>
                <Label htmlFor="loanPurpose">Loan Purpose</Label>
                <Select onValueChange={(value) => updateField("loanPurpose", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase">Purchase</SelectItem>
                    <SelectItem value="refinance">Refinance</SelectItem>
                    <SelectItem value="cash-out-refinance">Cash-Out Refinance</SelectItem>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="renovation">Renovation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Program-Specific Fields */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Program-Specific Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderProgramSpecificFields()}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !formData.borrowerName || !formData.borrowerEmail || !formData.borrowerPhone}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              "Submit Application Request"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}