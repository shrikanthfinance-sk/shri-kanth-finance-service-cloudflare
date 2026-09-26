import React, { useState } from 'react';
import { User, Home, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LeadSource } from '../types/lead';

interface FeaturedLoanSectionProps {
  onSelectService: (serviceId: string) => void;
  onExploreAllServices: () => void;
  onOpenApply: (serviceId?: string, amount?: string, source?: LeadSource) => void;
}

export const FeaturedLoanSection: React.FC<FeaturedLoanSectionProps> = ({
  onSelectService,
  onExploreAllServices,
  onOpenApply
}) => {
  const [activeCategory, setActiveCategory] = useState<'individuals' | 'property' | 'entrepreneurs'>('individuals');

  const categories = [
    {
      id: 'individuals' as const,
      label: 'For Individuals',
      icon: <User className="w-4 h-4" />,
      tagline: 'Personal, Family & Education Financing',
      services: [
        { id: 'personal-loan', name: 'Personal Loan', desc: 'Unsecured personal financing for legitimate medical, wedding, or planned expenses.' },
        { id: 'home-loan', name: 'Home Loan', desc: 'Assistance for purchasing ready or under-construction residential flats and independent houses.' },
        { id: 'vehicle-loan', name: 'Vehicle Loan', desc: 'Financing support for new and certified pre-owned personal four-wheelers.' },
        { id: 'education-loan', name: 'Education Loan', desc: 'Comprehensive financial assistance for domestic and overseas higher education courses.' }
      ]
    },
    {
      id: 'property' as const,
      label: 'For Property Owners',
      icon: <Home className="w-4 h-4" />,
      tagline: 'Leverage Real Estate Equity & Construction',
      services: [
        { id: 'loan-against-property', name: 'Loan Against Property', desc: 'Substantial mortgage assistance up to ₹5 Crore against residential or commercial properties.' },
        { id: 'construction-loan', name: 'Construction Loan', desc: 'Tranche-based construction assistance up to ₹2 Crore on your owned residential plot.' },
        { id: 'balance-transfer', name: 'Balance Transfer', desc: 'Transfer high-rate existing loans to alternative institutions for interest savings and top-up options.' }
      ]
    },
    {
      id: 'entrepreneurs' as const,
      label: 'For Entrepreneurs',
      icon: <Briefcase className="w-4 h-4" />,
      tagline: 'Working Capital, Expansion & MSME Support',
      services: [
        { id: 'business-loan', name: 'Business Loan', desc: 'Assistance up to ₹25 Lakh for eligible traders, manufacturers, contractors, and service enterprises.' },
        { id: 'loan-against-property', name: 'Commercial Property LAP', desc: 'Mortgage capital against commercial shops, warehouses, or office premises for business scaling.' },
        { id: 'balance-transfer', name: 'Commercial Debt Takeover', desc: 'Refinance expensive unorganized business borrowings into institutional banking facilities.' }
      ]
    }
  ];

  const currentCategoryData = categories.find((c) => c.id === activeCategory)!;

  const getImageForCategory = () => {
    switch (activeCategory) {
      case 'individuals':
        return '/src/assets/images/home_property_architecture_1790429021361.jpg';
      case 'property':
        return '/src/assets/images/property_commercial_valuation_1790429055257.jpg';
      case 'entrepreneurs':
        return '/src/assets/images/business_entrepreneur_workspace_1790429041946.jpg';
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Targeted Financial Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Find the Right Loan Assistance for Your Requirement
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mt-3"></div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual & Info Carrier (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 flex-1 min-h-[360px] group">
              <img
                src={getImageForCategory()}
                alt={currentCategoryData.label}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-[#0B2A4A]/40 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1 inline-block">
                  {currentCategoryData.label}
                </span>
                <h3 className="text-xl font-bold leading-snug mb-2 font-serif">
                  {currentCategoryData.tagline}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Navigating institutional eligibility standards across Gwalior, Bhind, Morena, Datia, Guna & Shivpuri.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Transparent review with no false guarantees</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Category Switcher (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Category Tab Buttons (Functional segmented control) */}
            <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-xl mb-6">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex-1 py-3 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-white text-[#0B2A4A] shadow-sm border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <span className={activeCategory === cat.id ? 'text-[#C9A227]' : 'text-slate-400'}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Service Items for Active Category */}
            <div className="space-y-3.5 mb-8">
              {currentCategoryData.services.map((service, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-[#0B2A4A]/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                >
                  <div>
                    <h4 className="text-base font-bold text-[#0B2A4A] group-hover:text-[#071E36] transition-colors">
                      {service.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      {service.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0B2A4A] bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenApply(service.name, undefined, `Website – ${service.name}` as LeadSource)}
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B2A4A] hover:bg-[#071E36] rounded-lg transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Section CTA footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Need guidance comparing options across different lenders?
              </span>

              <button
                onClick={onExploreAllServices}
                className="w-full sm:w-auto px-6 py-3 bg-[#0B2A4A] hover:bg-[#071E36] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>EXPLORE LOAN SERVICES</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A227]" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
