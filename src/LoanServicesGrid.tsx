import React from 'react';
import { LOAN_SERVICES, LoanServiceData } from '../data/companyData';
import { 
  Home, 
  Building2, 
  Landmark, 
  Briefcase, 
  RefreshCw, 
  ShieldCheck, 
  GraduationCap, 
  Car, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { LeadSource } from '../types/lead';

interface LoanServicesGridProps {
  onSelectService: (serviceId: string) => void;
  onOpenApply: (serviceId?: string, amount?: string, source?: LeadSource) => void;
}

export const LoanServicesGrid: React.FC<LoanServicesGridProps> = ({
  onSelectService,
  onOpenApply
}) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'home-loan':
        return <Home className="w-6 h-6 text-[#0B2A4A]" />;
      case 'construction-loan':
        return <Building2 className="w-6 h-6 text-[#0B2A4A]" />;
      case 'loan-against-property':
        return <Landmark className="w-6 h-6 text-[#0B2A4A]" />;
      case 'business-loan':
        return <Briefcase className="w-6 h-6 text-[#0B2A4A]" />;
      case 'balance-transfer':
        return <RefreshCw className="w-6 h-6 text-[#0B2A4A]" />;
      case 'personal-loan':
        return <ShieldCheck className="w-6 h-6 text-[#0B2A4A]" />;
      case 'education-loan':
        return <GraduationCap className="w-6 h-6 text-[#0B2A4A]" />;
      case 'vehicle-loan':
        return <Car className="w-6 h-6 text-[#0B2A4A]" />;
      default:
        return <Briefcase className="w-6 h-6 text-[#0B2A4A]" />;
    }
  };

  return (
    <section id="loan-services" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Comprehensive Portfolio</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Our Loan Solutions
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Explore financing solutions based on your personal, property, education and business requirements.
          </p>
        </div>

        {/* 8 Loan Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOAN_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-xl border border-slate-200 hover:border-[#0B2A4A]/40 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6">
                
                {/* Header row: Number and Icon */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-[#C9A227]/10 border border-slate-100 group-hover:border-[#C9A227]/30 flex items-center justify-center transition-colors">
                    {getIcon(srv.id)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#C9A227] transition-colors">
                    {srv.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#0B2A4A] group-hover:text-[#071E36] transition-colors mb-2.5">
                  {srv.title}
                </h3>

                {/* Special highlight note if applicable */}
                {srv.highlightLimit && (
                  <div className="text-xs font-semibold text-[#C9A227] mb-2.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C9A227]" />
                    <span>{srv.highlightLimit}</span>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {srv.shortDesc}
                </p>
              </div>

              {/* Action footer */}
              <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onSelectService(srv.id)}
                  className="text-xs font-bold text-[#0B2A4A] hover:text-[#C9A227] flex items-center gap-1.5 transition-colors group-hover:translate-x-0.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenApply(srv.title, undefined, `Website – ${srv.title}` as LeadSource)}
                  className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider"
                >
                  Apply &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center text-xs text-slate-500">
          <p>
            * All loan sanctions, interest rates, and loan limits are subject to the assessment, documentation checks, and lending policies of the respective financial institutions.
          </p>
        </div>

      </div>
    </section>
  );
};
