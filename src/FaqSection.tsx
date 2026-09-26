import React, { useState } from 'react';
import { FAQS_LIST } from '../data/companyData';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  onOpenWhatsApp: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenWhatsApp }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <HelpCircle className="w-4 h-4 text-[#C9A227]" />
            <span>Clear Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            Understand how our loan assistance model works with transparency.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3.5 mb-12">
          {FAQS_LIST.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-[#0B2A4A] bg-slate-50/50 shadow-xs' 
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-[#0B2A4A] leading-snug">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'bg-[#0B2A4A] text-white rotate-180' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
          <h3 className="text-base font-bold text-[#0B2A4A] mb-1">
            Have a Specific Question About Your Profile?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-4 max-w-lg mx-auto">
            Our loan advisory team in Hazira, Gwalior is available to review your individual requirements and answer any doubts.
          </p>
          <button
            onClick={onOpenWhatsApp}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat Directly With Us on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
