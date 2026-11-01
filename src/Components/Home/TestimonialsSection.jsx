import React, { useState, useRef, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TestimonialsSection = () => {
  const sectionRef = useRef(null);

  // Exactly the 3 cards from the Figma design
  const initialCards = [
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
  ];

  const [cards, setCards] = useState(initialCards);
  const isAnimating = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testi-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.75,
        ease: 'power3.out',
      });

      gsap.from('.testi-stage', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

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
            onComplete: () => {
              isAnimating.current = false;
            },
          }
        );
      },
    });
  };

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 sm:py-20 lg:py-24 select-none">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="testi-header text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1E232A] tracking-wider uppercase">
            WHAT OUR CLIENTS SAY
          </h2>
          <p className="mt-3 text-slate-500 text-xs sm:text-[14px] leading-relaxed font-normal max-w-lg mx-auto">
            Community development is often linked with community work or community planning, and may involve stakeholders, foundations,
          </p>
        </div>

        {/* Gray Background Stage Container exactly matching Figma */}
        <div className="testi-stage max-w-[1040px] mx-auto bg-[#EEEEEE] px-6 sm:px-10 lg:px-12 pt-14 pb-10">
          
          {/* Exactly 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7 items-start">
            {cards.map((card, index) => {
              const isCenter = index === 1;
              return (
                <div
                  key={card.id}
                  className={`testimonial-card bg-white p-7 sm:p-8 flex flex-col justify-between min-h-[305px] transition-all duration-300 ${
                    isCenter
                      ? 'shadow-[0_16px_36px_rgba(0,0,0,0.16)] translate-y-3 z-20'
                      : 'shadow-xs z-10'
                  }`}
                >
                  <div>
                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 mb-4 text-[#F59E0B]">
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

          {/* Centered Segmented Controls directly below center card */}
          <div className="flex items-center justify-center mt-9">
            <div className="inline-flex shadow-sm overflow-hidden z-20">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-600 w-11 h-10 transition-colors cursor-pointer border-r border-slate-200 flex items-center justify-center"
                aria-label="Previous Testimonial"
              >
                <ArrowLeft className="w-4 h-4 text-slate-500" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-[#24292F] hover:bg-black active:bg-slate-900 text-white w-11 h-10 transition-colors cursor-pointer flex items-center justify-center"
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
