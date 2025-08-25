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
    id: "residential-investment",
    name: "Residential Investment Property",
    interestRate: "Starting at 5.00%",
    minimumLoanAmount: "$500,000",
    description: "Asset-based private lending for residential investment properties with flexible financing solutions.",
    terms: `
      <div class="program-content">
        <div class="intro-section">
          <p class="lead-text">We are an asset-based private lender providing flexible financing solutions for residential investment properties.</p>
          
          <div class="financing-options">
            <h3>The financing options we cover under our Residential Loan programs are:</h3>
            <ol>
              <li>First Mortgage</li>
              <li>Rate and Term Refinance</li>
              <li>Cash-out refinance</li>
              <li>Bridge loan</li>
              <li>100% financing program</li>
            </ol>
          </div>
        </div>

        <div class="property-types-section">
          <h3>🏘️ Eligible Property Types</h3>
          <div class="property-grid">
            <ul>
              <li>Single-family homes</li>
              <li>Condominiums</li>
              <li>Townhouses</li>
              <li>Multi-family homes (up to four units)</li>
              <li>Modular homes</li>
              <li>Manufactured homes (mobile homes)</li>
              <li>Co-ops (cooperative housing)</li>
              <li>Mixed-use properties (with residential component)</li>
              <li>Vacation properties & second homes</li>
              <li>Residential investment properties</li>
            </ul>
          </div>
        </div>

        <div class="program-section">
          <h3>🏠 Purchase Terms</h3>
          <div class="terms-grid">
            <div class="term-item">
              <strong>Minimum Loan Amount:</strong> $500,000
            </div>
            <div class="term-item">
              <strong>Interest Rate (Fixed):</strong> Starting at 5.00% per annum
            </div>
            <div class="term-item">
              <strong>Interest Rate (Variable):</strong> Starting at Prime + 2.00%
            </div>
            <div class="term-item">
              <strong>Term Length:</strong> 15, 20, 30, or 40 years
            </div>
            <div class="term-item">
              <strong>Loan-to-value:</strong> Up to 90% (100% financing available - See Primary Qualifications section)
            </div>
            <div class="term-item">
              <strong>Prepayment Penalty:</strong> None - pay off anytime
            </div>
            <div class="term-item">
              <strong>Origination Fee:</strong> 1-2% (financing available)
            </div>
          </div>

          <h4>Payment Structure Options:</h4>
          <ul>
            <li><strong>Fully Amortizing:</strong> Principal and interest payments</li>
            <li><strong>Interest-Only Period:</strong> Available for 1-10 years</li>
            <li><strong>Interest-Only + Balloon:</strong> For investment properties</li>
          </ul>
        </div>

        <div class="program-section">
          <h3>🔄 Rate and Term Refinance</h3>
          <div class="terms-grid">
            <div class="term-item">
              <strong>Minimum Loan Amount:</strong> $500,000
            </div>
            <div class="term-item">
              <strong>Interest Rate (Fixed):</strong> Starting at 5.27%
            </div>
            <div class="term-item">
              <strong>Term Length:</strong> 15 to 30 years
            </div>
            <div class="term-item">
              <strong>Prepayment Penalty:</strong> No prepayment penalty
            </div>
          </div>

          <h4>Payment Structure Options:</h4>
          <ul>
            <li><strong>Fully Amortizing:</strong> Principal and interest payments</li>
            <li><strong>Interest-Only Period:</strong> Available for 1-7 years</li>
            <li><strong>Interest-Only + Balloon:</strong> For investment properties</li>
          </ul>

          <h4>Ideal For:</h4>
          <ul>
            <li>Reducing monthly payments</li>
            <li>Securing a better interest rate</li>
            <li>Converting adjustable to fixed rate</li>
            <li>Changing loan terms</li>
          </ul>
        </div>

        <div class="program-section">
          <h3>💰 Cash-Out Refinance</h3>
          <div class="highlight-box">
            <p>If you already own a property and are looking to tap into your equity, our cash-out refinance option may be perfect for you.</p>
          </div>

          <div class="terms-grid">
            <div class="term-item">
              <strong>Maximum LTV Ratio:</strong> Up to 85%
            </div>
            <div class="term-item">
              <strong>Interest Rate (Fixed):</strong> Starting at 5.77%
            </div>
            <div class="term-item">
              <strong>Interest Rate (Variable):</strong> Starting at Prime + 2.25%
            </div>
            <div class="term-item">
              <strong>Term Length:</strong> Up to 30 years
            </div>
            <div class="term-item">
              <strong>Cash-Out Amount:</strong> Available for any use (no restrictions)
            </div>
            <div class="term-item">
              <strong>Seasoning Requirements:</strong> None - refinance immediately after purchase
            </div>
          </div>

          <h4>Payment Structure Options:</h4>
          <ul>
            <li><strong>Fully Amortizing:</strong> Principal and interest payments</li>
            <li><strong>Interest-Only Period:</strong> Available for 1-5 years</li>
            <li><strong>Interest-Only + Balloon:</strong> For investment properties</li>
          </ul>
        </div>

        <div class="program-section">
          <h3>🌉 Bridge Loan</h3>
          <div class="highlight-box">
            <p>Our Bridge Loan product is designed to provide short-term financing solutions for clients who need immediate funds to bridge the gap between buying a new property and selling their existing one or other immediate financing needs such as investment opportunities.</p>
          </div>

          <div class="terms-grid">
            <div class="term-item">
              <strong>Minimum Loan Amount:</strong> $100,000
            </div>
            <div class="term-item">
              <strong>Term Length:</strong> 3 to 24 months
            </div>
            <div class="term-item">
              <strong>Interest Rate:</strong> 9.5%
            </div>
            <div class="term-item">
              <strong>LTV:</strong> Up to 75%
            </div>
            <div class="term-item">
              <strong>Origination Fee:</strong> 2% (up to 50% financing available unless you prefer to pay out of pocket at closing)
            </div>
          </div>

          <h4>Payment Structure Options:</h4>
          <ul>
            <li>Deferred interest with backend balloon payment</li>
            <li>Interest-only payments</li>
          </ul>
        </div>

        <div class="program-section">
          <h3>💸 Payment Structure</h3>
          <p>We offer flexible payment structures to accommodate different financial strategies and cash flow needs:</p>

          <div class="payment-options">
            <div class="payment-option">
              <h4>Fully Amortizing</h4>
              <ul>
                <li>Principal and interest payments throughout loan term</li>
                <li>Loan is fully paid off at maturity</li>
                <li>Builds equity with each payment</li>
                <li>Available for all loan types</li>
                <li>Best for primary residences</li>
              </ul>
            </div>

            <div class="payment-option">
              <h4>Interest-Only Period</h4>
              <ul>
                <li>Interest-only payments for 1-10 years</li>
                <li>Converts to fully amortizing after interest-only period</li>
                <li>Lower initial payments</li>
                <li>Good for property improvement projects</li>
                <li>Available for all property types</li>
              </ul>
            </div>

            <div class="payment-option">
              <h4>Interest-Only + Balloon</h4>
              <ul>
                <li>Interest-only payments for entire term</li>
                <li>Principal due at maturity (balloon payment)</li>
                <li>Lowest monthly payments</li>
                <li>Ideal for investment properties</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="program-section">
          <h3>🎯 100% Financing Program</h3>
          <div class="highlight-box">
            <p>We offer industry-leading 100% financing options for qualified deals. To qualify for zero down investment property loans, applicants must meet any two of the following enhanced criteria:</p>
          </div>

          <div class="qualification-grid">
            <div class="qualification-item">
              <strong>Minimum FICO (credit score):</strong> 680
            </div>
            <div class="qualification-item">
              <strong>Experience:</strong> Applicant or team must have closed at least 3 residential real estate transactions in last 5 years OR verifiable residential property management track record
            </div>
            <div class="qualification-item">
              <strong>Net Worth:</strong> Minimum 1.5x the loan amount
            </div>
            <div class="qualification-item">
              <strong>Liquidity:</strong> 6 months of debt service payments in reserves
            </div>
            <div class="qualification-item">
              <strong>Income Verification:</strong> 2 years tax returns and 3 months bank statements
            </div>
            <div class="qualification-item">
              <strong>Cross-collateralization:</strong> Additional properties offered as collateral
            </div>
          </div>
        </div>

        <div class="faq-section">
          <h3>❓ Frequently Asked Questions</h3>
          
          <div class="faq-item">
            <h4>Can I close a deal if the property is currently tenant-occupied or leased?</h4>
            <p>Yes, but certain occupancy arrangements may affect eligibility and terms. We'll evaluate how existing leases impact collateral value and may request lease documentation or proof of tenant payments.</p>
          </div>

          <div class="faq-item">
            <h4>How is the origination fee structured?</h4>
            <p>We provide up to 50% financing (Interest charged) unless applicant prefers to pay at closing.</p>
          </div>

          <div class="faq-item">
            <h4>What happens if my property is in the middle of major renovations, or if it's not fully habitable?</h4>
            <p>We review the current condition and scope of work. Funds for properties under renovation may have additional requirements, like a completion reserve or future inspection, and the initial LTV could be lower until work is completed.</p>
          </div>

          <div class="faq-item">
            <h4>What if there are title issues, such as liens, judgments, or boundary discrepancies?</h4>
            <p>All outstanding issues such as mechanic's liens, IRS liens, unpaid taxes, or encroachments must be resolved prior to closing. If discovered late, this may delay or jeopardize funding. Early title search is key.</p>
          </div>

          <div class="faq-item">
            <h4>Are there limits or special conditions for mixed-use or non-traditional properties?</h4>
            <p>We lend on mixed-use so long as there's a residential component. We'll assess zoning compliance and the proportion of residential use. Unusual property types may take longer to review and may impact eligible LTV.</p>
          </div>

          <div class="faq-item">
            <h4>What happens if my existing property does not sell within the bridge loan term?</h4>
            <p>We work with you closely to assess exit strategies and may consider extensions based on your circumstances and collateral value.</p>
          </div>
        </div>

        <div class="document-section">
          <h3>📋 Document Checklist</h3>
          <ul>
            <li>Government-issued ID</li>
            <li>Property details (address, type, size)</li>
            <li>Purchase agreement (for purchases)</li>
            <li>Current mortgage statement (for refinances)</li>
            <li>Proof of property insurance</li>
            <li>Recent property tax statement</li>
            <li>Most recent appraisal report (if available)</li>
          </ul>
        </div>
      </div>
    `
  }
];