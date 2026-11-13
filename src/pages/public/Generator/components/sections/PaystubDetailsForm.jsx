import React, { useState } from "react";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import TemplateDocumentPreview from "../common/TemplateDocumentPreview";
import { PAYSTUB_FORM_STEPS } from "../../utils/paystubFlow";
import { findIncompleteField } from "../../hooks/usePaystubFormData";
import PaystubStepper from "../common/PaystubStepper";
import StepRibbon from "../common/StepRibbon";
import EmployerStep from "./detailsForm/EmployerStep";
import EmployeeStep from "./detailsForm/EmployeeStep";
import PayDetailsStep from "./detailsForm/PayDetailsStep";
import ReviewStep from "./detailsForm/ReviewStep";

const FORM_STEP_COUNT = 4;

const PaystubDetailsForm = ({
  template,
  form,
  initialStep = PAYSTUB_FORM_STEPS.EMPLOYER,
  onBackToTemplates,
  onChangeTemplate,
  onContinueToPackage,
}) => {
  const selectedTemplateId = template.id;
  const [currentStep, setStep] = useState(initialStep);
  const setCurrentStep = (step) => {
    setStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openTemplatePicker = () => onChangeTemplate(currentStep);
  const handleContinueToPackage = () => {
    const missing = findIncompleteField(form.formData);
    if (missing) {
      toast.error(`${missing.label} is required.`);
      setCurrentStep(missing.step);
      return;
    }
    onContinueToPackage();
  };
  const { formData, updateField, calculations } = form;

  return (
    <>
      <PaystubStepper currentStep={currentStep} onStepClick={setCurrentStep} />

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Form Card */}
        <div className="relative overflow-hidden lg:col-span-8 bg-white rounded-2xl p-6 pt-12 sm:p-8 sm:pt-12 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
          <StepRibbon>
            Step {currentStep} of {FORM_STEP_COUNT}
          </StepRibbon>

          {currentStep === PAYSTUB_FORM_STEPS.EMPLOYER && (
            <EmployerStep
              formData={formData}
              updateField={updateField}
              onBack={onBackToTemplates}
              onNext={() => setCurrentStep(PAYSTUB_FORM_STEPS.EMPLOYEE)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.EMPLOYEE && (
            <EmployeeStep
              formData={formData}
              updateField={updateField}
              onBack={() => setCurrentStep(PAYSTUB_FORM_STEPS.EMPLOYER)}
              onNext={() => setCurrentStep(PAYSTUB_FORM_STEPS.PAY)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.PAY && (
            <PayDetailsStep
              form={form}
              onBack={() => setCurrentStep(PAYSTUB_FORM_STEPS.EMPLOYEE)}
              onNext={() => setCurrentStep(PAYSTUB_FORM_STEPS.REVIEW)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.REVIEW && (
            <ReviewStep
              template={template}
              formData={formData}
              calculations={calculations}
              onEdit={setCurrentStep}
              onChangeTemplate={openTemplatePicker}
              onBack={() => setCurrentStep(PAYSTUB_FORM_STEPS.PAY)}
              onContinue={handleContinueToPackage}
            />
          )}
        </div>

        {/* RIGHT COLUMN: The Sticky Live Preview */}
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
