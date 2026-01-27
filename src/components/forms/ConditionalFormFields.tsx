import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ConditionalFormFieldsProps {
  loanType: string;
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

export default function ConditionalFormFields({ loanType, formData, updateFormData }: ConditionalFormFieldsProps) {
  
  // Refinance Fields
  const RefinanceFields = () => (
    <div className="space-y-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h3 className="text-lg font-semibold text-blue-800">Refinance Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label htmlFor="currentLoanBalance">Current Loan Balance ($)</Label>
          <Input
            id="currentLoanBalance"
            type="number"
            value={formData.currentLoanBalance || ""}
            onChange={(e) => updateFormData('currentLoanBalance', e.target.value)}
            placeholder="Current loan balance"
          />
        </div>
        <div>
          <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
          <Input
            id="currentInterestRate"
            type="number"
            step="0.01"
            value={formData.currentInterestRate || ""}
            onChange={(e) => updateFormData('currentInterestRate', e.target.value)}
            placeholder="Current interest rate"
          />
        </div>
        <div>
          <Label htmlFor="currentLenderName">Current Lender Name</Label>
          <Input
            id="currentLenderName"
            value={formData.currentLenderName || ""}
            onChange={(e) => updateFormData('currentLenderName', e.target.value)}
            placeholder="Current lender name"
          />
        </div>
        <div>
          <Label htmlFor="originalLoanDate">Original Loan Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.originalLoanDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.originalLoanDate ? format(new Date(formData.originalLoanDate), "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.originalLoanDate ? new Date(formData.originalLoanDate) : undefined}
                onSelect={(date) => updateFormData('originalLoanDate', date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="currentMonthlyPayment">Current Monthly Payment ($)</Label>
          <Input
            id="currentMonthlyPayment"
            type="number"
            value={formData.currentMonthlyPayment || ""}
            onChange={(e) => updateFormData('currentMonthlyPayment', e.target.value)}
            placeholder="Current monthly payment"
          />
        </div>
        <div>
          <Label htmlFor="reasonForRefinancing">Reason for Refinancing</Label>
          <Select value={formData.reasonForRefinancing || ""} onValueChange={(value) => updateFormData('reasonForRefinancing', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lower-rate">Lower Rate</SelectItem>
              <SelectItem value="cash-out">Cash Out</SelectItem>
              <SelectItem value="better-terms">Better Terms</SelectItem>
              <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="desiredCashOutAmount">Desired Cash-Out Amount ($)</Label>
          <Input
            id="desiredCashOutAmount"
            type="number"
            value={formData.desiredCashOutAmount || ""}
            onChange={(e) => updateFormData('desiredCashOutAmount', e.target.value)}
            placeholder="Cash-out amount (if applicable)"
          />
        </div>
        <div>
          <Label htmlFor="currentPropertyValue">Current Property Value Estimate ($)</Label>
          <Input
            id="currentPropertyValue"
            type="number"
            value={formData.currentPropertyValue || ""}
            onChange={(e) => updateFormData('currentPropertyValue', e.target.value)}
            placeholder="Estimated property value"
          />
        </div>
        <div>
          <Label htmlFor="prepaymentPenalty">Prepayment Penalty</Label>
          <Select value={formData.prepaymentPenalty || ""} onValueChange={(value) => updateFormData('prepaymentPenalty', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.prepaymentPenalty === 'yes' && (
          <div>
            <Label htmlFor="prepaymentPenaltyAmount">Prepayment Penalty Amount ($)</Label>
            <Input
              id="prepaymentPenaltyAmount"
              type="number"
              value={formData.prepaymentPenaltyAmount || ""}
              onChange={(e) => updateFormData('prepaymentPenaltyAmount', e.target.value)}
              placeholder="Penalty amount"
            />
          </div>
        )}
        <div>
          <Label htmlFor="timeRemainingOnLoan">Time Remaining on Current Loan (months)</Label>
          <Input
            id="timeRemainingOnLoan"
            type="number"
            value={formData.timeRemainingOnLoan || ""}
            onChange={(e) => updateFormData('timeRemainingOnLoan', e.target.value)}
            placeholder="Months remaining"
          />
        </div>
        <div>
          <Label htmlFor="currentLoanType">Current Loan Type</Label>
          <Select value={formData.currentLoanType || ""} onValueChange={(value) => updateFormData('currentLoanType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select loan type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conventional">Conventional</SelectItem>
              <SelectItem value="portfolio">Portfolio</SelectItem>
              <SelectItem value="hard-money">Hard Money</SelectItem>
              <SelectItem value="sba">SBA</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  // Purchase Fields
  const PurchaseFields = () => (
    <div className="space-y-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <h3 className="text-lg font-semibold text-green-800">Purchase Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
          <Input
            id="purchasePrice"
            type="number"
            value={formData.purchasePrice || ""}
            onChange={(e) => updateFormData('purchasePrice', e.target.value)}
            placeholder="Purchase price"
            required
          />
        </div>
        <div>
          <Label htmlFor="downPaymentAmount">Down Payment Amount ($)</Label>
          <Input
            id="downPaymentAmount"
            type="number"
            value={formData.downPaymentAmount || ""}
            onChange={(e) => updateFormData('downPaymentAmount', e.target.value)}
            placeholder="Down payment amount"
          />
        </div>
        <div>
          <Label htmlFor="downPaymentSource">Down Payment Source</Label>
          <Select value={formData.downPaymentSource || ""} onValueChange={(value) => updateFormData('downPaymentSource', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cash-savings">Cash Savings</SelectItem>
              <SelectItem value="sale-of-property">Sale of Property</SelectItem>
              <SelectItem value="gift">Gift</SelectItem>
              <SelectItem value="loan">Loan</SelectItem>
              <SelectItem value="investment-account">Investment Account</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="earnestMoneyDeposit">Earnest Money Deposit ($)</Label>
          <Input
            id="earnestMoneyDeposit"
            type="number"
            value={formData.earnestMoneyDeposit || ""}
            onChange={(e) => updateFormData('earnestMoneyDeposit', e.target.value)}
            placeholder="Earnest money deposit"
          />
        </div>
        <div>
          <Label htmlFor="closingDate">Closing Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.closingDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.closingDate ? format(new Date(formData.closingDate), "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.closingDate ? new Date(formData.closingDate) : undefined}
                onSelect={(date) => updateFormData('closingDate', date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="purchaseContractSigned">Purchase Contract Signed</Label>
          <Select value={formData.purchaseContractSigned || ""} onValueChange={(value) => updateFormData('purchaseContractSigned', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="propertyInspectionCompleted">Property Inspection Completed</Label>
          <Select value={formData.propertyInspectionCompleted || ""} onValueChange={(value) => updateFormData('propertyInspectionCompleted', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="sellerFinancingAvailable">Seller Financing Available</Label>
          <Select value={formData.sellerFinancingAvailable || ""} onValueChange={(value) => updateFormData('sellerFinancingAvailable', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.sellerFinancingAvailable === 'yes' && (
          <div>
            <Label htmlFor="sellerFinancingDetails">Seller Financing Details</Label>
            <Textarea
              id="sellerFinancingDetails"
              value={formData.sellerFinancingDetails || ""}
              onChange={(e) => updateFormData('sellerFinancingDetails', e.target.value)}
              placeholder="Describe seller financing terms"
            />
          </div>
        )}
        <div>
          <Label htmlFor="realEstateAgentName">Real Estate Agent Name & Contact</Label>
          <Input
            id="realEstateAgentName"
            value={formData.realEstateAgentName || ""}
            onChange={(e) => updateFormData('realEstateAgentName', e.target.value)}
            placeholder="Agent name and contact information"
          />
        </div>
        <div>
          <Label htmlFor="titleCompanyInfo">Title Company Information</Label>
          <Input
            id="titleCompanyInfo"
            value={formData.titleCompanyInfo || ""}
            onChange={(e) => updateFormData('titleCompanyInfo', e.target.value)}
            placeholder="Title company name and contact"
          />
        </div>
        <div>
          <Label htmlFor="homeownersInsuranceQuote">Homeowner's Insurance Quote ($)</Label>
          <Input
            id="homeownersInsuranceQuote"
            type="number"
            value={formData.homeownersInsuranceQuote || ""}
            onChange={(e) => updateFormData('homeownersInsuranceQuote', e.target.value)}
            placeholder="Annual insurance cost"
          />
        </div>
      </div>
    </div>
  );

  // Construction/Development Fields
  const ConstructionFields = () => (
    <div className="space-y-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
      <h3 className="text-lg font-semibold text-orange-800">Construction/Development Information</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <Label htmlFor="landAlreadyOwned">Land Already Owned</Label>
          <Select value={formData.landAlreadyOwned || ""} onValueChange={(value) => updateFormData('landAlreadyOwned', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.landAlreadyOwned === 'no' && (
          <div>
            <Label htmlFor="landPurchasePrice">Land Purchase Price ($)</Label>
            <Input
              id="landPurchasePrice"
              type="number"
              value={formData.landPurchasePrice || ""}
              onChange={(e) => updateFormData('landPurchasePrice', e.target.value)}
              placeholder="Land purchase price"
            />
          </div>
        )}
        <div>
          <Label htmlFor="constructionBudget">Construction Budget Breakdown ($)</Label>
          <Textarea
            id="constructionBudget"
            value={formData.constructionBudget || ""}
            onChange={(e) => updateFormData('constructionBudget', e.target.value)}
            placeholder="Detailed construction budget breakdown"
          />
        </div>
        <div>
          <Label htmlFor="generalContractorSelected">General Contractor Selected</Label>
          <Select value={formData.generalContractorSelected || ""} onValueChange={(value) => updateFormData('generalContractorSelected', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.generalContractorSelected === 'yes' && (
          <>
            <div>
              <Label htmlFor="contractorCompanyName">Contractor Company Name</Label>
              <Input
                id="contractorCompanyName"
                value={formData.contractorCompanyName || ""}
                onChange={(e) => updateFormData('contractorCompanyName', e.target.value)}
                placeholder="General contractor company name"
              />
            </div>
            <div>
              <Label htmlFor="contractorLicenseNumber">Contractor License Number</Label>
              <Input
                id="contractorLicenseNumber"
                value={formData.contractorLicenseNumber || ""}
                onChange={(e) => updateFormData('contractorLicenseNumber', e.target.value)}
                placeholder="License number"
              />
            </div>
          </>
        )}
        <div>
          <Label htmlFor="constructionTimeline">Construction Timeline (months)</Label>
          <Input
            id="constructionTimeline"
            type="number"
            value={formData.constructionTimeline || ""}
            onChange={(e) => updateFormData('constructionTimeline', e.target.value)}
            placeholder="Expected timeline in months"
          />
        </div>
        <div>
          <Label htmlFor="permitsObtained">Permits Obtained</Label>
          <Select value={formData.permitsObtained || ""} onValueChange={(value) => updateFormData('permitsObtained', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="architecturalPlansComplete">Architectural Plans Complete</Label>
          <Select value={formData.architecturalPlansComplete || ""} onValueChange={(value) => updateFormData('architecturalPlansComplete', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="drawSchedulePreferences">Draw Schedule Preferences</Label>
          <Select value={formData.drawSchedulePreferences || ""} onValueChange={(value) => updateFormData('drawSchedulePreferences', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="milestone-based">Milestone-Based</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="constructionLoanToPerm">Construction Loan-to-Perm</Label>
          <Select value={formData.constructionLoanToPerm || ""} onValueChange={(value) => updateFormData('constructionLoanToPerm', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="expectedCompletionDate">Expected Completion Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.expectedCompletionDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.expectedCompletionDate ? format(new Date(formData.expectedCompletionDate), "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.expectedCompletionDate ? new Date(formData.expectedCompletionDate) : undefined}
                onSelect={(date) => updateFormData('expectedCompletionDate', date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="interestReserveRequired">Interest Reserve Required</Label>
          <Select value={formData.interestReserveRequired || ""} onValueChange={(value) => updateFormData('interestReserveRequired', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  // Bridge Loan Fields
  const BridgeLoanFields = () => (
    <div className="space-y-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
      <h3 className="text-lg font-semibold text-purple-800">Bridge Loan Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="reasonForBridgeLoan">Reason for Bridge Loan</Label>
          <Select value={formData.reasonForBridgeLoan || ""} onValueChange={(value) => updateFormData('reasonForBridgeLoan', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="property-sale-pending">Property Sale Pending</SelectItem>
              <SelectItem value="refinancing-in-process">Refinancing in Process</SelectItem>
              <SelectItem value="quick-closing-needed">Quick Closing Needed</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="expectedHoldPeriod">Expected Hold Period (months)</Label>
          <Input
            id="expectedHoldPeriod"
            type="number"
            value={formData.expectedHoldPeriod || ""}
            onChange={(e) => updateFormData('expectedHoldPeriod', e.target.value)}
            placeholder="Hold period in months"
          />
        </div>
        <div>
          <Label htmlFor="exitStrategy">Exit Strategy</Label>
          <Select value={formData.exitStrategy || ""} onValueChange={(value) => updateFormData('exitStrategy', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select exit strategy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="permanent-financing">Permanent Financing</SelectItem>
              <SelectItem value="property-sale">Property Sale</SelectItem>
              <SelectItem value="business-cash-flow">Business Cash Flow</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="currentPropertyListed">Current Property Listed for Sale</Label>
          <Select value={formData.currentPropertyListed || ""} onValueChange={(value) => updateFormData('currentPropertyListed', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.currentPropertyListed === 'yes' && (
          <div>
            <Label htmlFor="listingPrice">Listing Price ($)</Label>
            <Input
              id="listingPrice"
              type="number"
              value={formData.listingPrice || ""}
              onChange={(e) => updateFormData('listingPrice', e.target.value)}
              placeholder="Property listing price"
            />
          </div>
        )}
        <div>
          <Label htmlFor="timelineForPermanentSolution">Timeline for Permanent Solution (months)</Label>
          <Input
            id="timelineForPermanentSolution"
            type="number"
            value={formData.timelineForPermanentSolution || ""}
            onChange={(e) => updateFormData('timelineForPermanentSolution', e.target.value)}
            placeholder="Timeline in months"
          />
        </div>
        <div>
          <Label htmlFor="interimIncomeSource">Interim Income Source</Label>
          <Input
            id="interimIncomeSource"
            value={formData.interimIncomeSource || ""}
            onChange={(e) => updateFormData('interimIncomeSource', e.target.value)}
            placeholder="Income source during bridge period"
          />
        </div>
        <div>
          <Label htmlFor="bridgeToPermOption">Bridge-to-Perm Option Desired</Label>
          <Select value={formData.bridgeToPermOption || ""} onValueChange={(value) => updateFormData('bridgeToPermOption', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  // 100% Financing Qualification Checklist
  const HundredPercentFinancingFields = () => (
    <div className="space-y-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
      <h3 className="text-lg font-semibold text-yellow-800">100% Financing Qualification Checklist</h3>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="creditScore700Plus"
            checked={formData.creditScore700Plus || false}
            onCheckedChange={(checked) => updateFormData('creditScore700Plus', checked)}
          />
          <Label htmlFor="creditScore700Plus">Credit Score 700+ (required)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="netWorth1Million"
            checked={formData.netWorth1Million || false}
            onCheckedChange={(checked) => updateFormData('netWorth1Million', checked)}
          />
          <Label htmlFor="netWorth1Million">Net Worth $1,000,000+ (required)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="liquidAssets100k"
            checked={formData.liquidAssets100k || false}
            onCheckedChange={(checked) => updateFormData('liquidAssets100k', checked)}
          />
          <Label htmlFor="liquidAssets100k">Liquid Assets $100,000+ (required)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="investmentExperience"
            checked={formData.investmentExperience || false}
            onCheckedChange={(checked) => updateFormData('investmentExperience', checked)}
          />
          <Label htmlFor="investmentExperience">Previous Investment Experience (required)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="debtServiceCoverage"
            checked={formData.debtServiceCoverage || false}
            onCheckedChange={(checked) => updateFormData('debtServiceCoverage', checked)}
          />
          <Label htmlFor="debtServiceCoverage">Property meets minimum DSCR 1.25x (required)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="businessPlan"
            checked={formData.businessPlan || false}
            onCheckedChange={(checked) => updateFormData('businessPlan', checked)}
          />
          <Label htmlFor="businessPlan">Comprehensive business plan provided (required)</Label>
        </div>
      </div>
    </div>
  );

  // Cash-Out Refinance Fields (includes all refinance fields plus additional)
  const CashOutRefinanceFields = () => (
    <div className="space-y-4">
      <RefinanceFields />
      <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
        <h3 className="text-lg font-semibold text-indigo-800 mb-4">Additional Cash-Out Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cashOutAmountRequested">Cash-Out Amount Requested ($)</Label>
            <Input
              id="cashOutAmountRequested"
              type="number"
              value={formData.cashOutAmountRequested || ""}
              onChange={(e) => updateFormData('cashOutAmountRequested', e.target.value)}
              placeholder="Requested cash-out amount"
            />
          </div>
          <div>
            <Label htmlFor="intendedUseOfCash">Intended Use of Cash</Label>
            <Select value={formData.intendedUseOfCash || ""} onValueChange={(value) => updateFormData('intendedUseOfCash', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select use" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="investment-property">Investment Property</SelectItem>
                <SelectItem value="business-investment">Business Investment</SelectItem>
                <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                <SelectItem value="home-improvements">Home Improvements</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="detailedUseOfFunds">Detailed Use of Funds Description</Label>
            <Textarea
              id="detailedUseOfFunds"
              value={formData.detailedUseOfFunds || ""}
              onChange={(e) => updateFormData('detailedUseOfFunds', e.target.value)}
              placeholder="Provide detailed description of how funds will be used"
            />
          </div>
          <div>
            <Label htmlFor="postCashOutLTV">Post-Cash-Out Loan-to-Value (%)</Label>
            <Input
              id="postCashOutLTV"
              type="number"
              step="0.01"
              value={formData.postCashOutLTV || ""}
              onChange={(e) => updateFormData('postCashOutLTV', e.target.value)}
              placeholder="Post cash-out LTV percentage"
            />
          </div>
          <div>
            <Label htmlFor="postCashOutDSCR">Post-Cash-Out Debt Service Coverage Ratio</Label>
            <Input
              id="postCashOutDSCR"
              type="number"
              step="0.01"
              value={formData.postCashOutDSCR || ""}
              onChange={(e) => updateFormData('postCashOutDSCR', e.target.value)}
              placeholder="Post cash-out DSCR"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render appropriate fields based on loan type
  const renderConditionalFields = () => {
    switch (loanType) {
      case 'refinance':
      case 'rate-and-term-refinance':
        return <RefinanceFields />;
      
      case 'purchase':
      case 'first-mortgage':
      case 'purchase-loan':
        return <PurchaseFields />;
      
      case 'construction':
      case 'development':
      case 'construction-development':
        return <ConstructionFields />;
      
      case 'bridge-loan':
      case 'bridge-financing':
        return <BridgeLoanFields />;
      
      case 'cash-out-refinance':
        return <CashOutRefinanceFields />;
      
      case '100-financing':
      case '100-percent-financing':
        return (
          <div className="space-y-4">
            <PurchaseFields />
            <HundredPercentFinancingFields />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      {renderConditionalFields()}
    </div>
  );
}