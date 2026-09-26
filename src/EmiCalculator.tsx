import React, { useState } from 'react';
import { IndianRupee, Calculator, ArrowRight, Info, CheckCircle2 } from 'lucide-react';

interface EmiCalculatorProps {
  onApplyWithAmount: (amount: string, loanType: string) => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({ onApplyWithAmount }) => {
  // Amount in Rupees (default: 25 Lakh)
  const [loanAmount, setLoanAmount] = useState<number>(2500000);
  // Tenure in Years (default: 15 years)
  const [tenureYears, setTenureYears] = useState<number>(15);
  // Interest rate in % (default: 8.75%)
  const [interestRate, setInterestRate] = useState<number>(8.75);
  // Selected category for enquiry
  const [selectedLoanType, setSelectedLoanType] = useState<string>('Home Loan');

  // EMI formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalAmount = emi * totalMonths;
  const totalInterest = totalAmount - loanAmount;

  const formatIndianCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  const getAmountInWords = (num: number) => {
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(2)} Crore`;
    }
    return `${(num / 100000).toFixed(1)} Lakh`;
  };

  return (
    <section id="calculator" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <Calculator className="w-4 h-4 text-[#C9A227]" />
            <span>Financial Planning Tool</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Indicative Loan EMI Estimator
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Estimate your monthly outflow and overall interest across loan amounts from ₹2 Lakh to ₹5 Crore.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 space-y-8">
            
            {/* Loan Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Loan Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Home Loan', 'Loan Against Property', 'Business Loan', 'Personal Loan'].map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedLoanType(type);
                      if (type === 'Home Loan') setInterestRate(8.75);
                      if (type === 'Loan Against Property') setInterestRate(9.5);
                      if (type === 'Business Loan') setInterestRate(12.5);
                      if (type === 'Personal Loan') setInterestRate(11.5);
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all truncate ${
                      selectedLoanType === type
                        ? 'bg-[#0B2A4A] text-white border-[#0B2A4A] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Loan Amount */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Required Loan Amount</span>
                <span className="text-base sm:text-lg font-bold font-mono text-[#0B2A4A] bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  {formatIndianCurrency(loanAmount)} <span className="text-xs text-[#C9A227]">({getAmountInWords(loanAmount)})</span>
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="50000000"
                step="100000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B2A4A]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>₹2 Lakh</span>
                <span>₹50 Lakh</span>
                <span>₹1.5 Crore</span>
                <span>₹5 Crore</span>
              </div>
            </div>

            {/* Slider 2: Tenure */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Tenure (Years)</span>
                <span className="text-base sm:text-lg font-bold font-mono text-[#0B2A4A] bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  {tenureYears} Years <span className="text-xs text-slate-500">({totalMonths} Months)</span>
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B2A4A]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>1 Year</span>
                <span>5 Years</span>
                <span>15 Years</span>
                <span>30 Years</span>
              </div>
            </div>

            {/* Slider 3: Indicative Interest Rate */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-700">Indicative Interest Rate (p.a.)</span>
                </div>
                <span className="text-base sm:text-lg font-bold font-mono text-[#0B2A4A] bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min="7.5"
                max="24.0"
                step="0.25"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0B2A4A]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>7.5%</span>
                <span>10.0%</span>
                <span>15.0%</span>
                <span>24.0%</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Note: Interest rates and sanction terms are set independently by evaluating banks/NBFCs based on applicant profile, CIBIL score, and institutional policies.
              </span>
            </div>

          </div>

          {/* Result Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B2A4A] to-[#071E36] text-white p-6 sm:p-8 md:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-700">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A227] block mb-2">
                Estimated Monthly Outflow
              </span>
              
              {/* Monthly EMI Large Stat */}
              <div className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight mb-6">
                {formatIndianCurrency(emi)}
                <span className="text-sm font-sans font-normal text-slate-300 ml-1.5">/ month</span>
              </div>

              {/* Breakdown Cards */}
              <div className="space-y-3 mb-8">
                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Principal Loan Amount</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {formatIndianCurrency(loanAmount)}
                  </span>
                </div>

                <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-slate-300">Estimated Total Interest</span>
                  <span className="text-sm font-bold font-mono text-[#C9A227]">
                    {formatIndianCurrency(totalInterest)}
                  </span>
                </div>

                <div className="p-3.5 bg-white/10 rounded-xl border border-white/15 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Total Amount Payable</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {formatIndianCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Progress bar breakdown */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                  <span>Principal: {Math.round((loanAmount / totalAmount) * 100)}%</span>
                  <span>Interest: {Math.round((totalInterest / totalAmount) * 100)}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/20 rounded-full overflow-hidden flex">
                  <div 
                    className="bg-[#C9A227] h-full"
                    style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                  />
                  <div 
                    className="bg-sky-400 h-full"
                    style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="space-y-3">
              <button
                onClick={() => onApplyWithAmount(formatIndianCurrency(loanAmount), selectedLoanType)}
                className="w-full py-3.5 px-4 bg-[#C9A227] hover:bg-[#DFB73D] text-[#071E36] font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Enquire for {getAmountInWords(loanAmount)}</span>
                <ArrowRight className="w-4 h-4 text-[#071E36]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero service application charges for consultation</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
