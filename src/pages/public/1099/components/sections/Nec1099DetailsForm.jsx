import React from "react";
import { Lock } from "lucide-react";
import DocumentLivePreview from "../../../shared/documentFlow/components/DocumentLivePreview";
import DocumentOrderSummary from "../../../shared/documentFlow/components/DocumentOrderSummary";
import { NEC1099_FLOW, NEC1099_FORM_STEPS } from "../../utils/nec1099Flow";
import { useNec1099FormStep } from "../../hooks/useNec1099FormStep";
import Nec1099Stepper from "../common/flow/Nec1099Stepper";
import StepRibbon from "../common/flow/StepRibbon";
import PayerStep from "../common/detailsForm/PayerStep";
import RecipientStep from "../common/detailsForm/RecipientStep";
import CompensationStep from "../common/detailsForm/CompensationStep";
import ReviewStep from "../common/detailsForm/ReviewStep";

const FORM_STEP_COUNT = 4;

const Nec1099DetailsForm = ({ form, onContinueToCheckout, onStepClick }) => {
  const { currentStep, setFormStep } = useNec1099FormStep();
  const { formData, updateField } = form;
  const { Document } = NEC1099_FLOW;
  const showOrderSummary = currentStep === NEC1099_FORM_STEPS.REVIEW;

  const handleStepperClick = (step) => {
    if (step <= NEC1099_FORM_STEPS.REVIEW) {
      setFormStep(step);
      return;
    }
    onStepClick?.(step);
  };

  return (
    <>
      <Nec1099Stepper
        currentStep={currentStep}
        onStepClick={handleStepperClick}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="relative overflow-hidden lg:col-span-8 bg-white rounded-2xl p-6 pt-12 sm:p-8 sm:pt-12 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <StepRibbon>
            Step {currentStep} of {FORM_STEP_COUNT}
          </StepRibbon>

          {currentStep === NEC1099_FORM_STEPS.PAYER && (
            <PayerStep
              formData={formData}
              updateField={updateField}
              onNext={() => setFormStep(NEC1099_FORM_STEPS.RECIPIENT)}
            />
          )}

          {currentStep === NEC1099_FORM_STEPS.RECIPIENT && (
            <RecipientStep
              formData={formData}
              updateField={updateField}
              onBack={() => setFormStep(NEC1099_FORM_STEPS.PAYER)}
              onNext={() => setFormStep(NEC1099_FORM_STEPS.COMPENSATION)}
            />
          )}

          {currentStep === NEC1099_FORM_STEPS.COMPENSATION && (
            <CompensationStep
              formData={formData}
              updateField={updateField}
              onBack={() => setFormStep(NEC1099_FORM_STEPS.RECIPIENT)}
              onNext={() => setFormStep(NEC1099_FORM_STEPS.REVIEW)}
            />
          )}

          {currentStep === NEC1099_FORM_STEPS.REVIEW && (
            <ReviewStep
              formData={formData}
              onEdit={setFormStep}
              onBack={() => setFormStep(NEC1099_FORM_STEPS.COMPENSATION)}
              onContinue={onContinueToCheckout}
            />
          )}
        </div>

        <div className="lg:col-span-4 sticky top-32 flex flex-col gap-6">
          {showOrderSummary ? (
            <DocumentOrderSummary
              title={NEC1099_FLOW.orderTitle}
              subtitle={NEC1099_FLOW.getOrderSubtitle(formData)}
              priceLabel={NEC1099_FLOW.priceLabel}
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

export default Nec1099DetailsForm;
