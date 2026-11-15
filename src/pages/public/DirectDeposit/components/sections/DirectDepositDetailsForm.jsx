import React, { useEffect, useRef } from "react";
import { Lock } from "lucide-react";
import DocumentLivePreview from "../../../shared/documentFlow/components/DocumentLivePreview";
import DocumentOrderSummary from "../../../shared/documentFlow/components/DocumentOrderSummary";
import { DIRECT_DEPOSIT_FLOW, DD_FORM_STEPS } from "../../utils/directDepositFlow";
import {
  scrollDirectDepositFlowIntoView,
  useDirectDepositFormStep,
} from "../../hooks/useDirectDepositFormStep";
import DirectDepositStepper from "../common/flow/DirectDepositStepper";
import StepRibbon from "../common/flow/StepRibbon";
import EmployerStep from "../common/detailsForm/EmployerStep";
import EmployeeStep from "../common/detailsForm/EmployeeStep";
import DepositStep from "../common/detailsForm/DepositStep";
import ReviewStep from "../common/detailsForm/ReviewStep";

const FORM_STEP_COUNT = 4;

const DirectDepositDetailsForm = ({
  form,
  onContinueToCheckout,
  onStepClick,
}) => {
  const { currentStep, setFormStep } = useDirectDepositFormStep();
  const { formData, updateField } = form;
  const { Document } = DIRECT_DEPOSIT_FLOW;
  const showOrderSummary = currentStep === DD_FORM_STEPS.REVIEW;
  const skipScrollOnMount = useRef(true);

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    scrollDirectDepositFlowIntoView();
  }, [currentStep]);

  const handleStepperClick = (step) => {
    if (step <= DD_FORM_STEPS.REVIEW) {
      setFormStep(step);
      return;
    }
    onStepClick?.(step);
  };

  return (
    <>
      <DirectDepositStepper
        currentStep={currentStep}
        onStepClick={handleStepperClick}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="relative overflow-hidden lg:col-span-8 bg-white rounded-2xl p-6 pt-12 sm:p-8 sm:pt-12 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <StepRibbon>
            Step {currentStep} of {FORM_STEP_COUNT}
          </StepRibbon>

          {currentStep === DD_FORM_STEPS.EMPLOYER && (
            <EmployerStep
              formData={formData}
              updateField={updateField}
              onNext={() => setFormStep(DD_FORM_STEPS.EMPLOYEE)}
            />
          )}

          {currentStep === DD_FORM_STEPS.EMPLOYEE && (
            <EmployeeStep
              formData={formData}
              updateField={updateField}
              onBack={() => setFormStep(DD_FORM_STEPS.EMPLOYER)}
              onNext={() => setFormStep(DD_FORM_STEPS.DEPOSIT)}
            />
          )}

          {currentStep === DD_FORM_STEPS.DEPOSIT && (
            <DepositStep
              formData={formData}
              updateField={updateField}
              onBack={() => setFormStep(DD_FORM_STEPS.EMPLOYEE)}
              onNext={() => setFormStep(DD_FORM_STEPS.REVIEW)}
            />
          )}

          {currentStep === DD_FORM_STEPS.REVIEW && (
            <ReviewStep
              formData={formData}
              onEdit={setFormStep}
              onBack={() => setFormStep(DD_FORM_STEPS.DEPOSIT)}
              onContinue={onContinueToCheckout}
            />
          )}
        </div>

        <div className="lg:col-span-4 sticky top-32 flex flex-col gap-6">
          {showOrderSummary ? (
            <DocumentOrderSummary
              title={DIRECT_DEPOSIT_FLOW.orderTitle}
              subtitle={DIRECT_DEPOSIT_FLOW.getOrderSubtitle(formData)}
              priceLabel={DIRECT_DEPOSIT_FLOW.priceLabel}
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

export default DirectDepositDetailsForm;
