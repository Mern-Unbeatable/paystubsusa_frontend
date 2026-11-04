import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '../../../../components/Dashboard';

const FAQS = [
  {
    q: 'How can I download my previous documents?',
    a: 'Open My Documents, find the document you need, and select the download icon. Completed documents are available as PDFs.',
  },
  {
    q: 'How long can I access my documents?',
    a: 'Your documents remain accessible in your account indefinitely with an active subscription or verified document purchase.',
  },
  {
    q: 'How can I access my payment history?',
    a: 'Navigate to the Payment History tab in the dashboard sidebar to review all past transactions, receipts, and order invoices.',
  },
  {
    q: 'How does the Unlimited Access subscription work?',
    a: 'Unlimited Access allows you to generate unlimited paystubs, W-2s, and 1099s with real-time tax calculation for all 50 states without individual checkout.',
  },
  {
    q: 'What should I do if my document download fails?',
    a: 'Try refreshing your browser or clearing temporary cache. You can also re-trigger the download from My Documents or contact our support team.',
  },
];

const HelpCenterView = () => {
  const [openIndex, setOpenIndex] = useState(0); // first item expanded as in Figma design

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <DashboardHeader
        title="How Can We Help?"
        description="Find answers to common questions or get in touch with our support team."
      />

      {/* Grid: FAQs on left, Contact on right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left FAQs Card */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 sm:p-8 space-y-5">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Quick answers to your dashboard questions
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-4 sm:py-4.5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 text-left transition group cursor-pointer"
                  >
                    <span className="text-sm sm:text-[15px] font-semibold text-slate-800 group-hover:text-[#009BFB] transition-colors">
                      {faq.q}
                    </span>
                    <ChevronRight
                      className={`w-4.5 h-4.5 text-slate-400 transition-transform flex-shrink-0 ${
                        isOpen ? 'rotate-90 text-[#009BFB]' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2.5 text-sm text-slate-500 leading-relaxed pr-6 animate-in fade-in duration-200">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Contact Support Card */}
        <div className="lg:col-span-4 bg-[#101E33] rounded-2xl p-7 sm:p-8 text-center text-white shadow-lg space-y-4.5 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/10 text-white/80 flex items-center justify-center mt-1">
            <HelpCircle className="w-6 h-6 text-white/70" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-white">
              Contact Support
            </h3>
            <p className="text-sm text-slate-300 mt-1.5 max-w-[260px] leading-relaxed">
              Can't find what you're looking for? Our support team is ready to help.
            </p>
          </div>

          <a
            href="mailto:support@paystuba.com"
            className="w-full max-w-[230px] py-3 px-5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-98"
          >
            <span>Email Support</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <p className="text-xs text-slate-400">
            We typically respond within one business day.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterView;
