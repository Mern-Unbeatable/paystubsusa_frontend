import React, { useState, useRef } from "react";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import gsap from "gsap";
import ratingStars from "../../../data/home/ratingStars.json";
import testimonials from "../../../data/home/testimonials.json";

const TestimonialsSection = () => {
  const [cards, setCards] = useState(testimonials);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);

  const total = testimonials.length;

  const rotate = (dir) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const outX = dir === "next" ? -28 : 28;
    const inX = dir === "next" ? 28 : -28;

    gsap.to(".testimonial-card", {
      x: outX,
      opacity: 0.5,
      duration: 0.22,
      ease: "power2.in",
      onComplete: () => {
        setCards((prev) =>
          dir === "next"
            ? [prev[1], prev[2], prev[0]]
            : [prev[2], prev[0], prev[1]],
        );
        setActiveIndex((i) =>
          dir === "next" ? (i + 1) % total : (i - 1 + total) % total,
        );
        gsap.fromTo(
          ".testimonial-card",
          { x: inX, opacity: 0.5 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            clearProps: "transform",
            onComplete: () => {
              isAnimating.current = false;
            },
          },
        );
      },
    });
  };

  const handleNext = () => rotate("next");
  const handlePrev = () => rotate("prev");

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <section className="relative w-full select-none overflow-hidden bg-white py-16 sm:py-24">
      {/* Ambient accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-[380px] w-[380px] rounded-full bg-secondary/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-blue-300/10 blur-3xl"
      />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-18">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-3.5 py-1.5 text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
              Testimonials
            </span>
          </div>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
            What Our{" "}
            <span className="bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base font-normal leading-relaxed text-slate-600 sm:text-[17px]">
            Real feedback from people who rely on our documents every day. We're
            proud to have helped thousands of businesses create accurate and
            compliant pay stubs.
          </p>
        </div>

        {/* Testimonials Stage */}
        <div className="relative mx-auto max-w-[1400px] pt-8 pb-10">
          {/* Solid backdrop behind cards */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[8%] top-0 bottom-0 z-0 hidden rounded border border-slate-200/80 bg-primary sm:block"
          />

          {/* Cards */}
          <div className="relative z-10 grid grid-cols-1 items-stretch gap-5 px-2 sm:px-4 md:grid-cols-3 lg:gap-6">
            {cards.map((card, index) => {
              const isCenter = index === 1;
              return (
                <div
                  key={card.id}
                  className={`testimonial-card group relative flex flex-col justify-between rounded-xl border bg-white p-6 transition-all duration-300 sm:p-7 ${
                    isCenter
                      ? "z-20 -translate-y-2 border-secondary/30 shadow-[0_24px_50px_-24px_rgba(15,23,42,0.28)] sm:-translate-y-3"
                      : "z-10 border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.04)]"
                  }`}
                >
                  {/* Decorative quote mark */}
                  <Quote
                    aria-hidden="true"
                    className={`absolute right-5 top-5 h-10 w-10 transition-colors duration-300 ${
                      isCenter ? "text-secondary/15" : "text-slate-100"
                    }`}
                  />

                  <div>
                    {/* Stars */}
                    <div className="mb-4 flex items-center gap-1 text-[#F59E0B]">
                      {ratingStars.map((starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <p className="relative z-10 text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
                      “{card.quote}”
                    </p>
                  </div>

                  {/* Author */}
                  <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[12px] font-bold ${
                        isCenter
                          ? "bg-secondary/10 text-secondary ring-1 ring-secondary/20"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {getInitials(card.author)}
                    </div>
                    <div>
                      <h4 className="text-[14.5px] font-bold text-slate-900">
                        {card.author}
                      </h4>
                      <p className="mt-0.5 text-[12.5px] font-normal text-slate-400">
                        {card.role}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          <div className="relative z-10 mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:border-secondary/30 hover:text-secondary active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/* Counter / dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((t, i) => (
                <span
                  key={t.id}
                  aria-hidden="true"
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-6 bg-secondary"
                      : "w-1.5 bg-slate-300"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white shadow-md shadow-secondary/25 transition-all duration-200 hover:bg-[#008be0] hover:shadow-lg active:scale-95"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
