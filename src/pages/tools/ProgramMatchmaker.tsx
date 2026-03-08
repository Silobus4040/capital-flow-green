import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Building, Home, TrendingUp, CheckCircle2, Wallet, DollarSign, Hotel, Package, HeartPulse, RefreshCw, Calculator } from 'lucide-react';

type Strategy = 'hold' | 'flip' | 'develop' | 'refinance' | null;
type PropertyType = 'residential' | 'multifamily' | 'commercial' | 'mhp' | 'rv' | 'storage' | 'senior' | null;
type FinancingNeed = 'standard' | '100percent' | null;

interface MatchResult {
    programId: string;
    name: string;
    description: string;
    analyzerMode: 'hold' | 'flip' | 'develop';
}

export default function ProgramMatchmaker() {
    const [step, setStep] = useState(1);
    const [strategy, setStrategy] = useState<Strategy>(null);
    const [propertyType, setPropertyType] = useState<PropertyType>(null);
    const [financingNeed, setFinancingNeed] = useState<FinancingNeed>(null);

    const getMatch = (): MatchResult => {
        // 100% Financing Priority
        if (financingNeed === '100percent') {
            if (strategy === 'flip') {
                return {
                    programId: 'rehab-loan',
                    name: '100% Renovation Financing',
                    description: 'Zero down payment program for experienced flippers. Includes 100% of purchase and 100% of rehab costs.',
                    analyzerMode: 'flip'
                };
            }
            return {
                programId: 'residential-investment-loan',
                name: '100% Investment Property Financing',
                description: 'Industry-leading zero down payment option for qualified investors on standard purchases.',
                analyzerMode: 'hold'
            };
        }

        // Development Priority
        if (strategy === 'develop') {
            return {
                programId: 'acquisition-development-construction',
                name: 'Ground-Up Development & Construction',
                description: 'Comprehensive financing spanning land acquisition to vertical construction. Up to 95% LTC available.',
                analyzerMode: 'develop'
            };
        }

        // Rehab Priority
        if (strategy === 'flip') {
            return {
                programId: 'rehab-loan',
                name: 'Fix & Flip / Rehab Loan',
                description: 'Fast, flexible capital to acquire and renovate distressed properties. Up to 90% Purchase + 100% Rehab.',
                analyzerMode: 'flip'
            };
        }

        // specific property types for Hold/Refinance
        switch (propertyType) {
            case 'mhp':
                return {
                    programId: 'mobile-home-park-financing',
                    name: 'Mobile Home Park Private Loan',
                    description: 'Asset-based financing tailored specifically for scale, evaluating park performance, not tax returns.',
                    analyzerMode: 'hold'
                };
            case 'rv':
                return {
                    programId: 'rv-park-financing',
                    name: 'RV Park & Campground Financing',
                    description: 'Custom solutions for RV resorts based on trailing revenue and expansion potential.',
                    analyzerMode: 'hold'
                };
            case 'storage':
                return {
                    programId: 'self-storage-financing',
                    name: 'Self-Storage Facility Financing',
                    description: 'High-leverage options for operational consistency, designed for the self-storage asset class.',
                    analyzerMode: 'hold'
                };
            case 'senior':
                return {
                    programId: 'senior-living-financing',
                    name: 'Senior Living & Care Facility Loan',
                    description: 'All-inclusive financing for Assisted Living, Memory Care, and Residential Care facilities.',
                    analyzerMode: 'hold'
                };
            case 'commercial':
                return {
                    programId: 'commercial-mortgage',
                    name: 'Commercial Mortgage Bridge',
                    description: 'Fast, flexible bridge financing for commercial properties in transition.',
                    analyzerMode: 'hold'
                };
            default:
                // Residential / Multifamily default to DSCR for long term
                return {
                    programId: 'dscr-loan',
                    name: 'DSCR Investment Loan',
                    description: "Qualify based entirely on the property's cash flow, not your personal income. No DTI or W-2s required.",
                    analyzerMode: 'hold'
                };
        }
    };

    const handleNext = () => setStep(s => Math.min(4, s + 1));
    const handleBack = () => setStep(s => Math.max(1, s - 1));

    return (
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-primary mb-4">Loan Program Matchmaker</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Answer 3 quick questions to find the perfect CCIF financing program tailored to your real estate investment deal.
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Progress Bar */}
                    <div className="bg-green-50 px-8 py-4 border-b border-green-100 flex justify-between items-center">
                        <div className="text-sm font-bold text-primary">Step {step} of {step === 4 ? '4' : '3'}</div>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`h-2 rounded-full transition-all ${step >= i ? 'bg-primary w-8' : 'bg-gray-200 w-4'}`} />
                            ))}
                        </div>
                    </div>

                    <div className="p-8 md:p-12">

                        {/* Step 1: Strategy */}
                        {step === 1 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What is your primary investment strategy for this deal?</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <button onClick={() => { setStrategy('hold'); handleNext(); }} className={`p-6 rounded-2xl border-2 text-left transition-all ${strategy === 'hold' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                        <Building className={`h-8 w-8 mb-4 ${strategy === 'hold' ? 'text-primary' : 'text-gray-400'}`} />
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">Buy & Hold (Cash Flow)</h3>
                                        <p className="text-sm text-gray-500">I want to acquire a stabilized property to generate long-term rental income.</p>
                                    </button>
                                    <button onClick={() => { setStrategy('flip'); handleNext(); }} className={`p-6 rounded-2xl border-2 text-left transition-all ${strategy === 'flip' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                        <Home className={`h-8 w-8 mb-4 ${strategy === 'flip' ? 'text-primary' : 'text-gray-400'}`} />
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">Fix & Flip (Value-Add)</h3>
                                        <p className="text-sm text-gray-500">I want to purchase a distressed property, heavily renovate it, and sell or refinance.</p>
                                    </button>
                                    <button onClick={() => { setStrategy('develop'); handleNext(); }} className={`p-6 rounded-2xl border-2 text-left transition-all ${strategy === 'develop' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                        <TrendingUp className={`h-8 w-8 mb-4 ${strategy === 'develop' ? 'text-primary' : 'text-gray-400'}`} />
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">Ground-Up Development</h3>
                                        <p className="text-sm text-gray-500">I am acquiring raw land or an empty lot to construct a new building from scratch.</p>
                                    </button>
                                    <button onClick={() => { setStrategy('refinance'); handleNext(); }} className={`p-6 rounded-2xl border-2 text-left transition-all ${strategy === 'refinance' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                        <RefreshCw className={`h-8 w-8 mb-4 ${strategy === 'refinance' ? 'text-primary' : 'text-gray-400'}`} />
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">Refinance Existing Asset</h3>
                                        <p className="text-sm text-gray-500">I already own the property and want a better rate, longer term, or to pull cash out.</p>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Property Type */}
                        {step === 2 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <button onClick={handleBack} className="text-sm text-primary flex items-center hover:underline mb-6"><ArrowLeft className="h-4 w-4 mr-1" /> Back</button>
                                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What type of property is this?</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {[
                                        { id: 'residential', label: 'Residential (1-4 Units)', icon: Home },
                                        { id: 'multifamily', label: 'Multifamily (5+ Units)', icon: Building },
                                        { id: 'commercial', label: 'Commercial / Mixed-Use', icon: Building },
                                        { id: 'mhp', label: 'Mobile Home Park', icon: Home },
                                        { id: 'rv', label: 'RV Park & Resort', icon: Hotel },
                                        { id: 'storage', label: 'Self-Storage', icon: Package },
                                        { id: 'senior', label: 'Senior Living', icon: HeartPulse }
                                    ].map(type => {
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                onClick={() => { setPropertyType(type.id as PropertyType); handleNext(); }}
                                                className={`p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center ${propertyType === type.id ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}
                                            >
                                                <Icon className={`h-8 w-8 mb-3 ${propertyType === type.id ? 'text-primary' : 'text-gray-400'}`} />
                                                <span className="font-bold text-sm text-gray-800">{type.label}</span>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Financing Need */}
                        {step === 3 && (
                            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                <button onClick={handleBack} className="text-sm text-primary flex items-center hover:underline mb-6"><ArrowLeft className="h-4 w-4 mr-1" /> Back</button>
                                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What are your capital constraints for this deal?</h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <button onClick={() => { setFinancingNeed('standard'); handleNext(); }} className={`p-6 rounded-2xl border-2 text-left transition-all ${financingNeed === 'standard' ? 'border-primary bg-primary/5 shadow-md' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                                        <Wallet className={`h-8 w-8 mb-4 ${financingNeed === 'standard' ? 'text-primary' : 'text-gray-400'}`} />
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">Standard Financing (I have equity)</h3>
                                        <p className="text-sm text-gray-500">I have 15-25% to put down (or existing equity) and want the most competitive rate possible based on the asset.</p>
                                    </button>
                                    <button onClick={() => { setFinancingNeed('100percent'); handleNext(); }} className={`p-6 rounded-2xl border-2 text-left transition-all border-green-200 bg-green-50/50 hover:border-primary hover:bg-green-50 ${financingNeed === '100percent' ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
                                        <div className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full w-max mb-3">CCIF Exclusive</div>
                                        <DollarSign className={`h-8 w-8 mb-3 text-primary`} />
                                        <h3 className="text-lg font-bold text-gray-800 mb-2">100% Financing (Zero Down)</h3>
                                        <p className="text-sm text-gray-600">I want to finance the entire purchase. <span className="block mt-2 italic text-xs">(Requires FICO 680+ and 3+ successful past deals to qualify)</span></p>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Results */}
                        {step === 4 && (
                            <div className="animate-in zoom-in duration-500">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle2 className="h-10 w-10 text-primary" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">We found your perfect match!</h2>
                                    <p className="text-gray-600 mb-8">Based on your strategy and property type, this program offers the highest leverage and best terms for your specific deal.</p>

                                    {/* Result Card */}
                                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 w-full rounded-2xl border border-green-200 p-8 mb-8 text-left relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Building className="h-32 w-32 text-primary" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="text-sm font-bold text-primary mb-2 uppercase tracking-wide">Recommended Program</div>
                                            <h3 className="text-3xl font-extrabold text-gray-900 mb-4">{getMatch().name}</h3>
                                            <p className="text-lg text-gray-600 mb-6">{getMatch().description}</p>

                                            <div className="flex flex-col sm:flex-row gap-4">
                                                <Link to={`/loan-programs/${getMatch().programId}`} className="text-primary font-bold hover:underline flex items-center">
                                                    Read full program details <ArrowRight className="ml-1 h-4 w-4" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4 w-full">
                                        <Link to="/deal-analyzer" className="bg-white border-2 border-primary text-primary hover:bg-green-50 font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center">
                                            <Calculator className="mr-2 h-5 w-5" /> Analyze the Numbers
                                        </Link>
                                        <Link to="/applicant-signup" className="bg-primary text-white hover:bg-primary-dark font-bold py-4 px-6 rounded-xl transition-colors flex items-center justify-center shadow-lg shadow-primary/20">
                                            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </div>

                                    <button onClick={() => { setStep(1); setStrategy(null); setPropertyType(null); setFinancingNeed(null); }} className="mt-8 text-sm text-gray-400 hover:text-gray-600">Start over</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
