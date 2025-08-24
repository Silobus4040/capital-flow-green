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
    minimumLoanAmount: "$500,000+",
    description: "100% financing available • No credit requirements • Fast approval for qualified commercial properties nationwide.",
    terms: `<div class="ccif-terms-container">

## Commercial Real Estate Financing Solutions
### Professional-Grade Lending for Serious Investors

<div class="pain-points-section">
<h3>Market Challenges We Eliminate</h3>
<ul class="challenge-list">
<li>Traditional bank rejections due to credit requirements</li>
<li>Excessive down payment demands (20-30%)</li>
<li>Extended approval timelines (90+ days)</li>
<li>Rigid lending criteria limiting deal potential</li>
<li>Geographic restrictions and limited property types</li>
</ul>
</div>

<div class="solutions-section">
<h3>CCIF Strategic Advantages</h3>
<ul class="advantage-list">
<li><strong>100% Financing Available:</strong> Qualified transactions with zero down payment</li>
<li><strong>Asset-Based Underwriting:</strong> Property value focus, not just credit scores</li>
<li><strong>Accelerated Processing:</strong> 15-30 day closings standard</li>
<li><strong>Comprehensive Property Coverage:</strong> All commercial real estate types</li>
<li><strong>National Platform:</strong> Licensed in all 50 states</li>
</ul>
</div>

<div class="company-header">
<h2>COMMERCIAL CAPITAL & INVESTMENT FINANCE, INC.</h2>
<p class="company-tagline">Premier Alternative Commercial Lending Institution</p>
</div>

<div class="programs-section">

<div class="program-card">
<h3>First Mortgage Purchase Program</h3>
<div class="program-details">
<div class="detail-row">
<span class="label">Minimum Loan Amount:</span>
<span class="value">$500,000</span>
</div>
<div class="detail-row">
<span class="label">Interest Rates:</span>
<span class="value">Fixed from 5.31% | Variable at Prime + 2%</span>
</div>
<div class="detail-row">
<span class="label">Loan Terms:</span>
<span class="value">1-30 years (customizable)</span>
</div>
<div class="detail-row">
<span class="label">Loan-to-Value:</span>
<span class="value">Up to 90% (100% program available)</span>
</div>
<div class="detail-row">
<span class="label">Origination Fee:</span>
<span class="value">2% (50% financeable)</span>
</div>
<div class="detail-row">
<span class="label">Prepayment:</span>
<span class="value">No penalty on fixed rates</span>
</div>
</div>
<p class="program-description">Ideal for: First-time commercial buyers, experienced investors, portfolio expansion</p>
</div>

<div class="program-card">
<h3>Second Mortgage & Mezzanine Program</h3>
<div class="program-details">
<div class="detail-row">
<span class="label">Minimum Loan Amount:</span>
<span class="value">$500,000</span>
</div>
<div class="detail-row">
<span class="label">Interest Rates:</span>
<span class="value">Starting at 7.56%</span>
</div>
<div class="detail-row">
<span class="label">Combined LTV:</span>
<span class="value">Up to 85%</span>
</div>
<div class="detail-row">
<span class="label">Loan Terms:</span>
<span class="value">1-10 years (balloon or fully amortized)</span>
</div>
<div class="detail-row">
<span class="label">Payment Structure:</span>
<span class="value">Interest-only available</span>
</div>
<div class="detail-row">
<span class="label">Origination Fee:</span>
<span class="value">2% (50% financeable)</span>
</div>
</div>
<p class="program-description">Ideal for: Maximizing leverage, cash preservation, multiple acquisitions</p>
</div>

<div class="program-card">
<h3>Rate & Term Refinance Program</h3>
<div class="program-details">
<div class="detail-row">
<span class="label">Minimum Loan Amount:</span>
<span class="value">$500,000</span>
</div>
<div class="detail-row">
<span class="label">Interest Rates:</span>
<span class="value">From 5.50%</span>
</div>
<div class="detail-row">
<span class="label">Loan Terms:</span>
<span class="value">1-30 years</span>
</div>
<div class="detail-row">
<span class="label">Amortization:</span>
<span class="value">Up to 40 years</span>
</div>
<div class="detail-row">
<span class="label">Interest-Only Period:</span>
<span class="value">Up to 10 years available</span>
</div>
<div class="detail-row">
<span class="label">Closing Costs:</span>
<span class="value">May be financed</span>
</div>
</div>
<p class="program-description">Ideal for: Payment reduction, capital optimization, portfolio restructuring</p>
</div>

<div class="program-card">
<h3>Cash-Out Refinance Program</h3>
<div class="program-details">
<div class="detail-row">
<span class="label">Minimum Loan Amount:</span>
<span class="value">$500,000</span>
</div>
<div class="detail-row">
<span class="label">Interest Rates:</span>
<span class="value">From 6.15% (fixed or variable)</span>
</div>
<div class="detail-row">
<span class="label">Loan Terms:</span>
<span class="value">1, 3, 5, 10, 15, or 30 years</span>
</div>
<div class="detail-row">
<span class="label">Loan-to-Value:</span>
<span class="value">Up to 80% (85% for premium properties)</span>
</div>
<div class="detail-row">
<span class="label">Payment Structure:</span>
<span class="value">Amortized, interest-only, or balloon</span>
</div>
<div class="detail-row">
<span class="label">Seasoning:</span>
<span class="value">No seasoning period required</span>
</div>
</div>
<p class="program-description">Ideal for: Portfolio expansion, business growth, personal liquidity</p>
</div>

<div class="program-card">
<h3>Bridge Financing Program</h3>
<div class="program-details">
<div class="detail-row">
<span class="label">Minimum Loan Amount:</span>
<span class="value">$500,000</span>
</div>
<div class="detail-row">
<span class="label">Loan Terms:</span>
<span class="value">3-24 months</span>
</div>
<div class="detail-row">
<span class="label">Interest Rate:</span>
<span class="value">Approximately 9.5%</span>
</div>
<div class="detail-row">
<span class="label">Loan-to-Value:</span>
<span class="value">Up to 75%</span>
</div>
<div class="detail-row">
<span class="label">Payment Options:</span>
<span class="value">Deferred interest or interest-only</span>
</div>
<div class="detail-row">
<span class="label">Funding Speed:</span>
<span class="value">Close in days, not weeks</span>
</div>
</div>
<p class="program-description">Ideal for: Auction purchases, 1031 exchanges, fix-and-flip projects, opportunistic acquisitions</p>
</div>

</div>

---

## 🎯 EXCLUSIVE 100% FINANCING PROGRAM
### **ZERO DOWN PAYMENT - MAXIMUM PROFIT POTENTIAL**

**🔓 UNLOCK 100% FINANCING** when you meet just 2 of these criteria:

<div class="qualification-grid">
**💳 Credit Score:** 680+ FICO  
**🏆 Experience:** 3+ commercial deals OR proven property management  
**💰 Net Worth:** 1.5x the loan amount  
**💵 Liquidity:** 6 months debt service reserves  
**📊 Income Proof:** 2 years tax returns + 3 months bank statements  
**🏢 Collateral:** Additional properties for cross-collateralization
</div>

---

## 🏢 WE FINANCE WHAT OTHERS WON'T
### **NO PROPERTY TYPE TOO CHALLENGING**

<div class="property-types">
**🏢 TRADITIONAL COMMERCIAL**
- Office Buildings (All Classes)  
- Retail & Shopping Centers  
- Industrial & Warehouse  
- Multifamily (5+ units)  
- Mixed-Use Properties  
- Hotels & Hospitality

**🎯 SPECIALTY PROPERTIES**
- Car Washes & Gas Stations  
- Restaurants & Entertainment  
- Cannabis Facilities  
- Self-Storage  
- Medical Buildings  
- Unique/Non-Conforming Assets
</div>

---

## ❓ FREQUENTLY ASKED QUESTIONS

### **Q: How fast can I actually get approved and funded?**
**A:** Pre-approval in 48-72 hours, full approval in 15-30 days, funding immediately after closing. We've closed deals in as little as 10 days for urgent situations.

### **Q: What if my property is partially vacant or needs work?**
**A:** We specialize in value-add deals! Partial vacancy is fine with a leasing plan. Properties needing repairs are evaluated on stabilized value with renovation holdbacks available.

### **Q: Do you really offer 100% financing with no money down?**
**A:** Yes! For qualified borrowers meeting our criteria, we provide true 100% financing. This includes purchase price plus reasonable closing costs.

### **Q: What if I have credit issues or past bankruptcies?**
**A:** We focus on the asset, not just credit. Many of our successful borrowers had credit challenges. We evaluate the total picture - property strength, experience, and ability to service debt.

### **Q: Can I finance multiple properties at once?**
**A:** Absolutely! We offer portfolio financing, blanket loans, and cross-collateralization. Many clients finance entire portfolios in single transactions.

### **Q: What about environmental issues or special property types?**
**A:** We're experts in complex deals. Environmental issues can often be resolved with remediation plans or insurance. We finance cannabis, car washes, gas stations, and other specialty properties others avoid.

### **Q: How do your rates compare to banks?**
**A:** Our rates are competitive with banks, but we approve deals banks reject. Speed, flexibility, and approval certainty often save you more money than a slightly lower rate elsewhere.

### **Q: Do you work with first-time commercial investors?**
**A:** Yes! While we prefer experience, we evaluate first-time investors with strong financial profiles and solid properties. We'll guide you through the process.

---

## 🎯 SUCCESS STORIES & RESULTS

**"CCIF approved our $2.3M office building purchase with 100% financing when three banks said no. Closed in 18 days!"**  
*- Marcus Thompson, Real Estate Developer*

**"Their bridge loan helped us acquire a distressed retail center. We're now refinancing at 40% higher value after repositioning."**  
*- Sarah Chen, Investment Fund Manager*

**"Portfolio refinancing of 8 properties freed up $1.2M in cash for our next acquisition. CCIF made it seamless."**  
*- David Rodriguez, Portfolio Owner*

---

## 🚀 READY TO DOMINATE YOUR MARKET?

### **GET YOUR DEAL APPROVED IN 48 HOURS**

**🔥 EXCLUSIVE BENEFITS FOR SERIOUS INVESTORS:**
- Priority processing for portfolio clients  
- Reduced fees for repeat customers  
- Pre-approved credit lines up to $50M  
- Dedicated relationship managers  
- Market intelligence and deal flow  

**📞 CALL NOW:** 1-800-CCIF-LOAN  
**💻 APPLY ONLINE:** Submit your deal in 5 minutes  
**📧 EMAIL:** deals@ccif.com  

### **DON'T LET ANOTHER DEAL SLIP AWAY**
*Every day you wait is money left on the table. Contact CCIF today and discover why we're America's #1 choice for commercial real estate financing.*

---

**Licensed in all 50 states • A+ BBB Rating • $2.5B+ in funded loans • Asset-based lending specialists**`
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
    minimumLoanAmount: "$250,000",
    description: "Financing for property renovation and rehabilitation projects.",
    terms: `REHAB LOAN TERMS

Interest Rate: 9% - 15%
Loan Term: 6-24 months
Minimum Loan Amount: $250,000
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
    minimumLoanAmount: "$1,000,000",
    description: "Specialized financing for RV parks and recreational vehicle facilities.",
    terms: `RV PARK FINANCING TERMS

Interest Rate: 8.5% - 13%
Loan Term: Up to 25 years
Minimum Loan Amount: $1,000,000
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
    minimumLoanAmount: "$1,500,000",
    description: "Financing solutions for mobile home parks and manufactured housing communities.",
    terms: `MOBILE HOME PARK FINANCING TERMS

Interest Rate: 8% - 12.5%
Loan Term: Up to 30 years
Minimum Loan Amount: $1,500,000
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
    minimumLoanAmount: "$1,000,000",
    description: "Specialized financing for self-storage facilities and mini-storage properties.",
    terms: `SELF STORAGE FINANCING TERMS

Interest Rate: 7.5% - 12%
Loan Term: Up to 25 years
Minimum Loan Amount: $1,000,000
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
    minimumLoanAmount: "$2,000,000",
    description: "Financing for senior living facilities, assisted living, and memory care properties.",
    terms: `SENIOR LIVING FINANCING TERMS

Interest Rate: 8% - 13%
Loan Term: Up to 30 years
Minimum Loan Amount: $2,000,000
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
    minimumLoanAmount: "$1,000,000",
    description: "Comprehensive financing for land acquisition, development, and construction projects.",
    terms: `ADC LOAN TERMS

Interest Rate: 10% - 16%
Loan Term: 12-36 months
Minimum Loan Amount: $1,000,000
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
    minimumLoanAmount: "$250,000",
    description: "Flexible business financing for working capital, equipment, and expansion needs.",
    terms: `BUSINESS LOAN TERMS

Interest Rate: 9% - 18%
Loan Term: 1-10 years
Minimum Loan Amount: $250,000
Maximum Loan Amount: $10,000,000

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
    minimumLoanAmount: "$150,000",
    description: "Financing for residential investment properties and rental real estate.",
    terms: `RESIDENTIAL INVESTMENT LOAN TERMS

Interest Rate: 8.5% - 14%
Loan Term: Up to 30 years
Minimum Loan Amount: $150,000
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