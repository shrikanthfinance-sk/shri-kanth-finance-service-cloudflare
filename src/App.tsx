import React, { useState, useEffect } from 'react';
import { LOAN_SERVICES, LoanServiceData } from './data/companyData';
import { SEO_METADATA } from './data/seoMetadata';
import { LeadSource } from './types/lead';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutSection } from './components/AboutSection';
import { LoanServicesGrid } from './components/LoanServicesGrid';
import { FeaturedLoanSection } from './components/FeaturedLoanSection';
import { EmiCalculator } from './components/EmiCalculator';
import { HowItWorks } from './components/HowItWorks';
import { WhyChooseUs } from './components/WhyChooseUs';
import { CustomerTypes } from './components/CustomerTypes';
import { DocumentationSection } from './components/DocumentationSection';
import { EligibilitySection } from './components/EligibilitySection';
import { TrustTransparencySection } from './components/TrustTransparencySection';
import { ServiceAreaSection } from './components/ServiceAreaSection';
import { FaqSection } from './components/FaqSection';
import { LoanEnquiryForm } from './components/LoanEnquiryForm';
import { CustomerJourneyCta } from './components/CustomerJourneyCta';
import { LoanServicePage } from './components/LoanServicePage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { AdminDashboard } from './components/AdminDashboard';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [activeServiceId, setActiveServiceId] = useState<string>('home-loan');

  // Modals state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyPreselectedService, setApplyPreselectedService] = useState<string>('Home Loan');
  const [applyPreselectedAmount, setApplyPreselectedAmount] = useState<string>('');
  const [applyLeadSource, setApplyLeadSource] = useState<LeadSource>('Website – Apply Now');
  const [applyFixedLoanType, setApplyFixedLoanType] = useState<boolean>(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'admin') {
        setIsAdminOpen(true);
        return;
      }
      if (!hash || hash === 'home') {
        setCurrentView('home');
      } else if (hash === 'about') {
        setCurrentView('about');
      } else if (hash === 'contact') {
        setCurrentView('contact');
      } else if (hash.startsWith('service/')) {
        const serviceSlug = hash.replace('service/', '');
        const found = LOAN_SERVICES.find((s) => s.slug === serviceSlug);
        if (found) {
          setActiveServiceId(found.id);
          setCurrentView(`service-${found.id}`);
        }
      } else if (['how-it-works', 'why-choose-us', 'service-area', 'calculator', 'loan-services', 'faqs'].includes(hash)) {
        setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamically synchronize document title, meta descriptions, and social tags per view
  useEffect(() => {
    const meta = SEO_METADATA[currentView] || SEO_METADATA.home;
    document.title = meta.title;

    const setMetaAttribute = (selector: string, attr: string, value: string) => {
      let tag = document.querySelector(selector);
      if (tag) {
        tag.setAttribute(attr, value);
      } else {
        const isProperty = selector.includes('property="');
        const isName = selector.includes('name="');
        const newTag = document.createElement('meta');
        if (isProperty) {
          const propName = selector.match(/property="([^"]+)"/)?.[1];
          if (propName) newTag.setAttribute('property', propName);
        } else if (isName) {
          const metaName = selector.match(/name="([^"]+)"/)?.[1];
          if (metaName) newTag.setAttribute('name', metaName);
        }
        newTag.setAttribute(attr, value);
        document.head.appendChild(newTag);
      }
    };

    setMetaAttribute('meta[name="description"]', 'content', meta.description);
    setMetaAttribute('meta[name="keywords"]', 'content', meta.keywords);
    setMetaAttribute('meta[property="og:title"]', 'content', meta.title);
    setMetaAttribute('meta[property="og:description"]', 'content', meta.description);
    setMetaAttribute('meta[name="twitter:title"]', 'content', meta.title);
    setMetaAttribute('meta[name="twitter:description"]', 'content', meta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    const fullCanonical = window.location.origin + window.location.pathname + (meta.canonicalPath ? meta.canonicalPath : '');
    if (canonical) {
      canonical.setAttribute('href', fullCanonical);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', fullCanonical);
      document.head.appendChild(canonical);
    }
  }, [currentView]);

  const handleNavigate = (view: string, serviceId?: string) => {
    if (view.startsWith('service-')) {
      const id = serviceId || view.replace('service-', '');
      setActiveServiceId(id);
      setCurrentView(`service-${id}`);
      const srv = LOAN_SERVICES.find((s) => s.id === id);
      if (srv) {
        window.location.hash = `service/${srv.slug}`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentView(view);
    if (['how-it-works', 'why-choose-us', 'service-area'].includes(view)) {
      window.location.hash = view;
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(view);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.location.hash = view === 'home' ? '' : view;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenApply = (
    serviceNameOrId?: string,
    amount?: string,
    source: LeadSource = 'Website – Apply Now',
    fixedLoan: boolean = false
  ) => {
    let selectedTitle = 'Home Loan';
    if (serviceNameOrId) {
      const srv = LOAN_SERVICES.find((s) => s.id === serviceNameOrId || s.title === serviceNameOrId);
      selectedTitle = srv ? srv.title : serviceNameOrId;
    }

    setApplyPreselectedService(selectedTitle);
    setApplyPreselectedAmount(amount || '');
    setApplyLeadSource(source);
    setApplyFixedLoanType(fixedLoan);
    setIsApplyModalOpen(true);
  };

  const activeServiceData = LOAN_SERVICES.find((s) => s.id === activeServiceId) || LOAN_SERVICES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-[#C9A227]/20 selection:text-[#0B2A4A]">
      
      {/* Sticky Top Header */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenApply={(svc, amt, src) => handleOpenApply(svc, amt, src || 'Website – Apply Now')}
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
      />

      {/* Main Content Rendered According to View State */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Full-Width Hero Section */}
            <Hero
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
              onNavigateToCalculator={() => {
                const el = document.getElementById('calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onExploreServices={() => {
                const el = document.getElementById('loan-services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* 2. Trust Strip */}
            <TrustStrip />

            {/* 3. About Section */}
            <AboutSection
              onLearnMore={() => handleNavigate('about')}
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
            />

            {/* 4. Loan Services Grid (8 Services) */}
            <LoanServicesGrid
              onSelectService={(id) => handleNavigate(`service-${id}`, id)}
              onOpenApply={(title, amt, src) => handleOpenApply(title, amt, src, true)}
            />

            {/* 5. Featured Loan Section */}
            <FeaturedLoanSection
              onSelectService={(id) => handleNavigate(`service-${id}`, id)}
              onExploreAllServices={() => {
                const el = document.getElementById('loan-services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenApply={(title, amt, src) => handleOpenApply(title, amt, src, true)}
            />

            {/* 6. Interactive Indicative Loan EMI Estimator */}
            <EmiCalculator
              onApplyWithAmount={(amount, loanType) => 
                handleOpenApply(loanType, amount, 'Website – Apply Now')
              }
            />

            {/* 7. How It Works (4-Step Process) */}
            <HowItWorks
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
            />

            {/* 8. Why Choose Us (6 Features) */}
            <WhyChooseUs
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
            />

            {/* 9. Customer Types (Who We Assist) */}
            <CustomerTypes
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
            />

            {/* 10. Commonly Required Documents */}
            <DocumentationSection />

            {/* 11. Loan Eligibility Factors */}
            <EligibilitySection />

            {/* 12. Trust & Transparency Section */}
            <TrustTransparencySection
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            />

            {/* 13. Service Area Section (6 Districts) */}
            <ServiceAreaSection
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
            />

            {/* 14. FAQs Accordion Section */}
            <FaqSection
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            />

            {/* 15. Homepage Inline Loan Enquiry Section */}
            <section className="py-16 md:py-24 bg-slate-100 border-b border-slate-200">
              <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-8">
                  <span className="text-xs font-bold text-[#C9A227] uppercase tracking-wider block mb-1">
                    Direct Consultation
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#0B2A4A]">
                    Connect With Our Loan Advisors
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Fill the enquiry details below or visit our Hazira, Gwalior office.
                  </p>
                </div>
                <LoanEnquiryForm leadSource="Website – Apply Now" />
              </div>
            </section>

            {/* 16. Customer Journey CTA Section */}
            <CustomerJourneyCta
              onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
              onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            />
          </>
        )}

        {/* Dedicated Service Subpage */}
        {currentView.startsWith('service-') && (
          <LoanServicePage
            service={activeServiceData}
            onBack={() => handleNavigate('home')}
            onSelectService={(id) => handleNavigate(`service-${id}`, id)}
            onOpenApply={(title, amt, src) => 
              handleOpenApply(title || activeServiceData.title, amt, src || (`Website – ${activeServiceData.title}` as LeadSource), true)
            }
            onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
          />
        )}

        {/* Dedicated About Page */}
        {currentView === 'about' && (
          <AboutPage
            onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
            onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
            onSelectService={(id) => handleNavigate(`service-${id}`, id)}
            onNavigateContact={() => handleNavigate('contact')}
          />
        )}

        {/* Dedicated Contact Page */}
        {currentView === 'contact' && (
          <ContactPage
            onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
          />
        )}
      </main>

      {/* Large Premium Navy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenApply={() => handleOpenApply(undefined, undefined, 'Website – Apply Now')}
        onOpenWhatsApp={() => setIsWhatsAppModalOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Button (Desktop & Mobile) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col items-end gap-2.5">
        <button
          onClick={() => setIsWhatsAppModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 group text-xs font-semibold"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-white" />
          <span className="hidden sm:inline">WhatsApp Assistance</span>
        </button>
      </div>

      {/* Apply Now Modal Dialog */}
      <ApplyModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        preselectedService={applyPreselectedService}
        preselectedAmount={applyPreselectedAmount}
        leadSource={applyLeadSource}
        fixedLoanType={applyFixedLoanType}
      />

      {/* WhatsApp Modal Dialog */}
      <WhatsAppModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
      />

      {/* Admin / Lead Management Modal Dashboard */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => {
          setIsAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.location.hash = '';
          }
        }} />
      )}

    </div>
  );
}

