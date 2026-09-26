import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../data/companyData';
import { ArrowRight, FileCheck, Send, ShieldAlert, Sparkles, UserPlus } from 'lucide-react';

interface HowItWorksProps {
  onOpenApply: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenApply }) => {
  const getStepIcon = (index: number) => {
    switch (index) {
      case 0: return <UserPlus className="w-5 h-5 text-[#0B2A4A]" />;
      case 1: return <FileCheck className="w-5 h-5 text-[#0B2A4A]" />;
      case 2: return <Send className="w-5 h-5 text-[#0B2A4A]" />;
      case 3: return <Sparkles className="w-5 h-5 text-[#0B2A4A]" />;
      default: return <FileCheck className="w-5 h-5 text-[#0B2A4A]" />;
    }
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Structured Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            A Simpler Way to Navigate Your Loan Journey
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            From initial consultation to institutional routing, we guide you through every milestone.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <div
              key={step.step}
              className="relative bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-[#0B2A4A]/40 hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <div>
                {/* Step header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                    {getStepIcon(index)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#C9A227] bg-[#C9A227]/10 px-2 py-0.5 rounded">
                    Step {step.step}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {step.subtitle}
                </div>

                <h3 className="text-base font-bold text-[#0B2A4A] mb-2.5">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-400">
                <span>Phase 0{index + 1} of 04</span>
                {index < 3 && <span className="hidden lg:inline text-slate-300">&rarr;</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Institutional Note */}
        <div className="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Loan approval is subject to the policies, eligibility criteria and assessment of the respective financial institution.
            </p>
          </div>

          <button
            onClick={onOpenApply}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0B2A4A] hover:bg-[#071E36] text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>Start Step 01 Today</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
          </button>
        </div>

      </div>
    </section>
  );
};
