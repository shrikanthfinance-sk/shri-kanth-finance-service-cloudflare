import React from 'react';
import { WHY_CHOOSE_US_CARDS } from '../data/companyData';
import { 
  Compass, 
  Network, 
  Layers, 
  CheckCircle, 
  FileText, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenApply: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenApply }) => {
  const getFeatureIcon = (index: number) => {
    switch (index) {
      case 0: return <Compass className="w-5 h-5 text-[#C9A227]" />;
      case 1: return <Network className="w-5 h-5 text-[#C9A227]" />;
      case 2: return <Layers className="w-5 h-5 text-[#C9A227]" />;
      case 3: return <CheckCircle className="w-5 h-5 text-[#C9A227]" />;
      case 4: return <FileText className="w-5 h-5 text-[#C9A227]" />;
      case 5: return <MapPin className="w-5 h-5 text-[#C9A227]" />;
      default: return <CheckCircle className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <section id="why-choose-us" className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Value & Integrity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Why Choose Shri Kanth Finance Service?
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Dedicated loan guidance with local accessibility across the Gwalior and Chambal divisions.
          </p>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US_CARDS.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-[#0B2A4A]/30 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-lg bg-slate-50 group-hover:bg-[#0B2A4A] transition-colors flex items-center justify-center mb-5 border border-slate-100">
                  <span className="group-hover:text-white transition-colors">
                    {getFeatureIcon(index)}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#0B2A4A] group-hover:text-[#071E36] transition-colors mb-2">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 text-xs font-medium text-slate-400 flex items-center justify-between">
                <span>Advantage 0{index + 1}</span>
                <span className="text-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                  ✓
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
