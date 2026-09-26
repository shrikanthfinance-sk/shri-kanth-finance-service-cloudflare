import React from 'react';
import { COMPANY_INFO, LOAN_SERVICES, SERVICE_DISTRICTS } from '../data/companyData';
import { 
  Building, 
  Calendar, 
  Landmark, 
  MapPin, 
  ShieldCheck, 
  Users, 
  ArrowRight, 
  MessageSquare,
  Award,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface AboutPageProps {
  onOpenApply: () => void;
  onOpenWhatsApp: () => void;
  onSelectService: (serviceId: string) => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenApply,
  onOpenWhatsApp,
  onSelectService,
  onNavigateContact
}) => {
  const companyFacts = [
    { label: "Established", value: "17 February 2023", icon: <Calendar className="w-5 h-5 text-[#C9A227]" /> },
    { label: "Business Type", value: "Professional Loan Service Provider", icon: <Building className="w-5 h-5 text-[#C9A227]" /> },
    { label: "Loan Assistance Range", value: "₹2 Lakh to ₹5 Crore", icon: <Landmark className="w-5 h-5 text-[#C9A227]" /> },
    { label: "Head Office", value: "Hazira, Gwalior, Madhya Pradesh", icon: <MapPin className="w-5 h-5 text-[#C9A227]" /> },
    { label: "Regional Coverage", value: "6 Districts (Gwalior, Bhind, Morena, Datia, Guna & Shivpuri)", icon: <Award className="w-5 h-5 text-[#C9A227]" /> },
    { label: "Founding Leadership", value: "Deependra Singh Rajawat & Anuj Singh Rajawat", icon: <Users className="w-5 h-5 text-[#C9A227]" /> }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Page Hero */}
      <section className="bg-gradient-to-b from-[#0B2A4A] to-[#071E36] text-white py-16 md:py-20 border-b border-[#041224]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A227] uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              <span>Corporate Overview</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif">
              About Shri Kanth Finance Service
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Your Trusted Loan Assistant Partner in Gwalior and the Chambal division, helping applicants navigate institutional lending with transparency and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Company Introduction & Journey */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5 text-slate-700 leading-relaxed">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
              <span>Our Foundation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A4A] tracking-tight">
              Professional Guidance Grounded in Integrity
            </h2>
            <div className="w-14 h-1 bg-[#C9A227]"></div>

            <p className="text-base sm:text-lg">
              Shri Kanth Finance Service was established on <strong>17 February 2023</strong> by <strong>Deependra Singh Rajawat and Anuj Singh Rajawat</strong> to address a vital need across Gwalior, Bhind, Morena, Datia, Guna, and Shivpuri: providing structured, transparent loan guidance without aggressive sales gimmicks or false promises.
            </p>
            <p>
              Applying for a loan through institutional channels involves complex underwriting guidelines, extensive legal and property documentation, and distinct lender credit parameters. For many individuals, business owners, and families, understanding which financial institution suits their specific profile can be challenging.
            </p>
            <p>
              Our role is to bridge this gap. As a professional loan service provider, we assist customers in understanding eligible options, compiling and verifying necessary documentation, and connecting them with appropriate banks, NBFCs, and housing finance companies.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 aspect-4/3 relative">
              <img
                src="/src/assets/images/hero_finance_consultation_1790429004759.jpg"
                alt="Shri Kanth Finance Service advisory consultation"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                <div className="font-bold">Hazira, Gwalior Headquarters</div>
                <div className="text-slate-300">Near Gumti Wale Hanuman Ji Temple, Ara Mill, Birla Nagar</div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Facts Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2A4A]">
              Company Facts at a Glance
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Established metrics and legal operating profile.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyFacts.map((fact, index) => (
              <div key={index} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-3">
                  {fact.icon}
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  {fact.label}
                </div>
                <div className="text-sm sm:text-base font-bold text-[#0B2A4A]">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Our Approach & Why Customers Contact Us */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0B2A4A] mb-1">
              Operational Philosophy
            </div>
            <h3 className="text-xl font-bold text-[#0B2A4A] mb-3">
              Our Professional Approach
            </h3>
            <div className="w-12 h-1 bg-[#C9A227] mb-6"></div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                <strong>Thorough Assessment:</strong> We analyze income consistency, banking behavior, credit scores, and property titles before submitting files to lenders.
              </p>
              <p>
                <strong>Institutional Matching:</strong> Different financial institutions have specific risk appetites. We assist applicants in identifying institutions where their profile is most likely to meet policy criteria.
              </p>
              <p>
                <strong>Zero Unrealistic Claims:</strong> We never promise guaranteed approvals, fake formulas, or secret rate discounts. We adhere strictly to institutional transparency.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0B2A4A] mb-1">
              Client Experience
            </div>
            <h3 className="text-xl font-bold text-[#0B2A4A] mb-3">
              Why Customers Contact Us
            </h3>
            <div className="w-12 h-1 bg-[#C9A227] mb-6"></div>

            <div className="space-y-3.5">
              {[
                "Personalized face-to-face consultation at our Hazira, Gwalior office",
                "Guidance on compiling complex property and civil construction paperwork",
                "Assistance with loan balance transfers to evaluate genuine interest savings",
                "Transparent, courteous guidance throughout the bank submission journey",
                "Local regional familiarity with Gwalior, Morena, Bhind, Datia, Guna & Shivpuri"
              ].map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-700">{reason}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* Leadership Profile */}
        <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs">
          <div className="max-w-2xl mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0B2A4A] mb-1">
              Executive Leadership
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2A4A]">
              Led by Deependra Singh Rajawat & Anuj Singh Rajawat
            </h3>
            <div className="w-14 h-1 bg-[#C9A227] mt-3 mb-4"></div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Committed to establishing an enduring standard of financial advisory and loan facilitation in northern Madhya Pradesh.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#0B2A4A] text-[#C9A227] font-bold flex items-center justify-center text-base">
                  DR
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0B2A4A]">Deependra Singh Rajawat</h4>
                  <p className="text-xs text-slate-500 font-medium">Owner & Managing Partner</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Oversees institutional banking relations, high-value property mortgage cases, and compliance workflows for residential and commercial applicants.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#0B2A4A] text-[#C9A227] font-bold flex items-center justify-center text-base">
                  AR
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#0B2A4A]">Anuj Singh Rajawat</h4>
                  <p className="text-xs text-slate-500 font-medium">Owner & Partner</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Directs regional client consultations, documentation review, and retail loan services across Gwalior, Morena, Bhind, Datia, Guna, and Shivpuri.
              </p>
            </div>
          </div>
        </section>

        {/* Important Regulatory Disclosure */}
        <section className="bg-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-[#0B2A4A] shrink-0 mt-1" />
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#0B2A4A] uppercase tracking-wider">
                Independent Loan Service Provider Disclosure
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Shri Kanth Finance Service is a loan service provider and assistance partner, not a bank or NBFC. We facilitate loan application assistance and connect eligible applicants with banks, NBFCs, housing finance companies and other financial institutions. Final approval, loan amount, interest rate, tenure, charges, documentation requirements and other terms are determined solely by the concerned financial institution according to its policies and assessment. Submission of an application does not guarantee approval or disbursement.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0B2A4A] text-white rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif mb-3">
            Ready to Discuss Your Loan Requirement?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-8 font-light">
            Visit our office in Hazira, Gwalior or connect online for structured loan assistance.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenApply}
              className="px-7 py-3.5 bg-[#C9A227] hover:bg-[#DFB73D] text-[#071E36] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all"
            >
              Start Loan Enquiry
            </button>
            <button
              onClick={onNavigateContact}
              className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-white/20 transition-all"
            >
              Contact Office
            </button>
            <button
              onClick={onOpenWhatsApp}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};
