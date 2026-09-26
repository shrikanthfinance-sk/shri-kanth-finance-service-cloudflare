import React from 'react';
import { COMMONLY_REQUIRED_DOCUMENTS } from '../data/companyData';
import { FileText, AlertCircle, CheckCircle2 } from 'lucide-react';

export const DocumentationSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A4A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
            <span>Application Readiness</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0B2A4A] tracking-tight">
            Commonly Required Documents
          </h2>
          <div className="w-16 h-1 bg-[#C9A227] mx-auto mt-3 mb-4"></div>
          <p className="text-base sm:text-lg text-slate-600">
            A general checklist of records typically required by banking and institutional underwriters.
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {COMMONLY_REQUIRED_DOCUMENTS.map((doc, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#0B2A4A]/30 transition-all flex items-start gap-4 shadow-xs"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 text-[#0B2A4A]">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B2A4A] mb-1">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Important Note */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 max-w-4xl mx-auto">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            <span className="font-bold">Important Notice: </span>
            Document requirements vary according to the loan type, applicant profile and respective financial institution. Shri Kanth Finance Service guides applicants in assembling and verifying paperwork prior to bank submission.
          </div>
        </div>

      </div>
    </section>
  );
};
