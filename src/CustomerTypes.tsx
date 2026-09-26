import React from 'react';
import { CUSTOMER_TYPES } from '../data/companyData';
import { User, Briefcase, Building, Home, GraduationCap, Award } from 'lucide-react';

interface CustomerTypesProps {
  onOpenApply: () => void;
}

export const CustomerTypes: React.FC<CustomerTypesProps> = ({ onOpenApply }) => {
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <User className="w-5 h-5 text-[#0B2A4A]" />;
      case 1: return <Briefcase className="w-5 h-5 text-[#0B2A4A]" />;
      case 2: return <Building className="w-5 h-5 text-[#0B2A4A]" />;
      case 3: return <Home className="w-5 h-5 text-[#0B2A4A]" />;
      case 4: return <Award className="w-5 h-5 text-[#0B2A4A]" />;
      case 5: return <GraduationCap className="w-5 h-5 text-[#0B2A4A]" />;
      default: return <User className="w-5 h-5 text-[#0B2A4A]" />;
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Applicant Profiles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Who We Assist
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Tailored assistance based on distinct income profiles, employment categories, and financial backgrounds.
          </p>
        </div>

        {/* Customer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CUSTOMER_TYPES.map((type, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:border-[#0B2A4A]/30 hover:bg-white hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-xs">
                  {getIcon(index)}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#0B2A4A] mb-2">
                  {type.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  {type.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Representative Profiles:
                </span>
                <span className="text-xs text-slate-500 italic">
                  {type.examples}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Small Notice */}
        <div className="mt-8 text-center text-xs text-slate-500">
          <span>* All applicants must satisfy the minimum income, credit profile, and compliance guidelines established by evaluating financial institutions.</span>
        </div>

      </div>
    </section>
  );
};
