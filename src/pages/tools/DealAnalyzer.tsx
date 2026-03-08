import React, { useState } from 'react';
import { Calculator, Building, Home, TrendingUp, DollarSign, Percent, ArrowRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

type AnalyzerMode = 'hold' | 'flip' | 'develop';

export default function DealAnalyzer() {
    const [mode, setMode] = useState<AnalyzerMode>('hold');

    // Common State
    const [purchasePrice, setPurchasePrice] = useState(500000);
    const [downPaymentPercent, setDownPaymentPercent] = useState(20);
    const [interestRate, setInterestRate] = useState(6.5);
    const [loanTerm, setLoanTerm] = useState(30);

    // Mode 1: Hold (Cash Flow)
    const [grossRent, setGrossRent] = useState(6000);
    const [vacancyRate, setVacancyRate] = useState(5);
    const [operatingExpenses, setOperatingExpenses] = useState(1500);

    // Mode 2: Flip (Value-Add)
    const [rehabBudget, setRehabBudget] = useState(100000);
    const [arv, setArv] = useState(850000);
    const [holdingMonths, setHoldingMonths] = useState(6);

    // Mode 3: Develop (Ground Up)
    const [landCost, setLandCost] = useState(250000);
    const [hardCosts, setHardCosts] = useState(1200000);
    const [softCosts, setSoftCosts] = useState(150000);
    const [completedValue, setCompletedValue] = useState(2200000);

    // Common Calculations
    const downPaymentAmount = purchasePrice * (downPaymentPercent / 100);
    const loanAmount = purchasePrice - downPaymentAmount;

    const calculateMortgagePayment = (principal: number, rate: number, years: number) => {
        if (rate === 0) return principal / (years * 12);
        const r = rate / 100 / 12;
        const n = years * 12;
        return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    };

    const monthlyMortgage = calculateMortgagePayment(loanAmount, interestRate, loanTerm);

    // Hold Calculations
    const effectiveGrossIncome = grossRent * (1 - vacancyRate / 100);
    const noi = (effectiveGrossIncome - operatingExpenses) * 12;
    const annualDebtService = monthlyMortgage * 12;
    const dscr = annualDebtService > 0 ? (noi / annualDebtService).toFixed(2) : '0.00';
    const capRate = purchasePrice > 0 ? ((noi / purchasePrice) * 100).toFixed(2) : '0.00';
    const monthlyCashFlow = effectiveGrossIncome - operatingExpenses - monthlyMortgage;
    const cashOnCash = downPaymentAmount > 0 ? (((monthlyCashFlow * 12) / downPaymentAmount) * 100).toFixed(2) : '0.00';

    // Flip Calculations
    const flipTotalCost = purchasePrice + rehabBudget;
    const flipLtc = flipTotalCost > 0 ? ((loanAmount + rehabBudget) / flipTotalCost * 100).toFixed(2) : '0.00';
    const flipArvLtv = arv > 0 ? ((loanAmount + rehabBudget) / arv * 100).toFixed(2) : '0.00';
    // Simplified estimated interest for holding period
    const flipEstimatedInterest = (loanAmount + rehabBudget) * (interestRate / 100) * (holdingMonths / 12);
    const flipNetProfit = arv - flipTotalCost - flipEstimatedInterest;
    const flipRoi = downPaymentAmount > 0 ? ((flipNetProfit / downPaymentAmount) * 100).toFixed(2) : '0.00';

    // Develop Calculations
    const devTotalCost = landCost + hardCosts + softCosts;
    // Assume a 20% down payment on total cost for equity required
    const devEquityRequired = devTotalCost * (downPaymentPercent / 100);
    const devLoanAmount = devTotalCost - devEquityRequired;
    const devLtc = devTotalCost > 0 ? (devLoanAmount / devTotalCost * 100).toFixed(2) : '0.00';
    const devLtcv = completedValue > 0 ? (devLoanAmount / completedValue * 100).toFixed(2) : '0.00';
    const devProfit = completedValue - devTotalCost;
    const devReturnOnCost = devTotalCost > 0 ? ((completedValue / devTotalCost - 1) * 100).toFixed(2) : '0.00';


    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-primary mb-4">Advanced Deal Analyzer</h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Evaluate your investment opportunities with our professional underwriting tools. Choose your strategy below.
                    </p>
                </div>

                {/* Mode Selector */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button
                        onClick={() => setMode('hold')}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all shadow-sm ${mode === 'hold' ? 'bg-primary text-white shadow-md scale-105' : 'bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200'}`}
                    >
                        <Building className="h-5 w-5" />
                        <span>Cash Flow / Hold</span>
                    </button>
                    <button
                        onClick={() => setMode('flip')}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all shadow-sm ${mode === 'flip' ? 'bg-primary text-white shadow-md scale-105' : 'bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200'}`}
                    >
                        <Home className="h-5 w-5" />
                        <span>Fix & Flip / Rehab</span>
                    </button>
                    <button
                        onClick={() => setMode('develop')}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-full font-bold transition-all shadow-sm ${mode === 'develop' ? 'bg-primary text-white shadow-md scale-105' : 'bg-white text-gray-600 hover:bg-green-50 hover:text-primary border border-gray-200'}`}
                    >
                        <TrendingUp className="h-5 w-5" />
                        <span>Ground-Up Develop</span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Inputs Column */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <Calculator className="h-6 w-6 mr-2 text-primary" />
                            Deal Inputs
                        </h2>

                        {/* Hold & Flip Shared Inputs */}
                        {(mode === 'hold' || mode === 'flip') && (
                            <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Price</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment (%)</label>
                                    <div className="relative">
                                        <input type="number" value={downPaymentPercent} onChange={e => setDownPaymentPercent(Number(e.target.value))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <Percent className="h-4 w-4 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Common Financing Inputs */}
                        <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                            <h3 className="font-semibold text-primary">Financing Terms</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%)</label>
                                <div className="relative">
                                    <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <Percent className="h-4 w-4 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            {mode !== 'flip' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Loan Term (Years)</label>
                                    <input type="number" value={loanTerm} onChange={e => setLoanTerm(Number(e.target.value))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                            )}
                        </div>

                        {/* Mode 1 Specific */}
                        {mode === 'hold' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-primary">Property Income</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Gross Monthly Rent</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={grossRent} onChange={e => setGrossRent(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Monthly OpEx (Insurance, Taxes, etc.)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={operatingExpenses} onChange={e => setOperatingExpenses(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Vacancy Rate (%)</label>
                                    <div className="relative">
                                        <input type="number" value={vacancyRate} onChange={e => setVacancyRate(Number(e.target.value))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><Percent className="h-4 w-4 text-gray-400" /></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mode 2 Specific */}
                        {mode === 'flip' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-primary">Project Details</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Rehab Budget</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={rehabBudget} onChange={e => setRehabBudget(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">After Repair Value (ARV)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={arv} onChange={e => setArv(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Holding Period (Months)</label>
                                    <input type="number" value={holdingMonths} onChange={e => setHoldingMonths(Number(e.target.value))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                </div>
                            </div>
                        )}

                        {/* Mode 3 Specific */}
                        {mode === 'develop' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Land Acquisition Cost</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={landCost} onChange={e => setLandCost(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Hard Construction Costs</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={hardCosts} onChange={e => setHardCosts(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Soft Costs (Permits, Arch, etc.)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={softCosts} onChange={e => setSoftCosts(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Equity Put Down (%)</label>
                                    <div className="relative">
                                        <input type="number" value={downPaymentPercent} onChange={e => setDownPaymentPercent(Number(e.target.value))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"><Percent className="h-4 w-4 text-gray-400" /></div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stabilized/Completed Value</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><DollarSign className="h-4 w-4 text-gray-400" /></div>
                                        <input type="number" value={completedValue} onChange={e => setCompletedValue(Number(e.target.value))} className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50" />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Results Column */}
                    <div className="lg:col-span-2 space-y-6">

                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/20">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <TrendingUp className="h-6 w-6 mr-2 text-primary" />
                                Deal Analysis Results
                            </h2>

                            {/* Mode 1 Results */}
                            {mode === 'hold' && (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">DSCR</div>
                                            <div className={`text-2xl font-bold ${Number(dscr) >= 1.25 ? 'text-green-600' : 'text-amber-600'}`}>{dscr}x</div>
                                            {Number(dscr) >= 1.25 ? <div className="text-xs text-green-600 mt-1">Excellent</div> : <div className="text-xs text-amber-600 mt-1">Below Target</div>}
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Cap Rate</div>
                                            <div className="text-2xl font-bold text-gray-800">{capRate}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Cash-on-Cash</div>
                                            <div className="text-2xl font-bold text-gray-800">{cashOnCash}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center items-center text-center border-b-4 border-b-primary">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Monthly Cash Flow</div>
                                            <div className={`text-2xl font-bold ${monthlyCashFlow >= 0 ? 'text-primary' : 'text-red-500'}`}>
                                                {formatCurrency(monthlyCashFlow)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                            <h3 className="font-bold text-gray-800">Financial Breakdown</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Net Operating Income (NOI, Annual)</span>
                                                    <span className="font-semibold">{formatCurrency(noi)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Annual Debt Service</span>
                                                    <span className="font-semibold">{formatCurrency(annualDebtService)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Total Loan Amount</span>
                                                    <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray-600">Monthly Mortgage Payment</span>
                                                    <span className="font-semibold text-gray-800">{formatCurrency(monthlyMortgage)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Mode 2 Results */}
                            {mode === 'flip' && (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">LTC (Loan to Cost)</div>
                                            <div className="text-2xl font-bold text-gray-800">{flipLtc}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">ARV LTV</div>
                                            <div className="text-2xl font-bold text-gray-800">{flipArvLtv}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Est. ROI</div>
                                            <div className="text-2xl font-bold text-gray-800">{flipRoi}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center items-center text-center border-b-4 border-b-primary">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Est. Net Profit</div>
                                            <div className={`text-2xl font-bold ${flipNetProfit >= 0 ? 'text-primary' : 'text-red-500'}`}>
                                                {formatCurrency(flipNetProfit)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                            <h3 className="font-bold text-gray-800">Project Budget Breakdown</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Total Project Cost (Purchase + Rehab)</span>
                                                    <span className="font-semibold">{formatCurrency(flipTotalCost)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Total Loan Amount (Incl. Rehab)</span>
                                                    <span className="font-semibold">{formatCurrency(loanAmount + rehabBudget)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Estimated Interest Hold Cost ({holdingMonths} mos)</span>
                                                    <span className="font-semibold">{formatCurrency(flipEstimatedInterest)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2">
                                                    <span className="text-gray-600">Required Equity (Down Payment)</span>
                                                    <span className="font-semibold text-gray-800">{formatCurrency(downPaymentAmount)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Mode 3 Results */}
                            {mode === 'develop' && (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">LTC</div>
                                            <div className="text-2xl font-bold text-gray-800">{devLtc}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Completed LTV</div>
                                            <div className="text-2xl font-bold text-gray-800">{devLtcv}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Return on Cost</div>
                                            <div className="text-2xl font-bold text-gray-800">{devReturnOnCost}%</div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-green-100 flex flex-col justify-center items-center text-center border-b-4 border-b-primary">
                                            <div className="text-sm font-medium text-gray-500 mb-1">Est. Profit</div>
                                            <div className={`text-2xl font-bold ${devProfit >= 0 ? 'text-primary' : 'text-red-500'}`}>
                                                {formatCurrency(devProfit)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                            <h3 className="font-bold text-gray-800">Development Costs Breakdown</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Total Development Cost</span>
                                                    <span className="font-semibold">{formatCurrency(devTotalCost)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Total Requested Loan Amount</span>
                                                    <span className="font-semibold">{formatCurrency(devLoanAmount)}</span>
                                                </div>
                                                <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                    <span className="text-gray-600">Required Equity</span>
                                                    <span className="font-semibold">{formatCurrency(devEquityRequired)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Matchmaker Call to Action */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center mt-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Building className="h-32 w-32" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2 relative z-10">Find the Perfect Loan for This Deal</h3>
                            <p className="text-gray-600 mb-6 max-w-lg mx-auto relative z-10">
                                Not sure which CCIF loan program fits these numbers best? Use our Matchmaker tool to find out.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                                <Link to="/loan-matchmaker" className="bg-primary text-white hover:bg-primary-dark font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center">
                                    Use Loan Matchmaker <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                                <Link to="/applicant-signup" className="bg-white text-primary border-2 border-primary hover:bg-green-50 font-bold py-3 px-8 rounded-full transition-colors flex items-center justify-center">
                                    Apply Now
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
