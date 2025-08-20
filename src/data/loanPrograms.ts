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
    interestRate: "7.5% - 12%",
    minimumLoanAmount: "$1,000,000",
    description: "Traditional commercial real estate financing for established properties.",
    terms: `COMMERCIAL MORTGAGE LOAN TERMS

Interest Rate: 7.5% - 12% (varies based on property type and borrower qualifications)
Loan Term: Up to 30 years
Minimum Loan Amount: $1,000,000
Maximum LTV: 80%
Amortization: Up to 30 years

Property Types:
- Office buildings
- Retail centers
- Industrial properties
- Mixed-use developments
- Warehouses

Requirements:
- Minimum 1.25 DSCR
- Property appraisal required
- Environmental Phase I required
- Borrower financial statements

Processing Time: 30-45 days
Prepayment: Available with penalty structure`
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