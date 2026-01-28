import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BusinessLoanSecurityFieldsProps {
  securityType: string;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export default function BusinessLoanSecurityFields({ securityType, formData, updateFormData }: BusinessLoanSecurityFieldsProps) {

  // Real Estate Security Fields
  const renderRealEstateSecurityFields = () => (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-800">Real Estate Security Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="propertyAddressDescription">Property Address & Description</Label>
            <Textarea
              id="propertyAddressDescription"
              value={formData.propertyAddressDescription || ""}
              onChange={(e) => updateFormData('propertyAddressDescription', e.target.value)}
              placeholder="Complete property address and detailed description"
              required
            />
          </div>
          <div>
            <Label htmlFor="currentPropertyValue">Current Property Value ($)</Label>
            <Input
              id="currentPropertyValue"
              type="number"
              value={formData.currentPropertyValue || ""}
              onChange={(e) => updateFormData('currentPropertyValue', e.target.value)}
              placeholder="Current market value"
              required
            />
          </div>
          <div>
            <Label htmlFor="propertyTypeRE">Property Type</Label>
            <Select value={formData.propertyTypeRE || ""} onValueChange={(value) => updateFormData('propertyTypeRE', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="existingLiens">Existing Liens</Label>
            <Select value={formData.existingLiens || ""} onValueChange={(value) => updateFormData('existingLiens', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.existingLiens === 'yes' && (
            <div>
              <Label htmlFor="existingLiensDetails">Existing Liens Details</Label>
              <Textarea
                id="existingLiensDetails"
                value={formData.existingLiensDetails || ""}
                onChange={(e) => updateFormData('existingLiensDetails', e.target.value)}
                placeholder="Details of existing liens, amounts, and lienholders"
              />
            </div>
          )}
          <div className="md:col-span-2">
            <Label htmlFor="propertyInsuranceInfo">Property Insurance Information</Label>
            <Textarea
              id="propertyInsuranceInfo"
              value={formData.propertyInsuranceInfo || ""}
              onChange={(e) => updateFormData('propertyInsuranceInfo', e.target.value)}
              placeholder="Insurance company, policy details, coverage amounts"
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <Checkbox 
              id="appraisalAcknowledgment"
              checked={formData.appraisalAcknowledgment || false}
              onCheckedChange={(checked) => updateFormData('appraisalAcknowledgment', checked)}
            />
            <Label htmlFor="appraisalAcknowledgment">
              I acknowledge that a professional appraisal will be required at borrower's expense
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Credit Protection Insurance Fields
  const renderCreditProtectionInsuranceFields = () => (
    <Card className="bg-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="text-green-800">Credit Protection Insurance Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="coverageAmountRequested">Coverage Amount Requested ($)</Label>
            <Input
              id="coverageAmountRequested"
              type="number"
              value={formData.coverageAmountRequested || ""}
              onChange={(e) => updateFormData('coverageAmountRequested', e.target.value)}
              placeholder="Requested coverage amount"
              required
            />
          </div>
          <div>
            <Label htmlFor="paymentPlanPreference">Payment Plan Preference</Label>
            <Select value={formData.paymentPlanPreference || ""} onValueChange={(value) => updateFormData('paymentPlanPreference', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="semi-annual">Semi-Annual</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
                <SelectItem value="one-time">One-Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="healthQuestionnaire">Health Questionnaire Information</Label>
            <Textarea
              id="healthQuestionnaire"
              value={formData.healthQuestionnaire || ""}
              onChange={(e) => updateFormData('healthQuestionnaire', e.target.value)}
              placeholder="General health information, medical conditions, medications"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="beneficiaryInformation">Beneficiary Information</Label>
            <Textarea
              id="beneficiaryInformation"
              value={formData.beneficiaryInformation || ""}
              onChange={(e) => updateFormData('beneficiaryInformation', e.target.value)}
              placeholder="Primary and secondary beneficiary names, relationships, contact information"
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <Checkbox 
              id="insuranceQuoteRequest"
              checked={formData.insuranceQuoteRequest || false}
              onCheckedChange={(checked) => updateFormData('insuranceQuoteRequest', checked)}
            />
            <Label htmlFor="insuranceQuoteRequest">
              Request quote from insurance department
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Personal Guarantee Fields
  const renderPersonalGuaranteeFields = () => (
    <Card className="bg-orange-50 border-orange-200">
      <CardHeader>
        <CardTitle className="text-orange-800">Personal Guarantee Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="guarantorFullName">Guarantor Full Name</Label>
            <Input
              id="guarantorFullName"
              value={formData.guarantorFullName || ""}
              onChange={(e) => updateFormData('guarantorFullName', e.target.value)}
              placeholder="Full legal name of guarantor"
              required
            />
          </div>
          <div>
            <Label htmlFor="guarantorNetWorth">Guarantor Net Worth ($)</Label>
            <Input
              id="guarantorNetWorth"
              type="number"
              value={formData.guarantorNetWorth || ""}
              onChange={(e) => updateFormData('guarantorNetWorth', e.target.value)}
              placeholder="Total net worth"
              required
            />
          </div>
          <div>
            <Label htmlFor="guarantorCreditScore">Guarantor Credit Score</Label>
            <Input
              id="guarantorCreditScore"
              type="number"
              value={formData.guarantorCreditScore || ""}
              onChange={(e) => updateFormData('guarantorCreditScore', e.target.value)}
              placeholder="Most recent credit score"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="guarantorAddress">Guarantor Address & Contact Information</Label>
            <Textarea
              id="guarantorAddress"
              value={formData.guarantorAddress || ""}
              onChange={(e) => updateFormData('guarantorAddress', e.target.value)}
              placeholder="Complete address, phone, email"
              required
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <Checkbox 
              id="defaultPreventionFeeAck"
              checked={formData.defaultPreventionFeeAck || false}
              onCheckedChange={(checked) => updateFormData('defaultPreventionFeeAck', checked)}
            />
            <Label htmlFor="defaultPreventionFeeAck">
              I acknowledge the default prevention fee of 3 monthly payments
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Bank Guarantee Fields
  const renderBankGuaranteeFields = () => (
    <Card className="bg-purple-50 border-purple-200">
      <CardHeader>
        <CardTitle className="text-purple-800">Bank Guarantee Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="bankName">Bank Name</Label>
            <Input
              id="bankName"
              value={formData.bankName || ""}
              onChange={(e) => updateFormData('bankName', e.target.value)}
              placeholder="Full bank name"
              required
            />
          </div>
          <div>
            <Label htmlFor="bankAddress">Bank Address</Label>
            <Input
              id="bankAddress"
              value={formData.bankAddress || ""}
              onChange={(e) => updateFormData('bankAddress', e.target.value)}
              placeholder="Complete bank address"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="bankContactInfo">Bank Contact Information</Label>
            <Textarea
              id="bankContactInfo"
              value={formData.bankContactInfo || ""}
              onChange={(e) => updateFormData('bankContactInfo', e.target.value)}
              placeholder="Primary contact name, title, phone, email, department"
              required
            />
          </div>
          <div>
            <Label htmlFor="guaranteeAmount">Bank Guarantee Amount ($)</Label>
            <Input
              id="guaranteeAmount"
              type="number"
              value={formData.guaranteeAmount || ""}
              onChange={(e) => updateFormData('guaranteeAmount', e.target.value)}
              placeholder="Guarantee amount"
              required
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <Checkbox 
              id="mt760SwiftConfirmation"
              checked={formData.mt760SwiftConfirmation || false}
              onCheckedChange={(checked) => updateFormData('mt760SwiftConfirmation', checked)}
            />
            <Label htmlFor="mt760SwiftConfirmation">
              MT760 SWIFT Confirmation available
            </Label>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="bankGuaranteeLetterUpload">Bank Guarantee Letter Upload</Label>
            <Input
              id="bankGuaranteeLetterUpload"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) updateFormData('bankGuaranteeLetterUpload', file);
              }}
            />
            <p className="text-sm text-muted-foreground mt-1">Upload bank guarantee letter (PDF or DOC format)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Business Assets Fields
  const renderBusinessAssetsFields = () => (
    <Card className="bg-indigo-50 border-indigo-200">
      <CardHeader>
        <CardTitle className="text-indigo-800">Business Assets Security Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="assetDescription">Asset Description & Inventory</Label>
            <Textarea
              id="assetDescription"
              value={formData.assetDescription || ""}
              onChange={(e) => updateFormData('assetDescription', e.target.value)}
              placeholder="Detailed description of business assets, equipment, machinery, vehicles, etc."
              required
            />
          </div>
          <div>
            <Label htmlFor="assetValuation">Asset Valuation ($)</Label>
            <Input
              id="assetValuation"
              type="number"
              value={formData.assetValuation || ""}
              onChange={(e) => updateFormData('assetValuation', e.target.value)}
              placeholder="Total appraised value"
              required
            />
          </div>
          <div>
            <Label htmlFor="existingAssetLiens">Existing Liens on Assets</Label>
            <Select value={formData.existingAssetLiens || ""} onValueChange={(value) => updateFormData('existingAssetLiens', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {formData.existingAssetLiens === 'yes' && (
            <div className="md:col-span-2">
              <Label htmlFor="existingAssetLiensDetails">Existing Asset Liens Details</Label>
              <Textarea
                id="existingAssetLiensDetails"
                value={formData.existingAssetLiensDetails || ""}
                onChange={(e) => updateFormData('existingAssetLiensDetails', e.target.value)}
                placeholder="Details of existing liens on business assets"
              />
            </div>
          )}
          <div className="md:col-span-2 flex items-center space-x-2">
            <Checkbox 
              id="assetAppraisalAck"
              checked={formData.assetAppraisalAck || false}
              onCheckedChange={(checked) => updateFormData('assetAppraisalAck', checked)}
            />
            <Label htmlFor="assetAppraisalAck">
              I acknowledge that asset appraisal will be required at borrower's expense
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Inventory Fields
  const renderInventoryFields = () => (
    <Card className="bg-pink-50 border-pink-200">
      <CardHeader>
        <CardTitle className="text-pink-800">Inventory Security Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="inventoryTypeDescription">Inventory Type & Description</Label>
            <Textarea
              id="inventoryTypeDescription"
              value={formData.inventoryTypeDescription || ""}
              onChange={(e) => updateFormData('inventoryTypeDescription', e.target.value)}
              placeholder="Detailed description of inventory type, products, quantities, condition"
              required
            />
          </div>
          <div>
            <Label htmlFor="currentInventoryValue">Current Inventory Value ($)</Label>
            <Input
              id="currentInventoryValue"
              type="number"
              value={formData.currentInventoryValue || ""}
              onChange={(e) => updateFormData('currentInventoryValue', e.target.value)}
              placeholder="Current market value of inventory"
              required
            />
          </div>
          <div>
            <Label htmlFor="inventoryTurnoverRate">Inventory Turnover Rate</Label>
            <Input
              id="inventoryTurnoverRate"
              value={formData.inventoryTurnoverRate || ""}
              onChange={(e) => updateFormData('inventoryTurnoverRate', e.target.value)}
              placeholder="Times per year inventory turns over"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="storageLocations">Storage Location(s)</Label>
            <Textarea
              id="storageLocations"
              value={formData.storageLocations || ""}
              onChange={(e) => updateFormData('storageLocations', e.target.value)}
              placeholder="All warehouse, storage, or retail locations where inventory is held"
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="inventoryInsurance">Inventory Insurance</Label>
            <Textarea
              id="inventoryInsurance"
              value={formData.inventoryInsurance || ""}
              onChange={(e) => updateFormData('inventoryInsurance', e.target.value)}
              placeholder="Insurance coverage details for inventory"
            />
          </div>
          <div className="md:col-span-2 flex items-center space-x-2">
            <Checkbox 
              id="inspectionAccessAgreement"
              checked={formData.inspectionAccessAgreement || false}
              onCheckedChange={(checked) => updateFormData('inspectionAccessAgreement', checked)}
            />
            <Label htmlFor="inspectionAccessAgreement">
              I agree to provide access for inventory inspection as required
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Business Loan Terms Display (V6. 01-2025)
  const renderBusinessLoanTerms = () => (
    <Card className="bg-yellow-50 border-yellow-400">
      <CardHeader>
        <CardTitle className="text-yellow-800">Business Loan Terms - V6. 01-2025</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <strong>Lender:</strong> Commercial Capital and Investor Finance Inc
          </div>
          <div>
            <strong>Maximum Loan Amount:</strong> Up to $10,000,000.00
          </div>
          <div>
            <strong>Maximum Term:</strong> 10 years
          </div>
          <div>
            <strong>Interest Rate:</strong> 6.11% - 9% (Fixed)
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render appropriate security fields based on security type
  const renderSecurityFields = () => {
    switch (securityType) {
      case 'real-estate-security':
        return renderRealEstateSecurityFields();
      
      case 'credit-protection-insurance':
        return renderCreditProtectionInsuranceFields();
      
      case 'personal-guarantee':
        return renderPersonalGuaranteeFields();
      
      case 'bank-guarantee':
        return renderBankGuaranteeFields();
      
      case 'business-assets':
        return renderBusinessAssetsFields();
      
      case 'inventory':
        return renderInventoryFields();
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderBusinessLoanTerms()}
      {renderSecurityFields()}
    </div>
  );
}