import React, { useState, useEffect } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { LeadSource, LoanType } from '../types/lead';
import { 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Phone, 
  ShieldCheck, 
  User, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  FileText,
  Mail,
  AlertCircle,
  RefreshCw,
  Building
} from 'lucide-react';

interface LoanEnquiryFormProps {
  initialLoanType?: string;
  initialAmount?: string;
  leadSource?: LeadSource;
  fixedLoanType?: boolean;
  onSuccessClose?: () => void;
}

export const LoanEnquiryForm: React.FC<LoanEnquiryFormProps> = ({
  initialLoanType = 'Home Loan',
  initialAmount = '',
  leadSource = 'Website – Apply Now',
  fixedLoanType = false,
  onSuccessClose
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: 'Gwalior',
    district: 'Gwalior',
    loanRequirement: initialLoanType,
    approxLoanAmount: initialAmount || '₹25,00,000',
    employmentType: 'Salaried',
    monthlyIncome: '',
    hasExistingLoan: 'No',
    existingLoanDetails: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clientSubmissionId, setClientSubmissionId] = useState('');

  // Generate unique submission token for duplicate protection
  useEffect(() => {
    setClientSubmissionId(`sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  }, []);

  // Sync if initial props change
  useEffect(() => {
    if (initialLoanType) {
      setFormData(prev => ({ ...prev, loanRequirement: initialLoanType }));
    }
    if (initialAmount) {
      setFormData(prev => ({ ...prev, approxLoanAmount: initialAmount }));
    }
  }, [initialLoanType, initialAmount]);

  const loanOptions: LoanType[] = [
    'Home Loan',
    'Construction Loan',
    'Loan Against Property',
    'Business Loan',
    'Balance Transfer',
    'Personal Loan',
    'Education Loan',
    'Vehicle Loan'
  ];

  const employmentOptions = [
    'Salaried',
    'Self Employed',
    'Business Owner',
    'Professional',
    'Other'
  ];

  const districtOptions = [
    'Gwalior',
    'Bhind',
    'Morena',
    'Datia',
    'Guna',
    'Shivpuri',
    'Other'
  ];

  // Validate Indian mobile number (10 digits starting with 6,7,8,9)
  const validateMobile = (phone: string): { isValid: boolean; clean: string } => {
    const digits = phone.replace(/\D/g, '');
    let clean = digits;
    if (digits.length === 12 && digits.startsWith('91')) {
      clean = digits.slice(2);
    } else if (digits.length === 11 && digits.startsWith('0')) {
      clean = digits.slice(1);
    }
    return {
      isValid: /^[6-9]\d{9}$/.test(clean),
      clean
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submit
    setErrorMsg('');

    // Validation
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const { isValid: isMobileValid, clean: cleanMobile } = validateMobile(formData.mobileNumber);
    if (!isMobileValid) {
      setErrorMsg('Please enter a valid 10-digit Indian mobile number (e.g. 98XXXXXXXX).');
      return;
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        setErrorMsg('Please enter a valid email address or leave it blank.');
        return;
      }
    }

    if (!formData.approxLoanAmount.trim()) {
      setErrorMsg('Please enter the approximate loan amount required.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        customerName: formData.fullName.trim(),
        mobileNumber: cleanMobile,
        email: formData.email.trim(),
        city: formData.city.trim() || formData.district,
        district: formData.district,
        loanType: formData.loanRequirement,
        loanAmount: formData.approxLoanAmount.trim(),
        employmentType: formData.employmentType,
        monthlyIncome: formData.monthlyIncome.trim(),
        existingLoan: formData.hasExistingLoan,
        existingLoanDetails: formData.existingLoanDetails.trim(),
        leadSource: leadSource,
        remarks: formData.message.trim(),
        clientSubmissionId: clientSubmissionId
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setLeadId(data.leadId || 'SKF-2026-0001');
        setSubmitted(true);
      } else {
        setErrorMsg('We could not submit your enquiry right now. Please try again or contact us directly on WhatsApp.');
      }
    } catch (err) {
      console.error('Submission network error:', err);
      setErrorMsg('We could not submit your enquiry right now. Please try again or contact us directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppEnquiryLink = () => {
    const text = encodeURIComponent(
      `Hello Shri Kanth Finance Service,\n\nI have submitted loan enquiry ${leadId ? `(${leadId})` : ''}:\n• Name: ${formData.fullName}\n• Mobile: ${formData.mobileNumber}\n• District: ${formData.district}\n• Loan Type: ${formData.loanRequirement}\n• Approx Amount: ${formData.approxLoanAmount}\n• Employment: ${formData.employmentType}\n• Monthly Income: ${formData.monthlyIncome || 'Not specified'}\n• Existing Loan: ${formData.hasExistingLoan}${formData.existingLoanDetails ? ` (${formData.existingLoanDetails})` : ''}\n\nPlease guide me regarding the next steps.`
    );
    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrorMsg('');
    setClientSubmissionId(`sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);
  };

  return (
    <div id="enquiry-form" className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Form Top Banner */}
      <div className="bg-[#0B2A4A] text-white p-6 sm:p-8">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C9A227]">
            <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
            <span>Confidential Loan Application Guidance</span>
          </div>
          <span className="text-[11px] font-mono text-slate-300 hidden sm:inline">
            Direct Central Database Sync
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
          Start Your Loan Enquiry
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Share your basic requirement and our team can guide you through the next steps.
        </p>
      </div>

      <div className="p-6 sm:p-8 md:p-10">
        {submitted ? (
          /* Submission Confirmation View */
          <div className="py-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="max-w-xl mx-auto space-y-3">
              <h4 className="text-xl font-bold text-[#0B2A4A]">
                Enquiry Received Successfully
              </h4>
              {/* Exact Mandated Success Message */}
              <p className="text-sm text-slate-700 leading-relaxed font-medium bg-emerald-50/70 border border-emerald-200/80 p-4 rounded-xl text-center">
                “Thank you for contacting Shri Kanth Finance Service. Your enquiry has been received successfully. Our team will review your requirement and contact you regarding the next steps.”
              </p>
            </div>

            {/* Application Summary Box with Generated Lead ID */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2 text-slate-600">
              <div className="flex justify-between font-bold text-[#0B2A4A] pb-2 border-b border-slate-200">
                <span>Unique Lead Reference ID:</span>
                <span className="font-mono text-sm text-[#C9A227] bg-[#0B2A4A] px-2.5 py-0.5 rounded">
                  {leadId}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Customer Name:</span>
                <span className="font-medium text-slate-800">{formData.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span>Mobile Number:</span>
                <span className="font-medium text-slate-800 font-mono">+91 {formData.mobileNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Loan Type:</span>
                <span className="font-medium text-slate-800">{formData.loanRequirement}</span>
              </div>
              <div className="flex justify-between">
                <span>Loan Amount:</span>
                <span className="font-medium text-slate-800 font-mono">{formData.approxLoanAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>District:</span>
                <span className="font-medium text-slate-800">{formData.district}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-200/70 text-[11px] text-slate-400">
                <span>Lead Source:</span>
                <span>{leadSource}</span>
              </div>
            </div>

            {/* Actions after submission */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
              <a
                href={getWhatsAppEnquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp regarding {leadId}</span>
              </a>

              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Submit Another Enquiry</span>
              </button>

              {onSuccessClose && (
                <button
                  onClick={onSuccessClose}
                  className="w-full sm:w-auto px-5 py-3 bg-[#0B2A4A] hover:bg-[#071E36] text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Close Window
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-400">
              Our office in Hazira, Gwalior operates Monday through Saturday: 10:00 AM to 7:30 PM.
            </p>
          </div>
        ) : (
          /* Main Interactive Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Error Message Display with Retry & WhatsApp Options */}
            {errorMsg && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl space-y-2">
                <div className="flex items-start gap-2.5 text-xs text-rose-800 font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="text-xs font-bold text-rose-900 underline hover:no-underline"
                  >
                    Click to Retry
                  </button>
                  <span className="text-slate-400">·</span>
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hello Shri Kanth Finance Service, I encountered an issue submitting the loan form. Please assist me.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Contact Directly on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Tomar"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Mobile Number (Indian 10-digit validated) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number <span className="text-rose-500">*</span> <span className="text-[10px] text-slate-400 normal-case font-normal">(10-digit Indian number)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="85XXXXXXXX"
                    value={formData.mobileNumber}
                    onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    className="w-full pl-12 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all font-mono"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-[10px] text-slate-400 normal-case font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="e.g. name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  District <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value, city: e.target.value })}
                    className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all appearance-none cursor-pointer font-medium"
                  >
                    {districtOptions.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* City / Area */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  City / Local Area <span className="text-[10px] text-slate-400 normal-case font-normal">(e.g. Hazira, Lashkar)</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="e.g. Hazira, Birla Nagar"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Loan Requirement (Dropdown or fixed) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Loan Requirement <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.loanRequirement}
                  disabled={fixedLoanType}
                  onChange={(e) => setFormData({ ...formData, loanRequirement: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all cursor-pointer font-medium disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loanOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Approximate Loan Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Approximate Loan Amount <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹25,00,000 (25 Lakh)"
                    value={formData.approxLoanAmount}
                    onChange={(e) => setFormData({ ...formData, approxLoanAmount: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all font-mono"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">Assistance from ₹2 Lakh to ₹5 Crore</span>
              </div>

              {/* Employment Type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Employment Type <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={formData.employmentType}
                    onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                    className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all appearance-none cursor-pointer"
                  >
                    {employmentOptions.map((emp) => (
                      <option key={emp} value={emp}>{emp}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Monthly Income */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Monthly Income (Approximate)
                </label>
                <input
                  type="text"
                  placeholder="e.g. ₹55,000 / month"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all"
                />
              </div>

              {/* Existing Loan, if any */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Existing Loan, if any
                </label>
                <div className="flex items-center gap-4 py-2">
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="existingLoan"
                      value="No"
                      checked={formData.hasExistingLoan === 'No'}
                      onChange={() => setFormData({ ...formData, hasExistingLoan: 'No', existingLoanDetails: '' })}
                      className="accent-[#0B2A4A]"
                    />
                    <span>No Existing Loan</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="existingLoan"
                      value="Yes"
                      checked={formData.hasExistingLoan === 'Yes'}
                      onChange={() => setFormData({ ...formData, hasExistingLoan: 'Yes' })}
                      className="accent-[#0B2A4A]"
                    />
                    <span>Yes, servicing loan(s)</span>
                  </label>
                </div>
                {formData.hasExistingLoan === 'Yes' && (
                  <input
                    type="text"
                    placeholder="e.g. Existing bike/home loan EMI ₹12,000"
                    value={formData.existingLoanDetails}
                    onChange={(e) => setFormData({ ...formData, existingLoanDetails: e.target.value })}
                    className="w-full px-3 py-2 mt-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B2A4A]"
                  />
                )}
              </div>

            </div>

            {/* Short Requirement / Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Short Requirement / Remarks
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific requirements regarding property location, registry status, business turnover, or urgency..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B2A4A] focus:border-transparent transition-all"
              />
            </div>

            {/* Regulatory Disclaimer & Source Tracker */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span>
                Shri Kanth Finance Service is a loan service provider. Submission connects eligible applicants with partner institutions.
              </span>
              <span className="font-mono text-[10px] text-slate-400 shrink-0">
                Source: {leadSource}
              </span>
            </div>

            {/* Submit Button with Duplicate Prevention */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                isSubmitting
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-[#0B2A4A] hover:bg-[#071E36] active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-[#C9A227]" />
                  <span>RECORDING LEAD & CONNECTING TO MASTER DATABASE...</span>
                </>
              ) : (
                <>
                  <span>SUBMIT LOAN ENQUIRY</span>
                  <Send className="w-4 h-4 text-[#C9A227]" />
                </>
              )}
            </button>

          </form>
        )}
      </div>

    </div>
  );
};
