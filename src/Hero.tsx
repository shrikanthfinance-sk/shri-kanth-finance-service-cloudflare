import React from 'react';
import { Shield, ArrowRight, MessageSquare, CheckCircle2, MapPin, IndianRupee } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface HeroProps {
  onOpenApply: () => void;
  onOpenWhatsApp: () => void;
  onNavigateToCalculator: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenApply,
  onOpenWhatsApp,
  onNavigateToCalculator,
  onExploreServices
}) => {
  return (
    <section className="relative bg-gradient-to-b from-slate-100 via-white to-slate-50 border-b border-slate-200 overflow-hidden">
      {/* Subtle geometric background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A227]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0B2A4A]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Trust statement & Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]"></span>
              <span>Trusted Loan Assistance Since 2023</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-600 font-medium normal-case">Gwalior, Madhya Pradesh</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-[#0B2A4A] tracking-tight leading-[1.15] mb-6">
              Loan Solutions Designed Around Your Financial Needs
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-6">
              Professional loan assistance for individuals, families, salaried professionals, self-employed applicants and business owners — with guidance throughout the loan application journey.
            </p>

            {/* Prominent Highlight Strip */}
            <div className="w-full sm:w-auto p-4 mb-8 bg-slate-50 border border-slate-200 rounded-xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0B2A4A] text-[#C9A227] flex items-center justify-center font-bold text-sm shrink-0">
                  ₹
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">Loan Assistance Range</div>
                  <div className="text-base sm:text-lg font-bold text-[#0B2A4A] font-mono tabular-nums">
                    ₹2 Lakh to ₹5 Crore
                  </div>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-slate-200 mx-2"></div>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Serving Gwalior, Bhind, Morena, Datia, Guna & Shivpuri</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-8">
              <button
                onClick={onOpenApply}
                className="w-full sm:w-auto px-7 py-3.5 bg-[#0B2A4A] hover:bg-[#071E36] text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 border border-[#0B2A4A]"
              >
                <span>APPLY NOW</span>
                <ArrowRight className="w-4 h-4 text-[#C9A227]" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WHATSAPP US</span>
              </button>

              <button
                onClick={onNavigateToCalculator}
                className="w-full sm:w-auto px-5 py-3.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <IndianRupee className="w-4 h-4 text-slate-500" />
                <span>Calculate EMI</span>
              </button>
            </div>

            {/* Sub-text clarification */}
            <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-200/80 pt-4 w-full">
              <Shield className="w-4 h-4 text-[#C9A227] shrink-0" />
              <span>
                <strong>Loan Service Provider / Loan Assistance Partner</strong> (Not a Bank, Not an NBFC) · Final loan approval, interest rate & terms are determined solely by the evaluating lender.
              </span>
            </div>

          </div>

          {/* Right Column: High Quality Visual Asset (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-16/11 sm:aspect-4/3">
                <img
                  src="/src/assets/images/hero_finance_consultation_1790429004759.jpg"
                  alt="Shri Kanth Finance Service professional loan consultation and document review"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Contrast scrim on bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/80 via-transparent to-transparent"></div>

                {/* Overlaid caption card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-slate-200 shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-xs font-bold text-[#0B2A4A] tracking-tight">
                        Personalized Consultation
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Helping you organize paperwork for institutional review
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#C9A227] font-bold text-xs shrink-0">
                      ✓
                    </div>
                  </div>
                </div>
              </div>

              {/* Accent Floating Badge: Since 2023 */}
              <div className="absolute -top-4 -left-4 bg-[#0B2A4A] text-white px-3.5 py-2 rounded-lg border-2 border-white shadow-lg hidden sm:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse"></span>
                <span className="text-xs font-semibold">Gwalior Division Network</span>
              </div>

              {/* Accent Floating Badge: 8 Categories */}
              <div className="absolute -bottom-4 -right-2 bg-white text-slate-800 px-4 py-2.5 rounded-lg border border-slate-200 shadow-xl hidden sm:flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="text-xs font-medium">
                  <span className="font-bold text-[#0B2A4A]">8 Loan Categories</span> Covered
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
