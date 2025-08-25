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
  }
];