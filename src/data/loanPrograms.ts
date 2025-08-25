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
    id: "residential-investment",
    name: "Residential Investment Property Financing",
    interestRate: "Starting at 5.00%",
    minimumLoanAmount: "$500,000", 
    description: "Flexible financing solutions for residential investment properties including single-family homes, condos, townhouses, and multi-family properties up to four units.",
    terms: `
<div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    RESIDENTIAL INVESTMENT PROPERTY FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Asset-Based Private Lender Providing Flexible Financing Solutions for Residential Investment Properties
  </p>
</div>

<div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
  <p style="color: #e5e7eb; font-size: 1.1rem; text-align: center; margin-bottom: 1rem;">
    We are an asset-based private lender providing flexible financing solutions for residential investment properties.
  </p>
  <p style="color: #cbd5e1; font-size: 1rem; text-align: center;">
    The financing options we cover under our Residential Loan programs are outlined below in this particular order:
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; text-align: center;">
    <div style="font-weight: 700; color: white;">1. First Mortgage</div>
  </div>
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1rem; border-radius: 6px; text-align: center;">
    <div style="font-weight: 700; color: white;">2. Rate and Term Refinance</div>
  </div>
  <div style="background: linear-gradient(45deg, #7c3aed, #a855f7); padding: 1rem; border-radius: 6px; text-align: center;">
    <div style="font-weight: 700; color: white;">3. Cash-out Refinance</div>
  </div>
  <div style="background: linear-gradient(45deg, #ea580c, #f97316); padding: 1rem; border-radius: 6px; text-align: center;">
    <div style="font-weight: 700; color: white;">4. Bridge Loan</div>
  </div>
  <div style="background: linear-gradient(45deg, #0891b2, #06b6d4); padding: 1rem; border-radius: 6px; text-align: center;">
    <div style="font-weight: 700; color: white;">5. 100% Financing Program</div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #059669, #10b981); padding: 2rem; border-radius: 8px; margin-bottom: 2rem;">
  <h3 style="color: white; font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; text-align: center;">🏠 ELIGIBLE PROPERTY TYPES</h3>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.5rem;">
    <div style="color: #a7f3d0; padding: 0.5rem;">• Single-family homes</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Condominiums</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Townhouses</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Multi-family homes (up to four units)</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Modular homes</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Manufactured homes (mobile homes)</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Co-ops (cooperative housing)</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Mixed-use properties (with residential component)</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Vacation properties & second homes</div>
    <div style="color: #a7f3d0; padding: 0.5rem;">• Residential investment properties</div>
  </div>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
  
  <!-- Purchase Terms -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #fbbf24;">
    <h3 style="font-size: 1.5rem; font-weight: 800; color: #fbbf24; margin-bottom: 1.5rem; text-align: center;">
      🏡 PURCHASE TERMS
    </h3>
    
    <div style="space-y: 1rem;">
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">Minimum Loan Amount</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">$500,000</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">Interest Rate (Fixed)</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Starting at 5.00% per annum</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">Interest Rate (Variable)</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Starting at Prime + 2.00%</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">Term Length</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">15, 20, 30, or 40 years</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">Loan-to-Value</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Up to 90% • 100% financing available</div>
        <div style="color: #cbd5e1; font-size: 0.8rem;">(See Primary Qualifications section below)</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">Origination Fee</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">1-2% (financing Available)</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">Prepayment Penalty</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">None - pay off anytime</div>
      </div>
    </div>
  </div>

  <!-- Rate and Term Refinance -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #ef4444;">
    <h3 style="font-size: 1.5rem; font-weight: 800; color: #ef4444; margin-bottom: 1.5rem; text-align: center;">
      🔄 RATE AND TERM REFINANCE
    </h3>
    
    <div style="space-y: 1rem;">
      <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #ef4444; margin-bottom: 1rem;">
        <div style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">Minimum Loan Amount</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">$500,000</div>
      </div>
      
      <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #ef4444; margin-bottom: 1rem;">
        <div style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">Interest Rate (Fixed)</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Starting at 5.27%</div>
      </div>
      
      <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #ef4444; margin-bottom: 1rem;">
        <div style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">Term Length</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">15 to 30 years</div>
      </div>
      
      <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #ef4444; margin-bottom: 1rem;">
        <div style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">Prepayment Penalty</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">No prepayment penalty</div>
      </div>
      
      <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #ef4444; margin-bottom: 1rem;">
        <div style="color: #ef4444; font-weight: 700; font-size: 0.9rem;">Ideal For</div>
        <div style="color: #fecaca; font-size: 0.95rem;">
          • Reducing monthly payments<br>
          • Securing a better interest rate<br>
          • Converting adjustable to fixed rate<br>
          • Changing loan terms
        </div>
      </div>
    </div>
  </div>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
  
  <!-- Cash-Out Refinance -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #a855f7;">
    <h3 style="font-size: 1.5rem; font-weight: 800; color: #a855f7; margin-bottom: 1.5rem; text-align: center;">
      💰 CASH-OUT REFINANCE
    </h3>
    <p style="color: #e9d5ff; font-size: 1rem; margin-bottom: 1.5rem; text-align: center;">
      If you already own a property and are looking to tap into your equity, our cash-out refinance option may be perfect for you.
    </p>
    
    <div style="space-y: 1rem;">
      <div style="background: rgba(168, 85, 247, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #a855f7; margin-bottom: 1rem;">
        <div style="color: #a855f7; font-weight: 700; font-size: 0.9rem;">Maximum LTV Ratio</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Up to 85%</div>
      </div>
      
      <div style="background: rgba(168, 85, 247, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #a855f7; margin-bottom: 1rem;">
        <div style="color: #a855f7; font-weight: 700; font-size: 0.9rem;">Interest Rate (Fixed)</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Starting at 5.77%</div>
      </div>
      
      <div style="background: rgba(168, 85, 247, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #a855f7; margin-bottom: 1rem;">
        <div style="color: #a855f7; font-weight: 700; font-size: 0.9rem;">Interest Rate (Variable)</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Starting at Prime + 2.25%</div>
      </div>
      
      <div style="background: rgba(168, 85, 247, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #a855f7; margin-bottom: 1rem;">
        <div style="color: #a855f7; font-weight: 700; font-size: 0.9rem;">Term Length</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Up to 30 years</div>
      </div>
      
      <div style="background: rgba(168, 85, 247, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #a855f7; margin-bottom: 1rem;">
        <div style="color: #a855f7; font-weight: 700; font-size: 0.9rem;">Cash-Out Amount</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Available for any use (no restrictions)</div>
      </div>
      
      <div style="background: rgba(168, 85, 247, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #a855f7; margin-bottom: 1rem;">
        <div style="color: #a855f7; font-weight: 700; font-size: 0.9rem;">Seasoning Requirements</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">None - refinance immediately after purchase</div>
      </div>
    </div>
  </div>

  <!-- Bridge Loan -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #f97316;">
    <h3 style="font-size: 1.5rem; font-weight: 800; color: #f97316; margin-bottom: 1.5rem; text-align: center;">
      🌉 BRIDGE LOAN
    </h3>
    <p style="color: #fed7aa; font-size: 1rem; margin-bottom: 1.5rem; text-align: center;">
      Our Bridge Loan product is designed to provide short-term financing solutions for clients who need immediate funds to bridge the gap between buying a new property and selling their existing one.
    </p>
    
    <div style="space-y: 1rem;">
      <div style="background: rgba(249, 115, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #f97316; margin-bottom: 1rem;">
        <div style="color: #f97316; font-weight: 700; font-size: 0.9rem;">Minimum Loan Amount</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">$100,000</div>
      </div>
      
      <div style="background: rgba(249, 115, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #f97316; margin-bottom: 1rem;">
        <div style="color: #f97316; font-weight: 700; font-size: 0.9rem;">Term Length</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">3 to 24 months</div>
      </div>
      
      <div style="background: rgba(249, 115, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #f97316; margin-bottom: 1rem;">
        <div style="color: #f97316; font-weight: 700; font-size: 0.9rem;">Interest Rate</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">9.5%</div>
      </div>
      
      <div style="background: rgba(249, 115, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #f97316; margin-bottom: 1rem;">
        <div style="color: #f97316; font-weight: 700; font-size: 0.9rem;">LTV</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Up to 75%</div>
      </div>
      
      <div style="background: rgba(249, 115, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #f97316; margin-bottom: 1rem;">
        <div style="color: #f97316; font-weight: 700; font-size: 0.9rem;">Origination Fee</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">2% (up to 50% financing available)</div>
        <div style="color: #fed7aa; font-size: 0.8rem;">Unless you prefer to pay out of pocket at closing</div>
      </div>
    </div>
  </div>
</div>

<!-- Payment Structure -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #06b6d4; margin-bottom: 2rem;">
  <h3 style="font-size: 1.8rem; font-weight: 800; color: #06b6d4; margin-bottom: 1.5rem; text-align: center;">
    💳 PAYMENT STRUCTURE
  </h3>
  <p style="color: #cffafe; font-size: 1.1rem; margin-bottom: 2rem; text-align: center;">
    We offer flexible payment structures to accommodate different financial strategies and cash flow needs:
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <!-- Fully Amortizing -->
    <div style="background: rgba(6, 182, 212, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #06b6d4;">
      <h4 style="color: #06b6d4; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">📊 FULLY AMORTIZING</h4>
      <div style="color: #cffafe; font-size: 0.95rem; line-height: 1.5;">
        • Principal and interest payments throughout loan term<br>
        • Loan is fully paid off at maturity<br>
        • Builds equity with each payment<br>
        • Available for all loan types<br>
        • Best for primary residences
      </div>
    </div>
    
    <!-- Interest-Only Period -->
    <div style="background: rgba(6, 182, 212, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #06b6d4;">
      <h4 style="color: #06b6d4; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">⏰ INTEREST-ONLY PERIOD</h4>
      <div style="color: #cffafe; font-size: 0.95rem; line-height: 1.5;">
        • Interest-only payments for 1-10 years<br>
        • Converts to fully amortizing after interest-only period<br>
        • Lower initial payments<br>
        • Good for property improvement projects<br>
        • Available for all property types
      </div>
    </div>
    
    <!-- Interest-Only + Balloon -->
    <div style="background: rgba(6, 182, 212, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #06b6d4;">
      <h4 style="color: #06b6d4; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">🎈 INTEREST-ONLY + BALLOON</h4>
      <div style="color: #cffafe; font-size: 0.95rem; line-height: 1.5;">
        • Interest-only payments for entire term<br>
        • Principal due at maturity (balloon payment)<br>
        • Lowest monthly payments<br>
        • Ideal for investment properties
      </div>
    </div>
  </div>
</div>

<!-- 100% Financing -->
<div style="background: linear-gradient(135deg, #dc2626, #ef4444); border-radius: 8px; padding: 2rem; border: 2px solid #fca5a5; margin-bottom: 2rem;">
  <h3 style="font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 1.5rem; text-align: center;">
    🎯 100% FINANCING PROGRAM
  </h3>
  <p style="color: #fecaca; font-size: 1.1rem; margin-bottom: 2rem; text-align: center;">
    We offer industry-leading 100% financing options for qualified deals. To qualify for zero down investment property loans, applicants must meet the following enhanced criteria:
  </p>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
    <h4 style="color: #fbbf24; font-weight: 700; font-size: 1.2rem; margin-bottom: 1rem; text-align: center;">
      We require a combination of any two options below as a qualifier:
    </h4>
  </div>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h5 style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">MINIMUM FICO (CREDIT SCORE)</h5>
      <div style="color: white; font-size: 1.1rem; font-weight: 800;">680</div>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h5 style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">EXPERIENCE</h5>
      <div style="color: #fecaca; font-size: 0.95rem;">Applicant or team must have closed at least 3 Residential real estate transactions in last 5 years OR verifiable residential property management track record</div>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h5 style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">NET WORTH</h5>
      <div style="color: white; font-size: 1.1rem; font-weight: 800;">Minimum 1.5x the loan amount</div>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h5 style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">LIQUIDITY</h5>
      <div style="color: white; font-size: 1.1rem; font-weight: 800;">6 months of debt service payments in reserves</div>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h5 style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">INCOME VERIFICATION</h5>
      <div style="color: #fecaca; font-size: 0.95rem;">2 years tax returns and 3 months bank statements</div>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h5 style="color: #fbbf24; font-weight: 700; font-size: 0.9rem; margin-bottom: 0.5rem;">CROSS-COLLATERALIZATION</h5>
      <div style="color: #fecaca; font-size: 0.95rem;">Additional properties offered as collateral</div>
    </div>
  </div>
</div>

<!-- FAQ Section -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #22c55e; margin-bottom: 2rem;">
  <h3 style="font-size: 1.8rem; font-weight: 800; color: #22c55e; margin-bottom: 2rem; text-align: center;">
    ❓ FREQUENTLY ASKED QUESTIONS
  </h3>
  
  <div style="space-y: 1.5rem;">
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h5 style="color: #22c55e; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">Can I close a deal if the property is currently tenant-occupied or leased?</h5>
      <div style="color: #bbf7d0; font-size: 0.95rem; line-height: 1.5;">
        Yes, but certain occupancy arrangements may affect eligibility and terms. We'll evaluate how existing leases impact collateral value and may request lease documentation or proof of tenant payments.
      </div>
    </div>
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h5 style="color: #22c55e; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">How is the origination fee structured?</h5>
      <div style="color: #bbf7d0; font-size: 0.95rem; line-height: 1.5;">
        We provide up to 50% financing (Interest charged) unless applicant prefers to pay at closing.
      </div>
    </div>
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h5 style="color: #22c55e; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">What happens if my property is in the middle of major renovations, or if it's not fully habitable?</h5>
      <div style="color: #bbf7d0; font-size: 0.95rem; line-height: 1.5;">
        We review the current condition and scope of work. Funds for properties under renovation may have additional requirements, like a completion reserve or future inspection, and the initial LTV could be lower until work is completed.
      </div>
    </div>
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h5 style="color: #22c55e; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">What if there are title issues, such as liens, judgments, or boundary discrepancies?</h5>
      <div style="color: #bbf7d0; font-size: 0.95rem; line-height: 1.5;">
        All outstanding issues such as mechanic's liens, IRS liens, unpaid taxes, or encroachments must be resolved prior to closing. If discovered late, this may delay or jeopardize funding. Early title search is key.
      </div>
    </div>
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h5 style="color: #22c55e; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">Are there limits or special conditions for mixed-use or non-traditional properties?</h5>
      <div style="color: #bbf7d0; font-size: 0.95rem; line-height: 1.5;">
        We lend on mixed-use so long as there's a residential component. We'll assess zoning compliance and the proportion of residential use. Unusual property types may take longer to review and may impact eligible LTV.
      </div>
    </div>
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h5 style="color: #22c55e; font-weight: 700; font-size: 1rem; margin-bottom: 0.5rem;">What happens if my existing property does not sell within the bridge loan term?</h5>
      <div style="color: #bbf7d0; font-size: 0.95rem; line-height: 1.5;">
        We work with you closely to assess exit strategies and may consider extensions based on your circumstances and collateral value.
      </div>
    </div>
  </div>
</div>

<!-- Document Checklist -->
<div style="background: linear-gradient(135deg, #7c3aed, #a855f7); border-radius: 8px; padding: 2rem; border: 2px solid #c084fc; margin-bottom: 2rem;">
  <h3 style="font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 2rem; text-align: center;">
    📋 DOCUMENT CHECKLIST
  </h3>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="color: white; font-weight: 600;">Government-issued ID</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="color: white; font-weight: 600;">Property details (address, type, size)</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="color: white; font-weight: 600;">Purchase agreement (for purchases)</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="color: white; font-weight: 600;">Current mortgage statement (for refinances)</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="color: white; font-weight: 600;">Proof of property insurance</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="color: white; font-weight: 600;">Recent property tax statement</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="color: white; font-weight: 600;">Most recent appraisal report (If available)</div>
    </div>
  </div>
</div>

</div>`
  },
  {
    id: "commercial-real-estate",
    name: "Commercial Real Estate",
    interestRate: "Starting at 6.25%",
    minimumLoanAmount: "$1,000,000",
    description: "Comprehensive financing for office buildings, retail spaces, warehouses, and other commercial properties with competitive rates and flexible terms.",
    terms: `
<div style="background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    COMMERCIAL REAL ESTATE FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Comprehensive Financing Solutions for Commercial Real Estate Properties
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🏢 Commercial Property Types</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Office Buildings
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Retail Spaces & Shopping Centers
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Warehouses & Industrial
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Mixed-Use Developments
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">💰 Loan Features</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Up to $10M+ loan amounts
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Competitive interest rates
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Flexible payment structures
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Quick approval process
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "commercial-dscr",
    name: "Commercial DSCR",
    interestRate: "Starting at 6.75%",
    minimumLoanAmount: "$250,000",
    description: "Debt Service Coverage Ratio loans for income-producing commercial properties with streamlined qualification based on property cash flow.",
    terms: `
<div style="background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    COMMERCIAL DSCR FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Income-Based Commercial Property Financing Solutions
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">📊 DSCR Advantages</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        No personal income verification
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Property cash flow based qualification
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Faster underwriting process
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Ideal for investors
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">💼 Qualifying Properties</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Office buildings with stable tenants
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Retail properties with leases
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Industrial rental properties
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Mixed-use income properties
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "mobile-home-park",
    name: "Mobile Home Park Financing",
    interestRate: "Starting at 6.50%",
    minimumLoanAmount: "$500,000",
    description: "Specialized financing for mobile home parks and manufactured housing communities with understanding of unique operational requirements.",
    terms: `
<div style="background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    MOBILE HOME PARK FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Specialized Financing for Mobile Home Parks & Manufactured Housing Communities
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🏘️ Property Types</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Traditional mobile home parks
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Manufactured housing communities
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Age-restricted communities
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Mixed recreational vehicle parks
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🎯 Our Expertise</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Understanding of community dynamics
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Experience with lot rent models
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Infrastructure improvement financing
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Flexible payment structures
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "self-storage",
    name: "Self Storage Financing",
    interestRate: "Starting at 6.00%",
    minimumLoanAmount: "$500,000",
    description: "Financing solutions for self storage facilities including new construction, acquisitions, and facility expansions.",
    terms: `
<div style="background: linear-gradient(135deg, #0891b2 0%, #06b6d4 50%, #22d3ee 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    SELF STORAGE FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Comprehensive Financing Solutions for Self Storage Facilities
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🏢 Financing Options</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        New construction projects
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Existing facility acquisitions
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Facility expansions
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Refinancing opportunities
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">📈 Industry Benefits</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Recession-resistant income stream
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Minimal management requirements
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Scalable business model
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Strong market demand
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "senior-living",
    name: "Senior Living Financing",
    interestRate: "Starting at 6.25%",
    minimumLoanAmount: "$1,000,000",
    description: "Financing for senior living facilities including assisted living, memory care, and independent living communities.",
    terms: `
<div style="background: linear-gradient(135deg, #be185d 0%, #ec4899 50%, #f472b6 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    SENIOR LIVING FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Specialized Financing for Senior Living & Care Facilities
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🏥 Facility Types</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Assisted living facilities
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Memory care communities
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Independent living communities
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Continuing care retirement communities
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">📊 Market Advantages</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Growing aging population
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Stable long-term income
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Essential service demand
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Premium market positioning
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "fix-flip",
    name: "Fix & Flip Financing",
    interestRate: "Starting at 8.50%",
    minimumLoanAmount: "$100,000",
    description: "Short-term financing for real estate investors to purchase, renovate, and resell properties quickly.",
    terms: `
<div style="background: linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    FIX & FLIP FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Fast, Flexible Financing for Real Estate Investors
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">⚡ Speed Advantages</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        5-10 day approval process
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Asset-based underwriting
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Construction draw schedule
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Competitive advantage in bidding
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">💼 Financing Structure</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Up to 90% of purchase price
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        100% of renovation costs
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Interest-only payments
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        6-18 month terms
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "construction-loans",
    name: "Construction Loans",
    interestRate: "Starting at 7.00%",
    minimumLoanAmount: "$500,000",
    description: "Construction financing for ground-up development projects and major renovations with draw schedules.",
    terms: `
<div style="background: linear-gradient(135d, #ca8a04 0%, #eab308 50%, #facc15 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    CONSTRUCTION FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    SUNDRY CAPITAL SOLUTIONS
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Comprehensive Construction & Development Financing
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🏗️ Project Types</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Ground-up construction
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Major renovations
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Commercial developments
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">•</span>
        Multi-family projects
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">💰 Draw Schedule Benefits</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Staged funding based on progress
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Interest only on drawn amounts
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Professional inspections
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Flexible conversion options
      </li>
    </ul>
  </div>
</div>

</div>`
  },
  {
    id: "business-loans",
    name: "Business Loans",
    interestRate: "6.11% - 9% (Fixed)",
    minimumLoanAmount: "$100,000",
    description: "Comprehensive business financing solutions with flexible terms and multiple security options for established businesses.",
    terms: `
<div style="background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    BUSINESS LOAN TERMS AND CONDITIONS
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    V6. 01-2025
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    This overview will provide you with an in-depth understanding of the various components of our Terms & Conditions.
  </p>
  <p style="font-size: 0.95rem; color: #cbd5e1; margin-top: 1rem;">
    This is not an exhaustive list, and additional terms may be included in your specific Loan agreement. Read and retain this document for future reference.
  </p>
</div>

<!-- Main Terms Grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
  
  <!-- Purpose and Basic Terms -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #fbbf24;">
    <h3 style="font-size: 1.5rem; font-weight: 800; color: #fbbf24; margin-bottom: 1.5rem; text-align: center;">
      📋 LOAN OVERVIEW
    </h3>
    
    <div style="space-y: 1rem;">
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">1. Purpose</div>
        <div style="color: white; font-size: 1rem;">The Loan is to be used for the purpose set out in the Letter of approval.</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">2. Loan Amount</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Up to $10,000,000.00</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">3. Loan Term</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">Our Maximum Loan Term is 10 years</div>
      </div>
      
      <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #fbbf24; margin-bottom: 1rem;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">4. Interest Rate</div>
        <div style="color: white; font-size: 1.2rem; font-weight: 800;">6.11% - 9% (Fixed)</div>
      </div>
    </div>
  </div>

  <!-- Repayment Terms -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #22c55e;">
    <h3 style="font-size: 1.5rem; font-weight: 800; color: #22c55e; margin-bottom: 1.5rem; text-align: center;">
      💰 REPAYMENT TERMS
    </h3>
    
    <div style="space-y: 1rem;">
      <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
        <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem;">5.1 Loan Repayment</div>
        <div style="color: white; font-size: 1rem;">The Loan repayment is the Principal + Interest charge on a monthly basis.</div>
      </div>
      
      <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
        <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem;">5.2 Balloon Payments</div>
        <div style="color: white; font-size: 1rem;">Balloon Payments are accepted.</div>
      </div>
      
      <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
        <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem;">5.3 Early Repayment</div>
        <div style="color: white; font-size: 1rem;">The Borrower has the right to repay the Loan in full at any time before the maturity date without incurring any prepayment penalties.</div>
      </div>
      
      <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #22c55e; margin-bottom: 1rem;">
        <div style="color: #22c55e; font-weight: 700; font-size: 0.9rem;">5.4 Early Repayment Notice</div>
        <div style="color: white; font-size: 1rem;">If early repayment is made, the Borrower must provide written notice to Sundry Capital Solutions at least thirty (30) days in advance of the intended repayment date.</div>
      </div>
    </div>
  </div>
</div>

<!-- Security Options -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #ef4444; margin-bottom: 2rem;">
  <h3 style="font-size: 1.5rem; font-weight: 800; color: #ef4444; margin-bottom: 1.5rem; text-align: center;">
    🔒 SECURITY OPTIONS
  </h3>
  <p style="color: #e5e7eb; text-align: center; margin-bottom: 2rem;">
    We accept the following as Security for our Business Loans:
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
    <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="font-weight: 700; color: #ef4444;">🏠 Real Estate</div>
    </div>
    <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="font-weight: 700; color: #ef4444;">🛡️ Credit Protection Insurance</div>
    </div>
    <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="font-weight: 700; color: #ef4444;">👤 Personal Guarantee</div>
    </div>
    <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="font-weight: 700; color: #ef4444;">🏦 Bank Guarantee Letter</div>
    </div>
    <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="font-weight: 700; color: #ef4444;">💼 Business Assets</div>
    </div>
    <div style="background: rgba(239, 68, 68, 0.1); padding: 1rem; border-radius: 6px; text-align: center;">
      <div style="font-weight: 700; color: #ef4444;">📦 Inventory</div>
    </div>
  </div>

  <!-- Detailed Security Terms -->
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <!-- Real Estate Security -->
    <div style="background: rgba(239, 68, 68, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
      <h4 style="color: #ef4444; font-weight: 700; margin-bottom: 1rem;">6.1 Real Estate</h4>
      <p style="color: #fecaca; font-size: 0.9rem; line-height: 1.5;">
        In the event of Real Estate being the proposed security, Sundry will take a first lien over the subject property, with a clear report and certificate of good marketable title attached.
      </p>
    </div>

    <!-- Credit Protection Insurance -->
    <div style="background: rgba(239, 68, 68, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
      <h4 style="color: #ef4444; font-weight: 700; margin-bottom: 1rem;">6.2 Credit Protection Insurance</h4>
      <p style="color: #fecaca; font-size: 0.9rem; line-height: 1.5;">
        In the event of using Credit Protection Insurance Cover as security, the borrower will ensure that all premiums are paid on time to the insurer to guarantee continuous Loan protection.<br><br>
        Borrower can purchase this cover from our Insurance Department as a master policy at a low premium or from any third party insurer.
      </p>
    </div>

    <!-- Personal Guarantee -->
    <div style="background: rgba(239, 68, 68, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
      <h4 style="color: #ef4444; font-weight: 700; margin-bottom: 1rem;">6.3 Personal Guarantee</h4>
      <p style="color: #fecaca; font-size: 0.9rem; line-height: 1.5;">
        In the event of using a Personal Guarantee, if the Borrower (Business) fails to fulfill any part of their obligations, the Guarantor agrees to pay the outstanding amounts in a timely manner.<br><br>
        This Personal Guarantee remains binding on the Guarantor even in cases of death, Terminal illness or Disability.
      </p>
    </div>

    <!-- Bank Guarantee -->
    <div style="background: rgba(239, 68, 68, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
      <h4 style="color: #ef4444; font-weight: 700; margin-bottom: 1rem;">6.4 Bank Guarantee</h4>
      <p style="color: #fecaca; font-size: 0.9rem; line-height: 1.5;">
        In the event of using a Bank Guarantee Letter as security for the Loan, The Bank Guarantee Letter shall be irrevocable and unconditional. Ensuring that we will receive payment on demand up to the Loan amount + interest in case of default by the Borrower.<br><br>
        <strong>We only accept Bank Guarantee via MT760 SWIFT.</strong>
      </p>
    </div>

    <!-- Business Assets -->
    <div style="background: rgba(239, 68, 68, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
      <h4 style="color: #ef4444; font-weight: 700; margin-bottom: 1rem;">6.5 Business Assets</h4>
      <p style="color: #fecaca; font-size: 0.9rem; line-height: 1.5;">
        In the event of Using Business Assets as security, the Borrower agrees that the Loan shall be secured by a first lien on all business assets owned by the Borrower. The Borrower shall not, without prior written consent create or allow any liens, charges, encumbrances, or security interests on the business assets.<br><br>
        The security interest on the business assets shall serve as collateral for the full repayment and discharge of all liabilities owed to Sundry Capital Solutions by the Borrower.
      </p>
    </div>

    <!-- Inventory -->
    <div style="background: rgba(239, 68, 68, 0.05); padding: 1.5rem; border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);">
      <h4 style="color: #ef4444; font-weight: 700; margin-bottom: 1rem;">6.6 Inventory</h4>
      <p style="color: #fecaca; font-size: 0.9rem; line-height: 1.5;">
        In the event of using Inventory as security, Borrower must grant Sundry Capital solutions a security interest in all of its inventory, including but not limited to raw materials, work in progress, and finished goods.<br><br>
        The Borrower agrees that the Lender shall have the right to inspect, verify, and monitor the inventory at any reasonable time and may take possession of such inventory in the event of default or non-payment by the Borrower.<br><br>
        The Borrower must maintain accurate records of its inventory, provide regular reports on inventory levels and turnover upon request, and not to remove or dispose of any inventory without prior written consent of Sundry Capital solutions.<br><br>
        In case of default, we have the right to sell or otherwise dispose of the inventory to recover any outstanding amounts owed.
      </p>
    </div>
  </div>
</div>

<!-- Costs Section -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #a855f7; margin-bottom: 2rem;">
  <h3 style="font-size: 1.5rem; font-weight: 800; color: #a855f7; margin-bottom: 1.5rem; text-align: center;">
    💳 COSTS
  </h3>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <!-- Appraisal Charges -->
    <div style="background: rgba(168, 85, 247, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #a855f7;">
      <h4 style="color: #a855f7; font-weight: 700; margin-bottom: 1rem;">7.1 Appraisal Charge</h4>
      <p style="color: #e9d5ff; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
        When an independent professional valuation is requested as in the case of using Real Estate, Business Assets or Inventory as security, this will be at the borrower's expense prior to Loan Draw Down.
      </p>
      <p style="color: #a855f7; font-size: 0.85rem; font-weight: 600;">
        PS: This is the only charge associated with the Three (3) enlisted securities in paragraph 6.1, 6.4 and 6.5 prior to Draw Down.
      </p>
    </div>

    <!-- Insurance Premium -->
    <div style="background: rgba(168, 85, 247, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #a855f7;">
      <h4 style="color: #a855f7; font-weight: 700; margin-bottom: 1rem;">7.2 Insurance Premium</h4>
      <p style="color: #e9d5ff; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
        The cost of purchasing a Credit Protection Insurance from our Insurance Department is determined on case by case basis based on different individual risk factors such as age, health history, Loan Amount etc.
      </p>
      <p style="color: #e9d5ff; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
        Borrower can select a quarterly, Semi-Annual, Annual, and a One-off payment plan prior to Draw Down.
      </p>
      <p style="color: #e9d5ff; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
        To get an insurance quote, you will have to contact our insurance department.
      </p>
      <p style="color: #a855f7; font-size: 0.85rem; font-weight: 600;">
        PS: The Premium is the only cost associated with the Credit Protection Insurance Security. If Borrower purchases this cover from a third party insurer, No cost will be billed to them by us or our insurance department prior to drawdown.
      </p>
    </div>

    <!-- Default Prevention Fee -->
    <div style="background: rgba(168, 85, 247, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #a855f7;">
      <h4 style="color: #a855f7; font-weight: 700; margin-bottom: 1rem;">7.3 Default Prevention Fee</h4>
      <p style="color: #e9d5ff; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
        If you intend to use Personal Guarantee as repayment security, we will charge an amount equal to three (3) monthly repayment (Principal + Interest), which is intended to cover three (3) potential defaults.
      </p>
      <p style="color: #e9d5ff; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1rem;">
        Payment of this fee demonstrates a commitment from the Guarantor and adds an additional layer of protection for both parties involved.
      </p>
      <p style="color: #a855f7; font-size: 0.85rem; font-weight: 600;">
        PS: This is the only cost associated with the Personal Guarantee Security prior to Draw Down.
      </p>
    </div>
  </div>
</div>

<!-- Additional Terms Grid -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
  
  <!-- Refund Policy -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #06b6d4;">
    <h3 style="font-size: 1.3rem; font-weight: 800; color: #06b6d4; margin-bottom: 1.5rem; text-align: center;">
      🔄 REFUND POLICY
    </h3>
    
    <div style="background: rgba(6, 182, 212, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #06b6d4; margin-bottom: 1rem;">
      <div style="color: #06b6d4; font-weight: 700; font-size: 0.9rem;">8.1 Default Prevention Fee Refund</div>
      <div style="color: #cffafe; font-size: 0.9rem;">Borrower is entitled to 100% refund of any unused portion of the "Default Preventive Fee"</div>
    </div>
    
    <div style="background: rgba(6, 182, 212, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #06b6d4;">
      <div style="color: #06b6d4; font-weight: 700; font-size: 0.9rem;">8.2 Insurance Premium Refund</div>
      <div style="color: #cffafe; font-size: 0.9rem;">In the event that you decide to prepay your Loan before the scheduled term, you may be eligible for a refund of a portion of your insurance premium. This refund would be calculated based on the remaining term of the Loan.</div>
    </div>
  </div>

  <!-- Annual Review -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #f59e0b;">
    <h3 style="font-size: 1.3rem; font-weight: 800; color: #f59e0b; margin-bottom: 1.5rem; text-align: center;">
      📊 ANNUAL REVIEW
    </h3>
    
    <div style="background: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #f59e0b;">
      <div style="color: #fde047; font-size: 0.9rem;">
        All business borrowers are offered the option of an annual review in relation to all facilities including security and alternate repayment arrangement.
      </div>
    </div>
  </div>

  <!-- Draw Down -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #84cc16;">
    <h3 style="font-size: 1.3rem; font-weight: 800; color: #84cc16; margin-bottom: 1.5rem; text-align: center;">
      📥 DRAW DOWN
    </h3>
    
    <div style="background: rgba(132, 204, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #84cc16; margin-bottom: 1rem;">
      <div style="color: #84cc16; font-weight: 700; font-size: 0.9rem;">10.1 Draw Down Process</div>
      <div style="color: #bef264; font-size: 0.9rem;">When the borrower has accepted the letter of approval, along with complying with the terms & conditions, Security, Loan Agreement, and pre-drawdown conditions, then the Loan will be disbursed on the date specified on the Loan Approval Letter.</div>
    </div>
    
    <div style="background: rgba(132, 204, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #84cc16;">
      <div style="color: #84cc16; font-weight: 700; font-size: 0.9rem;">10.2 Partial Draw Downs</div>
      <div style="color: #bef264; font-size: 0.9rem;">If a borrower wishes to draw down parts of the Loan on different dates, this can be requested.</div>
    </div>
  </div>
</div>

<!-- Legal and Compliance -->
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
  
  <!-- Joint & Several Liability -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #ec4899;">
    <h3 style="font-size: 1.3rem; font-weight: 800; color: #ec4899; margin-bottom: 1.5rem; text-align: center;">
      👥 JOINT & SEVERAL LIABILITY
    </h3>
    
    <div style="background: rgba(236, 72, 153, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #ec4899;">
      <div style="color: #f9a8d4; font-size: 0.9rem;">
        Where any Loan is granted by two or more persons the liability & obligation to Sundry Capital Solutions shall be joint and several.
      </div>
    </div>
  </div>

  <!-- Appeals/Complaints -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #8b5cf6;">
    <h3 style="font-size: 1.3rem; font-weight: 800; color: #8b5cf6; margin-bottom: 1.5rem; text-align: center;">
      📞 APPEALS/COMPLAINTS
    </h3>
    
    <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #8b5cf6; margin-bottom: 1rem;">
      <div style="color: #8b5cf6; font-weight: 700; font-size: 0.9rem;">12.1 Appeals Process</div>
      <div style="color: #ddd6fe; font-size: 0.9rem;">Sundry Capital solutions has a process for appeals and complaints. The borrower is to submit a written appeal outlining the basis of their appeal for example, a special condition, a lending decision classifying a borrower as not co-operating etc.<br><br>
      The borrower must submit an appeal in writing within 5 working days of the notification of a decision to Sundry Capital solutions, who will review and aim to resolve the appeal.</div>
    </div>
    
    <div style="background: rgba(139, 92, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #8b5cf6;">
      <div style="color: #8b5cf6; font-weight: 700; font-size: 0.9rem;">12.2 External Complaints</div>
      <div style="color: #ddd6fe; font-size: 0.9rem;">Sundry Capital solutions will make all reasonable efforts to resolve a complaint received. Additionally, a borrower may be able to file a complaint to The Consumer Financial Protection Bureau (CFPB) via www.consumerfinance.gov over any unfair practice.</div>
    </div>
  </div>

  <!-- Governing Law -->
  <div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #f97316;">
    <h3 style="font-size: 1.3rem; font-weight: 800; color: #f97316; margin-bottom: 1.5rem; text-align: center;">
      ⚖️ GOVERNING LAW
    </h3>
    
    <div style="background: rgba(249, 115, 22, 0.1); padding: 1rem; border-radius: 6px; border-left: 4px solid #f97316;">
      <div style="color: #fed7aa; font-size: 0.9rem;">
        The validity, meaning, enforceability, and effect of the Loan Agreement and the rights and liabilities of the parties shall be determined in accordance with the laws of the State of California.
      </div>
    </div>
  </div>
</div>

<!-- FAQ Section -->
<div style="background: linear-gradient(135deg, #0f172a, #1e293b); border-radius: 8px; padding: 2rem; border: 2px solid #22c55e; margin-bottom: 2rem;">
  <h3 style="font-size: 1.5rem; font-weight: 800; color: #22c55e; margin-bottom: 2rem; text-align: center;">
    ❓ FREQUENTLY ASKED QUESTIONS (FAQ)
  </h3>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h4 style="color: #22c55e; font-weight: 700; margin-bottom: 0.5rem;">1. How fast can you Fund?</h4>
      <p style="color: #a7f3d0; font-size: 0.9rem;">The key factor in expediting the funding process is the quick submission of all necessary documents. Once we receive all the required paperwork we can fund as fast as 5 Business Days.</p>
    </div>

    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h4 style="color: #22c55e; font-weight: 700; margin-bottom: 0.5rem;">2. Do you do Hard Pulls?</h4>
      <p style="color: #a7f3d0; font-size: 0.9rem;">No. We may require you to submit a copy of your credit report or do a soft pull in most instances.</p>
    </div>

    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h4 style="color: #22c55e; font-weight: 700; margin-bottom: 0.5rem;">3. Do you Fund Bad Credit?</h4>
      <p style="color: #a7f3d0; font-size: 0.9rem;">Yes we do. We are an Alternative Lender.</p>
    </div>

    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h4 style="color: #22c55e; font-weight: 700; margin-bottom: 0.5rem;">4. Where does your money come from?</h4>
      <p style="color: #a7f3d0; font-size: 0.9rem;">Our Funds are pooled from High Net-worth Investors. Each investor contributes a portion of the total amount required, spreading the risk across a broader base. See the Link www.sundrycapitalsolutions.com/investors-portal</p>
    </div>

    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h4 style="color: #22c55e; font-weight: 700; margin-bottom: 0.5rem;">5. Do you accept 2ND Lien position for Real Estate Security?</h4>
      <p style="color: #a7f3d0; font-size: 0.9rem;">Yes we do.</p>
    </div>

    <div style="background: rgba(34, 197, 94, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #22c55e;">
      <h4 style="color: #22c55e; font-weight: 700; margin-bottom: 0.5rem;">6. Do you Fund International Deals?</h4>
      <p style="color: #a7f3d0; font-size: 0.9rem;">Yes we do. Determined on case-by-case basis.</p>
    </div>
  </div>
</div>

</div>`
  }
];