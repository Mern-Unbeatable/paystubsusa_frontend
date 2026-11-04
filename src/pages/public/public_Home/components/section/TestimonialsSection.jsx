import React, { useState, useRef } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

const TestimonialsSection = () => {
  // Exactly the 3 cards from the Figma design
  const [cards, setCards] = useState([
    {
      id: 'sabo',
      author: 'Sabo Masties',
      role: 'Founder @ Rolex',
      quote:
        'Creating professional paystubs has never been this easy. The process was simple, fast, and the final document looked clean and professional. Highly recommended!',
    },
    {
      id: 'sam',
      author: 'Sam',
      role: 'Founder @ Migelko',
      quote:
        'I needed a paystub quickly and Paystubs USA made the entire process straightforward. I could enter my information, review the document, and download it without creating.',
    },
    {
      id: 'mansur',
      author: 'Mansur',
      role: 'Founder @ Google',
      quote:
        'The templates are easy to understand and the document creation process is very convenient. I especially like being able to choose a template that fits my needs.',
    },
  ]);

  const isAnimating = useRef(false);

  const handleNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to('.testimonial-card', {
      x: -24,
      opacity: 0.6,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setCards((prev) => [prev[1], prev[2], prev[0]]);
        gsap.fromTo(
          '.testimonial-card',
          { x: 24, opacity: 0.6 },
          {
            x: 0,
            opacity: 1,
            duration: 0.28,
            ease: 'power2.out',
            clearProps: 'transform',
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });
  };

  const handlePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to('.testimonial-card', {
      x: 24,
      opacity: 0.6,
      duration: 0.22,
      ease: 'power2.in',
      onComplete: () => {
        setCards((prev) => [prev[2], prev[0], prev[1]]);
        gsap.fromTo(
          '.testimonial-card',
          { x: -24, opacity: 0.6 },
          {
            x: 0,
            opacity: 1,
            duration: 0.28,
            ease: 'power2.out',
            clearProps: 'transform',
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 select-none overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E232A] tracking-wider uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="mt-3 text-slate-500 text-[14px] leading-relaxed font-normal max-w-lg mx-auto">
            Community development is often linked with community work or community planning, and may involve stakeholders, foundations,
          </p>
        </div>

        {/* Testimonials Stage Container */}
        <div className="relative max-w-[960px] mx-auto pt-10 pb-12">
          
          {/* Exact Figma Single Solid Gray Backdrop Behind Cards */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[84%] max-w-[760px] bg-[#ECECEC] z-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Exactly 3 Cards Grid - Flush top alignment matching Figma */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch px-2 sm:px-4">
            {cards.map((card, index) => {
              const isCenter = index === 1;
              return (
                <div
                  key={card.id}
                  className={`testimonial-card bg-white p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 ${
                    isCenter
                      ? 'shadow-[0_16px_32px_rgba(0,0,0,0.12)] z-20'
                      : 'shadow-xs z-10'
                  }`}
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 mb-3.5 text-[#F59E0B]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>

                    {/* Review Quote */}
                    <p className="text-[#333333] text-[14px] leading-relaxed font-normal">
                      {card.quote}
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="mt-6 pt-2">
                    <h4 className="font-bold text-[#111827] text-[15px]">
                      {card.author}
                    </h4>
                    <p className="text-slate-400 text-[14px] mt-0.5 font-normal">
                      {card.role}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered Segmented Controls directly below cards inside the gray backdrop */}
          <div className="relative z-10 flex items-center justify-center mt-7">
            <div className="inline-flex shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-600 w-10 h-9 transition-colors cursor-pointer border-r border-slate-200 flex items-center justify-center"
                aria-label="Previous Testimonial"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#24292F] hover:bg-black active:bg-slate-900 text-white w-10 h-9 transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Next Testimonial"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
