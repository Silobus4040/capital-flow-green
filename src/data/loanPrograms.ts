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
    interestRate: "8% - 14%",
    minimumLoanAmount: "$500,000",
    description: "Debt Service Coverage Ratio loans for income-producing commercial properties.",
    terms: `COMMERCIAL DSCR LOAN TERMS

Interest Rate: 8% - 14%
Loan Term: 5-30 years
Minimum Loan Amount: $500,000
Maximum LTV: 75%
Minimum DSCR: 1.20

Property Types:
- Rental properties
- Office buildings
- Retail properties
- Industrial buildings

Key Features:
- No personal income verification
- Asset-based underwriting
- Quick closing process
- Flexible terms

Processing Time: 21-30 days`
  },
  {
    id: "rehab-loan",
    name: "Rehab Loan",
    interestRate: "9% - 15%",
    minimumLoanAmount: "$500,000",
    description: "Financing for property renovation and rehabilitation projects.",
    terms: `REHAB LOAN TERMS

Interest Rate: 9% - 15%
Loan Term: 6-24 months
Minimum Loan Amount: $500,000
Maximum LTV: 70% of ARV (After Repair Value)

Features:
- Interest-only payments during construction
- Staged funding based on completion
- No seasoning requirements
- Fast approval process

Property Types:
- Commercial buildings
- Mixed-use properties
- Investment properties

Requirements:
- Detailed rehab budget
- Licensed contractor
- Property appraisal (as-is and ARV)

Processing Time: 14-21 days`
  },
  {
    id: "rv-park-financing",
    name: "RV Park Financing",
    interestRate: "8.5% - 13%",
    minimumLoanAmount: "$500,000",
    description: "Specialized financing for RV parks and recreational vehicle facilities.",
    terms: `RV PARK FINANCING TERMS

Interest Rate: 8.5% - 13%
Loan Term: Up to 25 years
Minimum Loan Amount: $500,000
Maximum LTV: 75%

Property Features:
- RV parks and campgrounds
- Manufactured housing communities
- Recreational facilities

Key Benefits:
- Experienced in RV park financing
- Flexible underwriting
- Quick closing process
- Competitive rates

Requirements:
- Operating history preferred
- Market analysis
- Environmental assessment
- Management experience

Processing Time: 30-45 days`
  },
  {
    id: "mobile-home-park-financing",
    name: "Mobile Home Park Financing",
    interestRate: "8% - 12.5%",
    minimumLoanAmount: "$500,000",
    description: "Financing solutions for mobile home parks and manufactured housing communities.",
    terms: `MOBILE HOME PARK FINANCING TERMS

Interest Rate: 8% - 12.5%
Loan Term: Up to 30 years
Minimum Loan Amount: $500,000
Maximum LTV: 75%

Property Types:
- Mobile home parks
- Manufactured housing communities
- All-age communities
- Senior communities

Features:
- Long-term financing available
- Experienced underwriting team
- Competitive rates
- Flexible terms

Requirements:
- Operating statements (3 years)
- Rent rolls
- Property management experience
- Market analysis

Processing Time: 30-45 days`
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