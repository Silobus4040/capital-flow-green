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
    minimumLoanAmount: "$500,000.00",
    description: "Specialized financing for RV parks and campground facilities with flexible terms designed for seasonal cash flow patterns.",
    terms: `
<div style="background: linear-gradient(135deg, #166534 0%, #16a34a 50%, #22c55e 100%); color: white; padding: clamp(1rem, 4vw, 2rem); border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: clamp(1.5rem, 5vw, 3rem); padding: clamp(1rem, 4vw, 2rem); background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: clamp(1.5rem, 6vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3); line-height: 1.2;">
    RV PARK & CAMPGROUND FINANCING
  </h1>
  <h2 style="font-size: clamp(1rem, 4vw, 1.5rem); font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.3;">
    COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC
  </h2>
  <p style="font-size: clamp(0.9rem, 3vw, 1.1rem); color: #e5e7eb; font-weight: 500; line-height: 1.4;">
    Asset-Based Lender Specializing in Recreational Property Financing
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(1rem, 3vw, 1.5rem); margin-bottom: clamp(1.5rem, 5vw, 3rem);">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🚫 Industry Challenges We Solve</h3>
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

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🎯 Our Specialized Solutions</h3>
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
  <h2 style="font-size: clamp(1.25rem, 5vw, 2rem); font-weight: 800; text-align: center; margin-bottom: clamp(1rem, 4vw, 2rem); color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3); line-height: 1.2;">
    OUR FINANCING PROGRAMS
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Program 1 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #1
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          Standard Purchase Loans
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          Perfect for acquiring established RV parks with proven cash flow
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: clamp(1rem, 3vw, 1.5rem);">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN AMOUNT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
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
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
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
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700;">🎯 DSCR REQUIREMENTS:</div>
          <div style="color: #e5e7eb; font-size: 0.9rem;">
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
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
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
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$500,000</div>
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
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 8px; border-left: 4px solid #fbbf24;">
          <div style="color: #fbbf24; font-weight: 700; font-size: 1.1rem; margin-bottom: 1rem;">
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

<div style="background: linear-gradient(135deg, #1f2937, #374151); padding: 2rem; border-radius: 12px; margin-top: 3rem; border: 2px solid #fbbf24;">
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
    Contact Commercial Capital & Investment Finance, Inc today for a personalized consultation tailored to your specific RV park investment goals.
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
    minimumLoanAmount: "$500,000.00",
    description: "100% financing available • No credit requirements • Fast approval for qualified commercial properties nationwide.",
    terms: `<div style="background: linear-gradient(135deg, #166534 0%, #16a34a 50%, #22c55e 100%); color: white; padding: clamp(1rem, 4vw, 2rem); border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: clamp(1.5rem, 5vw, 3rem); padding: clamp(1rem, 4vw, 2rem); background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: clamp(1.5rem, 6vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3); line-height: 1.2;">
    COMMERCIAL REAL ESTATE FINANCING
  </h1>
  <h2 style="font-size: clamp(1rem, 4vw, 1.5rem); font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.3;">
    COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.
  </h2>
  <p style="font-size: clamp(0.9rem, 3vw, 1.1rem); color: #e5e7eb; font-weight: 500; line-height: 1.4;">
    Premier Alternative Commercial Lending Institution
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(1rem, 3vw, 1.5rem); margin-bottom: clamp(1.5rem, 5vw, 3rem);">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🚫 Market Challenges We Eliminate</h3>
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

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🎯 CCIF Strategic Advantages</h3>
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
  <h2 style="font-size: clamp(1.25rem, 5vw, 2rem); font-weight: 800; text-align: center; margin-bottom: clamp(1rem, 4vw, 2rem); color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3); line-height: 1.2;">
    OUR FINANCING PROGRAMS
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Program 1 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #1
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          First Mortgage Purchase Program
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          The Foundation Builder for Smart Investors
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: clamp(1rem, 3vw, 1.5rem);">
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

<div style="background: linear-gradient(135deg, #1f2937, #374151); padding: 2rem; border-radius: 12px; margin-top: 3rem; text-align: center; border: 2px solid #fbbf24;">
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
      <div style="font-size: 1.2rem; font-weight: 800;">admin@ccif-inc.com</div>
    </div>
  </div>
  
  <p style="font-size: 1rem; font-weight: 600; margin-top: 1.5rem;">
    <strong>Don't Let Another Deal Slip Away</strong><br>
    Every day you wait is money left on the table. Contact CCIF today and discover why we're America's #1 choice for commercial real estate financing.
  </p>
</div>

<div style="text-align: center; margin-top: 2rem; padding: 1.5rem; background: rgba(255,255,255,0.05); border-radius: 8px;">
  <p style="color: #d1d5db; font-size: 0.9rem; line-height: 1.6;">
    <strong>Licensed in all 50 states • $2.5B+ in funded loans • Asset-based lending specialists</strong>
  </p>
</div>

</div>`
  },
  {
    id: "commercial-dscr-loan",
    name: "Commercial DSCR Loan",
    interestRate: "Starting at 6.57%",
    minimumLoanAmount: "$500,000.00",
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
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">🏆 REWARD PERFORMANCE:</div>
          <div style="color: #a7f3d0;">Higher cash flow properties earn lower interest rates automatically</div>
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

<div style="background: linear-gradient(135deg, #374151, #4b5563); padding: 2rem; border-radius: 12px; margin-top: 2rem;">
  <h2 style="color: #fbbf24; font-size: 1.8rem; font-weight: 800; text-align: center; margin-bottom: 2rem;">
    ❓ FREQUENTLY ASKED QUESTIONS
  </h2>
  
  <div style="display: grid; gap: 1.5rem;">
    <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: How is DSCR calculated and what does it mean?
      </h3>
      <p style="color: #e5e7eb; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> DSCR = Net Operating Income ÷ Annual Debt Service. A 1.25 DSCR means the property generates 25% more income than needed to cover the loan payment, providing a safety cushion.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Do you require personal income verification?
      </h3>
      <p style="color: #e5e7eb; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> No! DSCR loans qualify based solely on the property's cash flow performance. We don't require tax returns, W2s, or personal income documentation.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Can I finance multiple properties in one loan?
      </h3>
      <p style="color: #e5e7eb; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> Yes! Our portfolio program allows you to finance 2-50+ properties in a single transaction with cross-collateralization benefits and streamlined processing.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: What if my property is partially vacant?
      </h3>
      <p style="color: #e5e7eb; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> We underwrite to both in-place income and pro forma rents. Partial vacancy is acceptable with appropriate DSCR adjustments and potential reserve requirements.
      </p>
    </div>
    
    <div style="background: rgba(255,255,255,0.05); padding: 1.5rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h3 style="color: #fbbf24; font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">
        Q: Are there prepayment penalties?
      </h3>
      <p style="color: #e5e7eb; font-size: 1rem; line-height: 1.6;">
        <strong>A:</strong> We offer flexible prepayment options including step-down schedules (5-4-3-2-1 or 3-2-1) and no-penalty options with slight rate adjustments for 10+ year terms.
      </p>
    </div>
  </div>
</div>

<div style="background: linear-gradient(135deg, #166534, #16a34a); padding: 2rem; border-radius: 12px; margin-top: 2rem; text-align: center; color: white;">
  <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1rem; color: #fbbf24;">
    🚀 READY TO UNLOCK YOUR PORTFOLIO'S POTENTIAL?
  </h2>
  <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 1.5rem; color: white;">
    STREAMLINED DSCR FINANCING IN 30 DAYS
  </p>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1.5rem 0;">
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem; color: #fbbf24;">📞 CALL NOW</div>
      <div style="font-size: 1.2rem; font-weight: 800; color: white;">1-800-CCIF-LOAN</div>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px;">
      <div style="font-weight: 700; font-size: 1.1rem; color: #fbbf24;">📧 EMAIL</div>
      <div style="font-size: 1.2rem; font-weight: 800; color: white;">admin@ccif-inc.com</div>
    </div>
  </div>
  
  <p style="font-size: 1rem; font-weight: 600; margin-top: 1.5rem; color: white;">
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
    minimumLoanAmount: "$500,000.00",
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
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">🏆 SPECIAL FEATURES:</div>
          <div style="color: #a7f3d0;">One-time closing • Staged conversion program • Performance-based discounts • Short-term holding costs available</div>
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
      <div style="font-size: 1.2rem; font-weight: 800;">admin@ccif-inc.com</div>
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
    id: "acquisition-development-construction",
    name: "Acquisition Development & Construction",
    interestRate: "6.25% - 8.50%",
    minimumLoanAmount: "$500,000.00",
    description: "Comprehensive financing solutions for real estate developers nationwide spanning the entire project lifecycle.",
    terms: `<div class="space-y-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-800 mb-4">Development & Construction Financing</h1>
    <p class="text-xl text-green-700 mb-2">We empower Real Estate Developers nationwide with tailored, flexible financing options spanning the entire project lifecycle.</p>
    <p class="text-lg text-green-600">Our expertise, speed, and direct approach help ensure your development gets the right capital at the right time.</p>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-green-800 mb-4">Why Choose Us?</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <div class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          <span class="text-gray-700"><strong>Industry-Leading Speed:</strong> 10-30 business days funding</span>
        </div>
        <div class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          <span class="text-gray-700"><strong>Superior Leverage:</strong> Best leverage ratios in market</span>
        </div>
        <div class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          <span class="text-gray-700"><strong>Flexible Underwriting:</strong> Complex projects welcome</span>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          <span class="text-gray-700"><strong>Direct Approach:</strong> Work with decision-makers</span>
        </div>
        <div class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          <span class="text-gray-700"><strong>Nationwide Reach:</strong> Local expertise, national platform</span>
        </div>
        <div class="flex items-center">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
          <span class="text-gray-700"><strong>Transparent Fees:</strong> No hidden costs</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-3xl font-bold text-green-800 mb-6 text-center">Comprehensive Loan Programs</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">1. Acquisition & Development</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">2. Development-Only</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">3. Construction-Only</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">4. Construction-to-Permanent</div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">1. Acquisition & Development Loan</h3>
    <p class="text-gray-700 mb-4">For purchasing raw land and developing infrastructure including utilities, roads, and lot improvements.</p>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-green-700">Core Parameters</h4>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">$250,000 - $15M</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTC:</span>
          <span class="text-green-700 font-bold">Up to 80% (85% enhanced)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting Prime + 2.50% (6.75%)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term:</span>
          <span class="text-green-700 font-bold">12-36 months</span>
        </div>
      </div>
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-green-700">Fees & Requirements</h4>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">1.00-2.50% (financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum DSCR:</span>
          <span class="text-green-700 font-bold">1.10x projected</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Liquidity:</span>
          <span class="text-green-700 font-bold">10% of loan amount</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Extensions:</span>
          <span class="text-green-700 font-bold">Two 6-month (0.50% each)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">2. Development-Only Loan</h3>
    <p class="text-gray-700 mb-4">For developers who own land and need financing for site improvements, utilities, and infrastructure.</p>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">$200,000 - $10M</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTC:</span>
          <span class="text-green-700 font-bold">Up to 85% (90% enhanced)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting Prime + 2.00% (6.50%)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term:</span>
          <span class="text-green-700 font-bold">12-24 months</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">1% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Liquidity:</span>
          <span class="text-green-700 font-bold">5% of loan amount</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Guarantees:</span>
          <span class="text-green-700 font-bold">Full recourse with step-downs</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Payment:</span>
          <span class="text-green-700 font-bold">Interest-only monthly</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">3. Construction-Only Loan</h3>
    <p class="text-gray-700 mb-4">For ground-up construction on developed lots, including residential, multifamily, and commercial buildings.</p>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">$500,000 - $25M</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTC:</span>
          <span class="text-green-700 font-bold">Up to 90% (95% enhanced)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting Prime + 1.75% (6.25%)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term:</span>
          <span class="text-green-700 font-bold">12-24 months</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">1.00-2.00%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Liquidity:</span>
          <span class="text-green-700 font-bold">15% of loan amount</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Extensions:</span>
          <span class="text-green-700 font-bold">Up to three 6-month</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Payment:</span>
          <span class="text-green-700 font-bold">Interest-only on disbursed funds</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">4. Construction-to-Permanent Loan</h3>
    <p class="text-gray-700 mb-4">Single-close loan that converts to permanent financing upon completion without separate takeout financing.</p>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-green-700">Construction Phase</h4>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">$750,000 - $20M</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTC:</span>
          <span class="text-green-700 font-bold">Up to 85%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Prime + 2.00% (6.50-8.50%)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term:</span>
          <span class="text-green-700 font-bold">Up to 24 months</span>
        </div>
      </div>
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-green-700">Permanent Phase</h4>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term Options:</span>
          <span class="text-green-700 font-bold">5, 7, or 10 years</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Fixed Rates:</span>
          <span class="text-green-700 font-bold">5.50% - 6.00%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Amortization:</span>
          <span class="text-green-700 font-bold">20-30 years</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Conversion Fee:</span>
          <span class="text-green-700 font-bold">0.50% of balance</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Additional Program Features</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="border-l-4 border-green-500 pl-4">
          <h4 class="text-lg font-bold text-green-800 mb-2">Relationship Pricing</h4>
          <p class="text-sm text-gray-700">• 0.25-0.50% rate reduction for repeat borrowers<br>• Volume incentives for multiple projects<br>• Cross-collateralization benefits<br>• Extended rate locks for relationship clients</p>
        </div>
        <div class="border-l-4 border-green-500 pl-4">
          <h4 class="text-lg font-bold text-green-800 mb-2">Specialty Enhancements</h4>
          <p class="text-sm text-gray-700">• Green building incentives (0.25% reduction)<br>• Affordable housing bonus terms<br>• Opportunity Zone advantages<br>• Historic renovation expertise</p>
        </div>
      </div>
      <div class="space-y-4">
        <div class="border-l-4 border-green-500 pl-4">
          <h4 class="text-lg font-bold text-green-800 mb-2">Expedited Processing</h4>
          <p class="text-sm text-gray-700">• 24-hour initial response<br>• 3-5 day commitment letters<br>• 10-14 day rapid closing<br>• 24-48 hour express draws</p>
        </div>
        <div class="border-l-4 border-green-500 pl-4">
          <h4 class="text-lg font-bold text-green-800 mb-2">Creative Solutions</h4>
          <p class="text-sm text-gray-700">• Interest rate buydowns<br>• Equity co-investment opportunities<br>• Mezzanine debt options<br>• Forward commitments available</p>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Frequently Asked Questions</h3>
    <div class="space-y-4">
      <div class="border-b pb-3">
        <h4 class="font-bold text-green-700 mb-2">How quickly can you fund my loan?</h4>
        <p class="text-sm text-gray-700">Maximum 4 weeks from complete application to funding.</p>
      </div>
      <div class="border-b pb-3">
        <h4 class="font-bold text-green-700 mb-2">What if my project timeline exceeds the initial term?</h4>
        <p class="text-sm text-gray-700">All programs include extension options (typically two 6-month extensions) for 0.50% fee each, subject to project good standing.</p>
      </div>
      <div class="border-b pb-3">
        <h4 class="font-bold text-green-700 mb-2">How are interest reserves managed?</h4>
        <p class="text-sm text-gray-700">Calculated based on projected draw schedule plus 3-6 month cushion, included in loan amount with automatic monthly draws.</p>
      </div>
      <div class="border-b pb-3">
        <h4 class="font-bold text-green-700 mb-2">What if construction costs increase?</h4>
        <p class="text-sm text-gray-700">Hard cost contingency required (5-10%). Budget reallocations up to 10% per line item permitted. Additional solutions available for overruns.</p>
      </div>
      <div class="border-b pb-3">
        <h4 class="font-bold text-green-700 mb-2">Can I get a loan with limited experience?</h4>
        <p class="text-sm text-gray-700">Partner Program available for less experienced developers with experienced partners, enhanced guarantees, or additional equity requirements.</p>
      </div>
      <div class="pb-3">
        <h4 class="font-bold text-green-700 mb-2">How do recourse guarantees work?</h4>
        <p class="text-sm text-gray-700">Step-down structure: 100% initially, reducing to 50% at milestones (50-75% completion), with potential for further reduction or full release at completion.</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: "self-storage-financing",
    name: "Self Storage Facility Financing",
    interestRate: "5.43% - 6.25%",
    minimumLoanAmount: "$500,000.00",
    description: "Specialized financial solutions exclusively focused on the self-storage industry with asset-based lending approach.",
    terms: `<div class="space-y-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-800 mb-4">Self Storage Facility Financing Program</h1>
    <p class="text-xl text-green-700 mb-2">As an asset-based lender, we specialize in providing unique financial solutions exclusively focused on the self-storage industry.</p>
    <p class="text-lg text-green-600">Our approach is simple: we evaluate the property's potential and performance, not your personal credit history. We understand the unique dynamics of self-storage facilities.</p>
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
    <h3 class="text-2xl font-bold text-green-800 mb-4">1. Standard Purchase Terms</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">Minimum $250,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 5.43%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Term:</span>
          <span class="text-green-700 font-bold">3 to 30 years</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 85% stabilized / 80% improvements</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Prepayment Penalty:</span>
          <span class="text-green-700 font-bold">1% if paid off within first 3 years</span>
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
          <span class="text-green-700 font-bold">Starting at 5.43%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Cash-out Option:</span>
          <span class="text-green-700 font-bold">Available for renovations</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
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
          <span class="text-green-700 font-bold">1.25x for qualified properties</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 5.64%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">Based on projected cash flow</span>
        </div>
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
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">4. Cash-Out Refinance</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Purpose:</span>
          <span class="text-green-700 font-bold">Access equity for reinvestment</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.25%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum Loan:</span>
          <span class="text-green-700 font-bold">$300,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Terms:</span>
          <span class="text-green-700 font-bold">5 to 30 years fixed</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">5. Bridge Loan</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Purpose:</span>
          <span class="text-green-700 font-bold">Short-term acquisition financing</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term Length:</span>
          <span class="text-green-700 font-bold">6 to 24 months</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">6%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 85%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Qualifications:</span>
          <span class="text-green-700 font-bold">Cash flow projections required</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">6. 100% Financing</h3>
    <p class="text-gray-700 mb-4">We offer industry-leading 100% financing options for qualified deals. To qualify for zero down investment property loans, applicants must meet <strong>at least 2 of the following 6 enhanced criteria:</strong></p>
    
    <div class="bg-green-50 p-6 rounded-lg">
      <h4 class="text-xl font-bold text-green-800 mb-4">Primary Qualifications</h4>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum FICO:</span>
          <span class="text-green-700 font-bold">680</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Experience:</span>
          <span class="text-green-700 font-bold">3+ comparable transactions in 5 years OR management track record</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Net Worth:</span>
          <span class="text-green-700 font-bold">Minimum 1.5x loan amount</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Liquidity:</span>
          <span class="text-green-700 font-bold">6 months debt service reserves</span>
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
    <div class="space-y-6">
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Operational Status</h4>
        <p class="text-gray-700">The facility must be operational and appropriately zoned for self-storage. We consider facilities in various stages, from stabilized to lease-up.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Key Features</h4>
        <p class="text-gray-700">Ideally, facilities should have security systems, climate-controlled units, and easy access to major roadways. However, we understand that not all facilities have all these features, and we can adjust our financing based on the specifics of your property.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Size Requirements</h4>
        <p class="text-gray-700">While we generally look for a minimum of 50 rental units or 25,000 square feet of total storage space, we are willing to discuss properties that are slightly below these thresholds, especially if there's a clear plan for growth.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Stabilized Facilities</h4>
        <p class="text-gray-700">For stabilized facilities with strong operating history, we review the trailing 12-month income and occupancy. While our target DSCR is around 1.25x, we can consider as low as 1.15x for highly stabilized assets with exceptional management and location.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Lease-Up, Value-Add, and Expansion Deals</h4>
        <p class="text-gray-700">We are excited to partner with you on lease-up, value-add, and expansion projects. These deals require pro forma underwriting with a feasibility study or third-party management contract. We will work with you to determine appropriate reserves and collateral requirements based on your specific project.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Mixed-Use Facilities</h4>
        <p class="text-gray-700">If your property includes a mix of storage, office, or retail space, we'll conduct a prorated Net Operating Income (NOI) evaluation by use type. We are open to creative financing solutions for mixed-use properties.</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: "senior-living-financing",
    name: "Senior Living & Care Facility Financing",
    interestRate: "5.31% - 9.50%",
    minimumLoanAmount: "$500,000.00",
    description: "All-inclusive financing program for assisted living, memory care, residential care, and related senior housing facilities.",
    terms: `<div class="space-y-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-800 mb-4">Senior Living & Care Facility Financing</h1>
    <p class="text-xl text-green-700 mb-2">We offer all-inclusive financing program for assisted living, memory care, residential care, and related senior housing or group living facilities.</p>
    <p class="text-lg text-green-600">Below are ALL details, terms, requirements, eligibility, and options available.</p>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-green-800 mb-4">Who We Serve</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div class="space-y-2">
        <div class="flex items-start">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
          <span class="text-gray-700"><strong>Property Owners:</strong> Acquiring, building, or refinancing facilities</span>
        </div>
        <div class="flex items-start">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
          <span class="text-gray-700"><strong>Business Operators:</strong> Running facilities with or without property ownership</span>
        </div>
      </div>
      <div class="space-y-2">
        <div class="flex items-start">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
          <span class="text-gray-700"><strong>All Stages:</strong> Start-ups, seasoned operators, expansions, turnarounds</span>
        </div>
        <div class="flex items-start">
          <span class="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></span>
          <span class="text-gray-700"><strong>Geography:</strong> Programs available in all 50 U.S. states</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-green-800 mb-4">Eligibility at a Glance</h2>
    <div class="space-y-3">
      <div class="flex items-center">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
        <span class="text-gray-700">Organized U.S. entity in good standing (Corp, LLC, LP, trust, or not-for-profit)</span>
      </div>
      <div class="flex items-center">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
        <span class="text-gray-700">Licensed facility for six (6) or more beds</span>
      </div>
      <div class="flex items-center">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
        <span class="text-gray-700">Verifiable experience OR qualified third-party operator</span>
      </div>
      <div class="flex items-center">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
        <span class="text-gray-700">No FICO requirement (exceptions for 100% financing)</span>
      </div>
      <div class="flex items-center">
        <span class="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
        <span class="text-gray-700">DSCR target ≥ 1.25× on stabilized cash flow</span>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-green-800 mb-4">Eligible Property Types</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">Assisted Living</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">Memory Care</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">Residential Care</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">Group Homes</div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Purchase Loan Program</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">$200,000 - $25M+</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term:</span>
          <span class="text-green-700 font-bold">30 years amort / 10 years balloon</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Fixed: 5.31% - 7.25%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Adjustable Rate:</span>
          <span class="text-green-700 font-bold">SOFR + 3.75% (cap: 11.5%)</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV Base:</span>
          <span class="text-green-700 font-bold">80%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV (5+ years exp):</span>
          <span class="text-green-700 font-bold">85%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV (SNF/ALF hybrid):</span>
          <span class="text-green-700 font-bold">90%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum Beds:</span>
          <span class="text-green-700 font-bold">10 licensed beds</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">100% Financing Requirements (Purchase)</h3>
    <p class="text-gray-700 mb-4">Applicants must score ≥8 points on the underwriting scale to qualify for 100% financing:</p>
    
    <div class="bg-green-50 p-6 rounded-lg">
      <div class="space-y-4">
        <div class="flex justify-between items-center border-b pb-2">
          <span class="font-semibold text-gray-700">A. FICO Score ≥ 760</span>
          <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">3 Points</span>
        </div>
        <div class="flex justify-between items-center border-b pb-2">
          <span class="font-semibold text-gray-700">B. 3+ Projects Completed (last 5 years)</span>
          <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">4 Points</span>
        </div>
        <div class="flex justify-between items-center border-b pb-2">
          <span class="font-semibold text-gray-700">C. Net Worth ≥ 2x Loan Amount</span>
          <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">3 Points</span>
        </div>
        <div class="flex justify-between items-center border-b pb-2">
          <span class="font-semibold text-gray-700">D. 6-Month Cash Reserves (escrowed)</span>
          <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">2 Points</span>
        </div>
        <div class="flex justify-between items-center border-b pb-2">
          <span class="font-semibold text-gray-700">E. Cross-Collateral (≥125% coverage)</span>
          <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">5 Points</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-gray-700">F. CCRC Accreditation</span>
          <span class="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-bold">2 Points</span>
        </div>
      </div>
    </div>
    <div class="mt-4 bg-yellow-50 p-4 rounded-lg">
      <p class="text-sm text-gray-700"><strong>Note:</strong> Deficiency plan available for applicants scoring 6-7 points (25 basis points add-on).</p>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Refinance Program</h3>
    <div class="space-y-4">
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">A. Rate/Term Refinance</h4>
        <p class="text-sm text-gray-700">Maximum LTV: 85% • Rate Adjustment: +0.25% • DSCR: 1.20 minimum</p>
      </div>
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">B. Light Cash-Out Refinance (Under $500K)</h4>
        <p class="text-sm text-gray-700">Maximum LTV: 75% • Rate Adjustment: +0.75% • DSCR: 1.25 minimum</p>
      </div>
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">C. Heavy Cash-Out Refinance</h4>
        <p class="text-sm text-gray-700">Maximum LTV: 65% • Rate Adjustment: +1.50% • DSCR: 1.35 minimum</p>
      </div>
    </div>
    <div class="mt-4 bg-blue-50 p-4 rounded-lg">
      <p class="text-sm text-gray-700"><strong>Additional Notes:</strong> Operating for less than 3 years adds 0.50% to rate. Facility inspection issues require remediation bond (1.5x estimated cost).</p>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Bridge Loan Program</h3>
    <p class="text-gray-700 mb-4">Short-term financing for time-sensitive opportunities and transitions</p>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">$250,000 - $15M</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term Length:</span>
          <span class="text-green-700 font-bold">3-24 months</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 9.5%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 75% current / 80% improved</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Payment Structure:</span>
          <span class="text-green-700 font-bold">Interest-only available</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Extensions:</span>
          <span class="text-green-700 font-bold">Available</span>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <h4 class="font-bold text-green-700 mb-2">Ideal Use Cases:</h4>
      <div class="text-sm text-gray-700 space-y-1">
        <p>• Acquisitions: Secure properties quickly • Renovations: Fund improvements during operations</p>
        <p>• 1031 exchanges: Facilitate like-kind swaps • Lease-up period: Support initial stabilization</p>
        <p>• Distressed properties: Acquire and stabilize underperforming assets</p>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Business Operation Loans</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-green-700">Terms</h4>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">$100,000 - $10M</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.25%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term:</span>
          <span class="text-green-700 font-bold">Up to 10 years</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum DSCR:</span>
          <span class="text-green-700 font-bold">1.25</span>
        </div>
      </div>
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-green-700">Requirements</h4>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Operating History:</span>
          <span class="text-green-700 font-bold">3 years preferred</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">FICO Minimum:</span>
          <span class="text-green-700 font-bold">680</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Cash Reserves:</span>
          <span class="text-green-700 font-bold">12 months debt service</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Licensing & Compliance Requirements</h3>
    <p class="text-gray-700 mb-4">Compliance is non-negotiable in this industry. To be eligible for financing, and throughout the life of the loan, your facility must meet all regulatory standards.</p>
    <div class="space-y-4">
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">State Licensing</h4>
        <p class="text-gray-700">Facility must hold appropriate state care licenses for providing services to seniors or individuals with disabilities.</p>
      </div>
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Health & Safety Standards</h4>
        <p class="text-gray-700">Properties must comply with health and safety standards mandated by local codes and regulations.</p>
      </div>
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Zoning & Insurance</h4>
        <p class="text-gray-700">Property must meet zoning laws for intended use. Adequate liability and property insurance required throughout loan term.</p>
      </div>
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Staffing Requirements</h4>
        <p class="text-gray-700">Facility must maintain 24/7 staffing, ensuring staff-to-resident ratio of no greater than 1:8 during daytime hours.</p>
      </div>
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Environmental Standards</h4>
        <p class="text-gray-700">Properties must provide compliance documentation related to environmental concerns—essential if any past issues have been noted.</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: "business-loan",
    name: "Business Loan",
    interestRate: "9% - 18%",
    minimumLoanAmount: "$500,000.00",
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
    name: "Private Residential Mortgage",
    interestRate: "Starting at 5.00%",
    minimumLoanAmount: "$500,000.00",
    description: "Asset-based private lending providing flexible financing solutions for residential mortgage whether it's a primary residence or an investment property.",
    terms: `
<div style="background: linear-gradient(135deg, #166534 0%, #16a34a 50%, #22c55e 100%); color: white; padding: clamp(1rem, 4vw, 2rem); border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: clamp(1.5rem, 5vw, 3rem); padding: clamp(1rem, 4vw, 2rem); background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: clamp(1.5rem, 6vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3); line-height: 1.2;">
    PRIVATE RESIDENTIAL MORTGAGE
  </h1>
  <h2 style="font-size: clamp(1rem, 4vw, 1.5rem); font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.3;">
    COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC
  </h2>
  <p style="font-size: clamp(0.9rem, 3vw, 1.1rem); color: #e5e7eb; font-weight: 500; line-height: 1.4;">
    Asset-Based Private Lender - Flexible Financing for Primary Residences & Investment Properties
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(1rem, 3vw, 1.5rem); margin-bottom: clamp(1.5rem, 5vw, 3rem);">
  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🏠 Our Financing Programs</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">1.</span>
        First Mortgage/Purchase
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">2.</span>
        Rate and Term Refinance
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">3.</span>
        Cash-Out Refinance
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">4.</span>
        Bridge Loan
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">5.</span>
        100% Financing Program
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(135deg, #1f2937, #374151); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🏢 Eligible Property Types</h3>
    <ul style="color: #e5e7eb; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Single-family homes & Condos
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Multi-family (up to 4 units)
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Townhouses & Modular Homes
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Vacation & Investment Properties
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Mixed-Use (with residential)
      </li>
    </ul>
  </div>
</div>

<div style="margin-bottom: 3rem;">
  <h2 style="font-size: clamp(1.25rem, 5vw, 2rem); font-weight: 800; text-align: center; margin-bottom: clamp(1rem, 4vw, 2rem); color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3); line-height: 1.2;">
    OUR FINANCING PROGRAMS
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Program 1 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #1
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          First Mortgage/Purchase
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          Primary financing for new property acquisitions
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: clamp(1rem, 3vw, 1.5rem);">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LOAN RANGE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$50K - $5M</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">FIXED RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Starting 5.00%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 90%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">15-40 Years</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 PAYMENT OPTIONS:</div>
          <div style="color: #a7f3d0;">Fully Amortizing • Interest-Only (1-10 years) • Interest-Only + Balloon • No Prepayment Penalty</div>
        </div>
      </div>
    </div>

    <!-- Program 2 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #2
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          Rate and Term Refinance
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          Lower payments and secure better terms
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: clamp(1rem, 3vw, 1.5rem);">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$50,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">FIXED RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Starting 5.27%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">15-30 Years</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">PREPAYMENT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">No Penalty</div>
          </div>
        </div>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700;">🎯 IDEAL FOR:</div>
          <div style="color: #e5e7eb; font-size: 0.9rem;">
            Reducing monthly payments • Securing better rates • Converting adjustable to fixed rate • Changing loan terms
          </div>
        </div>
      </div>
    </div>

    <!-- Program 3 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #3
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          Cash-Out Refinance
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          Access your property's equity for any purpose
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: clamp(1rem, 3vw, 1.5rem);">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MAX LTV</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 85%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">FIXED RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Starting 5.77%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 30 Years</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">SEASONING</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">None Required</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 FEATURES:</div>
          <div style="color: #a7f3d0;">No restrictions on cash use • Variable rate: Prime + 2.25% • Interest-Only available 1-5 years</div>
        </div>
      </div>
    </div>

    <!-- Program 4 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #4
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          Bridge Loan Program
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          Short-term financing for immediate opportunities
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: clamp(1rem, 3vw, 1.5rem);">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MINIMUM LOAN</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">$100,000</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">9.5%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV RATIO</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 75%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">3-24 Months</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 PAYMENT OPTIONS:</div>
          <div style="color: #a7f3d0;">Deferred interest with balloon • Interest-only payments • Origination: 2% (50% financing available)</div>
        </div>
      </div>
    </div>

    <!-- Program 5 -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #5
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          100% Financing Program
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          Zero down payment options for qualified investors
        </p>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700;">🎯 QUALIFICATION REQUIREMENTS (Meet Any 2):</div>
          <div style="color: #e5e7eb; font-size: 0.9rem; margin-top: 0.5rem;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.5rem;">
              <div>• Minimum FICO: 680 credit score</div>
              <div>• 3+ transactions in last 5 years</div>
              <div>• Net worth: 1.5x loan amount</div>
              <div>• 6 months reserves</div>
              <div>• 2 years tax returns + 3 months bank statements</div>
              <div>• Cross-collateralization available</div>
            </div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 BENEFITS:</div>
          <div style="color: #a7f3d0;">No down payment required • Industry-leading financing • Available for qualified investment properties</div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- Payment Structures Section -->
<div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); margin-bottom: 2rem; border: 2px solid #fbbf24;">
  <h2 style="font-size: clamp(1.25rem, 5vw, 2rem); font-weight: 800; text-align: center; margin-bottom: 1.5rem; color: #fbbf24;">
    💎 PAYMENT STRUCTURE OPTIONS
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem;">
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Fully Amortizing</h4>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li>✓ Principal and interest payments</li>
        <li>✓ Loan fully paid at maturity</li>
        <li>✓ Builds equity with each payment</li>
        <li>✓ Best for primary residences</li>
      </ul>
    </div>
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Interest-Only Period</h4>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li>✓ Interest-only for 1-10 years</li>
        <li>✓ Converts to fully amortizing</li>
        <li>✓ Lower initial payments</li>
        <li>✓ Good for property improvements</li>
      </ul>
    </div>
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <h4 style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Interest-Only + Balloon</h4>
      <ul style="color: #e5e7eb; list-style: none; padding: 0; font-size: 0.9rem;">
        <li>✓ Interest-only entire term</li>
        <li>✓ Principal due at maturity</li>
        <li>✓ Lowest monthly payments</li>
        <li>✓ Ideal for investment properties</li>
      </ul>
    </div>
  </div>
</div>

<!-- Required Documents -->
<div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); margin-bottom: 2rem; border: 2px solid #fbbf24;">
  <h2 style="font-size: clamp(1.25rem, 5vw, 1.5rem); font-weight: 800; text-align: center; margin-bottom: 1rem; color: #fbbf24;">
    📋 REQUIRED DOCUMENTATION
  </h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 0.5rem; color: #e5e7eb;">
    <div>📄 Government-issued ID</div>
    <div>🏠 Property details (address, type, size)</div>
    <div>📝 Purchase agreement (for purchases)</div>
    <div>💳 Current mortgage statement (refinances)</div>
    <div>🛡️ Proof of property insurance</div>
    <div>📊 Recent property tax statement</div>
    <div>📈 Recent appraisal report (if available)</div>
  </div>
</div>

<!-- FAQ Section -->
<div style="background: linear-gradient(135deg, #374151, #4b5563); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem);">
  <h2 style="font-size: clamp(1.25rem, 5vw, 1.5rem); font-weight: 800; text-align: center; margin-bottom: 1.5rem; color: #fbbf24;">
    ❓ FREQUENTLY ASKED QUESTIONS
  </h2>
  
  <div style="display: grid; gap: 1rem;">
    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Can I close if the property is tenant-occupied?</div>
      <div style="color: #d1d5db; font-size: 0.9rem;">Yes, but occupancy arrangements may affect eligibility. We'll evaluate lease documentation and tenant payments.</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">How is the origination fee structured?</div>
      <div style="color: #d1d5db; font-size: 0.9rem;">We provide up to 50% financing (interest charged) unless you prefer to pay at closing.</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">What about properties under renovation?</div>
      <div style="color: #d1d5db; font-size: 0.9rem;">We review condition and scope. Renovation properties may require completion reserves or inspections, with potentially lower initial LTV.</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Can I get a loan on inherited property with multiple heirs?</div>
      <div style="color: #d1d5db; font-size: 0.9rem;">Yes, all owners must join the application and sign at closing. Ongoing probate may require court clearance.</div>
    </div>
    <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px; border-left: 3px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">What if my property doesn't sell within the bridge loan term?</div>
      <div style="color: #d1d5db; font-size: 0.9rem;">We work closely with you to assess exit strategies and may consider extensions based on circumstances and collateral value.</div>
    </div>
  </div>
</div>

</div>`
  },
  {
    id: "mobile-home-park-financing",
    name: "Mobile Home Park Financing",
    interestRate: "6.00% - 7.25%",
    minimumLoanAmount: "$500,000.00",
    description: "Specialized private loans tailored for mobile home park acquisitions, refinances, and expansions with an asset-based approach focused on property performance.",
    terms: `<div class="space-y-8 bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-xl">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-green-800 mb-4">Mobile Home Park Financing Program</h1>
    <p class="text-xl text-green-700 mb-2">We offer specialized private loans tailored for mobile home park acquisitions, refinances, and expansions.</p>
    <p class="text-lg text-green-600">Our asset-based approach focuses primarily on property performance and income generation—not just borrower credit history.</p>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-3xl font-bold text-green-800 mb-6 text-center">Financing Options</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">1. Standard Purchase Loan</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">2. Rate & Term Refinance</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">3. DSCR-Based Purchase Loan</div>
      </div>
      <div class="bg-green-100 p-4 rounded-lg text-center">
        <div class="text-lg font-semibold text-green-800">4. Cash-Out Refinance</div>
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
    <h3 class="text-2xl font-bold text-green-800 mb-4">1. Standard Purchase Loan</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">Minimum $250,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.00%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Term:</span>
          <span class="text-green-700 font-bold">5 to 30 years</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 85%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Prepayment Penalty:</span>
          <span class="text-green-700 font-bold">1% if paid off within first 3 years</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">2. Rate & Term Refinance</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Eligibility:</span>
          <span class="text-green-700 font-bold">Operational for at least 1 year</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.00%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Cash-Out Option:</span>
          <span class="text-green-700 font-bold">Available for improvements</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">3. DSCR-Based Purchase Loan</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum DSCR:</span>
          <span class="text-green-700 font-bold">1.30x</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.25%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Loan Amount:</span>
          <span class="text-green-700 font-bold">Based on projected NOI</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Repayment:</span>
          <span class="text-green-700 font-bold">Based on park performance</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">4. Cash-Out Refinance</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Purpose:</span>
          <span class="text-green-700 font-bold">Unlock equity for reinvestment or expansion</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum Loan:</span>
          <span class="text-green-700 font-bold">$300,000</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 7.25%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 80%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Terms:</span>
          <span class="text-green-700 font-bold">5 to 30 years fixed</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">5. Bridge Loan</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Purpose:</span>
          <span class="text-green-700 font-bold">Short-term acquisition or repositioning</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Term Length:</span>
          <span class="text-green-700 font-bold">6 to 24 months</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Interest Rate:</span>
          <span class="text-green-700 font-bold">Starting at 6.50%</span>
        </div>
      </div>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">LTV:</span>
          <span class="text-green-700 font-bold">Up to 85%</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Origination Fee:</span>
          <span class="text-green-700 font-bold">2% (50% financing available)</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Requirements:</span>
          <span class="text-green-700 font-bold">Cash flow projections required</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">6. 100% Financing Program</h3>
    <p class="text-gray-700 mb-4">Available for strong borrowers with additional collateral or extensive industry experience. To qualify, applicants must meet <strong>at least 2 of the following criteria:</strong></p>
    
    <div class="bg-green-50 p-6 rounded-lg">
      <h4 class="text-xl font-bold text-green-800 mb-4">Qualification Requirements</h4>
      <div class="space-y-3">
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Minimum FICO:</span>
          <span class="text-green-700 font-bold">680</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Experience:</span>
          <span class="text-green-700 font-bold">3+ comparable transactions OR proven operational record</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Net Worth:</span>
          <span class="text-green-700 font-bold">Minimum 1.5x loan amount</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Liquidity:</span>
          <span class="text-green-700 font-bold">6 months of debt service reserves</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Income Verification:</span>
          <span class="text-green-700 font-bold">2 years tax returns + 3 months bank statements</span>
        </div>
        <div class="flex justify-between border-b pb-2">
          <span class="font-semibold text-gray-700">Cross-Collateralization:</span>
          <span class="text-green-700 font-bold">Additional properties accepted</span>
        </div>
      </div>
    </div>
  </div>

  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h3 class="text-2xl font-bold text-green-800 mb-4">Property & Borrower Requirements</h3>
    <div class="space-y-6">
      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Operational Status</h4>
        <p class="text-gray-700">Park must be active and properly zoned for mobile home use.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Preferred Park Features</h4>
        <p class="text-gray-700">Updated utilities, stable tenant base, and solid infrastructure are ideal. We can adjust financing based on specific property characteristics.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Minimum Size</h4>
        <p class="text-gray-700">Typically 50 units, but flexible for smaller, high-performing parks with strong cash flow and management.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Target DSCR</h4>
        <p class="text-gray-700">1.30x, adjustable based on market strength and borrower experience. Lower ratios may be considered for exceptional properties.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Value-Add or Expansion Deals</h4>
        <p class="text-gray-700">Allowed with supporting feasibility studies. We partner with operators to assess potential and structure appropriate financing.</p>
      </div>

      <div class="border-l-4 border-green-500 pl-4">
        <h4 class="text-lg font-bold text-green-800 mb-2">Mixed-Use Parks</h4>
        <p class="text-gray-700">Considered with clear income separation by asset type. We conduct prorated NOI evaluation for mixed-use properties.</p>
      </div>
    </div>
  </div>
</div>`
  },
  {
    id: "business-acquisition",
    name: "Business Acquisition Financing",
    interestRate: "7.25% – 9.00%",
    minimumLoanAmount: "$500,000",
    description: "Flexible funding solutions for business acquisitions, management buyouts, and partner buy-ins. Asset-based approach focused on business income strength rather than personal credit history.",
    terms: `
<div style="background: linear-gradient(135deg, #166534 0%, #16a34a 50%, #22c55e 100%); color: white; padding: clamp(1rem, 4vw, 2rem); border-radius: 12px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

<div style="text-align: center; margin-bottom: clamp(1.5rem, 5vw, 3rem); padding: clamp(1rem, 4vw, 2rem); background: rgba(255,255,255,0.1); border-radius: 8px; backdrop-filter: blur(10px);">
  <h1 style="font-size: clamp(1.5rem, 6vw, 2.5rem); font-weight: 800; margin-bottom: 1rem; background: linear-gradient(45deg, #fbbf24, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 8px rgba(0,0,0,0.3); line-height: 1.2;">
    BUSINESS ACQUISITION FINANCING
  </h1>
  <h2 style="font-size: clamp(1rem, 4vw, 1.5rem); font-weight: 600; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.3;">
    COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC
  </h2>
  <p style="font-size: clamp(0.9rem, 3vw, 1.1rem); color: #e5e7eb; font-weight: 500; line-height: 1.4;">
    Private Lending for Business Acquisitions, Buyouts & Partner Transitions
  </p>
</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: clamp(1rem, 3vw, 1.5rem); margin-bottom: clamp(1.5rem, 5vw, 3rem);">
  <div style="background: linear-gradient(45deg, #dc2626, #ef4444); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🚫 Traditional Bank Limitations</h3>
    <ul style="color: #fecaca; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Heavy reliance on personal credit scores
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Lengthy approval processes
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Rigid collateral requirements
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✗</span>
        Limited flexibility for buyouts
      </li>
    </ul>
  </div>

  <div style="background: linear-gradient(45deg, #059669, #10b981); padding: clamp(1rem, 3vw, 1.5rem); border-radius: 8px; border-left: 4px solid #fbbf24;">
    <h3 style="color: white; font-size: clamp(1rem, 3vw, 1.2rem); font-weight: 700; margin-bottom: 1rem; line-height: 1.3;">🎯 Our Business-First Approach</h3>
    <ul style="color: #a7f3d0; list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Focus on business income strength
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Fast processing (2-4 weeks)
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        Tiered business-first collateral model
      </li>
      <li style="margin-bottom: 0.5rem; padding-left: 1rem; position: relative;">
        <span style="position: absolute; left: 0; color: #fbbf24;">✓</span>
        In-house Credit Protection Insurance
      </li>
    </ul>
  </div>
</div>

<div style="margin-bottom: 3rem;">
  <h2 style="font-size: clamp(1.25rem, 5vw, 2rem); font-weight: 800; text-align: center; margin-bottom: clamp(1rem, 4vw, 2rem); color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3); line-height: 1.2;">
    FINANCING OPTIONS
  </h2>

  <div style="display: grid; gap: 2rem;">
    
    <!-- Program 1: Standard Acquisition Loan -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: clamp(1rem, 4vw, 2rem); border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: clamp(10px, 4vw, 20px); background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: clamp(0.75rem, 2.5vw, 0.9rem);">
        PROGRAM #1
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: clamp(1.25rem, 4.5vw, 1.8rem); font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem; line-height: 1.2;">
          Standard Acquisition Loan
        </h3>
        <p style="color: #d1d5db; font-size: clamp(0.9rem, 3vw, 1.1rem); margin-bottom: clamp(1rem, 3vw, 1.5rem); font-style: italic; line-height: 1.4;">
          For purchasing or acquiring ownership in an existing business or franchise
        </p>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: clamp(1rem, 3vw, 1.5rem);">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">INTEREST RATE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Starting at 7.25%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TERM LENGTH</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">5-10 Years</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">LTV / LTC</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 85%</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">ORIGINATION FEE</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">1.5%</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
          <div style="color: white; font-weight: 700;">💡 KEY FEATURES:</div>
          <div style="color: #a7f3d0;">Up to 50% financing on origination fee available • Fee can be rolled into loan or paid at closing • 1% prepayment penalty if paid within 2 years</div>
        </div>
      </div>
    </div>

    <!-- Program 2: Collateral Structure -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        COLLATERAL
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Collateral Structure
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Business-first approach with secondary collateral only when needed
        </p>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 6px; border-left: 3px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">🏢 PRIMARY COLLATERAL:</div>
          <div style="color: #e5e7eb; font-size: 0.95rem;">
            Business assets including equipment, receivables, intellectual property (case-by-case), inventory, and business real estate
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">MAX LTV</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 85%</div>
            <div style="color: #a7f3d0; font-size: 0.85rem;">Of verified asset value</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">SECONDARY COLLATERAL</div>
            <div style="color: white; font-size: 1.1rem; font-weight: 800;">Real Estate</div>
            <div style="color: #a7f3d0; font-size: 0.85rem;">Only if business assets insufficient</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">PERSONAL GUARANTEE</div>
            <div style="color: white; font-size: 1.1rem; font-weight: 800;">Required</div>
            <div style="color: #a7f3d0; font-size: 0.85rem;">For 20%+ ownership holders</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Program 3: Credit Protection Insurance -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        OPTIONAL
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Credit Protection Insurance (CPI)
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          In-house protection program for borrower security
        </p>
        
        <div style="background: rgba(16, 185, 129, 0.2); padding: 1.5rem; border-radius: 6px; border-left: 3px solid #10b981; margin-bottom: 1rem;">
          <div style="color: #a7f3d0; font-weight: 700; margin-bottom: 0.5rem;">📋 INSURED EVENTS MAY INCLUDE:</div>
          <ul style="color: #e5e7eb; padding-left: 1.5rem; margin: 0;">
            <li style="margin-bottom: 0.3rem;">Unexpected death, disability, or severe illness of key owner/guarantor</li>
            <li style="margin-bottom: 0.3rem;">Significant business interruption due to natural disaster</li>
            <li style="margin-bottom: 0.3rem;">Other qualifying insured losses impairing loan repayment</li>
          </ul>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">SAVINGS</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Up to 40% Lower</div>
            <div style="color: #a7f3d0; font-size: 0.85rem;">Than third-party coverage</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">ENROLLMENT</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">Same-Day</div>
            <div style="color: #a7f3d0; font-size: 0.85rem;">At loan closing</div>
          </div>
        </div>
        
        <div style="background: linear-gradient(45deg, #059669, #10b981); padding: 1rem; border-radius: 6px;">
          <div style="color: white; font-weight: 700;">📧 CONTACT FOR QUOTE:</div>
          <div style="color: #a7f3d0;">Insuranceunderwriter@ccif-inc.com</div>
        </div>
      </div>
    </div>

    <!-- Program 4: Documentation & Underwriting -->
    <div style="background: linear-gradient(135deg, #1f2937, #374151); border-radius: 12px; padding: 2rem; border: 2px solid #fbbf24; position: relative; overflow: hidden;">
      <div style="position: absolute; top: -10px; left: 20px; background: #fbbf24; color: #1f2937; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 800; font-size: 0.9rem;">
        UNDERWRITING
      </div>
      <div style="margin-top: 1rem;">
        <h3 style="font-size: 1.8rem; font-weight: 800; color: #fbbf24; margin-bottom: 0.5rem;">
          Documentation & Underwriting
        </h3>
        <p style="color: #d1d5db; font-size: 1.1rem; margin-bottom: 1.5rem; font-style: italic;">
          Approval based on business ability to repay—not borrower credit score
        </p>
        
        <div style="background: rgba(251, 191, 36, 0.1); padding: 1.5rem; border-radius: 6px; border-left: 3px solid #fbbf24; margin-bottom: 1rem;">
          <div style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">📄 REQUIRED DOCUMENTATION:</div>
          <ul style="color: #e5e7eb; padding-left: 1.5rem; margin: 0;">
            <li style="margin-bottom: 0.3rem;">2 years of business and/or personal tax returns</li>
            <li style="margin-bottom: 0.3rem;">Current Year-to-Date Profit & Loss and Balance Sheet</li>
            <li style="margin-bottom: 0.3rem;">Purchase agreement or letter of intent</li>
            <li style="margin-bottom: 0.3rem;">Business valuation or asset appraisal (if applicable)</li>
            <li style="margin-bottom: 0.3rem;">Collateral summary for all pledged assets</li>
          </ul>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">TARGET DSCR</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">≥ 1.25x</div>
          </div>
          <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; border-left: 3px solid #fbbf24;">
            <div style="color: #fbbf24; font-weight: 700; font-size: 0.9rem;">PROCESSING TIME</div>
            <div style="color: white; font-size: 1.3rem; font-weight: 800;">2-4 Weeks</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- Borrower Advantages Section -->
<div style="margin-bottom: 2rem;">
  <h2 style="font-size: clamp(1.25rem, 5vw, 2rem); font-weight: 800; text-align: center; margin-bottom: clamp(1rem, 4vw, 2rem); color: #fbbf24; text-shadow: 0 2px 4px rgba(0,0,0,0.3); line-height: 1.2;">
    BORROWER ADVANTAGES
  </h2>
  
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">💳</div>
      <h3 style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Credit-Flexible</h3>
      <p style="color: #e5e7eb; font-size: 0.95rem;">Approval based on business strength, not credit history</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">⚡</div>
      <h3 style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Fast Processing</h3>
      <p style="color: #e5e7eb; font-size: 0.95rem;">Funding in as little as 2-4 weeks</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🏦</div>
      <h3 style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">Tiered Collateral</h3>
      <p style="color: #e5e7eb; font-size: 0.95rem;">Business-first approach, with add-ons only as needed</p>
    </div>
    <div style="background: rgba(255,255,255,0.1); padding: 1.5rem; border-radius: 8px; text-align: center;">
      <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛡️</div>
      <h3 style="color: #fbbf24; font-weight: 700; margin-bottom: 0.5rem;">In-House Protection</h3>
      <p style="color: #e5e7eb; font-size: 0.95rem;">Affordable Credit Protection Insurance for security</p>
    </div>
  </div>
</div>

<!-- Financing Options Summary -->
<div style="background: rgba(255,255,255,0.1); padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">
  <h2 style="font-size: clamp(1.25rem, 5vw, 1.8rem); font-weight: 800; text-align: center; margin-bottom: 1.5rem; color: #fbbf24;">
    ALL FINANCING OPTIONS
  </h2>
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; text-align: center; border: 1px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700;">Business Acquisition Loan</div>
      <div style="color: #e5e7eb; font-size: 0.85rem;">Asset or Stock Purchase</div>
    </div>
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; text-align: center; border: 1px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700;">Management Buyout</div>
      <div style="color: #e5e7eb; font-size: 0.85rem;">MBO Financing</div>
    </div>
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; text-align: center; border: 1px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700;">Partner Buy-In/Buyout</div>
      <div style="color: #e5e7eb; font-size: 0.85rem;">Partnership Transitions</div>
    </div>
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; text-align: center; border: 1px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700;">Seller Carry Blend</div>
      <div style="color: #e5e7eb; font-size: 0.85rem;">Hybrid Financing</div>
    </div>
    <div style="background: rgba(251, 191, 36, 0.1); padding: 1rem; border-radius: 6px; text-align: center; border: 1px solid #fbbf24;">
      <div style="color: #fbbf24; font-weight: 700;">Bridge-to-Acquisition</div>
      <div style="color: #e5e7eb; font-size: 0.85rem;">Short-Term Financing</div>
    </div>
  </div>
</div>

</div>`
  }
];