import React from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  Users, 
  ShieldCheck, 
  Navigation,
  ExternalLink 
} from 'lucide-react';
import { LoanEnquiryForm } from './LoanEnquiryForm';

interface ContactPageProps {
  onOpenWhatsApp: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenWhatsApp }) => {
  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0B2A4A] to-[#071E36] text-white py-16 md:py-20 border-b border-[#041224]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C9A227] uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C9A227]" />
              <span>Direct Office & Consultation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 font-serif">
              Contact Shri Kanth Finance Service
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              Visit our central office in Hazira, Gwalior, or connect with our loan advisors via phone, WhatsApp, or online enquiry.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Clear Distinction between Website Enquiry & WhatsApp Conversation */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#C9A227] block mb-1">
              Communication Channels
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2A4A]">
              Website Enquiry vs. WhatsApp Conversation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Choose the method best suited to your immediate loan requirement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Website Enquiry */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0B2A4A] text-white flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h3 className="text-base font-bold text-[#0B2A4A]">
                    Website Loan Enquiry (Formal Intake)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Submitting our online form automatically logs your requirement into our master lead database and generates a unique Lead Reference ID (e.g., SKF-2026-XXXX).
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Generates official Lead ID for file tracking and agent assignment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Structured assessment of income, tenure, and property parameters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Ideal for initiating formal loan application assistance</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                Processed systematically by our senior documentation analysts.
              </div>
            </div>

            {/* WhatsApp Conversation */}
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 fill-white" />
                  </div>
                  <h3 className="text-base font-bold text-emerald-950">
                    WhatsApp Chat (Instant Messaging)
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Connect immediately with our team on WhatsApp for quick, conversational inquiries, office location assistance, or document queries.
                </p>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Instant 1-on-1 replies during operational hours (10 AM – 7:30 PM)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Convenient for sharing document photos or checklist clarifications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Quick directions to our Hazira, Gwalior office</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-emerald-200 text-[11px] text-emerald-800">
                Number: +91 8516976768 · Direct access to our advisory team.
              </div>
            </div>

          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Office Details, Contact Cards, Map (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Office Address Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#0B2A4A] text-[#C9A227] flex items-center justify-center font-bold">
                  SK
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B2A4A] font-serif uppercase">
                    Shri Kanth Finance Service
                  </h3>
                  <p className="text-xs text-slate-500">Your Trusted Loan Assistant Partner</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Office Address:</span>
                    <p className="leading-relaxed">
                      Near Gumti Wale Hanuman Ji Temple, Ara Mill, Birla Nagar, Hazira, Gwalior, Madhya Pradesh – 474003, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Owners & Partners:</span>
                    <p>Deependra Singh Rajawat & Anuj Singh Rajawat</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Contact Phone:</span>
                    <a href="tel:+918516976768" className="hover:text-[#0B2A4A] font-mono font-medium">
                      +91 8516976768
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Email Address:</span>
                    <a href="mailto:shrikanthfinance@gmail.com" className="hover:text-[#0B2A4A] font-medium">
                      shrikanthfinance@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C9A227] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-900 block mb-0.5">Office Hours:</span>
                    <p>{COMPANY_INFO.workingHours}</p>
                    <p className="text-[11px] text-slate-400">Sunday: By prior appointment for urgent mortgage reviews</p>
                  </div>
                </div>
              </div>

              {/* 3 Mandated Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-slate-100">
                <a
                  href="tel:+918516976768"
                  className="py-3 px-4 bg-[#0B2A4A] hover:bg-[#071E36] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Phone className="w-4 h-4 text-[#C9A227]" />
                  <span>Call Us (+91 8516976768)</span>
                </a>

                <button
                  onClick={onOpenWhatsApp}
                  className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>WhatsApp Us</span>
                </button>
              </div>

              <div className="pt-3">
                <a
                  href="#contact-form"
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Send an Enquiry Below</span>
                  <span>&darr;</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map Visualization Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs overflow-hidden">
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0B2A4A]">
                  <Navigation className="w-4 h-4 text-[#C9A227]" />
                  <span>Hazira, Gwalior Location Map</span>
                </div>
                <a
                  href="https://maps.google.com/?q=Hazira+Gwalior+Madhya+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#0B2A4A] font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="w-full h-64 rounded-xl overflow-hidden border border-slate-200 relative bg-slate-100">
                <iframe
                  title="Shri Kanth Finance Service Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14314.945209355157!2d78.1720815!3d26.2377224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3976c697858c6735%3A0x712a45051186e80b!2sHazira%2C%20Gwalior%2C%20Madhya%20Pradesh%20474003!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                ></iframe>
              </div>

              <p className="text-[11px] text-slate-500 mt-3 px-2">
                Landmark: Near Gumti Wale Hanuman Ji Temple, Ara Mill, Birla Nagar, Hazira, Gwalior – 474003
              </p>
            </div>

            {/* Service Area Quick Reminder */}
            <div className="bg-slate-100 border border-slate-200 rounded-xl p-4 text-xs text-slate-600">
              <span className="font-bold text-[#0B2A4A] block mb-1">Regional Walk-ins & Assistance:</span>
              Clients travelling from Bhind, Morena, Datia, Guna, or Shivpuri can reach our office conveniently from Gwalior Junction railway station (approx. 10 mins).
            </div>

          </div>

          {/* Right Column: Send an Enquiry Form (7 cols) */}
          <div id="contact-form" className="lg:col-span-7">
            <LoanEnquiryForm leadSource="Website – Contact Enquiry" />
          </div>

        </div>
      </div>

    </div>
  );
};
