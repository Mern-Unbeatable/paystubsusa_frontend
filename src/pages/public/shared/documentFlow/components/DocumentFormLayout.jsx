import React from "react";
import DocumentFlowLayout from "./DocumentFlowLayout";
import DocumentLivePreview from "./DocumentLivePreview";

/** Form steps 1-3: form card on the left, sticky live preview on the right. */
const DocumentFormLayout = ({
  flow,
  formData,
  currentStep,
  onStepClick,
  children,
}) => {
  const { Document } = flow;

  return (
    <DocumentFlowLayout
      steps={flow.steps}
      currentStep={currentStep}
      onStepClick={onStepClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 md:p-10">
            {children}
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
          <DocumentLivePreview>
            <Document formData={formData} />
          </DocumentLivePreview>
        </div>
      </div>
    </DocumentFlowLayout>
  );
};

export default DocumentFormLayout;
