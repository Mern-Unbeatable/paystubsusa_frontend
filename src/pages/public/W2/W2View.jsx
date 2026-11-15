import React from "react";
import { useLocation } from "react-router-dom";
import W2HeroSection from "./components/sections/W2HeroSection";
import W2DetailsForm from "./components/sections/W2DetailsForm";
import { useW2FormData } from "./hooks/useW2FormData";
import { useW2FlowNavigation } from "./hooks/useW2FlowNavigation";
import { W2_FORM_STEPS } from "./utils/w2Flow";

/** Landing: hero + multi-step form on the same page. */
const W2View = () => {
  const location = useLocation();
  const form = useW2FormData();
  const { onContinueToCheckout, goToStep } = useW2FlowNavigation();

  return (
    <div className="w-full min-h-screen bg-white">
      <W2HeroSection />

      <section className="w-full bg-[#F7FAFF] py-10 sm:py-16 border-t border-slate-200/80">
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          <W2DetailsForm
            key={location.key}
            form={form}
            initialStep={location.state?.step ?? W2_FORM_STEPS.EMPLOYER}
            onContinueToCheckout={onContinueToCheckout}
            onStepClick={goToStep}
          />
        </div>
      </section>
    </div>
  );
};

export default W2View;
