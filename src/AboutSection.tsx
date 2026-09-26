import React from 'react';
import { Calendar, Building, Landmark, MapPin, Users, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface AboutSectionProps {
  onLearnMore: () => void;
  onOpenApply: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore, onOpenApply }) => {
  const companyFacts = [
    {
      label: "Established",
      value: "17 February 2023",
      icon: <Calendar className="w-5 h-5 text-[#C9A227]" />
    },
    {
      label: "Business",
      value: "Loan Service Provider",
      icon: <Building className="w-5 h-5 text-[#C9A227]" />
    },
    {
      label: "Loan Assistance",
      value: "₹2 Lakh – ₹5 Crore",
      icon: <Landmark className="w-5 h-5 text-[#C9A227]" />
    },
    {
      label: "Head Office",
      value: "Hazira, Gwalior, Madhya Pradesh",
      icon: <MapPin className="w-5 h-5 text-[#C9A227]" />
    },
    {
      label: "Service Area",
      value: "Gwalior, Bhind, Morena, Datia, Guna & Shivpuri",
      icon: <Award className="w-5 h-5 text-[#C9A227]" />
    },
    {
      label: "Leadership & Owners",
      value: "Deependra Singh Rajawat & Anuj Singh Rajawat",
      icon: <Users className="w-5 h-5 text-[#C9A227]" />
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Company Profile</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            About Shri Kanth Finance Service
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mt-3 mb-6"></div>
          
          <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
            <p>
              Shri Kanth Finance Service is a professional loan service provider based in Gwalior, Madhya Pradesh, helping customers navigate the loan application process and connect with suitable financial institutions.
            </p>
            <p>
              Our role is to simplify the journey from understanding a customer's requirement and preparing the necessary documentation to submitting the application with the appropriate financial institution.
            </p>
            <p>
              We assist customers across multiple loan categories and serve customers across Gwalior, Bhind, Morena, Datia, Guna and Shivpuri.
            </p>
          </div>
        </div>

        {/* Company Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {companyFacts.map((fact, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-[#C9A227]/50 hover:bg-white transition-all duration-200 shadow-xs group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 group-hover:border-[#C9A227]/40 flex items-center justify-center shrink-0 shadow-xs">
                  {fact.icon}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
                    {fact.label}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#0B2A4A] leading-snug">
                    {fact.value}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Positioning Statement */}
        <div className="bg-[#0B2A4A]/5 border-l-4 border-[#0B2A4A] p-5 rounded-r-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#0B2A4A] shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-[#0B2A4A]">Loan Service Provider / Loan Assistance Partner</div>
              <p className="text-xs text-slate-600 mt-0.5">
                Shri Kanth Finance Service assists customers with the loan process and documentation. We are not a bank and not an NBFC. Final loan approval, interest rate, tenure, and documentation terms are determined solely by the evaluating lending institution based on its assessment.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onLearnMore}
              className="px-4 py-2 text-xs font-semibold text-[#0B2A4A] hover:text-[#071E36] hover:bg-slate-200/50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span>Read Full Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenApply}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0B2A4A] hover:bg-[#071E36] rounded-lg transition-colors shadow-xs"
            >
              Apply Now
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
