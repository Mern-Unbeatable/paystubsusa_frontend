import React from "react";
import { Lock } from "lucide-react";
import DocumentLivePreview from "../../../shared/documentFlow/components/DocumentLivePreview";
import DocumentOrderSummary from "../../../shared/documentFlow/components/DocumentOrderSummary";
import { W2_FLOW, W2_FORM_STEPS } from "../../utils/w2Flow";
import { useW2FormStep } from "../../hooks/useW2FormStep";
import W2Stepper from "../common/flow/W2Stepper";
import StepRibbon from "../common/flow/StepRibbon";
import EmployerStep from "../common/detailsForm/EmployerStep";
import EmployeeStep from "../common/detailsForm/EmployeeStep";
import WageTaxStep from "../common/detailsForm/WageTaxStep";
import ReviewStep from "../common/detailsForm/ReviewStep";

const FORM_STEP_COUNT = 4;

/**
 * Create-page form: steps 1–4 driven by `?step=` on `/w-2/create`.
 */
const W2DetailsForm = ({ form, onContinueToCheckout, onStepClick }) => {
  const { currentStep, setFormStep } = useW2FormStep();
  const { formData, updateField } = form;
  const { Document } = W2_FLOW;
  const showOrderSummary = currentStep === W2_FORM_STEPS.REVIEW;

  const handleStepperClick = (step) => {
    if (step <= W2_FORM_STEPS.REVIEW) {
      setFormStep(step);
      return;
    }
    onStepClick?.(step);
  };

  return (
    <>
      <W2Stepper currentStep={currentStep} onStepClick={handleStepperClick} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="relative overflow-hidden lg:col-span-8 bg-white rounded-2xl p-6 pt-12 sm:p-8 sm:pt-12 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <StepRibbon>
            Step {currentStep} of {FORM_STEP_COUNT}
          </StepRibbon>

          {currentStep === W2_FORM_STEPS.EMPLOYER && (
            <EmployerStep
              formData={formData}
              updateField={updateField}
              onNext={() => setFormStep(W2_FORM_STEPS.EMPLOYEE)}
            />
          )}

          {currentStep === W2_FORM_STEPS.EMPLOYEE && (
            <EmployeeStep
              formData={formData}
              updateField={updateField}
              onBack={() => setFormStep(W2_FORM_STEPS.EMPLOYER)}
              onNext={() => setFormStep(W2_FORM_STEPS.WAGES)}
            />
          )}

          {currentStep === W2_FORM_STEPS.WAGES && (
            <WageTaxStep
              formData={formData}
              updateField={updateField}
              onBack={() => setFormStep(W2_FORM_STEPS.EMPLOYEE)}
              onNext={() => setFormStep(W2_FORM_STEPS.REVIEW)}
            />
          )}

          {currentStep === W2_FORM_STEPS.REVIEW && (
            <ReviewStep
              formData={formData}
              onEdit={setFormStep}
              onBack={() => setFormStep(W2_FORM_STEPS.WAGES)}
              onContinue={onContinueToCheckout}
            />
          )}
        </div>

        <div className="lg:col-span-4 sticky top-32 flex flex-col gap-6">
          {showOrderSummary ? (
            <DocumentOrderSummary
              title={W2_FLOW.orderTitle}
              subtitle={W2_FLOW.getOrderSubtitle(formData)}
              priceLabel={W2_FLOW.priceLabel}
            />
          ) : (
            <div className="flex items-center justify-between px-1">
              <span className="text-[14px] font-bold text-slate-800">
                Live Preview
              </span>
            </div>
          )}

          <DocumentLivePreview>
            <Document formData={formData} />
          </DocumentLivePreview>

          <div className="flex items-center gap-1.5 text-slate-400 text-[12px]">
            <Lock className="w-3.5 h-3.5" />
            <span>Your final document is available after checkout.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default W2DetailsForm;
