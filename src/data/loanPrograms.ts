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

<div style="margin-bottom: 3rem;">
  <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem; color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
    OUR FINANCING PROGRAMS
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Program 1 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #1
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Standard Purchase Loans
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Perfect for acquiring established RV parks with proven cash flow
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$250,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">5.75%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 80%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">AMORTIZATION</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">30 Years</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 SPECIAL FEATURES:</div>
          <div style="color: #a7f3d0;">Payment frequency adjustments • Interest-only during off-peak seasons • Professional appraisal required</div>
        </div>
      </div>
    </div>

    <!-- Program 2 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #2
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Purchase with DSCR Loan
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Asset-based financing focused on property performance
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$250,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">6.00%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 85%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">15 Years</div>
          </div>
        </div>
        
        <div style="background: rgba(30, 64, 175, 0.2); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6; margin-bottom: 1rem;">
          <div style="color: #93c5fd; font-weight: 700;">🎯 DSCR REQUIREMENTS:</div>
          <div style="color: #dbeafe; font-size: 0.9rem;">
            • Minimum DSCR: 1.15x<br>
            • Long-term rentals: 100% of contract rent (60% minimum preferred)<br>
            • Transient/Seasonal: 65-80% of trailing 12-months income<br>
            • Mixed-income parks: Weighted DSCR or blended discounts
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 BENEFITS:</div>
          <div style="color: #a7f3d0;">Biannual payment options • Streamlined refinance after 2 years • No personal income verification</div>
        </div>
      </div>
    </div>

    <!-- Program 3 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #3
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Cash-Out Refinance
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Access your property's equity for expansion or investments
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$150,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">6.25%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 70%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">20 Years</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 FLEXIBLE TERMS:</div>
          <div style="color: #a7f3d0;">Interest-only first 5 years • Customized seasonal payment schedules • Flexible amortization</div>
        </div>
      </div>
    </div>

    <!-- Program 4 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #4
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Rate and Term Refinance
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Lower payments and improve cash flow with better terms
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$150,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">5.75%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 80%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">AMORTIZATION</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">25 Years</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 ADVANTAGES:</div>
          <div style="color: #a7f3d0;">Lower interest rates • Improved cash flow • Pure refinance benefits</div>
        </div>
      </div>
    </div>

    <!-- Program 5 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #5
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Bridge Financing
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Fast, temporary financing for time-sensitive opportunities
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 80%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">6.50%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">12 Months</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">PAYMENT STRUCTURE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Interest-Only</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 FEATURES:</div>
          <div style="color: #a7f3d0;">Tailored exit strategies • Quick approval process • Perfect for fast closings</div>
        </div>
      </div>
    </div>

    <!-- Program 6 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #6
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          100% Financing Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Industry-leading zero-down financing for qualified investors
        </p>
        
        <div style="background: rgba(30, 64, 175, 0.2); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
          <div style="color: #93c5fd; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">
            🎯 QUALIFY WITH 2 OF THESE CRITERIA:
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💳 CREDIT SCORE</div>
              <div style="color: white; font-size: 1.1rem;">Minimum 680 FICO</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">🏆 EXPERIENCE</div>
              <div style="color: white; font-size: 1.1rem;">3+ comparable transactions in 5 years</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💰 NET WORTH</div>
              <div style="color: white; font-size: 1.1rem;">Minimum 1.5x loan amount</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💎 LIQUIDITY</div>
              <div style="color: white; font-size: 1.1rem;">6 months debt service reserves</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">📊 INCOME VERIFICATION</div>
              <div style="color: white; font-size: 1.1rem;">2 years tax returns + 3 months bank statements</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">🏢 CROSS-COLLATERAL</div>
              <div style="color: white; font-size: 1.1rem;">Additional properties as collateral</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<div style="background: linear-gradient(45deg, #7c3aed, #8b5cf6); padding: 2rem; border-radius: 12px; margin-top: 3rem;">
  <h2 style="color: #fbbf24; font-size: 2rem; font-weight: 800; margin-bottom: 2rem; text-align: center;">
    🏢 REQUIREMENTS & QUALIFICATIONS
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
        🎯 Strong Ownership & Management
      </h3>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li style="margin-bottom: 0.5rem;">• Clear ownership structure and operational responsibility</li>
        <li style="margin-bottom: 0.5rem;">• Experience managing RV parks or similar properties</li>
        <li style="margin-bottom: 0.5rem;">• Professional management in place or planned</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
        🏆 Property Quality & Experience
      </h3>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li style="margin-bottom: 0.5rem;">• Total sites (transient, seasonal, long-term)</li>
        <li style="margin-bottom: 0.5rem;">• Key amenities and special features</li>
        <li style="margin-bottom: 0.5rem;">• Clean, safe environment focus</li>
        <li style="margin-bottom: 0.5rem;">• Recent renovations or upgrades</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
        📊 Consistent Revenue Streams
      </h3>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li style="margin-bottom: 0.5rem;">• Stable or growing occupancy year-round</li>
        <li style="margin-bottom: 0.5rem;">• Multiple revenue streams</li>
        <li style="margin-bottom: 0.5rem;">• Seasonal management strategies</li>
        <li style="margin-bottom: 0.5rem;">• Off-peak period planning</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
        🚀 Market Position
      </h3>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li style="margin-bottom: 0.5rem;">• Strong position in local travel market</li>
        <li style="margin-bottom: 0.5rem;">• Clear competitive advantages</li>
        <li style="margin-bottom: 0.5rem;">• Positive online reviews</li>
        <li style="margin-bottom: 0.5rem;">• Tourist destination proximity</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
        ✅ Compliance & Permits
      </h3>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li style="margin-bottom: 0.5rem;">• Proper local licensing compliance</li>
        <li style="margin-bottom: 0.5rem;">• Health and safety certifications</li>
        <li style="margin-bottom: 0.5rem;">• Environmental compliance history</li>
        <li style="margin-bottom: 0.5rem;">• Improvement project planning</li>
      </ul>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
        💰 Financial Responsibility
      </h3>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li style="margin-bottom: 0.5rem;">• Strong financial stewardship demonstration</li>
        <li style="margin-bottom: 0.5rem;">• Transparent debt and future planning</li>
        <li style="margin-bottom: 0.5rem;">• Clear budget management</li>
        <li style="margin-bottom: 0.5rem;">• Seasonal cash flow strategies</li>
      </ul>
    </div>
    
  </div>
</div>

<div style="background: linear-gradient(45deg, #059669, #10b981); padding: 2rem; border-radius: 12px; margin-top: 3rem;">
  <h2 style="color: white; font-size: 1.8rem; font-weight: 800; margin-bottom: 2rem; text-align: center;">
    💡 FREQUENTLY ASKED QUESTIONS
  </h2>
  
  <div style="display: grid; gap: 1.5rem;">
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: How do you handle seasonal revenue variations?
      </h3>
      <p style="color: #a7f3d0; font-size: 0.95rem; line-height: 1.4;">
        We offer interest-only payment options during off-peak seasons and customized repayment schedules that align with your cash flow patterns. Our industry expertise allows us to structure loans that work with your seasonal business model.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: What makes RV park financing different from other commercial loans?
      </h3>
      <p style="color: #a7f3d0; font-size: 0.95rem; line-height: 1.4;">
        RV parks have unique operational characteristics including seasonal income, mixed revenue streams (transient vs. long-term), and specialized amenities that require industry expertise to properly underwrite. We understand these nuances.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Can I finance improvements along with the purchase?
      </h3>
      <p style="color: #a7f3d0; font-size: 0.95rem; line-height: 1.4;">
        Yes, our programs can include renovation and improvement costs. We'll need detailed project plans, contractor bids, and ROI projections to structure the appropriate financing solution.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: What's the typical approval timeline?
      </h3>
      <p style="color: #a7f3d0; font-size: 0.95rem; line-height: 1.4;">
        Standard loans typically close in 30-45 days, while bridge financing can close in 10-15 days depending on documentation completeness and property complexity.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Do you finance RV parks in all states?
      </h3>
      <p style="color: #a7f3d0; font-size: 0.95rem; line-height: 1.4;">
        We finance RV parks nationwide, with particular expertise in tourist destinations and areas with strong seasonal demand. Each market is evaluated based on local dynamics and growth potential.
      </p>
    </div>
    
  </div>
</div>

<div style="text-align: center; margin-top: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h2 style="color: #fbbf24; font-size: 1.8rem; font-weight: 800; margin-bottom: 1rem;">
    📞 Ready to Discuss Your RV Park Financing?
  </h2>
  <p style="color: #e5e7eb; font-size: 1.1rem; margin-bottom: 1.5rem;">
    Contact Sundry Capital Solutions today for a personalized consultation tailored to your specific RV park investment goals.
  </p>
  <div style="color: #fbbf24; font-size: 1.2rem; font-weight: 700;">
    🚀 Turn Your RV Park Vision Into Reality
  </div>
</div>

</div>
    `
  },
  {
    id: "commercial-mortgage",
    name: "Commercial Mortgage",
    interestRate: "Starting at 5.31%",
    minimumLoanAmount: "$500,000",
    description: "100% financing available • No credit requirements • Fast approval for qualified commercial properties nationwide.",
    terms: `<div style="background: linear-gradient(135deg, #166534 0%, #16a34a 50%, #22c55e 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    COMMERCIAL REAL ESTATE FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Premier Alternative Commercial Lending Institution
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🚫 Market Challenges We Eliminate</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Traditional bank rejections due to credit requirements
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Excessive down payment demands (20-30%)
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Extended approval timelines (90+ days)
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Rigid lending criteria limiting deals
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🎯 CCIF Strategic Advantages</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        100% Financing Available
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Asset-Based Underwriting
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        15-30 Day Closings Standard
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        All Commercial Property Types
      </li>
    </ul>
  </div>
</div>

<div style="margin-bottom: 3rem;">
  <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem; color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
    OUR FINANCING PROGRAMS
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Program 1 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #1
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          First Mortgage Purchase Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          The Foundation Builder for Smart Investors
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATES</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">From 5.31%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LOAN TERMS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">1-30 Years</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 90%</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 IDEAL FOR:</div>
          <div style="color: #a7f3d0;">First-time commercial buyers • Portfolio expansion • Seasoned investors</div>
        </div>
      </div>
    </div>

    <!-- Program 2 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #2
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Second Mortgage & Mezzanine Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Supercharge Your Buying Power
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATES</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">From 7.56%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">COMBINED LTV</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 85%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LOAN TERMS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">1-10 Years</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 IDEAL FOR:</div>
          <div style="color: #a7f3d0;">Maximizing leverage • Cash preservation • Multiple acquisitions</div>
        </div>
      </div>
    </div>

    <!-- Program 3 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #3
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Rate & Term Refinance Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Slash Your Payments, Boost Your Cashflow
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATES</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">From 5.50%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LOAN TERMS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">1-30 Years</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">AMORTIZATION</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 40 Years</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 IDEAL FOR:</div>
          <div style="color: #a7f3d0;">Payment reduction • Capital optimization • Portfolio restructuring</div>
        </div>
      </div>
    </div>

    <!-- Program 4 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #4
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Cash-Out Refinance Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Turn Equity Into Opportunity
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATES</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">From 6.15%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 80%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">CUSTOM TERMS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">1-30 Years</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 IDEAL FOR:</div>
          <div style="color: #a7f3d0;">Portfolio expansion • Business growth • Personal liquidity</div>
        </div>
      </div>
    </div>

    <!-- Program 5 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #5
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Bridge Financing Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Move At The Speed Of Opportunity
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">~9.5%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LOAN TERMS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">3-24 Months</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 75%</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 IDEAL FOR:</div>
          <div style="color: #a7f3d0;">Auction purchases • 1031 exchanges • Fix-and-flip projects • Opportunistic acquisitions</div>
        </div>
      </div>
    </div>

  </div>
</div>

<div style="background: linear-gradient(45deg, #7c3aed, #8b5cf6); padding: 2rem; border-radius: 12px; margin-top: 3rem; text-align: center;">
  <h2 style="color: #fbbf24; font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">
    🎯 EXCLUSIVE 100% FINANCING PROGRAM
  </h2>
  <p style="color: white; font-size: 1.2rem; margin-bottom: 1.5rem;">
    Zero Down Payment - Maximum Profit Potential
  </p>
  
  <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
    <h3 style="color: #fbbf24; font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem;">
      🔓 UNLOCK 100% FINANCING - Meet Just 2 of These Criteria:
    </h3>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1.5rem;">
      <div style="background: rgba(251, 191, 36, 0.2); padding: 1rem; border-radius: 6px; text-align: left;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💳 CREDIT SCORE</div>
        <div style="color: white; font-size: 1.1rem; font-weight: 600;">680+ FICO</div>
      </div>
      <div style="background: rgba(251, 191, 36, 0.2); padding: 1rem; border-radius: 6px; text-align: left;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">🏆 EXPERIENCE</div>
        <div style="color: white; font-size: 1.1rem; font-weight: 600;">3+ commercial deals</div>
      </div>
      <div style="background: rgba(251, 191, 36, 0.2); padding: 1rem; border-radius: 6px; text-align: left;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💰 NET WORTH</div>
        <div style="color: white; font-size: 1.1rem; font-weight: 600;">1.5x loan amount</div>
      </div>
      <div style="background: rgba(251, 191, 36, 0.2); padding: 1rem; border-radius: 6px; text-align: left;">
        <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💵 LIQUIDITY</div>
        <div style="color: white; font-size: 1.1rem; font-weight: 600;">6 months reserves</div>
      </div>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #1f2937, #374151); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: #fbbf24; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    🏢 COMPREHENSIVE PROPERTY COVERAGE
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🏢 TRADITIONAL COMMERCIAL</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Office Buildings (All Classes)</li>
        <li>• Retail & Shopping Centers</li>
        <li>• Industrial & Warehouse</li>
        <li>• Multifamily (5+ units)</li>
        <li>• Mixed-Use Properties</li>
        <li>• Hotels & Hospitality</li>
      </ul>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🎯 SPECIALTY PROPERTIES</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Car Washes & Gas Stations</li>
        <li>• Restaurants & Entertainment</li>
        <li>• Cannabis Facilities</li>
        <li>• Self-Storage</li>
        <li>• Medical Buildings</li>
        <li>• Unique/Non-Conforming Assets</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: white; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    ❓ FREQUENTLY ASKED QUESTIONS
  </h2>
  
  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: How fast can I actually get approved and funded?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> Pre-approval in 48-72 hours, full approval in 15-30 days, funding immediately after closing. We've closed deals in as little as 10 days for urgent situations.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Do you really offer 100% financing with no money down?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> Yes! For qualified borrowers meeting our criteria, we provide true 100% financing. This includes purchase price plus reasonable closing costs.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: What if I have credit issues or past bankruptcies?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> We focus on the asset, not just credit. Many of our successful borrowers had credit challenges. We evaluate the total picture - property strength, experience, and ability to service debt.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: How do your rates compare to banks?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> Our rates are competitive with banks, but we approve deals banks reject. Speed, flexibility, and approval certainty often save you more money than a slightly lower rate elsewhere.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Can I finance multiple properties at once?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> Absolutely! We offer portfolio financing, blanket loans, and cross-collateralization. Many clients finance entire portfolios in single transactions.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: What about environmental issues or special property types?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> We're experts in complex deals. Environmental issues can often be resolved with remediation plans or insurance. We finance cannabis, car washes, gas stations, and other specialty properties others avoid.
      </p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #fbbf24, #f59e0b); padding: 2rem; border-radius: 12px; margin-top: 2rem; text-align: center; color: #1f2937;">
  <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">
    🚀 READY TO DOMINATE YOUR MARKET?
  </h2>
  <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.5rem;">
    GET YOUR DEAL APPROVED IN 48 HOURS
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
    <div style="background: rgba(31, 41, 55, 0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem;">📞 CALL NOW</div>
      <div style="font-size: 1.2rem; font-weight: 800;">1-800-CCIF-LOAN</div>
    </div>
    <div style="background: rgba(31, 41, 55, 0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem;">📧 EMAIL</div>
      <div style="font-size: 1.2rem; font-weight: 800;">deals@ccif.com</div>
    </div>
  </div>
  
  <p style="font-size: 1rem; font-weight: 600; margin-top: 1.5rem;">
    <strong>Don't Let Another Deal Slip Away</strong><br>
    Every day you wait is money left on the table. Contact CCIF today and discover why we're America's #1 choice for commercial real estate financing.
  </p>
</div>

<div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
  <p style="color: #d1d5db; font-size: 0.9rem; line-height: 1.6;">
    <strong>Licensed in all 50 states • A+ BBB Rating • $2.5B+ in funded loans • Asset-based lending specialists</strong>
  </p>
</div>

</div>`
  },
  {
    id: "commercial-dscr-loan",
    name: "Commercial DSCR Loan",
    interestRate: "Starting at 6.57%",
    minimumLoanAmount: "$500,000",
    description: "Cash flow-based financing without personal income verification • Portfolio loans available • Fast closings for income-producing properties.",
    terms: `<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #3b82f6, #1d4ed8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    COMMERCIAL DSCR FINANCING
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #3b82f6; margin-bottom: 0.5rem;">
    COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Cash Flow-Based Commercial Real Estate Lending
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🚫 Traditional Lending Obstacles We Eliminate</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✗</span>
        Personal income verification requirements
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✗</span>
        Restrictive credit score minimums
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✗</span>
        Complex debt-to-income calculations
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✗</span>
        Single property limitations
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🎯 CCIF DSCR Advantages</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✓</span>
        Property Cash Flow Focus Only
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✓</span>
        No Personal Income Documentation
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✓</span>
        Portfolio Financing Available
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #3b82f6;">✓</span>
        Non-Recourse Structure Options
      </li>
    </ul>
  </div>
</div>

<div style="margin-bottom: 3rem;">
  <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem; color: #3b82f6; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
    DSCR LOAN PROGRAM FEATURES
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Core Program -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #3b82f6; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        CORE PROGRAM
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #3b82f6; margin-bottom: 0.5rem;">
          Cash Flow-Based Financing
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Qualify Based on Property Performance, Not Personal Income
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">INTEREST RATES</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Starting at 6.57%</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">MINIMUM DSCR</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">1.15x</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">LOAN-TO-VALUE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 75%</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 IDEAL FOR:</div>
          <div style="color: #a7f3d0;">Rental properties • Apartment buildings • Commercial income properties • Real estate investors</div>
        </div>
      </div>
    </div>

    <!-- Rate Structure -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #3b82f6; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        SMART PRICING
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #3b82f6; margin-bottom: 0.5rem;">
          Performance-Based Rate Structure
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Better Cash Flow = Better Rates
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">DSCR 1.15-1.24</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Base Rate 6.57%</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">DSCR 1.25-1.49</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Rate Discount -0.125%</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">DSCR 1.50+</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Rate Discount -0.25%</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #7c3aed, #8b5cf6); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">🏆 REWARD PERFORMANCE:</div>
          <div style="color: #c4b5fd;">Higher cash flow properties earn lower interest rates automatically</div>
        </div>
      </div>
    </div>

    <!-- Terms & Structure -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #3b82f6; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        FLEXIBLE TERMS
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #3b82f6; margin-bottom: 0.5rem;">
          Customizable Loan Structure
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Tailored to Your Investment Strategy
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">LOAN TERMS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">10-30 Years</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">AMORTIZATION</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">20-30 Years</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">INTEREST-ONLY</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 10 Years</div>
          </div>
          <div style="background: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #3b82f6;">
            <div style="color: #3b82f6; font-weight: 700; font-size: 0.9rem;">PREPAYMENT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Flexible Options</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 PAYMENT OPTIONS:</div>
          <div style="color: #a7f3d0;">Fixed payments • Interest-only periods • Balloon structures • Full amortization</div>
        </div>
      </div>
    </div>

    <!-- 100% Financing -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        100% FINANCING
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Zero Down Payment Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Qualified Investors Can Finance 100% of Purchase
        </p>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <h4 style="color: #fbbf24; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
            Qualify by Meeting Any 2 of These Criteria:
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💳 CREDIT SCORE</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">680+ FICO</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">📊 PROPERTY DSCR</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">1.35x or Higher</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💰 NET WORTH</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">1.5x Loan Amount</div>
            </div>
            <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
              <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">💵 LIQUIDITY</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">6 Months Reserves</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<div style="background: linear-gradient(45deg, #1f2937, #374151); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: #3b82f6; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    🏢 ELIGIBLE INCOME-PRODUCING PROPERTIES
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
    <div style="background: rgba(59, 130, 246, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🏢 MULTIFAMILY PROPERTIES</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Apartment Buildings (5+ units)</li>
        <li>• Apartment Complexes (up to 300 units)</li>
        <li>• Multifamily Portfolios</li>
        <li>• Student Housing</li>
        <li>• Senior Housing</li>
      </ul>
    </div>
    
    <div style="background: rgba(59, 130, 246, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🏪 COMMERCIAL PROPERTIES</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Office Buildings</li>
        <li>• Retail Centers</li>
        <li>• Industrial Facilities</li>
        <li>• Flex Space</li>
        <li>• Mixed-Use Buildings</li>
        <li>• Commercial Condos</li>
      </ul>
    </div>
    
    <div style="background: rgba(59, 130, 246, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #3b82f6;">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">📊 PORTFOLIO FINANCING</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• 2-50+ Properties</li>
        <li>• Cross-Collateralization</li>
        <li>• Weighted Average DSCR</li>
        <li>• Single Closing</li>
        <li>• Streamlined Process</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45dc2626, #ef4444); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: white; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    ❓ FREQUENTLY ASKED QUESTIONS
  </h2>
  
  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: How is DSCR calculated and what does it mean?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> DSCR = Net Operating Income ÷ Annual Debt Service. A 1.25 DSCR means the property generates 25% more income than needed to cover the loan payment, providing a safety cushion.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Do you require personal income verification?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> No! DSCR loans qualify based solely on the property's cash flow performance. We don't require tax returns, W2s, or personal income documentation.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Can I finance multiple properties in one loan?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> Yes! Our portfolio program allows you to finance 2-50+ properties in a single transaction with cross-collateralization benefits and streamlined processing.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: What if my property is partially vacant?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> We underwrite to both in-place income and pro forma rents. Partial vacancy is acceptable with appropriate DSCR adjustments and potential reserve requirements.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #3b82f6; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Are there prepayment penalties?
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> We offer flexible prepayment options including step-down schedules (5-4-3-2-1 or 3-2-1) and no-penalty options with slight rate adjustments for 10+ year terms.
      </p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #3b82f6, #1d4ed8); padding: 2rem; border-radius: 12px; margin-top: 2rem; text-align: center; color: white;">
  <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">
    🚀 READY TO UNLOCK YOUR PORTFOLIO'S POTENTIAL?
  </h2>
  <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.5rem;">
    STREAMLINED DSCR FINANCING IN 30 DAYS
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem;">📞 CALL NOW</div>
      <div style="font-size: 1.2rem; font-weight: 800;">1-800-CCIF-LOAN</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem;">📧 EMAIL</div>
      <div style="font-size: 1.2rem; font-weight: 800;">dscr@ccif.com</div>
    </div>
  </div>
  
  <p style="font-size: 1rem; font-weight: 600; margin-top: 1.5rem;">
    <strong>Cash Flow-Based Financing Made Simple</strong><br>
    No personal income verification • Portfolio solutions • Competitive rates based on property performance
  </p>
</div>

<div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
  <p style="color: #d1d5db; font-size: 0.9rem; line-height: 1.6;">
    <strong>Specialized DSCR Lending • Licensed in all 50 states • $2.5B+ in funded loans • Income property financing experts</strong>
  </p>
</div>

</div>`
  },
  {
    id: "rehab-loan",
    name: "Rehab Loan",
    interestRate: "Starting at 6.49%",
    minimumLoanAmount: "$500,000",
    description: "Financing for property renovation and rehabilitation projects • Fix-and-flip • Fix-and-hold • 100% rehab financing available.",
    terms: `<div style="background: linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f97316 100%); color: white; padding: 2rem; border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: 3rem; padding: 2rem; background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3);">
    REHABILITATION FINANCING PROGRAM
  </h1>
  <h2 style="font-size: 1.5rem; font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem;">
    COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.
  </h2>
  <p style="font-size: 1.1rem; color: #e5e7eb; font-weight: 500;">
    Transform Properties Into Profitable Investments
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🚫 Traditional Rehab Financing Challenges</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Limited renovation financing options
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Strict credit and income requirements
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Complex draw process and delays
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        High down payment requirements
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">🎯 CCIF Rehab Loan Advantages</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        100% Renovation Financing Available
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Fast Approvals & Quick Funding
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Flexible Draw Schedules
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Multiple Program Options
      </li>
    </ul>
  </div>
</div>

<div style="margin-bottom: 3rem;">
  <h2 style="font-size: 2rem; font-weight: 800; text-align: center; margin-bottom: 2rem; color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
    REHABILITATION LOAN PROGRAMS
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Fix-and-Flip Program -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #1
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Fix-and-Flip Loan Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Transform Properties Faster with Lightning-Fast Approvals
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATES</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Starting at 6.99%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LOAN TERM</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">6-18 Months</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">90% Purchase + 100% Rehab</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 KEY FEATURES:</div>
          <div style="color: #a7f3d0;">Interest-only payments • Deferred payment options • Portfolio financing • Extension options available</div>
        </div>
      </div>
    </div>

    <!-- Fix-and-Hold Program -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #2
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Fix-and-Hold Loan Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Seamless Transition to Long-Term Mortgage Without Refinancing
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATES</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Starting at 6.49%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 80% Stabilized Value</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">PAYMENT STRUCTURE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Interest-Only to Full Amortization</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #7c3aed, #8b5cf6); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">🏆 SPECIAL FEATURES:</div>
          <div style="color: #c4b5fd;">One-time closing • Staged conversion program • Performance-based discounts • Short-term holding costs available</div>
        </div>
      </div>
    </div>

    <!-- Rehab-Only Program -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        PROGRAM #3
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Rehab-Only Loan Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Fast, Flexible Financing Based on Property Potential After Repairs
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">FOCUS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Property Potential</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">APPROVAL</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Quick & Flexible</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">DRAW SCHEDULE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Convenient & Flexible</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 IDEAL FOR:</div>
          <div style="color: #a7f3d0;">Property value enhancement • Single property improvements • Portfolio building • Value-add projects</div>
        </div>
      </div>
    </div>

    <!-- 100% Financing Program -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #10b981; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        100% FINANCING
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #10b981; margin-bottom: 0.5rem;">
          Zero Down Payment Program
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Industry-Leading 100% Financing for New and Experienced Investors
        </p>
        
        <div style="background: rgba(16, 185, 129, 0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem;">
          <h4 style="color: #10b981; font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">
            Qualify by Meeting At Least 2 of These Requirements:
          </h4>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
            <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #10b981;">
              <div style="color: #10b981; font-weight: 700; font-size: 0.9rem;">💳 CREDIT SCORE</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">Minimum 680 FICO</div>
            </div>
            <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #10b981;">
              <div style="color: #10b981; font-weight: 700; font-size: 0.9rem;">🏆 EXPERIENCE</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">3+ Successful Projects</div>
            </div>
            <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #10b981;">
              <div style="color: #10b981; font-weight: 700; font-size: 0.9rem;">🏠 COLLATERAL</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">Cross-Collateralization</div>
            </div>
            <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #10b981;">
              <div style="color: #10b981; font-weight: 700; font-size: 0.9rem;">💰 RESERVES</div>
              <div style="color: white; font-size: 1.1rem; font-weight: 600;">6 Months Interest Reserve</div>
            </div>
          </div>
          <div style="background: rgba(16, 185, 129, 0.2); padding: 1rem; border-radius: 6px; margin-top: 1rem; text-align: center;">
            <div style="color: #10b981; font-weight: 700; font-size: 0.9rem;">MAXIMUM LTV</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">65% Loan-to-ARV</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<div style="background: linear-gradient(45deg, #1f2937, #374151); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: #fbbf24; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    🏢 ELIGIBLE PROPERTY TYPES
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🏠 RESIDENTIAL PROPERTIES</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Single Family Homes</li>
        <li>• Duplexes, Triplexes, Quadplexes</li>
        <li>• Townhomes and Condominiums</li>
        <li>• Non-owner occupied dwellings only</li>
      </ul>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🏢 MULTIFAMILY & COMMERCIAL</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Multifamily Residences (5+ units)</li>
        <li>• Mixed-use properties</li>
        <li>• Commercial renovation projects</li>
        <li>• Experience required for larger properties</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: white; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    🔧 RENOVATION REQUIREMENTS
  </h2>
  
  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        📋 Documentation Requirements
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        Detailed scope of work required for all projects • Licensed contractors required for major work • All renovations must comply with local building codes
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        🔍 Inspection Process
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        Progress inspections required before each draw • Maximum renovation period based on loan term • Final inspection required at project completion
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; backdrop-filter: blur(10px);">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        📊 Budget & Planning
      </h3>
      <p style="color: #fecaca; font-size: 1rem; line-height: 1.6;">
        Budget contingency of up to 5% recommended • Changes to scope must be approved • Line-item cost breakdown required
      </p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #1f2937, #374151); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: #fbbf24; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    📄 DOCUMENT CHECKLIST
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">📋 PROPERTY DOCUMENTATION</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Purchase contract/agreement</li>
        <li>• Clear, color photos (interior & exterior)</li>
        <li>• Detailed scope of work with costs</li>
        <li>• Contractor bids/estimates</li>
        <li>• Comparable property sales data</li>
      </ul>
    </div>
    
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem;">🆔 PERSONAL & ENTITY DOCS</h3>
      <ul style="color: #d1d5db; list-style: none; padding: 0; font-size: 0.95rem; line-height: 1.6;">
        <li>• Government-issued photo ID</li>
        <li>• Proof of funds for down payment</li>
        <li>• Entity formation documents</li>
        <li>• LLC/Corp Articles & Operating Agreement</li>
      </ul>
    </div>
  </div>
</div>

<div style="background: linear-gradient(45deg, #fbbf24, #f59e0b); padding: 2rem; border-radius: 12px; margin-top: 2rem; text-align: center; color: #1f2937;">
  <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem;">
    🚀 READY TO TRANSFORM PROPERTIES?
  </h2>
  <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.5rem;">
    FAST APPROVAL & FLEXIBLE FINANCING IN 14-21 DAYS
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
    <div style="background: rgba(31, 41, 55, 0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem;">📞 CALL NOW</div>
      <div style="font-size: 1.2rem; font-weight: 800;">1-800-CCIF-LOAN</div>
    </div>
    <div style="background: rgba(31, 41, 55, 0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem;">📧 EMAIL</div>
      <div style="font-size: 1.2rem; font-weight: 800;">rehab@ccif.com</div>
    </div>
  </div>
  
  <p style="font-size: 1rem; font-weight: 600; margin-top: 1.5rem;">
    <strong>Turn Fixer-Uppers Into Profit Centers</strong><br>
    Fast approvals • Flexible draws • Multiple programs • Up to 100% renovation financing
  </p>
</div>

<div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
  <p style="color: #d1d5db; font-size: 0.9rem; line-height: 1.6;">
    <strong>Rehabilitation Financing Specialists • Licensed in all 50 states • $2.5B+ in funded loans • Property transformation experts</strong>
  </p>
</div>

</div>`
  },
  {
    id: "mobile-home-park-financing",
    name: "Mobile Home Park Financing",
    interestRate: "5.00% - 7.00%",
    minimumLoanAmount: "$150,000",
    description: "Comprehensive Mobile Home Park Financing Program with tailored financial solutions for mobile home park investors.",
    terms: `<div class="space-y-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-800 mb-4">Mobile Home Park Financing</h1>
    <p class="text-xl text-green-700 mb-2">Welcome to our comprehensive Mobile Home Park Financing Program!</p>
    <p class="text-lg text-green-600">Sundry Capital Solutions specialize in delivering tailored financial solutions for mobile home park investors.</p>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-3xl font-bold text-green-800 mb-6 text-center">Financing Options</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">1. Standard Purchase Loan</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">2. Rate and Term Refinance</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">3. Purchase with DSCR Loan</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">4. Cash-out Refinance</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">5. Bridge Loan</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">6. 100% Financing Program</div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">1. Standard Purchase Term</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum Loan Amount:</span>
          <span class="text-green-700 font-bold">$250,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.25%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Term:</span>
          <span class="text-green-700 font-bold">3 to 30 years</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80% stabilized / 70% improvements</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Prepayment Penalty:</span>
          <span class="text-green-700 font-bold">1% if paid off in first 3 years</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Repayment Options:</span>
          <span class="text-green-700 font-bold">Monthly amortization, interest-only first 12 months</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">2. Rate and Term Refinance</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Eligible Properties:</span>
          <span class="text-green-700 font-bold">1+ year operational history</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starts at 5.00%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 75%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Repayment:</span>
          <span class="text-green-700 font-bold">Monthly amortization, fixed rate</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Prepayment:</span>
          <span class="text-green-700 font-bold">No penalty after 3 years</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">3. Purchase with Debt Service Coverage Ratio (DSCR)</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum DSCR:</span>
          <span class="text-green-700 font-bold">1.15x required</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum Loan Amount:</span>
          <span class="text-green-700 font-bold">$200,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 5.5%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 75%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Repayment:</span>
          <span class="text-green-700 font-bold">Customized based on performance</span>
        </div>
      </div>
    </div>
    <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
      <p class="text-sm text-gray-700"><strong>Income Guidelines:</strong> Only pad/site rental income counted as effective income. Park-owned home rents counted at 25–50% haircut. Homes on rent-to-own or lease-option subject to further discount. Reduced DSCR minimums available for all-rental pad income or top-tier locations.</p>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">4. Cash-Out Refinance</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Eligible Properties:</span>
          <span class="text-green-700 font-bold">1+ year operational history</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum Loan Amount:</span>
          <span class="text-green-700 font-bold">$150,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.50%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Prepayment Penalty:</span>
          <span class="text-green-700 font-bold">1% if paid off in first 2 years</span>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <p class="text-sm text-gray-700"><strong>Repayment Structures:</strong> Flexible repayment options, including monthly amortization schedules and interest-only payments available for the first 12 months.</p>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">5. Bridge Financing</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum Loan Amount:</span>
          <span class="text-green-700 font-bold">$250,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">7%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Maximum Term:</span>
          <span class="text-green-700 font-bold">24 months</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 75%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Payment Structure:</span>
          <span class="text-green-700 font-bold">Interest-Only</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
      </div>
    </div>
    <div class="mt-4 bg-blue-50 p-4 rounded-lg">
      <p class="text-sm text-gray-700"><strong>Flexible Terms:</strong> Tailored exit strategies to ensure smooth transitions.</p>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">6. 100% Financing</h3>
    <p class="text-gray-700 mb-4">Sundry Capital Solutions offers industry-leading 100% financing options for qualified deals. To qualify for zero down investment property loans, applicants must meet the following enhanced criteria:</p>
    
    <div class="bg-green-50 p-6 rounded-lg">
      <h4 class="text-xl font-bold text-green-800 mb-4">Primary Qualifications</h4>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum FICO:</span>
          <span class="text-green-700 font-bold">680</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Experience:</span>
          <span class="text-green-700 font-bold">3+ commercial transactions in 5 years OR management track record</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Net Worth:</span>
          <span class="text-green-700 font-bold">Minimum 1.5x loan amount</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Liquidity:</span>
          <span class="text-green-700 font-bold">6 months debt service in reserves</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Income Verification:</span>
          <span class="text-green-700 font-bold">2 years tax returns + 3 months bank statements</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Cross-collateralization:</span>
          <span class="text-green-700 font-bold">Additional properties as collateral</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Requirements</h3>
    <p class="text-gray-700 mb-6">This requirements guide is provided to foster teamwork and flexible underwriting. We advise you reach out to us if you have difficulty in meeting any of the requirement based on your unique situation.</p>
    
    <div class="space-y-6">
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">1. Property Information</h4>
        <p class="text-gray-700">General community description (address, site map, lot count, zoning status). Breakdown of Park-Owned Homes (POH): list each POH with make, model, and current condition. Photos and appraisals are useful but can be supplied during the process if not immediately available.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">2. Rent Roll and Occupancy</h4>
        <p class="text-gray-700">Current rent roll with tenant spaces, rental amounts, and lease terms. Summary of occupancy rates over the last year or any available period.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">3. Tenant Leases and Rules</h4>
        <p class="text-gray-700">Sample lease agreements and a summary of park rules. Please confirm leases are current and in line with local regulations. If standardization or updates are needed, we can discuss solutions during the process.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">4. Financial Analysis</h4>
        <p class="text-gray-700">Trailing 12-Month Operating Statement: Itemized income and expenses. Budget/Pro Forma: Three-year forecast, including impact of planned capital improvements. Bank Statements: Past twelve months for operating accounts.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">5. Infrastructure and Physical Assessment</h4>
        <p class="text-gray-700">Overview of infrastructure: roads, utility systems, and all common areas and amenities. Third-party reports are helpful, but descriptive summaries or contractor estimates are welcome as a starting point. List any planned repairs or deferred maintenance so we can collaborate on budgeting and timelines.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">6. Environmental Due Diligence</h4>
        <p class="text-gray-700">Please provide a recent Phase I Environmental Site Assessment (ESA) if available. If needed, we can help coordinate ordering a new ESA during due diligence. If the property is in a flood zone or has other environmental requirements, supply related documents or insurance information.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">7. Title and Zoning</h4>
        <p class="text-gray-700">Copy of the title report and survey, plus evidence of proper zoning and permits. If documents are missing, we will assist in obtaining them during diligence.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">8. Insurance</h4>
        <p class="text-gray-700">Property Insurance: Evidence of hazard and, if required, flood insurance. Liability Insurance: General liability and, if applicable, environmental liability. POH Insurance: If POHs are included as collateral, certificates of insurance for each.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">9. Regulatory and Compliance</h4>
        <p class="text-gray-700">Licenses/Permits: Copies of all operating licenses and permits required. Rent Control: If subject to rent control or stabilization ordinances, documentation of requirements.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">10. Future Capital Improvements</h4>
        <p class="text-gray-700">Improvement Plan: Description and cost estimates for proposed improvements such as upgrades to infrastructure, amenities, roads, landscaping, or adding pads. Financing Structure: Clarification if the improvements are to be funded by the loan proceeds or by borrower equity. Impact Statement: Narrative on how improvements will enhance park value, occupancy, or rent potential. Timeline: Schedule for completion.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">11. Appraisal</h4>
        <p class="text-gray-700">Third-Party Appraisal Report detailing As-is valuation, As-stabilized valuation (if improvements are planned) and Separate valuation for park, improvements, and POHs as needed. We can coordinate an appraisal as part of underwriting if you do not have it available.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">12. Exit Strategy</h4>
        <p class="text-gray-700">Refinance/Sale Plan: If loan is bridge or shorter term, outline intended exit such as sale, refinance, or permanent take-out.</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: "self-storage-financing",
    name: "Self Storage Financing",
    interestRate: "7.5% - 12%",
    minimumLoanAmount: "$500,000",
    description: "Specialized financing for self-storage facilities and mini-storage properties.",
    terms: `SELF STORAGE FINANCING TERMS

Interest Rate: 7.5% - 12%
Loan Term: Up to 25 years
Minimum Loan Amount: $500,000
Maximum LTV: 80%

Property Types:
- Self-storage facilities
- Mini-storage properties
- Climate-controlled storage
- RV/boat storage

Key Benefits:
- Industry expertise
- Flexible underwriting
- Fast processing
- Competitive terms

Requirements:
- Operating history (preferred)
- Market feasibility study
- Management plan
- Financial statements

Processing Time: 30-45 days`
  },
  {
    id: "senior-living-financing",
    name: "Senior Living Financing",
    interestRate: "8% - 13%",
    minimumLoanAmount: "$500,000",
    description: "Financing for senior living facilities, assisted living, and memory care properties.",
    terms: `SENIOR LIVING FINANCING TERMS

Interest Rate: 8% - 13%
Loan Term: Up to 30 years
Minimum Loan Amount: $500,000
Maximum LTV: 75%

Property Types:
- Assisted living facilities
- Memory care facilities
- Independent living
- Skilled nursing facilities

Features:
- Experienced healthcare lending team
- Flexible terms
- Construction and permanent financing
- Competitive rates

Requirements:
- Operating license
- Management experience
- Financial statements
- Market analysis

Processing Time: 45-60 days`
  },
  {
    id: "adc-loan",
    name: "Acquisition, Development and Construction Loan",
    interestRate: "10% - 16%",
    minimumLoanAmount: "$500,000",
    description: "Comprehensive financing for land acquisition, development, and construction projects.",
    terms: `ADC LOAN TERMS

Interest Rate: 10% - 16%
Loan Term: 12-36 months
Minimum Loan Amount: $500,000
Maximum LTV: 75% (including land, development, and construction costs)

Project Types:
- Commercial developments
- Mixed-use projects
- Industrial developments
- Residential developments

Features:
- Single close financing
- Interest-only payments during construction
- Staged funding based on milestones
- Experienced construction lending team

Requirements:
- Detailed development plan
- Licensed general contractor
- Market feasibility study
- Developer experience

Processing Time: 45-60 days`
  },
  {
    id: "business-loan",
    name: "Business Loan",
    interestRate: "9% - 18%",
    minimumLoanAmount: "$500,000",
    description: "Flexible business financing for working capital, equipment, and expansion needs.",
    terms: `BUSINESS LOAN TERMS

Interest Rate: 9% - 18%
Loan Term: 1-10 years
Minimum Loan Amount: $500,000

Loan Types:
- Working capital loans
- Equipment financing
- Business acquisition loans
- Lines of credit

Features:
- Asset-based lending
- Flexible underwriting
- Quick approval process
- No industry restrictions

Requirements:
- Business financial statements
- Tax returns (2 years)
- Business plan (for startups)
- Collateral requirements vary

Processing Time: 14-30 days`
  },
  {
    id: "residential-investment-loan",
    name: "Residential Investment Loan",
    interestRate: "8.5% - 14%",
    minimumLoanAmount: "$500,000",
    description: "Financing for residential investment properties and rental real estate.",
    terms: `RESIDENTIAL INVESTMENT LOAN TERMS

Interest Rate: 8.5% - 14%
Loan Term: Up to 30 years
Minimum Loan Amount: $500,000
Maximum LTV: 80%

Property Types:
- Single-family rentals
- Multi-family properties (2-4 units)
- Condominiums
- Townhomes

Features:
- No owner-occupancy required
- Asset-based underwriting
- Portfolio lending
- Fast closing process

Requirements:
- Property appraisal
- Rental income analysis
- Borrower financial statements
- Property management plan (for larger portfolios)

Processing Time: 21-30 days`
  }
];