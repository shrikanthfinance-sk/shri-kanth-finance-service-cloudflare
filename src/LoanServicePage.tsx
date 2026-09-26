import React, { useState } from 'react';
import { LoanServiceData, LOAN_SERVICES, COMPANY_INFO } from '../data/companyData';
import { LeadSource } from '../types/lead';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  AlertTriangle,
  Send,
  Home,
  Building2,
  Landmark,
  Briefcase,
  RefreshCw,
  GraduationCap,
  Car
} from 'lucide-react';
import { LoanEnquiryForm } from './LoanEnquiryForm';

interface LoanServicePageProps {
  service: LoanServiceData;
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
  onOpenApply: (serviceId?: string, amount?: string, source?: LeadSource) => void;
  onOpenWhatsApp: () => void;
}

export const LoanServicePage: React.FC<LoanServicePageProps> = ({
  service,
  onBack,
  onSelectService,
  onOpenApply,
  onOpenWhatsApp
}) => {
  const [showEmbeddedForm, setShowEmbeddedForm] = useState(false);

  // Exact Lead Source for this service page
  const serviceLeadSource = `Website – ${service.title}` as LeadSource;

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'home-loan': return <Home className="w-5 h-5 text-[#C9A227]" />;
      case 'construction-loan': return <Building2 className="w-5 h-5 text-[#C9A227]" />;
      case 'loan-against-property': return <Landmark className="w-5 h-5 text-[#C9A227]" />;
      case 'business-loan': return <Briefcase className="w-5 h-5 text-[#C9A227]" />;
      case 'balance-transfer': return <RefreshCw className="w-5 h-5 text-[#C9A227]" />;
      case 'personal-loan': return <ShieldCheck className="w-5 h-5 text-[#C9A227]" />;
      case 'education-loan': return <GraduationCap className="w-5 h-5 text-[#C9A227]" />;
      case 'vehicle-loan': return <Car className="w-5 h-5 text-[#C9A227]" />;
      default: return <Briefcase className="w-5 h-5 text-[#C9A227]" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Breadcrumb Navigation Bar */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0B2A4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Loan Services</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
            <span>Home</span>
            <span>/</span>
            <span>Loan Services</span>
            <span>/</span>
            <span className="font-semibold text-[#0B2A4A]">{service.title}</span>
          </div>
        </div>
      </div>

      {/* 1. Dedicated Subpage Hero */}
      <section className="bg-gradient-to-b from-white to-slate-100 border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
                <span>Loan Service Assistance · Category {service.number}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0B2A4A] tracking-tight leading-tight mb-4">
                {service.headline}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6">
                {service.subheadline}
              </p>

              {/* Special highlight metric pill */}
              {service.highlightLimit && (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A227]/15 border border-[#C9A227]/30 rounded-lg text-xs sm:text-sm font-bold text-[#0B2A4A] mb-6">
                  <Sparkles className="w-4 h-4 text-[#C9A227]" />
                  <span>{service.highlightLimit}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenApply(service.title, undefined, serviceLeadSource)}
                  className="px-6 py-3.5 bg-[#0B2A4A] hover:bg-[#071E36] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-2"
                >
                  <span>APPLY NOW</span>
                  <ArrowRight className="w-4 h-4 text-[#C9A227]" />
                </button>

                <button
                  onClick={onOpenWhatsApp}
                  className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WHATSAPP US</span>
                </button>

                <button
                  onClick={() => setShowEmbeddedForm(!showEmbeddedForm)}
                  className="px-4 py-3.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
                >
                  {showEmbeddedForm ? 'Hide Enquiry Form' : 'Fill Enquiry on Page'}
                </button>
              </div>
            </div>

            {/* Visual Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white aspect-4/3 relative bg-slate-900">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-[#0B2A4A]/90 p-3 rounded-xl border border-white/10 backdrop-blur-xs">
                  <div className="font-bold">{service.title} Guidance</div>
                  <div className="text-slate-300 text-[11px]">Gwalior, Bhind, Morena, Datia, Guna & Shivpuri</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Optional Embedded Form if triggered */}
      {showEmbeddedForm && (
        <section className="py-8 bg-slate-100 border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <LoanEnquiryForm
              initialLoanType={service.title}
              leadSource={serviceLeadSource}
              fixedLoanType={true}
              onSuccessClose={() => setShowEmbeddedForm(false)}
            />
          </div>
        </section>
      )}

      {/* Main Content Sections Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* 2. Overview Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <span>Service Overview</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A4A] tracking-tight mb-4">
              Understanding {service.title} Assistance
            </h2>
            <div className="w-14 h-1 bg-[#C9A227] mb-6"></div>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {service.overview}
            </p>
          </div>
        </section>

        {/* 3. Key Features / Highlights */}
        <section>
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <span>Core Benefits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A4A] tracking-tight">
              Key Features & Assistance Highlights
            </h2>
            <div className="w-14 h-1 bg-[#C9A227] mt-3"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-[#0B2A4A]/30 transition-all shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[#C9A227] font-bold text-xs">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-[#0B2A4A]">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Two-Column Layout: Suitable Customer Profile & Typical Use Cases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Suitable Customer Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1">
                Target Profile
              </div>
              <h3 className="text-xl font-bold text-[#0B2A4A] mb-3">
                Suitable Customer Profile
              </h3>
              <div className="w-12 h-1 bg-[#C9A227] mb-5"></div>

              <div className="space-y-3.5">
                {service.whoMayConsider.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 text-xs text-slate-500">
              Assistance tailored for individuals and entities meeting institutional lending criteria.
            </div>
          </div>

          {/* Typical Use Cases */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#C9A227] mb-1">
                Practical Application
              </div>
              <h3 className="text-xl font-bold text-[#0B2A4A] mb-3">
                Typical Use Cases
              </h3>
              <div className="w-12 h-1 bg-[#C9A227] mb-5"></div>

              <div className="space-y-3.5">
                {(service.typicalUseCases || []).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#0B2A4A]/10 text-[#0B2A4A] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 text-xs text-slate-500">
              Guidance for legitimate personal, residential, or commercial end-use purposes.
            </div>
          </div>

        </div>

        {/* 5. Basic Eligibility Information */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <span>Underwriting Benchmarks</span>
            </div>
            <h2 className="text-2xl font-bold text-[#0B2A4A] tracking-tight">
              Basic Eligibility Information
            </h2>
            <div className="w-14 h-1 bg-[#C9A227] mt-2 mb-3"></div>
            <p className="text-xs sm:text-sm text-slate-600">
              Institutions evaluate applicant parameters to determine loan capacity and sanction terms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.eligibilityFactors.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="w-5 h-5 rounded-md bg-[#0B2A4A] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500">
            * Final eligibility, loan quantum, and qualifying benchmarks are determined exclusively by the evaluating financial institution.
          </div>
        </section>

        {/* 6. Indicative Document Checklist */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
              <FileText className="w-4 h-4 text-[#C9A227]" />
              <span>Paperwork Checklist</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A4A] tracking-tight">
              Indicative Document Checklist for {service.title}
            </h2>
            <div className="w-14 h-1 bg-[#C9A227] mt-3 mb-4"></div>
            <p className="text-xs sm:text-sm text-slate-600">
              Having these ready accelerates preliminary verification and routing to suitable lenders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.commonDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0 text-[#0B2A4A] font-bold text-xs mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm text-slate-700 leading-snug">
                  {doc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Key Considerations & Advisory Notes */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="max-w-3xl mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
              <span>Advisory Insights</span>
            </div>
            <h3 className="text-xl font-bold text-[#0B2A4A]">
              Key Considerations Before Applying
            </h3>
            <div className="w-12 h-1 bg-[#C9A227] mt-2 mb-3"></div>
          </div>

          <div className="space-y-3 mb-6">
            {(service.keyConsiderations || []).map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80">
                <CheckCircle2 className="w-4 h-4 text-[#C9A227] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Statutory Disclosure Note */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Transparency & No-Guarantee Policy
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Shri Kanth Finance Service does not make guaranteed approval, guaranteed lowest interest rate, or guaranteed disbursement claims. Final sanction, rate, and tenure are determined solely by the evaluating financial institution according to its policies and applicant appraisal.
              </p>
            </div>
          </div>
        </section>

        {/* 7. 4-Step Application Process Strip */}
        <section className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-[#0B2A4A]">
              Application Journey with Shri Kanth Finance Service
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              A 4-step structured process to guide your application from inquiry to sanction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-[#C9A227] mb-1">01. INQUIRY</div>
              <div className="text-sm font-bold text-[#0B2A4A] mb-1">Share Profile</div>
              <p className="text-xs text-slate-500">Provide basic loan quantum and income details.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-[#C9A227] mb-1">02. REVIEW</div>
              <div className="text-sm font-bold text-[#0B2A4A] mb-1">Documentation</div>
              <p className="text-xs text-slate-500">Compile and organize mandatory institutional files.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-[#C9A227] mb-1">03. ROUTING</div>
              <div className="text-sm font-bold text-[#0B2A4A] mb-1">Lender Submission</div>
              <p className="text-xs text-slate-500">Submit file to suitable partner institutions.</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-[#C9A227] mb-1">04. DECISION</div>
              <div className="text-sm font-bold text-[#0B2A4A] mb-1">Sanction & Terms</div>
              <p className="text-xs text-slate-500">Lender determines approval, rate, and tenure.</p>
            </div>
          </div>
        </section>

        {/* 8. Important Information / Disclaimer */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-5 flex items-start gap-4">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-900 uppercase tracking-wider">
              Statutory Disclosure & Policy Note
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              {service.importantInfo}
            </p>
          </div>
        </div>

        {/* 9 & 10. Service Bottom CTA Panel */}
        <section className="bg-gradient-to-br from-[#0B2A4A] to-[#071E36] text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold font-serif">
              Need {service.title} Assistance?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Talk to Shri Kanth Finance Service for guidance on your {service.title.toLowerCase()} requirement and application process.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => onOpenApply(service.title, undefined, serviceLeadSource)}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#C9A227] hover:bg-[#DFB73D] text-[#071E36] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>APPLY NOW</span>
                <ArrowRight className="w-4 h-4 text-[#071E36]" />
              </button>

              <button
                onClick={onOpenWhatsApp}
                className="w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WHATSAPP US</span>
              </button>
            </div>
          </div>
        </section>

        {/* Other Loan Services Navigator */}
        <div className="pt-8 border-t border-slate-200">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
            Explore Other Loan Services
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {LOAN_SERVICES.filter((s) => s.id !== service.id).map((other) => (
              <button
                key={other.id}
                onClick={() => {
                  onSelectService(other.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-3 bg-white border border-slate-200 hover:border-[#0B2A4A] rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-2 mb-1">
                  {getServiceIcon(other.id)}
                  <span className="text-xs font-bold text-[#0B2A4A] group-hover:text-[#071E36] truncate">
                    {other.title}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {other.highlightLimit ? other.highlightLimit.replace('Assistance ', '') : 'Assistance'}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
