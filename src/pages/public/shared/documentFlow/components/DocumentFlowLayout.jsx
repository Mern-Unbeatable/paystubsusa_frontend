import React from "react";
import DocumentStepper from "./DocumentStepper";

/** Shared shell for every step of a document flow: section background, container and stepper. */
const DocumentFlowLayout = ({ steps, currentStep, onStepClick, children }) => (
  <section className="w-full bg-[#F7FAFF] py-10 sm:py-16 border-t border-slate-200/80">
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
      <DocumentStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={onStepClick}
      />
      {children}
    </div>
  </section>
);

export default DocumentFlowLayout;
