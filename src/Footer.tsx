import React from 'react';
import { COMPANY_INFO, LOAN_SERVICES } from '../data/companyData';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  ShieldCheck, 
  ArrowUp,
  Landmark
} from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenApply: () => void;
  onOpenWhatsApp: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenApply,
  onOpenWhatsApp,
  onOpenAdmin
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#071E36] text-white border-t border-slate-800">
      
      {/* Upper Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Introduction (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0B2A4A] border border-[#C9A227]/40 text-[#C9A227] font-bold text-lg flex items-center justify-center">
                SK
              </div>
              <div>
                <h3 className="text-lg font-bold font-serif uppercase tracking-tight text-white">
                  Shri Kanth Finance Service
                </h3>
                <p className="text-xs text-[#C9A227] font-medium tracking-wide">
                  Your Trusted Loan Assistant Partner
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Professional loan service provider assisting eligible applicants across Gwalior, Bhind, Morena, Datia, Guna, and Shivpuri with structured loan application guidance from ₹2 Lakh to ₹5 Crore.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-300">Established:</strong> 17 February 2023</div>
              <div><strong className="text-slate-300">Owners:</strong> Deependra Singh Rajawat & Anuj Singh Rajawat</div>
              <div><strong className="text-slate-300">Business Model:</strong> Loan Service Provider (Not a Bank, Not an NBFC)</div>
            </div>
          </div>

          {/* Column 1: Company (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => { onNavigate('about'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('why-choose-us'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('how-it-works'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('contact'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('service-area'); scrollToTop(); }}
                  className="hover:text-white transition-colors"
                >
                  Our Service Area
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Loan Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">
              Loan Services
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 text-xs text-slate-300">
              {LOAN_SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => { onNavigate(`service-${srv.id}`, srv.id); scrollToTop(); }}
                  className="text-left hover:text-white hover:translate-x-0.5 transition-all truncate"
                >
                  {srv.title}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Office & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#C9A227]">
              Office & Support
            </h4>
            <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Shri Kanth Finance Service</div>
                  <div>Near Gumti Wale Hanuman Ji Temple, Ara Mill, Birla Nagar</div>
                  <div>Hazira, Gwalior, Madhya Pradesh – 474003</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                <a href="tel:+918516976768" className="hover:text-[#C9A227] font-mono">
                  +91 8516976768
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
                <a href="mailto:shrikanthfinance@gmail.com" className="hover:text-[#C9A227] truncate">
                  shrikanthfinance@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <button onClick={onOpenWhatsApp} className="hover:text-emerald-400">
                  WhatsApp: +91 8516976768
                </button>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C9A227] shrink-0" />
                <span>Mon–Sat: 10:00 AM – 7:30 PM</span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={onOpenApply}
                  className="px-3.5 py-2 bg-[#C9A227] text-[#071E36] font-bold rounded-lg text-xs uppercase tracking-wider hover:bg-[#DFB73D] transition-colors"
                >
                  Apply Now
                </button>
                <button
                  onClick={scrollToTop}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                  aria-label="Scroll to top"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Statutory Disclosure Strip (Section 27) */}
      <div className="bg-[#041224] border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-[#C9A227] block mb-2 uppercase tracking-wider text-[11px]">
              Important Statutory Disclosure & Transparency Policy
            </span>
            <p className="mb-3">
              Shri Kanth Finance Service is a professional Loan Service Provider and Loan Assistance Partner, not a bank and not an NBFC. We facilitate loan application assistance and connect eligible applicants with nationalized banks, private banks, NBFCs, and housing finance companies.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-white/10 text-[11px] text-slate-300">
              <div className="flex items-start gap-1.5">
                <span className="text-[#C9A227] font-bold">•</span>
                <span>Final loan approval is decided by the concerned lender.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[#C9A227] font-bold">•</span>
                <span>Interest rate, tenure, eligibility, documentation and other loan terms are subject to lender policies.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-[#C9A227] font-bold">•</span>
                <span>Shri Kanth Finance Service assists customers with the loan process and documentation.</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span>© {new Date().getFullYear()} Shri Kanth Finance Service. All Rights Reserved.</span>
              {onOpenAdmin && (
                <>
                  <span className="text-slate-600">·</span>
                  <button
                    onClick={onOpenAdmin}
                    className="text-slate-500 hover:text-slate-300 transition-colors flex items-center gap-1"
                  >
                    <span>Staff Portal</span>
                  </button>
                </>
              )}
            </div>
            <div className="font-medium text-[#C9A227]">
              Your Trusted Loan Assistant Partner · Gwalior, Madhya Pradesh
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};
