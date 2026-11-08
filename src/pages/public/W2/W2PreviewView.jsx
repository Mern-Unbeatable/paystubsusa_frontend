import React from "react";
import W2FlowLayout from "./components/common/W2FlowLayout";
import W2LivePreview from "./components/common/W2LivePreview";
import W2OrderSummary from "./components/common/W2OrderSummary";
import W2ReviewSection from "./components/sections/W2ReviewSection";
import { useW2FormData } from "./hooks/useW2FormData";
import { useW2FlowNavigation } from "./hooks/useW2FlowNavigation";
import { W2_STEPS } from "./utils/w2Flow";

const W2PreviewView = () => {
  const { formData } = useW2FormData();
  const { goToStep, onBackToForm, onContinueToCheckout } = useW2FlowNavigation();

  return (
    <W2FlowLayout currentStep={W2_STEPS.PREVIEW}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 md:p-10">
            <W2ReviewSection
              formData={formData}
              onEdit={goToStep}
              onBack={onBackToForm}
              onNext={onContinueToCheckout}
            />
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 sticky top-28 flex flex-col gap-6">
          <W2OrderSummary formData={formData} />
          <W2LivePreview formData={formData} />
        </div>
      </div>
    </W2FlowLayout>
  );
};

export default W2PreviewView;
