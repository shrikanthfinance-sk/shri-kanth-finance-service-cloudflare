import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { X, MessageSquare, Phone, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedTopic, setSelectedTopic] = useState('Home Loan Guidance');
  const [userName, setUserName] = useState('');
  const [customMsg, setCustomMsg] = useState('');

  const topics = [
    'Home Loan Guidance',
    'Construction Loan Inquiry',
    'Loan Against Property (LAP)',
    'Business Loan Assistance',
    'Balance Transfer / Lower EMI',
    'Personal Loan Inquiry',
    'Education / Vehicle Loan',
    'Direct Consultation at Hazira Office'
  ];

  const handleOpenWhatsApp = () => {
    let message = `Hello Shri Kanth Finance Service,\n\nI am contacting you regarding: *${selectedTopic}*`;
    if (userName.trim()) {
      message += `\n• My Name: ${userName.trim()}`;
    }
    if (customMsg.trim()) {
      message += `\n• Note: ${customMsg.trim()}`;
    }
    message += `\n\nPlease let me know the eligibility criteria and documentation requirements.`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-emerald-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0 border border-white/20">
              <MessageSquare className="w-6 h-6 fill-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">
                WhatsApp Direct Consultation
              </h3>
              <p className="text-xs text-emerald-100">
                Shri Kanth Finance Service · +91 8516976768
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            Select your loan requirement to automatically initiate a chat with our advisory desk in Hazira, Gwalior.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Inquiry Topic
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {topics.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTopic(t)}
                  className={`p-2.5 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
                    selectedTopic === t
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="truncate">{t}</span>
                  {selectedTopic === t && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Your Name (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Singh"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Additional Note / Requirement (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Need ₹30 Lakh Home Loan for Gwalior flat"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="pt-2">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Launch WhatsApp Chat</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Official Business Assistant · Hazira, Gwalior</span>
          </div>
        </div>

      </div>
    </div>
  );
};
