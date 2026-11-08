import React from "react";
import W2Stepper from "./W2Stepper";
import { useW2FlowNavigation } from "../../hooks/useW2FlowNavigation";

/** Shared shell for every W-2 step: section background, container and stepper. */
const W2FlowLayout = ({ currentStep, onStepClick, children }) => {
  const { goToStep } = useW2FlowNavigation();

  return (
    <section className="w-full bg-[#F7FAFF] py-10 sm:py-16 border-t border-slate-200/80">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <W2Stepper currentStep={currentStep} onStepClick={onStepClick ?? goToStep} />
        {children}
      </div>
    </section>
  );
};

export default W2FlowLayout;
