import React, { Suspense, lazy, useRef, useState } from "react";
import GeneratorHeroSection from "./components/sections/GeneratorHeroSection";

const TemplateSelectionSection = lazy(
  () => import("./components/sections/TemplateSelectionSection"),
);
const PaystubGeneratorForm = lazy(
  () => import("./components/sections/PaystubGeneratorForm"),
);

const PaystubGeneratorView = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState("01");
  const generatorFormRef = useRef(null);
  const templateSectionRef = useRef(null);

  const handleSelectTemplate = (id) => {
    setSelectedTemplateId(id);
    // Smooth scroll down to generator form
    setTimeout(() => {
      generatorFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleChangeTemplate = () => {
    templateSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Hero Section */}
      <GeneratorHeroSection />

      {/* 2. Choose Your Paystub Template Section */}
      <div ref={templateSectionRef}>
        <Suspense
          fallback={
            <div className="py-10 flex items-center justify-center text-sm text-slate-500">
              Loading template options…
            </div>
          }
        >
          <TemplateSelectionSection
            selectedTemplateId={selectedTemplateId}
            onSelectTemplate={handleSelectTemplate}
          />
        </Suspense>
      </div>

      {/* 3. The 4-Step Interactive Paystub Generator Form & Live Preview */}
      <div
        ref={generatorFormRef}
        id="generator-form"
        className="w-full bg-[#F4F7FB] border-t border-slate-200/80 py-8 sm:py-14 scroll-mt-20"
      >
        <Suspense
          fallback={
            <div className="py-12 flex items-center justify-center text-sm text-slate-500">
              Loading generator form…
            </div>
          }
        >
          <PaystubGeneratorForm
            selectedTemplateId={selectedTemplateId}
            onChangeTemplate={handleChangeTemplate}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default PaystubGeneratorView;
