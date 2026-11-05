import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, FileText, Plus, Minus, Check } from 'lucide-react';

const AboutView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
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

        {/* Section: Who We Are */}
        <div className="mt-20 sm:mt-28 max-w-3xl space-y-4">
          <span className="text-xs font-bold text-[#009BFB] tracking-widest uppercase block">
            WHO WE ARE
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Built by people who handle payroll for a living.
          </h2>

          <div className="space-y-4 text-base sm:text-[17px] text-slate-600 leading-relaxed pt-2">
            <p>
              Our team comes from small-business bookkeeping and payroll. We built
              PaydayStubs.com because the tools we found were either too expensive
              for simple stubs or too sloppy to trust with tax calculations.
            </p>
            <p>
              <strong className="font-bold text-slate-900">
                We handle federal, state, and FICA calculations for all fifty states.
              </strong>{' '}
              Every stub shows itemized deductions and year-to-date totals. No
              subscriptions. No software to install. Just the document you need,
              when you need it.
            </p>
          </div>
        </div>

        {/* Section: Two Comparison Cards (Who this is for & What we are not) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-12 sm:mt-16">
          {/* Card 1: Who this is for */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-9 shadow-xs hover:border-[#009BFB]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
                Who this is for
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                Freelancers, sole proprietors, and small business owners who need
                accurate records of income they actually earned and paid — for their
                own files, bookkeeping, and accountant.
              </p>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-[15px] text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>Independent contractors tracking payments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>Small businesses printing stubs for employees</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>
                  Anyone who wants a clean, itemized record of earnings and
                  deductions
                </span>
              </li>
            </ul>
          </div>

          {/* Card 2: What we are not */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-7 sm:p-9 shadow-xs hover:border-[#009BFB]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-4">
                What we are not
              </h3>
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                We are not a payroll provider, a tax advisor, or a tax-filing
                service.
              </p>
            </div>

            <ul className="space-y-3.5 text-sm sm:text-[15px] text-slate-600">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>We do not file or remit taxes on your behalf</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>We do not handle direct deposit or wage payments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>
                  Stubs must reflect real income and deductions you actually
                  earned and paid
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section: The Process */}
        <div className="mt-28 sm:mt-32">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 sm:pb-16 border-b border-slate-200/80">
            <div>
              <span className="text-xs font-bold text-[#009BFB] tracking-widest uppercase block mb-3">
                THE PROCESS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Three steps. <br />
                Two minutes.
              </h2>
            </div>
            <p className="text-sm text-slate-400 font-medium max-w-xs md:text-right leading-relaxed">
              No account required. No software to install. No waiting on anyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-12 sm:mt-14">
            {/* Step 01 */}
            <div>
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700 italic font-serif mb-5">
                01
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                Enter your details
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Company name, state of residence, work schedule, and salary. The
                form handles employees and contractors, hourly and salaried.
              </p>
            </div>

            {/* Step 02 */}
            <div>
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700 italic font-serif mb-5">
                02
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                Preview instantly
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Watch your stub build in real time. Taxes are calculated
                automatically — review every line before you pay.
              </p>
            </div>

            {/* Step 03 */}
            <div>
              <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-xs font-semibold text-slate-700 italic font-serif mb-5">
                03
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                Download & print
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                A print-ready PDF, instantly. Need several? Grab a ZIP of all your
                stubs or individual JPGs.
              </p>
            </div>
          </div>
        </div>

        {/* Section: Our Principles */}
        <div className="mt-28 sm:mt-32">
          <span className="text-xs font-bold text-[#009BFB] tracking-widest uppercase block mb-3">
            OUR PRINCIPLES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-12 sm:mb-14">
            What we hold ourselves to
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Principle 1 */}
            <div className="pb-8 md:pr-12 md:pb-10 border-b border-slate-200/80 md:border-r">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center">
                <span className="text-[#009BFB] italic font-semibold mr-2 font-serif">
                  i.
                </span>
                <span>Accuracy first</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Federal, state, and FICA calculations checked against current rates.
                A stub that's wrong isn't a stub — it's a problem.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="py-8 md:py-0 md:pl-12 md:pb-10 border-b border-slate-200/80">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center">
                <span className="text-[#009BFB] italic font-semibold mr-2 font-serif">
                  ii.
                </span>
                <span>Built for speed</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                From landing page to downloaded PDF in about two minutes. No login
                walls, no friction, no fine print.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="py-8 md:py-0 md:pt-10 md:pr-12 border-b md:border-b-0 md:border-r border-slate-200/80">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center">
                <span className="text-[#009BFB] italic font-semibold mr-2 font-serif">
                  iii.
                </span>
                <span>Humans on call</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Real support by live chat or phone. If something looks off on your
                stub, we fix it with you — immediately.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="pt-8 md:pt-10 md:pl-12">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center">
                <span className="text-[#009BFB] italic font-semibold mr-2 font-serif">
                  iv.
                </span>
                <span>Fair, flat pricing</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                One low price per stub ($12.99). No subscriptions, no hidden fees,
                no surprises — backed by a 30-day money-back guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* Section: How we handle your data */}
        <div className="mt-28 sm:mt-32">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-8 sm:p-12 shadow-xs hover:border-[#009BFB]/30 transition-all">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              How we handle your data
            </h2>

            <ul className="space-y-4 text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-8">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900">
                    SSNs are encrypted
                  </strong>{' '}
                  in transit and at rest, and are never used for marketing or
                  advertising.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900">
                    We never see or store your full credit card number.
                  </strong>{' '}
                  All payments are processed by Stripe under PCI-DSS standards.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900">
                    No advertising or remarketing trackers
                  </strong>{' '}
                  are placed on pages where you enter pay data.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>
                  <strong className="font-semibold text-slate-900">
                    Stub data is deleted
                  </strong>{' '}
                  after 30 days, or sooner if you request it. You can ask for
                  deletion at any time by emailing{' '}
                  <a
                    href="mailto:privacy@paydaystubs.com"
                    className="text-[#009BFB] hover:underline font-medium"
                  >
                    privacy@paydaystubs.com
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2 flex-shrink-0" />
                <span>
                  We share data only with the service providers that host or process
                  it for us under written contracts. We do not sell personal
                  information.
                </span>
              </li>
            </ul>

            <div className="pt-6 border-t border-slate-100 text-xs sm:text-sm text-slate-500">
              Read our full{' '}
              <Link
                to="/privacy-policy"
                className="text-[#009BFB] hover:underline font-semibold"
              >
                Privacy Policy
              </Link>{' '}
              or see what others say:{' '}
              <a
                href="#reviews"
                className="text-[#009BFB] hover:underline font-semibold"
              >
                Independent Reviews
              </a>
              .
            </div>
          </div>
        </div>

        {/* Section: FAQ / Common questions */}
        <div className="mt-28 sm:mt-32 w-full">
          <span className="text-xs font-bold text-[#009BFB] tracking-widest uppercase block mb-3">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-8 sm:mb-10">
            Common questions
          </h2>

          <div className="space-y-3">
            {[
              {
                question: 'What happens to my Social Security number?',
                answer:
                  'Your SSN is encrypted in transit and at rest using bank-grade AES-256 encryption. We never store raw SSNs in plain text, never share them with third parties, and never use them for marketing or advertising. All sensitive records can be permanently deleted upon request.',
              },
              {
                question: 'How accurate are the calculations?',
                answer:
                  'Our calculations are verified against IRS Publication 15-T and official state tax schedules for 2026. We compute precise federal withholding, state income tax, local taxes, Social Security (6.2%), and Medicare (1.45%) down to the penny.',
              },
              {
                question: 'Which states do you support?',
                answer:
                  'We support all fifty US states plus Washington D.C. State income tax brackets, non-tax states (such as Texas, Florida, and Washington), and local withholding rules are automatically applied based on your state of residence.',
              },
              {
                question: 'Can I get a refund?',
                answer:
                  'Yes. We offer a 100% 30-day money-back guarantee. If anything on your generated document is inaccurate or does not meet your expectations, contact our support team and we will issue a full refund immediately — no questions asked.',
              },
              {
                question: 'Are you a payroll service?',
                answer:
                  'No. We are an online stub generation tool designed for freelancers, independent contractors, and small business owners who need clear, itemized records. We do not remit taxes on your behalf or manage direct deposit transfers.',
              },
              {
                question: 'Can I use these stubs as proof of income?',
                answer:
                  'Yes, provided the figures reflect real income and deductions that you actually earned and paid. Freelancers, gig workers, and business owners routinely use our itemized stubs for accounting, bookkeeping, and proof of legitimate earnings.',
              },
              {
                question: 'Is it legal to create my own pay stub?',
                answer:
                  'Yes, it is entirely legal for business owners, independent contractors, and self-employed individuals to generate pay stubs for legitimate record-keeping, payroll accounting, and tax filing purposes. Stubs must always reflect actual earnings.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-[#009BFB]/40 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 sm:py-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                  >
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[#009BFB]">
                      {isOpen ? (
                        <Minus className="w-4 h-4 transition-transform" />
                      ) : (
                        <Plus className="w-4 h-4 transition-transform" />
                      )}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section: Risk-Free CTA Banner */}
        <div className="mt-28 sm:mt-36 bg-[#0048FF] rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden text-white shadow-xl">
          {/* Decorative Background Elements */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none hidden md:block" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold tracking-tight leading-[1.12]">
                Try it <span className="italic font-serif font-normal">risk-free.</span>
              </h2>
              <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
                Preview your pay stub free. If anything's not right after purchase,
                we'll refund you within 30 days — no questions asked.
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs sm:text-sm text-blue-100 font-medium flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-white" />
                  <span>30-day money-back guarantee</span>
                </span>
                <span className="opacity-60">·</span>
                <span>No subscription</span>
                <span className="opacity-60">·</span>
                <span>Instant download</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link
                to="/paystub-generator"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-sm sm:text-base hover:bg-slate-100 transition shadow-lg active:scale-98 cursor-pointer"
              >
                Create Your Pay Stub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
