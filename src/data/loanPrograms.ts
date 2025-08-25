export interface LoanProgram {
  id: string;
  name: string;
  interestRate: string;
  minimumLoanAmount: string;
  description: string;
  terms: string;
}

export const loanPrograms: LoanProgram[] = [
  {
    id: "rv-park-financing",
    name: "RV Park Financing", 
    interestRate: "Starting at 5.75%",
    minimumLoanAmount: "$250,000",
    description: "Specialized financing for RV parks and campground facilities with flexible terms designed for seasonal cash flow patterns.",
    terms: `
<div style="background: linear-gradient(135deg, #166534 0%, #16a34a 50%, #22c55e 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    RV PARK & CAMPGROUND FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Asset-Based Lender Specializing in Recreational Property Financing
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🚫 Industry Challenges We Solve</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Seasonal cash flow variations
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Limited financing options for recreational properties
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Complex property valuations
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Rigid payment structures
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🎯 Our Specialized Solutions</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Seasonal payment flexibility
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Industry expertise and understanding
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Asset-based underwriting approach
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        100% financing options available
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "business-loan",
    name: "Business Loan",
    interestRate: "6.11% - 9%",
    minimumLoanAmount: "$500,000",
    description: "Comprehensive business financing solutions with flexible terms and multiple security options for companies seeking growth capital.",
    terms: `
<div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.15); border-radius: 12px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2);">
  <img src="src/assets/business-loan.jpg" alt="Professional Business Financing" style="width: 100%; max-width: 600px; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 2rem; box-shadow: 0 8px 32px rgba(0,0,0,0.3);" />
  <h1 style="font-size: 3rem; font-weight: 900; margin-bottom: 0.5rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3); letter-spacing: -0.02em;">
    BUSINESS LOAN TERMS
  </h1>
  <div style="font-size: 1.2rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    VERSION 6.01-2025
  </div>
  <h2 style="font-size: 1.8rem; font-weight: 700; color: #fbbf24; margin-bottom: 1rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.2rem; color: #e1e7ef; font-weight: 500; max-width: 800px; margin: 0 auto;">
    Asset-Based Private Lender Providing Flexible Financing Solutions for Business Growth
  </p>
</div>

<div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid rgba(255,255,255,0.2);">
  <h2 style="font-size: 1.5rem; font-weight: 800; color: #fbbf24; margin-bottom: 1rem; text-align: center;">
    📋 OVERVIEW & UNDERSTANDING
  </h2>
  <p style="color: #e1e7ef; font-size: 1.1rem; text-align: center; margin-bottom: 1rem;">
    This overview provides you with an in-depth understanding of the various components of our Terms & Conditions.
  </p>
  <p style="color: #cbd5e1; font-size: 1rem; text-align: center; font-style: italic;">
    This is not an exhaustive list, and additional terms may be included in your specific loan agreement. Read and retain this document for future reference.
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 3rem;">
  
  <!-- Loan Details Card -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
    <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #0f172a; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
      LOAN TERMS
    </div>
    <div style="margin-top: 1.5rem;">
      <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 1.5rem;">
        💼 Core Loan Details
      </h3>
      
      <div style="space-y: 1rem;">
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">1. PURPOSE</div>
          <div style="color: #e1e7ef; font-size: 1rem;">The Loan is to be used for the purpose set out in the Letter of Approval.</div>
        </div>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">2. LOAN AMOUNT</div>
          <div style="color: white; font-size: 1.4rem; font-weight: 800;">Up to $10,000,000</div>
        </div>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">3. LOAN TERM</div>
          <div style="color: white; font-size: 1.4rem; font-weight: 800;">Maximum 10 Years</div>
        </div>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">4. INTEREST RATE</div>
          <div style="color: white; font-size: 1.4rem; font-weight: 800;">6.11% - 9% (Fixed)</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Repayment Terms Card -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
    <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #0f172a; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
      REPAYMENT
    </div>
    <div style="margin-top: 1.5rem;">
      <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 1.5rem;">
        💰 Repayment Structure
      </h3>
      
      <div style="space-y: 1rem;">
        <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
          <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">5.1 MONTHLY PAYMENTS</div>
          <div style="color: #e1e7ef;">Principal + Interest charge on a monthly basis</div>
        </div>
        
        <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
          <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">5.2 BALLOON PAYMENTS</div>
          <div style="color: #e1e7ef;">Balloon Payments are accepted</div>
        </div>
        
        <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
          <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">5.3 PREPAYMENT</div>
          <div style="color: #e1e7ef;">Right to repay in full at any time before maturity date without prepayment penalties</div>
        </div>
        
        <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
          <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">5.4 EARLY REPAYMENT NOTICE</div>
          <div style="color: #e1e7ef;">30 days written notice required for early repayment</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Security Options Section -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; margin-bottom: 2rem;">
  <h2 style="font-size: 2rem; font-weight: 800; color: #fbbf24; margin-bottom: 2rem; text-align: center;">
    🔒 SECURITY OPTIONS
  </h2>
  <p style="color: #e1e7ef; font-size: 1.1rem; text-align: center; margin-bottom: 2rem;">
    We accept the following as Security for our Business Loans:
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <!-- Real Estate Security -->
    <div style="background: rgba(239, 68, 68, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #ef4444;">
      <h4 style="color: #ef4444; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🏢 REAL ESTATE</h4>
      <div style="color: #fecaca; font-size: 0.95rem; line-height: 1.5;">
        First lien over subject property with clear report and certificate of good marketable title attached.
      </div>
    </div>
    
    <!-- Credit Protection Insurance -->
    <div style="background: rgba(59, 130, 246, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <h4 style="color: #3b82f6; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🛡️ CREDIT PROTECTION INSURANCE</h4>
      <div style="color: #bfdbfe; font-size: 0.95rem; line-height: 1.5;">
        Borrower ensures all premiums are paid on time. Available from our Insurance Department or third party insurer.
      </div>
    </div>
    
    <!-- Personal Guarantee -->
    <div style="background: rgba(168, 85, 247, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #a855f7;">
      <h4 style="color: #a855f7; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">✍️ PERSONAL GUARANTEE</h4>
      <div style="color: #e9d5ff; font-size: 0.95rem; line-height: 1.5;">
        Guarantor agrees to pay outstanding amounts if business fails to fulfill obligations. Remains binding even in cases of death, terminal illness, or disability.
      </div>
    </div>
    
    <!-- Bank Guarantee -->
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h4 style="color: #22c55e; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🏦 BANK GUARANTEE</h4>
      <div style="color: #bbf7d0; font-size: 0.95rem; line-height: 1.5;">
        Irrevocable and unconditional Bank Guarantee Letter. Payment on demand up to loan amount + interest. Accepts only MT760 SWIFT.
      </div>
    </div>
    
    <!-- Business Assets -->
    <div style="background: rgba(245, 158, 11, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #f59e0b;">
      <h4 style="color: #f59e0b; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🏭 BUSINESS ASSETS</h4>
      <div style="color: #fde68a; font-size: 0.95rem; line-height: 1.5;">
        First lien on all business assets. Borrower cannot create liens without prior written consent. Serves as collateral for full repayment.
      </div>
    </div>
    
    <!-- Inventory -->
    <div style="background: rgba(99, 102, 241, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #6366f1;">
      <h4 style="color: #6366f1; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">📦 INVENTORY</h4>
      <div style="color: #c7d2fe; font-size: 0.95rem; line-height: 1.5;">
        Security interest in all inventory including raw materials, work in progress, and finished goods. Right to inspect and monitor at reasonable times.
      </div>
    </div>
  </div>
</div>

<!-- Costs Section -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; margin-bottom: 2rem;">
  <h2 style="font-size: 2rem; font-weight: 800; color: #fbbf24; margin-bottom: 2rem; text-align: center;">
    💵 COSTS & FEES
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">7.1 APPRAISAL CHARGE</h4>
      <div style="color: #fef3c7; font-size: 0.95rem; line-height: 1.5;">
        Independent professional valuation for Real Estate, Business Assets, or Inventory at borrower's expense prior to Draw Down.
      </div>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">7.2 INSURANCE PREMIUM</h4>
      <div style="color: #fef3c7; font-size: 0.95rem; line-height: 1.5;">
        Credit Protection Insurance cost determined case-by-case based on risk factors. Payment plans available: quarterly, semi-annual, annual, or one-off.
      </div>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">7.3 DEFAULT PREVENTION FEE</h4>
      <div style="color: #fef3c7; font-size: 0.95rem; line-height: 1.5;">
        For Personal Guarantee security: Amount equal to three (3) monthly repayments to cover potential defaults and demonstrate commitment.
      </div>
    </div>
  </div>
</div>

<!-- Additional Terms -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
  
  <!-- Refund Policy -->
  <div style="background: linear-gradient(135deg, #059669, #10b981); border-radius: 12px; padding: 2rem; border: 2px solid #22c55e;">
    <h3 style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 1.5rem;">
      💰 REFUND POLICY
    </h3>
    <div style="color: #a7f3d0; space-y: 1rem;">
      <div style="margin-bottom: 1rem;">
        <strong style="color: white;">8.1</strong> 100% refund of unused portion of "Default Preventive Fee"
      </div>
      <div>
        <strong style="color: white;">8.2</strong> Refund of portion of insurance premium for early loan prepayment based on remaining term
      </div>
    </div>
  </div>
  
  <!-- Annual Review -->
  <div style="background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 12px; padding: 2rem; border: 2px solid #c084fc;">
    <h3 style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 1.5rem;">
      📊 ANNUAL REVIEW
    </h3>
    <div style="color: #e9d5ff;">
      All business borrowers are offered the option of an annual review in relation to all facilities including security and alternate repayment arrangements.
    </div>
  </div>
  
  <!-- Draw Down -->
  <div style="background: linear-gradient(135deg, #dc2626, #ef4444); border-radius: 12px; padding: 2rem; border: 2px solid #fca5a5;">
    <h3 style="font-size: 1.6rem; font-weight: 800; color: white; margin-bottom: 1.5rem;">
      📋 DRAW DOWN
    </h3>
    <div style="color: #fecaca; space-y: 1rem;">
      <div style="margin-bottom: 1rem;">
        <strong style="color: white;">10.1</strong> Loan disbursed when all conditions are met as specified in Loan Approval Letter
      </div>
      <div>
        <strong style="color: white;">10.2</strong> Partial draw downs on different dates can be requested
      </div>
    </div>
  </div>
</div>

<!-- FAQ Section -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; margin-bottom: 2rem;">
  <h2 style="font-size: 2rem; font-weight: 800; color: #fbbf24; margin-bottom: 2rem; text-align: center;">
    ❓ FREQUENTLY ASKED QUESTIONS
  </h2>
  
  <div style="display: grid; gap: 1.5rem;">
    
    <div style="background: rgba(251, 191, 36, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1rem; margin-bottom: 0.8rem;">❓ How fast can you fund?</h4>
      <div style="color: #e1e7ef; font-size: 0.95rem; line-height: 1.5;">
        The key factor in expediting the funding process is quick submission of all necessary documents. Once we receive all required paperwork, we can fund as fast as 5 Business Days.
      </div>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1rem; margin-bottom: 0.8rem;">❓ Do you do Hard Pulls?</h4>
      <div style="color: #e1e7ef; font-size: 0.95rem; line-height: 1.5;">
        No. We may require you to submit a copy of your credit report or do a soft pull in most instances.
      </div>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1rem; margin-bottom: 0.8rem;">❓ Do you fund bad credit?</h4>
      <div style="color: #e1e7ef; font-size: 0.95rem; line-height: 1.5;">
        Yes we do. We are an Alternative Lender.
      </div>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1rem; margin-bottom: 0.8rem;">❓ Where does your money come from?</h4>
      <div style="color: #e1e7ef; font-size: 0.95rem; line-height: 1.5;">
        Our funds are pooled from High Net-worth Investors. Each investor contributes a portion of the total amount required, spreading the risk across a broader base. 
        <a href="http://www.sundrycapitalsolutions.com/investorsportal" style="color: #fbbf24; text-decoration: underline;">See Investors Portal</a>
      </div>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1rem; margin-bottom: 0.8rem;">❓ Do you accept 2nd Lien position for Real Estate Security?</h4>
      <div style="color: #e1e7ef; font-size: 0.95rem; line-height: 1.5;">
        Yes we do.
      </div>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.05); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; font-size: 1rem; margin-bottom: 0.8rem;">❓ Do you fund international deals?</h4>
      <div style="color: #e1e7ef; font-size: 0.95rem; line-height: 1.5;">
        Yes we do. Determined on case-by-case basis.
      </div>
    </div>
  </div>
</div>

<!-- Legal & Compliance -->
<div style="background: linear-gradient(135deg, #7f1d1d, #991b1b); border-radius: 12px; padding: 2rem; border: 2px solid #fca5a5; margin-bottom: 2rem;">
  <h2 style="font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 1.5rem; text-align: center;">
    ⚖️ LEGAL & COMPLIANCE
  </h2>
  
  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(254, 202, 202, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fca5a5;">
      <h4 style="color: #fca5a5; font-weight: 700; margin-bottom: 0.8rem;">JOINT & SEVERAL LIABILITY</h4>
      <div style="color: #fecaca; font-size: 0.95rem;">
        Where any loan is granted by two or more persons, the liability and obligation to Sundry Capital Solutions shall be joint and several.
      </div>
    </div>
    
    <div style="background: rgba(254, 202, 202, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fca5a5;">
      <h4 style="color: #fca5a5; font-weight: 700; margin-bottom: 0.8rem;">APPEALS/COMPLAINTS</h4>
      <div style="color: #fecaca; font-size: 0.95rem;">
        Written appeals must be submitted within 5 working days. Complaints may also be filed with The Consumer Financial Protection Bureau (CFPB) via www.consumerfinance.gov
      </div>
    </div>
    
    <div style="background: rgba(254, 202, 202, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fca5a5;">
      <h4 style="color: #fca5a5; font-weight: 700; margin-bottom: 0.8rem;">GOVERNING LAW</h4>
      <div style="color: #fecaca; font-size: 0.95rem;">
        The validity, meaning, enforceability, and effect of the Loan Agreement shall be determined in accordance with the laws of the State of California.
      </div>
    </div>
  </div>
</div>

<!-- Contact Information -->
<div style="background: linear-gradient(135deg, #166534, #16a34a); border-radius: 12px; padding: 2rem; border: 2px solid #22c55e; text-align: center;">
  <h2 style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 1rem;">
    📞 READY TO GET STARTED?
  </h2>
  <p style="color: #bbf7d0; font-size: 1.2rem; margin-bottom: 1.5rem;">
    Contact Sundry Capital Solutions today to discuss your business financing needs
  </p>
  <div style="color: #dcfce7; font-size: 1rem;">
    Professional, Fast, and Flexible Business Financing Solutions
  </div>
</div>

</div>`
  },
  {
    id: "residential-investment", 
    name: "Residential Investment",
    interestRate: "Starting at 5.00%",
    minimumLoanAmount: "$500,000",
    description: "Asset-based private lender providing flexible financing solutions for residential investment properties.",
    terms: `Comprehensive residential investment property financing details would go here...`
  }
];