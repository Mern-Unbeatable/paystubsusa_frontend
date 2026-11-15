import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import TemplateDocumentPreview from "../common/preview/TemplateDocumentPreview";
import { PAYSTUB_FORM_STEPS } from "../../utils/paystubFlow";
import { findIncompleteField } from "../../hooks/usePaystubFormData";
import {
  scrollPaystubFlowIntoView,
  usePaystubFormStep,
} from "../../hooks/usePaystubFormStep";
import PaystubStepper from "../common/flow/PaystubStepper";
import StepRibbon from "../common/flow/StepRibbon";
import EmployerStep from "../common/detailsForm/EmployerStep";
import EmployeeStep from "../common/detailsForm/EmployeeStep";
import PayDetailsStep from "../common/detailsForm/PayDetailsStep";
import ReviewStep from "../common/detailsForm/ReviewStep";

const FORM_STEP_COUNT = 4;

const PaystubDetailsForm = ({
  template,
  form,
  onBackToTemplates,
  onChangeTemplate,
  onContinueToPackage,
  onStepClick,
}) => {
  const selectedTemplateId = template.id;
  const { currentStep, setFormStep } = usePaystubFormStep();
  const skipScrollOnMount = useRef(true);
  const { formData, updateField, calculations } = form;

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    scrollPaystubFlowIntoView();
  }, [currentStep]);

  const openTemplatePicker = () => onChangeTemplate(currentStep);

  const handleContinueToPackage = () => {
    const missing = findIncompleteField(formData);
    if (missing) {
      toast.error(`${missing.label} is required.`);
      setFormStep(missing.step);
      return;
    }
    onContinueToPackage();
  };

  const handleStepperClick = (step) => {
    if (step <= PAYSTUB_FORM_STEPS.REVIEW) {
      setFormStep(step);
      return;
    }
    onStepClick?.(step);
  };

  return (
    <>
      <PaystubStepper
        currentStep={currentStep}
        onStepClick={handleStepperClick}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="relative overflow-hidden lg:col-span-8 bg-white rounded-2xl p-6 pt-12 sm:p-8 sm:pt-12 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <StepRibbon>
            Step {currentStep} of {FORM_STEP_COUNT}
          </StepRibbon>

          {currentStep === PAYSTUB_FORM_STEPS.EMPLOYER && (
            <EmployerStep
              formData={formData}
              updateField={updateField}
              onBack={onBackToTemplates}
              onNext={() => setFormStep(PAYSTUB_FORM_STEPS.EMPLOYEE)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.EMPLOYEE && (
            <EmployeeStep
              formData={formData}
              updateField={updateField}
              onBack={() => setFormStep(PAYSTUB_FORM_STEPS.EMPLOYER)}
              onNext={() => setFormStep(PAYSTUB_FORM_STEPS.PAY)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.PAY && (
            <PayDetailsStep
              form={form}
              onBack={() => setFormStep(PAYSTUB_FORM_STEPS.EMPLOYEE)}
              onNext={() => setFormStep(PAYSTUB_FORM_STEPS.REVIEW)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.REVIEW && (
            <ReviewStep
              template={template}
              formData={formData}
              calculations={calculations}
              onEdit={setFormStep}
              onChangeTemplate={openTemplatePicker}
              onBack={() => setFormStep(PAYSTUB_FORM_STEPS.PAY)}
              onContinue={handleContinueToPackage}
            />
          )}
        </div>

        <div className="lg:col-span-4 sticky top-32">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[14px] font-bold text-slate-800">
              Live Preview • Template {selectedTemplateId}
            </span>
            <button
              type="button"
              onClick={openTemplatePicker}
              className="text-[13px] font-medium text-secondary hover:text-blue-200 hover:underline transition cursor-pointer"
            >
              Change Template
            </button>
          </div>

          <TemplateDocumentPreview
            template={template}
            formData={formData}
            calculations={calculations}
          />

          <div className="flex items-center gap-1.5 mt-2.5 text-slate-400 text-[12px]">
            <Lock className="w-3.5 h-3.5" />
            <span>Your final document is available after checkout.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaystubDetailsForm;
