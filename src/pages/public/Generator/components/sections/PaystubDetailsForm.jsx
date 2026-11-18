import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import TemplateDocumentPreview from "../common/preview/TemplateDocumentPreview";
import { PAYSTUB_FORM_STEPS } from "../../utils/paystubFlow";
import {
  findIncompleteFields,
  savePaystubFormDataLocally,
} from "../../hooks/usePaystubFormData";
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
import { toFieldErrorMap } from "../common/detailsForm/fieldValidation";

const FORM_STEP_COUNT = 4;
const LOCAL_SAVE_TOAST_ID = "paystub-form-local-save";
const MISSING_FIELDS_TOAST_ID = "paystub-form-missing-fields";

const missingFieldsMessage = (missing) => {
  if (missing.length === 1) return `${missing[0].label} is required.`;
  const labels = missing.map((f) => f.label);
  if (labels.length <= 3) return `Please complete: ${labels.join(", ")}.`;
  return `Please complete ${labels.length} required fields (e.g. ${labels.slice(0, 3).join(", ")}).`;
};

const scrollToField = (key) => {
  requestAnimationFrame(() => {
    document
      .getElementById(`paystub-field-${key}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
};

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
  const prevStepRef = useRef(currentStep);
  const [fieldErrors, setFieldErrors] = useState({});
  const { formData, steps, updateField, updateDirectDeposit, calculations } =
    form;

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    scrollPaystubFlowIntoView();
  }, [currentStep]);

  const markIncomplete = (missing) => {
    setFieldErrors(toFieldErrorMap(missing));
    toast.error(missingFieldsMessage(missing), {
      id: MISSING_FIELDS_TOAST_ID,
      duration: 5000,
    });
    setFormStep(missing[0].step);
    setTimeout(() => scrollToField(missing[0].key), 120);
  };

  useEffect(() => {
    const previousStep = prevStepRef.current;
    prevStepRef.current = currentStep;

    if (currentStep !== PAYSTUB_FORM_STEPS.REVIEW) return;

    const missing = findIncompleteFields(formData);
    if (missing.length > 0) {
      markIncomplete(missing);
      return;
    }

    // Only clear when something is marked — `setFieldErrors({})` every time
    // re-renders forever (new object) and blocks navigating to package/checkout.
    setFieldErrors((prev) => (Object.keys(prev).length === 0 ? prev : {}));
    try {
      savePaystubFormDataLocally(steps);
      // Toast only on pay details → review (3 → 4). Back from package (5 → 4)
      // remounts on review and still saves silently.
      if (previousStep === PAYSTUB_FORM_STEPS.PAY) {
        toast.success("Your paystub data has been saved.", {
          id: LOCAL_SAVE_TOAST_ID,
          duration: 4000,
        });
      }
    } catch {
      toast.error(
        "Couldn't save your data locally. Storage may be full or unavailable.",
        { id: LOCAL_SAVE_TOAST_ID },
      );
    }
  }, [currentStep, formData, steps]); // eslint-disable-line react-hooks/exhaustive-deps

  const openTemplatePicker = () => onChangeTemplate(currentStep);

  const clearFieldError = (key) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const handleUpdateField = (field, value) => {
    clearFieldError(field);
    updateField(field, value);
  };

  const handleUpdateDirectDeposit = (patch) => {
    Object.keys(patch).forEach(clearFieldError);
    updateDirectDeposit(patch);
  };

  const ensureCompleteOrFocus = () => {
    const missing = findIncompleteFields(formData);
    if (missing.length === 0) {
      setFieldErrors({});
      return true;
    }
    markIncomplete(missing);
    return false;
  };

  const goToReview = () => {
    if (!ensureCompleteOrFocus()) return;
    setFormStep(PAYSTUB_FORM_STEPS.REVIEW);
  };

  const handleContinueToPackage = () => {
    const missing = findIncompleteFields(formData);
    if (missing.length > 0) {
      markIncomplete(missing);
      return;
    }
    onContinueToPackage();
  };

  const handleStepperClick = (step) => {
    if (step === PAYSTUB_FORM_STEPS.REVIEW) {
      goToReview();
      return;
    }
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
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onBack={onBackToTemplates}
              onNext={() => setFormStep(PAYSTUB_FORM_STEPS.EMPLOYEE)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.EMPLOYEE && (
            <EmployeeStep
              formData={formData}
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onBack={() => setFormStep(PAYSTUB_FORM_STEPS.EMPLOYER)}
              onNext={() => setFormStep(PAYSTUB_FORM_STEPS.PAY)}
            />
          )}

          {currentStep === PAYSTUB_FORM_STEPS.PAY && (
            <PayDetailsStep
              form={{
                ...form,
                updateField: handleUpdateField,
                updateDirectDeposit: handleUpdateDirectDeposit,
              }}
              fieldErrors={fieldErrors}
              onBack={() => setFormStep(PAYSTUB_FORM_STEPS.EMPLOYEE)}
              onNext={goToReview}
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
