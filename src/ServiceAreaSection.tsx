import React from 'react';
import { SERVICE_DISTRICTS } from '../data/companyData';
import { MapPin, Navigation, Compass, CheckCircle2 } from 'lucide-react';

interface ServiceAreaSectionProps {
  onOpenApply: () => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onOpenApply }) => {
  return (
    <section id="service-area" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <MapPin className="w-4 h-4 text-[#C9A227]" />
            <span>Regional Presence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Our Primary Service Area
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Headquartered in Hazira, Gwalior, delivering localized assistance across six key districts of Madhya Pradesh.
          </p>
        </div>

        {/* 6 Districts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICE_DISTRICTS.map((item, index) => (
            <div
              key={item.district}
              className={`rounded-xl p-6 border transition-all duration-200 flex flex-col justify-between ${
                item.district === 'Gwalior'
                  ? 'bg-white border-[#0B2A4A] shadow-md ring-1 ring-[#0B2A4A]/20'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#0B2A4A]">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <h3 className="text-lg font-bold text-[#0B2A4A]">
                      {item.district}
                    </h3>
                  </div>

                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                    item.district === 'Gwalior' 
                      ? 'bg-[#0B2A4A] text-[#C9A227]' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.tag}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-500 mb-2 flex items-center gap-1">
                  <Navigation className="w-3 h-3 text-[#C9A227]" />
                  <span>Coverage: {item.headquarters}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>District 0{index + 1} of 06</span>
                <span className="text-[#0B2A4A] font-medium">Madhya Pradesh</span>
              </div>
            </div>
          ))}
        </div>

        {/* Map-Inspired Visual Layout Container */}
        <div className="bg-gradient-to-r from-[#0B2A4A] to-[#071E36] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2 max-w-2xl text-center md:text-left">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#C9A227] flex items-center justify-center md:justify-start gap-1.5">
              <Compass className="w-4 h-4 text-[#C9A227]" />
              <span>Central Office Connectivity</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">
              Accessible Physical Advisory in Hazira, Gwalior
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Applicants from Bhind, Morena, Datia, Guna, and Shivpuri can easily visit our central advisory office near Gumti Wale Hanuman Ji Temple, Ara Mill, Birla Nagar for direct in-person document consultation.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={onOpenApply}
              className="px-6 py-3 bg-[#C9A227] hover:bg-[#DFB73D] text-[#071E36] font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-xs text-center"
            >
              Enquire From Your District
            </button>
          </div>
        </div>

        {/* Clarity Note */}
        <p className="text-center text-[11px] text-slate-400 mt-6">
          * Service provision is subject to applicant eligibility, documentation completeness, and financial institution policy coverage within respective district boundaries.
        </p>

      </div>
    </section>
  );
};
