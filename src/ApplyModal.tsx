import React from 'react';
import { X } from 'lucide-react';
import { LoanEnquiryForm } from './LoanEnquiryForm';
import { LeadSource } from '../types/lead';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedAmount?: string;
  leadSource?: LeadSource;
  fixedLoanType?: boolean;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  preselectedAmount,
  leadSource = 'Website – Apply Now',
  fixedLoanType = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full z-10 my-8 overflow-hidden animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto">
          <LoanEnquiryForm
            initialLoanType={preselectedService || 'Home Loan'}
            initialAmount={preselectedAmount || ''}
            leadSource={leadSource}
            fixedLoanType={fixedLoanType}
            onSuccessClose={onClose}
          />
        </div>
      </div>
    </div>
  );
};

