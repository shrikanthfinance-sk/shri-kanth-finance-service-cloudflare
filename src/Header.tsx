import React, { useState, useEffect, useRef } from 'react';
import { LOAN_SERVICES, COMPANY_INFO } from '../data/companyData';
import { 
  ChevronDown, 
  Menu, 
  X, 
  Phone, 
  MessageSquare, 
  Home, 
  Building2, 
  Briefcase, 
  GraduationCap, 
  Car, 
  RefreshCw, 
  Landmark, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { LeadSource } from '../types/lead';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenApply: (preselectedService?: string, amount?: string, source?: LeadSource) => void;
  onOpenWhatsApp: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onOpenApply,
  onOpenWhatsApp
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'home-loan': return <Home className="w-4 h-4 text-[#C9A227]" />;
      case 'construction-loan': return <Building2 className="w-4 h-4 text-[#C9A227]" />;
      case 'loan-against-property': return <Landmark className="w-4 h-4 text-[#C9A227]" />;
      case 'business-loan': return <Briefcase className="w-4 h-4 text-[#C9A227]" />;
      case 'balance-transfer': return <RefreshCw className="w-4 h-4 text-[#C9A227]" />;
      case 'personal-loan': return <ShieldCheck className="w-4 h-4 text-[#C9A227]" />;
      case 'education-loan': return <GraduationCap className="w-4 h-4 text-[#C9A227]" />;
      case 'vehicle-loan': return <Car className="w-4 h-4 text-[#C9A227]" />;
      default: return <Briefcase className="w-4 h-4 text-[#C9A227]" />;
    }
  };

  return (
    <>
      {/* Top Institutional Notification Bar */}
      <div className="bg-[#071E36] text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Loan Assistance Partner · Serving Gwalior, Bhind, Morena, Datia, Guna & Shivpuri</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a 
              href="tel:+918516976768" 
              className="flex items-center gap-1.5 hover:text-[#C9A227] transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A227]" />
              <span>+91 8516976768</span>
            </a>
            <span className="text-slate-600 hidden md:inline">|</span>
            <a
              href="mailto:shrikanthfinance@gmail.com"
              className="hidden md:inline hover:text-[#C9A227] transition-colors"
            >
              shrikanthfinance@gmail.com
            </a>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 hidden lg:inline">Mon–Sat: 10 AM – 7:30 PM</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-3' 
            : 'bg-white border-b border-slate-200 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Zone 1: Single text element wordmark */}
            <button
              onClick={() => {
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-md bg-[#0B2A4A] flex items-center justify-center text-[#C9A227] font-bold text-lg border border-[#C9A227]/30 shadow-sm shrink-0">
                SK
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight text-[#0B2A4A] group-hover:text-[#071E36] transition-colors leading-tight font-serif uppercase">
                  Shri Kanth Finance Service
                </span>
                <span className="text-[11px] font-medium tracking-wide text-slate-500">
                  Your Trusted Loan Assistant Partner
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <button
                onClick={() => {
                  onNavigate('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-sm font-medium transition-colors hover:text-[#0B2A4A] relative py-1 ${
                  currentView === 'home' ? 'text-[#0B2A4A] font-semibold' : 'text-slate-600'
                }`}
              >
                Home
                {currentView === 'home' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
                )}
              </button>

              <button
                onClick={() => onNavigate('about')}
                className={`text-sm font-medium transition-colors hover:text-[#0B2A4A] relative py-1 ${
                  currentView === 'about' ? 'text-[#0B2A4A] font-semibold' : 'text-slate-600'
                }`}
              >
                About Us
                {currentView === 'about' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
                )}
              </button>

              {/* Loan Services Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#0B2A4A] relative py-1 ${
                    currentView.startsWith('service-') ? 'text-[#0B2A4A] font-semibold' : 'text-slate-600'
                  }`}
                >
                  <span>Loan Services</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-[#C9A227]' : ''}`} />
                  {currentView.startsWith('service-') && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
                  )}
                </button>

                {servicesDropdownOpen && (
                  <div
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[540px] bg-white rounded-xl shadow-xl border border-slate-200 p-4 grid grid-cols-2 gap-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="col-span-2 pb-2 mb-1 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span className="font-semibold text-slate-800">Our Loan Solutions (₹2L – ₹5Cr)</span>
                      <span>Assistance Across 8 Categories</span>
                    </div>

                    {LOAN_SERVICES.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => {
                          onNavigate(`service-${srv.id}`, srv.id);
                          setServicesDropdownOpen(false);
                        }}
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 text-left transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-slate-100 group-hover:bg-[#0B2A4A]/10 transition-colors shrink-0 mt-0.5">
                          {getServiceIcon(srv.id)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800 group-hover:text-[#0B2A4A] flex items-center gap-1">
                            <span>{srv.title}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#C9A227]" />
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {srv.number === '02' ? 'Up to ₹2 Crore' : srv.number === '04' ? 'Up to ₹25 Lakh' : 'Personal & Commercial'}
                          </p>
                        </div>
                      </button>
                    ))}

                    <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-1">
                      <span>Need quick personalized guidance?</span>
                      <button
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onOpenApply(undefined, undefined, 'Website – Apply Now');
                        }}
                        className="text-[#0B2A4A] font-semibold hover:text-[#C9A227] flex items-center gap-1"
                      >
                        Start Enquiry &rarr;
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => onNavigate('how-it-works')}
                className={`text-sm font-medium transition-colors hover:text-[#0B2A4A] relative py-1 ${
                  currentView === 'how-it-works' ? 'text-[#0B2A4A] font-semibold' : 'text-slate-600'
                }`}
              >
                How It Works
                {currentView === 'how-it-works' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
                )}
              </button>

              <button
                onClick={() => onNavigate('why-choose-us')}
                className={`text-sm font-medium transition-colors hover:text-[#0B2A4A] relative py-1 ${
                  currentView === 'why-choose-us' ? 'text-[#0B2A4A] font-semibold' : 'text-slate-600'
                }`}
              >
                Why Choose Us
                {currentView === 'why-choose-us' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
                )}
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`text-sm font-medium transition-colors hover:text-[#0B2A4A] relative py-1 ${
                  currentView === 'contact' ? 'text-[#0B2A4A] font-semibold' : 'text-slate-600'
                }`}
              >
                Contact Us
                {currentView === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A227]" />
                )}
              </button>
            </nav>

            {/* Zone 3: 2 Primary Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenWhatsApp}
                className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                <span>WHATSAPP US</span>
              </button>

              <button
                onClick={() => onOpenApply(undefined, undefined, 'Website – Apply Now')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B2A4A] hover:bg-[#071E36] rounded-lg transition-colors border border-[#0B2A4A] shadow-sm flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
                <span>APPLY NOW</span>
              </button>
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenWhatsApp}
                className="p-2 text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200"
                aria-label="WhatsApp Us"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-600" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-slate-900 bg-slate-100 rounded-lg"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1 mb-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                  currentView === 'home' ? 'bg-[#0B2A4A] text-white' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Home
              </button>

              <div className="border-t border-slate-100 my-2 pt-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#C9A227] px-3 mb-1">
                  Loan Products
                </div>
                {[
                  { id: 'personal-loan', title: 'Personal Loan' },
                  { id: 'business-loan', title: 'Business Loan' },
                  { id: 'home-loan', title: 'Home Loan' },
                  { id: 'loan-against-property', title: 'Loan Against Property' },
                  { id: 'construction-loan', title: 'Construction Loan' },
                  { id: 'education-loan', title: 'Education Loan' },
                  { id: 'vehicle-loan', title: 'Vehicle Loan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(`service-${item.id}`, item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${
                      currentView === `service-${item.id}` ? 'bg-[#0B2A4A]/10 text-[#0B2A4A] font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {getServiceIcon(item.id)}
                      <span>{item.title}</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-100 my-2 pt-2">
                <button
                  onClick={() => {
                    onNavigate('about');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                    currentView === 'about' ? 'bg-[#0B2A4A] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  About Us
                </button>
                <button
                  onClick={() => {
                    onNavigate('contact');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-md text-sm font-medium ${
                    currentView === 'contact' ? 'bg-[#0B2A4A] text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply(undefined, undefined, 'Website – Apply Now');
                }}
                className="w-full py-3 bg-[#0B2A4A] hover:bg-[#071E36] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm uppercase tracking-wider"
              >
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span>APPLY NOW</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenWhatsApp();
                }}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>CHAT ON WHATSAPP</span>
              </button>
            </div>
          </div>
        )}

        {/* Secondary Loan Navigation Strip (Desktop) */}
        <div className="hidden lg:block border-t border-slate-100 bg-slate-50/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between text-xs py-2 text-slate-600">
              <div className="flex items-center gap-1 font-semibold text-[#0B2A4A] uppercase tracking-wider text-[11px] shrink-0 mr-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
                <span>Direct Loan Assistance:</span>
              </div>
              <div className="flex items-center gap-4 xl:gap-6 overflow-x-auto py-0.5">
                {[
                  { id: 'personal-loan', title: 'Personal Loan' },
                  { id: 'business-loan', title: 'Business Loan' },
                  { id: 'home-loan', title: 'Home Loan' },
                  { id: 'loan-against-property', title: 'Loan Against Property' },
                  { id: 'construction-loan', title: 'Construction Loan' },
                  { id: 'education-loan', title: 'Education Loan' },
                  { id: 'vehicle-loan', title: 'Vehicle Loan' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(`service-${item.id}`, item.id)}
                    className={`transition-colors whitespace-nowrap py-0.5 border-b-2 font-medium ${
                      currentView === `service-${item.id}`
                        ? 'border-[#C9A227] text-[#0B2A4A] font-bold'
                        : 'border-transparent text-slate-600 hover:text-[#0B2A4A] hover:border-slate-300'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
              <button
                onClick={() => onOpenApply(undefined, undefined, 'Website – Apply Now')}
                className="text-[#0B2A4A] font-bold hover:text-[#C9A227] shrink-0 text-[11px] uppercase tracking-wider flex items-center gap-1"
              >
                <span>Instant Apply</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
