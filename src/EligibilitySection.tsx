import React from 'react';
import { ELIGIBILITY_FACTORS } from '../data/companyData';
import { ShieldCheck, Info } from 'lucide-react';

export const EligibilitySection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Underwriting Criteria</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Loan Eligibility Factors
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Institutional lenders evaluate loan proposals across multi-dimensional risk parameters rather than a single formula.
          </p>
        </div>

        {/* 9 Eligibility Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {ELIGIBILITY_FACTORS.map((factor, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#0B2A4A]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-[#0B2A4A]">
                    {factor.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {factor.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Note */}
        <div className="bg-[#0B2A4A]/5 border-l-4 border-[#0B2A4A] p-5 rounded-r-xl max-w-4xl mx-auto flex items-start gap-4">
          <ShieldCheck className="w-5 h-5 text-[#0B2A4A] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span className="font-bold text-[#0B2A4A]">Guiding Principle: </span>
            Every application is assessed according to the applicable financial institution's policies and eligibility criteria. Shri Kanth Finance Service performs preliminary reviews to assist applicants in identifying institutions where their profile aligns with risk benchmarks.
          </div>
        </div>

      </div>
    </section>
  );
};
