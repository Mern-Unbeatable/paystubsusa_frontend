import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, FileText } from 'lucide-react';

const AboutView = () => {
  const featureCards = [
    {
      title: '50 states',
      description: 'Current federal, state, and FICA tax rates for every jurisdiction.',
    },
    {
      title: 'Free preview',
      description: 'Review every line of your stub before you pay a cent.',
    },
    {
      title: '30-day guarantee',
      description: 'Money back if anything is wrong. No questions asked.',
    },
    {
      title: 'Rates verified',
      description: 'Verified 2026 against IRS Pub. 15-T and state agencies.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBFBFA] py-16 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 2-Column Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Hero Copy & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#009BFB] tracking-widest uppercase block">
              ABOUT PAYDAYSTUBS.COM
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Accurate pay stubs, <br className="hidden sm:inline" />
              generated in{' '}
              <span className="text-[#009BFB] italic font-semibold">minutes.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              An online pay stub generator for freelancers, sole proprietors, and
              small business owners who need accurate records of income they
              actually earned and paid — for their own files, bookkeeping, and
              accountant.
            </p>

            <div className="pt-2">
              <Link
                to="/paystub-generator"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded bg-slate-900 hover:bg-[#009BFB] text-white font-semibold text-sm transition-colors shadow-sm active:scale-98 cursor-pointer"
              >
                <span>Create a Pay Stub</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Sample Stub Mockup */}
          <div className="lg:col-span-6">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Floating Badge on Top-Right */}
              <div className="absolute -top-3.5 right-6 bg-[#009BFB] text-white text-[11px] font-bold px-3 py-1 rounded shadow-md uppercase tracking-wider z-10">
                Sample stub
              </div>

              {/* Sample Stub Card */}
              <div className="bg-white rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-slate-200/80 p-6 sm:p-8 text-slate-800">
                {/* Employer & Net Pay Header */}
                <div className="flex items-start justify-between pb-5 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Sample Employer Inc.
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      123 Main St, Austin, TX 78701
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-slate-900 tracking-tight">
                      $2,038.20
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 tracking-wider mt-0.5 uppercase">
                      NET PAY
                    </div>
                  </div>
                </div>

                {/* Details Table Rows */}
                <div className="py-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Employee</span>
                    <span className="font-semibold text-slate-900">
                      Sample Employee
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Pay Period</span>
                    <span className="font-semibold text-slate-900">
                      10/01/2026 – 10/15/2026
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500 pb-3 border-b border-slate-100">
                    <span>Period</span>
                    <span className="font-semibold text-slate-900">
                      19 of 24
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-slate-700">
                    <span>Gross Earnings (80 hrs × $30.00)</span>
                    <span className="font-bold text-slate-900">$2,400.00</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Federal Income Tax</span>
                    <span className="text-slate-800 font-medium">-$178.20</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Social Security (6.2%)</span>
                    <span className="text-slate-800 font-medium">-$148.80</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>Medicare (1.45%)</span>
                    <span className="text-slate-800 font-medium">-$34.80</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-500">
                    <span>State Tax (TX: 0%)</span>
                    <span className="text-slate-800 font-medium">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 font-bold text-slate-900">
                    <span>Total Deductions</span>
                    <span>-$361.80</span>
                  </div>
                </div>

                {/* Dashed Separator */}
                <div className="border-t border-dashed border-slate-200 my-4" />

                {/* Stub Copy & YTD Metadata Footer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#009BFB] tracking-wider uppercase">
                    <span>EMPLOYEE COPY</span>
                    <span>STUB #0019</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono leading-relaxed">
                    YTD Gross: $45,600.00 | YTD Federal: $3,385.80 | YTD SS: $2,827.20 | YTD Medicare: $661.20 | YTD Net: $38,725.80
                  </div>
                </div>
              </div>

              {/* Legal Disclaimer Caption under Stub */}
              <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-lg">
                Federal withholding depends on each employee's W-4 and may differ
                from this example. This stub reflects a single filer with default
                allowances for illustration only.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-20">
          {featureCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-[#009BFB]/40 hover:shadow-sm transition"
            >
              <h3 className="text-lg font-bold text-slate-900">
                {card.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-2 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutView;
