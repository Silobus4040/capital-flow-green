import React, { useState, useRef } from 'react';
import { FileText, Download, Building, CheckCircle, Mail, MapPin } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function TermSheetGenerator() {
    const previewRef = useRef<HTMLDivElement>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    // Form State
    const [date, setDate] = useState(new Date().toLocaleDateString('en-US'));
    const [borrowerName, setBorrowerName] = useState('John Doe');
    const [entityName, setEntityName] = useState('JD Investments LLC');
    const [propertyAddress, setPropertyAddress] = useState('123 Main St, Gulfport, MS 39501');
    const [loanProgram, setLoanProgram] = useState('Commercial Property Acquisition / DSCR');
    const [purchasePrice, setPurchasePrice] = useState('500,000');
    const [loanAmount, setLoanAmount] = useState('400,000');
    const [interestRate, setInterestRate] = useState('6.99%');
    const [loanTerm, setLoanTerm] = useState('30 Years (360 Months)');
    const [amortization, setAmortization] = useState('30 Years');
    const [originationFee, setOriginationFee] = useState('2.00%');
    const [prepaymentPenalty, setPrepaymentPenalty] = useState('3-2-1 (3% Year 1, 2% Year 2, 1% Year 3)');
    const [recourse, setRecourse] = useState('Non-Recourse (Standard Bad Boy Carveouts)');

    const generatePDF = async () => {
        if (!previewRef.current) return;
        setIsGenerating(true);

        try {
            // Temporarily remove max-height and overflow for full rendering
            const originalStyle = previewRef.current.style.cssText;
            previewRef.current.style.height = 'auto';
            previewRef.current.style.maxHeight = 'none';
            previewRef.current.style.overflow = 'visible';

            const canvas = await html2canvas(previewRef.current, {
                scale: 2, // higher resolution
                useCORS: true,
                logging: false
            });

            // Restore original styles
            previewRef.current.style.cssText = originalStyle;

            const imgData = canvas.toDataURL('image/jpeg', 1.0);

            // Calculate PDF dimensions (A4 portrait)
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'in',
                format: 'letter'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Term_Sheet_${entityName.replace(/\\s+/g, '_')}.pdf`);

        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Check console for details.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                        <FileText className="h-8 w-8 mr-3 text-primary" />
                        Admin: Term Sheet Generator
                    </h1>
                    <button
                        onClick={generatePDF}
                        disabled={isGenerating}
                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-lg font-bold flex items-center transition-colors shadow-md disabled:opacity-50"
                    >
                        {isGenerating ? 'Generating...' : <><Download className="h-5 w-5 mr-2" /> Download PDF</>}
                    </button>
                </div>

                <div className="grid lg:grid-cols-12 gap-6 h-[80vh]">
                    {/* Controls / Inputs Pane */}
                    <div className="lg:col-span-4 bg-white rounded-xl shadow-md border border-gray-200 p-6 overflow-y-auto max-h-full">
                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Deal Parameters</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Date</label>
                                <input type="text" value={date} onChange={e => setDate(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Borrower Name</label>
                                <input type="text" value={borrowerName} onChange={e => setBorrowerName(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Borrowing Entity</label>
                                <input type="text" value={entityName} onChange={e => setEntityName(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Property Address</label>
                                <input type="text" value={propertyAddress} onChange={e => setPropertyAddress(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>

                            <div className="pt-4 border-t">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Loan Program</label>
                                <input type="text" value={loanProgram} onChange={e => setLoanProgram(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Purchase Price</label>
                                    <input type="text" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Loan Amount</label>
                                    <input type="text" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Interest Rate</label>
                                    <input type="text" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Origination Fee</label>
                                    <input type="text" value={originationFee} onChange={e => setOriginationFee(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Loan Term</label>
                                <input type="text" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Amortization</label>
                                <input type="text" value={amortization} onChange={e => setAmortization(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Prepay Penalty</label>
                                <input type="text" value={prepaymentPenalty} onChange={e => setPrepaymentPenalty(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Recourse</label>
                                <input type="text" value={recourse} onChange={e => setRecourse(e.target.value)} className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>
                        </div>

                        <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-md text-sm border border-blue-100 flex items-start">
                            <span className="mr-2 mt-0.5">ℹ️</span>
                            <p>Edits made here update the preview in real-time. When finished, hit Download PDF to generate the high-res client copy.</p>
                        </div>
                    </div>

                    {/* Live Preview Pane */}
                    <div className="lg:col-span-8 bg-gray-200 rounded-xl p-8 overflow-y-auto max-h-full flex justify-center items-start shadow-inner">

                        {/* The Document Outline (A4 Proportions) */}
                        <div
                            ref={previewRef}
                            className="bg-white shadow-2xl w-full max-w-[816px] min-h-[1056px] relative flex flex-col pt-12 pb-16 px-14 mx-auto font-serif"
                            style={{ letterSpacing: '0.01em' }}
                        >

                            {/* Header */}
                            <div className="flex justify-between items-start border-b-2 border-primary pb-6 mb-8 mt-4">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-primary mb-1 uppercase tracking-wider font-sans">INDICATIVE TERM SHEET</h1>
                                    <p className="text-gray-500 text-sm font-sans tracking-widest">{date}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg text-gray-800 font-sans tracking-tight">CCIF, INC.</div>
                                    <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed mt-1">Commercial Capital & Investment Finance</p>
                                </div>
                            </div>

                            {/* Intro Text */}
                            <p className="text-[15px] leading-relaxed mb-6 text-gray-800 text-justify">
                                <strong>Commercial Capital & Investment Finance, Inc. ("Lender")</strong> is pleased to provide this indicative term sheet to
                                <strong> {borrowerName} / {entityName} ("Borrower")</strong> outlining the proposed financing parameters for the property
                                located at <strong>{propertyAddress}</strong>. This term sheet is for discussion purposes only and does not constitute a commitment to lend.
                            </p>

                            {/* Terms Table */}
                            <div className="flex-grow mb-8 font-sans">
                                <table className="w-full text-[14px] border-collapse">
                                    <tbody>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-3 pr-4 font-bold text-gray-700 w-1/3 align-top">Lender:</td>
                                            <td className="py-3 text-gray-800 font-medium">Commercial Capital & Investment Finance, Inc. or its assigns.</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Borrower:</td>
                                            <td className="py-4 text-gray-800 font-medium">{entityName} (a single-purpose entity to be formed or currently existing).</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Guarantor(s):</td>
                                            <td className="py-4 text-gray-800 font-medium">{borrowerName} (and any individuals/entities holding 20%+ ownership).</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Property (Collateral):</td>
                                            <td className="py-4 text-gray-800 font-medium">First priority mortgage lien on {propertyAddress}.</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Loan Program:</td>
                                            <td className="py-4 text-gray-800 font-medium">{loanProgram}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 bg-green-50/30">
                                            <td className="py-4 pr-4 pl-2 font-bold text-primary align-top">Purchase Price:</td>
                                            <td className="py-4 text-gray-800 font-bold">${purchasePrice}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 bg-green-50/50">
                                            <td className="py-4 pr-4 pl-2 font-bold text-primary align-top">Proposed Loan Amount:</td>
                                            <td className="py-4 text-gray-900 font-extrabold text-lg">${loanAmount}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Interest Rate:</td>
                                            <td className="py-4 text-gray-800 font-bold">{interestRate}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Loan Term:</td>
                                            <td className="py-4 text-gray-800 font-medium">{loanTerm}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Amortization:</td>
                                            <td className="py-4 text-gray-800 font-medium">{amortization}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Origination Fee:</td>
                                            <td className="py-4 text-gray-800 font-medium">{originationFee} of the Loan Amount, payable at closing.</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Prepayment Penalty:</td>
                                            <td className="py-4 text-gray-800 font-medium">{prepaymentPenalty}</td>
                                        </tr>
                                        <tr className="border-b border-gray-200">
                                            <td className="py-4 pr-4 font-bold text-gray-700 align-top">Recourse:</td>
                                            <td className="py-4 text-gray-800 font-medium">{recourse}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Disclaimers & Signatures */}
                            <div className="mt-auto">
                                <p className="text-[11px] text-gray-500 leading-snug mb-8 text-justify font-sans">
                                    <strong>CONFIDENTIALITY & DISCLAIMER:</strong> This is an indicative outline of financing terms designed for discussion purposes only and does not represent a commitment to lend. Final approval is subject to customary due diligence, including but not limited to formal underwriting, satisfactory appraisal, clear title, legal review, and final committee approval. Rates and terms are subject to change based on market conditions prior to closing.
                                </p>

                                <div className="grid grid-cols-2 gap-12 font-sans">
                                    <div>
                                        <div className="border-b border-gray-400 h-10 mb-2"></div>
                                        <p className="text-sm font-bold text-gray-800">Acknowledged by Borrower</p>
                                        <p className="text-xs text-gray-500 mt-1">Name: {borrowerName}</p>
                                        <p className="text-xs text-gray-500">Date: ________________________</p>
                                    </div>
                                    <div>
                                        <div className="border-b border-gray-400 h-10 mb-2 relative">
                                            <span className="absolute bottom-1 left-0 font-cursive text-primary text-xl" style={{ fontFamily: 'cursive' }}>CCIF Underwriting</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-800">Presented by CCIF, Inc.</p>
                                        <p className="text-xs text-gray-500 mt-1">Commercial Capital & Investment Finance</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer text of PDF */}
                            <div className="absolute bottom-6 left-14 right-14 text-center border-t pt-4 mt-8 flex justify-between text-xs text-gray-400 font-sans">
                                <span>CCIF, Inc. Confidential</span>
                                <span>Page 1 of 1</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
