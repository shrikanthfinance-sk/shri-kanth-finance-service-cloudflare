import React from 'react';
import { ArrowRight, MessageSquare, PhoneCall } from 'lucide-react';

interface CustomerJourneyCtaProps {
  onOpenApply: () => void;
  onOpenWhatsApp: () => void;
}

export const CustomerJourneyCta: React.FC<CustomerJourneyCtaProps> = ({
  onOpenApply,
  onOpenWhatsApp
}) => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#0B2A4A] via-[#071E36] to-[#041224] text-white relative overflow-hidden border-b border-[#041224]">
      {/* Background soft glow */}
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A227] uppercase tracking-wider mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
          <span>Prompt Assistance</span>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 font-serif">
          Have a Loan Requirement?
        </h2>

        {/* Text */}
        <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto mb-8 font-light">
          Talk to Shri Kanth Finance Service for guidance on your loan requirement and application process.
        </p>

        {/* 2 Mandated CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenApply}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A227] hover:bg-[#DFB73D] text-[#071E36] font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>APPLY NOW</span>
            <ArrowRight className="w-4 h-4 text-[#071E36]" />
          </button>

          <button
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>WHATSAPP US</span>
          </button>
        </div>

      </div>
    </section>
  );
};
