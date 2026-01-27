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

interface RVParkFormData {
  // Basic Information
  borrowerName: string;
  borrowerEmail: string;
  borrowerPhone: string;
  
  // Park Information
  parkName: string;
  parkAddress: string;
  parkCity: string;
  parkState: string;
  parkZip: string;
  
  // Loan Information
  loanType: string;
  requestedAmount: string;
  
  // Park Details
  totalSites: string;
  occupiedSites: string;
  parkAcreage: string;
  parkAge: string;
  
  // Site Types & Amenities
  rvSites: string;
  tentSites: string;
  cabins: string;
  amenities: string;
  
  // Financial Performance
  monthlyRevenue: string;
  occupancyRatePeak: string;
  occupancyRateOffSeason: string;
  averageSiteRate: string;
  operatingExpenses: string;
  
  // Seasonal Information
  operatingSeasonStart: string;
  operatingSeasonEnd: string;
  peakMonths: string;
  
  // Management
  managementType: string;
  staffing: string;
  
  // Market Information
  locationDescription: string;
  nearbyAttractions: string;
  competitorAnalysis: string;
  
  // Additional Information
  additionalComments: string;
}

interface RVParkFormProps {
  onSubmitSuccess?: () => void;
}

export default function RVParkForm({ onSubmitSuccess }: RVParkFormProps = {}) {
  const { submitPublicApplication, isSubmitting } = usePublicApplications();
  const { toast } = useToast();
  const [formData, setFormData] = useState<RVParkFormData>({
    borrowerName: "",
    borrowerEmail: "",
    borrowerPhone: "",
    parkName: "",
    parkAddress: "",
    parkCity: "",
    parkState: "",
    parkZip: "",
    loanType: "",
    requestedAmount: "",
    totalSites: "",
    occupiedSites: "",
    parkAcreage: "",
    parkAge: "",
    rvSites: "",
    tentSites: "",
    cabins: "",
    amenities: "",
    monthlyRevenue: "",
    occupancyRatePeak: "",
    occupancyRateOffSeason: "",
    averageSiteRate: "",
    operatingExpenses: "",
    operatingSeasonStart: "",
    operatingSeasonEnd: "",
    peakMonths: "",
    managementType: "",
    staffing: "",
    locationDescription: "",
    nearbyAttractions: "",
    competitorAnalysis: "",
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
        programId: 'rv-park-financing',
        programName: 'RV Park Financing',
        borrowerName: formData.borrowerName,
        borrowerEmail: formData.borrowerEmail,
        borrowerPhone: formData.borrowerPhone,
        propertyAddress: formData.parkAddress,
        propertyCity: formData.parkCity,
        propertyState: formData.parkState,
        propertyZip: formData.parkZip,
        requestedAmount: formData.requestedAmount ? parseFloat(formData.requestedAmount) : null,
        loanPurpose: formData.loanType,
        programSpecificData: formData as any
      });

      // Reset form on success
      setFormData({
        borrowerName: "",
        borrowerEmail: "",
        borrowerPhone: "",
        parkName: "",
        parkAddress: "",
        parkCity: "",
        parkState: "",
        parkZip: "",
        loanType: "",
        requestedAmount: "",
        totalSites: "",
        occupiedSites: "",
        parkAcreage: "",
        parkAge: "",
        rvSites: "",
        tentSites: "",
        cabins: "",
        amenities: "",
        monthlyRevenue: "",
        occupancyRatePeak: "",
        occupancyRateOffSeason: "",
        averageSiteRate: "",
        operatingExpenses: "",
        operatingSeasonStart: "",
        operatingSeasonEnd: "",
        peakMonths: "",
        managementType: "",
        staffing: "",
        locationDescription: "",
        nearbyAttractions: "",
        competitorAnalysis: "",
        additionalComments: ""
      });

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error: any) {
      console.error('RV Park form submission error:', error);
    }
  };

  const getLoanTypeOptions = () => [
    { value: 'purchase', label: 'Standard Purchase Loans' },
    { value: 'purchase-dscr', label: 'Purchase with DSCR Loan' },
    { value: 'cash-out-refinance', label: 'Cash-Out Refinance' },
    { value: 'rate-and-term-refinance', label: 'Rate and Term Refinance' },
    { value: 'bridge-financing', label: 'Bridge Financing' },
    { value: '100-financing', label: '100% Financing Program' }
  ];

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">RV Park Financing Application</CardTitle>
        <CardDescription>
          Specialized financing for RV parks and campground facilities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Loan Type Selection */}
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
            <Label htmlFor="loanType" className="text-lg font-semibold">RV Park Financing Type *</Label>
            <Select value={formData.loanType || ""} onValueChange={(value) => updateFormData('loanType', value)}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select financing type for your RV park" />
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

          {/* RV Park Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">RV Park Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="parkName">RV Park Name</Label>
                <Input
                  id="parkName"
                  value={formData.parkName}
                  onChange={(e) => updateFormData('parkName', e.target.value)}
                  placeholder="Business name of the RV park"
                />
              </div>
              <div>
                <Label htmlFor="totalSites">Total Number of Sites</Label>
                <Input
                  id="totalSites"
                  type="number"
                  value={formData.totalSites}
                  onChange={(e) => updateFormData('totalSites', e.target.value)}
                  placeholder="Total RV/camping sites"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="parkAddress">Park Address</Label>
                <Input
                  id="parkAddress"
                  value={formData.parkAddress}
                  onChange={(e) => updateFormData('parkAddress', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="parkCity">City</Label>
                <Input
                  id="parkCity"
                  value={formData.parkCity}
                  onChange={(e) => updateFormData('parkCity', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="parkState">State</Label>
                <Input
                  id="parkState"
                  value={formData.parkState}
                  onChange={(e) => updateFormData('parkState', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="parkZip">ZIP Code</Label>
                <Input
                  id="parkZip"
                  value={formData.parkZip}
                  onChange={(e) => updateFormData('parkZip', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="parkAcreage">Park Acreage</Label>
                <Input
                  id="parkAcreage"
                  type="number"
                  value={formData.parkAcreage}
                  onChange={(e) => updateFormData('parkAcreage', e.target.value)}
                  placeholder="Total acres"
                />
              </div>
              <div>
                <Label htmlFor="parkAge">Park Age (years)</Label>
                <Input
                  id="parkAge"
                  type="number"
                  value={formData.parkAge}
                  onChange={(e) => updateFormData('parkAge', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Site Types & Amenities */}
          <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800">Site Types & Amenities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rvSites">RV Sites (with hookups)</Label>
                <Input
                  id="rvSites"
                  type="number"
                  value={formData.rvSites}
                  onChange={(e) => updateFormData('rvSites', e.target.value)}
                  placeholder="Sites with water/electric/sewer"
                />
              </div>
              <div>
                <Label htmlFor="tentSites">Tent Sites</Label>
                <Input
                  id="tentSites"
                  type="number"
                  value={formData.tentSites}
                  onChange={(e) => updateFormData('tentSites', e.target.value)}
                  placeholder="Tent camping sites"
                />
              </div>
              <div>
                <Label htmlFor="cabins">Cabins/Rentals</Label>
                <Input
                  id="cabins"
                  type="number"
                  value={formData.cabins}
                  onChange={(e) => updateFormData('cabins', e.target.value)}
                  placeholder="Rental cabins or units"
                />
              </div>
              <div>
                <Label htmlFor="occupiedSites">Currently Occupied Sites</Label>
                <Input
                  id="occupiedSites"
                  type="number"
                  value={formData.occupiedSites}
                  onChange={(e) => updateFormData('occupiedSites', e.target.value)}
                  placeholder="Sites currently occupied"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="amenities">Park Amenities & Features</Label>
                <Textarea
                  id="amenities"
                  value={formData.amenities}
                  onChange={(e) => updateFormData('amenities', e.target.value)}
                  placeholder="Pool, clubhouse, laundry, playground, WiFi, store, restaurant, etc."
                />
              </div>
            </div>
          </div>

          {/* Financial Performance */}
          <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800">Financial Performance</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="monthlyRevenue">Average Monthly Revenue ($)</Label>
                <Input
                  id="monthlyRevenue"
                  type="number"
                  value={formData.monthlyRevenue}
                  onChange={(e) => updateFormData('monthlyRevenue', e.target.value)}
                  placeholder="Average monthly income"
                />
              </div>
              <div>
                <Label htmlFor="averageSiteRate">Average Site Rate ($/night)</Label>
                <Input
                  id="averageSiteRate"
                  type="number"
                  value={formData.averageSiteRate}
                  onChange={(e) => updateFormData('averageSiteRate', e.target.value)}
                  placeholder="Average nightly rate"
                />
              </div>
              <div>
                <Label htmlFor="occupancyRatePeak">Peak Season Occupancy Rate (%)</Label>
                <Input
                  id="occupancyRatePeak"
                  type="number"
                  value={formData.occupancyRatePeak}
                  onChange={(e) => updateFormData('occupancyRatePeak', e.target.value)}
                  placeholder="Occupancy during peak season"
                />
              </div>
              <div>
                <Label htmlFor="occupancyRateOffSeason">Off-Season Occupancy Rate (%)</Label>
                <Input
                  id="occupancyRateOffSeason"
                  type="number"
                  value={formData.occupancyRateOffSeason}
                  onChange={(e) => updateFormData('occupancyRateOffSeason', e.target.value)}
                  placeholder="Occupancy during off-season"
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
            </div>
          </div>

          {/* Seasonal Operations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Seasonal Operations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="operatingSeasonStart">Operating Season Start</Label>
                <Select value={formData.operatingSeasonStart || ""} onValueChange={(value) => updateFormData('operatingSeasonStart', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Season start month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year-round">Year Round</SelectItem>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                    <SelectItem value="april">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="june">June</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="operatingSeasonEnd">Operating Season End</Label>
                <Select value={formData.operatingSeasonEnd || ""} onValueChange={(value) => updateFormData('operatingSeasonEnd', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Season end month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year-round">Year Round</SelectItem>
                    <SelectItem value="september">September</SelectItem>
                    <SelectItem value="october">October</SelectItem>
                    <SelectItem value="november">November</SelectItem>
                    <SelectItem value="december">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="peakMonths">Peak Revenue Months</Label>
                <Input
                  id="peakMonths"
                  value={formData.peakMonths}
                  onChange={(e) => updateFormData('peakMonths', e.target.value)}
                  placeholder="e.g., June through August, Holiday weekends"
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

          {/* Management & Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Management & Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="managementType">Management Type</Label>
                <Select value={formData.managementType || ""} onValueChange={(value) => updateFormData('managementType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select management type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="owner-operated">Owner Operated</SelectItem>
                    <SelectItem value="onsite-manager">On-Site Manager</SelectItem>
                    <SelectItem value="management-company">Management Company</SelectItem>
                    <SelectItem value="absentee-owner">Absentee Owner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="staffing">Staffing Level</Label>
                <Input
                  id="staffing"
                  value={formData.staffing}
                  onChange={(e) => updateFormData('staffing', e.target.value)}
                  placeholder="Full-time, part-time, seasonal employees"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="locationDescription">Location & Accessibility</Label>
                <Textarea
                  id="locationDescription"
                  value={formData.locationDescription}
                  onChange={(e) => updateFormData('locationDescription', e.target.value)}
                  placeholder="Highway access, distance to cities, natural attractions, etc."
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="nearbyAttractions">Nearby Attractions & Activities</Label>
                <Textarea
                  id="nearbyAttractions"
                  value={formData.nearbyAttractions}
                  onChange={(e) => updateFormData('nearbyAttractions', e.target.value)}
                  placeholder="Lakes, hiking trails, tourist destinations, events, etc."
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="competitorAnalysis">Local Competition Analysis</Label>
                <Textarea
                  id="competitorAnalysis"
                  value={formData.competitorAnalysis}
                  onChange={(e) => updateFormData('competitorAnalysis', e.target.value)}
                  placeholder="Other RV parks in the area, their rates, occupancy, amenities"
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
                placeholder="Any additional information about your RV park financing needs, expansion plans, or special circumstances"
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting || !formData.loanType} className="w-full">
            {isSubmitting ? "Submitting Application..." : "Submit RV Park Application"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}