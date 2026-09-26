import React from 'react';
import { ShieldCheck, Landmark, CheckCircle2, FileCheck, Scale, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface TrustTransparencySectionProps {
  onOpenApply: () => void;
  onOpenWhatsApp: () => void;
}

export const TrustTransparencySection: React.FC<TrustTransparencySectionProps> = ({
  onOpenApply,
  onOpenWhatsApp
}) => {
  return (
    <section className="bg-[#0B2A4A] text-white py-16 md:py-24 relative overflow-hidden border-b border-[#071E36]">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Shield Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-[#C9A227]/40 flex items-center justify-center mx-auto mb-5 text-[#C9A227] shadow-lg">
            <ShieldCheck className="w-7 h-7" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] block mb-2">
            Trust & Regulatory Transparency
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Loan Service Provider / Loan Assistance Partner
          </h2>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-medium text-slate-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Independent Professional Partner · Not a Bank · Not an NBFC</span>
          </div>

          <div className="w-24 h-1 bg-[#C9A227] mx-auto rounded-full"></div>
        </div>

        {/* 3 Mandated Statements in Distinct High-Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] mb-4">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                1. Independent Lender Approval
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <strong>Final loan approval is decided by the concerned lender.</strong> We do not lend funds directly; all sanction decisions rest with the evaluating institution.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#C9A227] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Nationalized & Private Banks / NBFCs / HFCs</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                2. Lender Determined Terms
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <strong>Interest rate, tenure, eligibility, documentation and other loan terms are subject to lender policies.</strong> Terms are benchmarked to your credit profile.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#C9A227] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Transparent Terms · No Guaranteed Rates</span>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#C9A227]/20 border border-[#C9A227]/40 flex items-center justify-center text-[#C9A227] mb-4">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                3. Dedicated Customer Assistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                <strong>Shri Kanth Finance Service assists customers with the loan process and documentation.</strong> We help organize your paperwork and match you with suitable options.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#C9A227] font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>End-to-End Application Guidance</span>
            </div>
          </div>

        </div>

        {/* Institutional Network Pills */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-6 text-center max-w-4xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-wider text-[#C9A227] font-semibold mb-4">
            Institutional Lending Channels We Connect You With
          </div>
          <div className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 text-xs text-slate-300">
            {COMPANY_INFO.institutionsConnected.map((inst, index) => (
              <span key={index} className="bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A227]" />
                <span>{inst}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenApply}
            className="px-7 py-3.5 bg-[#C9A227] hover:bg-[#DFB73D] text-[#071E36] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md"
          >
            Start Loan Enquiry
          </button>
          <button
            onClick={onOpenWhatsApp}
            className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-lg transition-colors border border-white/20"
          >
            Speak With Our Advisors
          </button>
        </div>

      </div>
    </section>
  );
};
