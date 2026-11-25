import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import DocumentLivePreview from "../../../shared/documentFlow/components/DocumentLivePreview";
import DocumentOrderSummary from "../../../shared/documentFlow/components/DocumentOrderSummary";
import { DIRECT_DEPOSIT_FLOW, DD_FORM_STEPS } from "../../utils/directDepositFlow";
import { findIncompleteDirectDepositFields } from "../../utils/directDepositValidation";
import {
  scrollDirectDepositFlowIntoView,
  useDirectDepositFormStep,
} from "../../hooks/useDirectDepositFormStep";
import { toFieldErrorMap } from "../../../Generator/components/common/detailsForm/fieldValidation";
import DirectDepositStepper from "../common/flow/DirectDepositStepper";
import StepRibbon from "../common/flow/StepRibbon";
import EmployerStep from "../common/detailsForm/EmployerStep";
import EmployeeStep from "../common/detailsForm/EmployeeStep";
import DepositStep from "../common/detailsForm/DepositStep";
import ReviewStep from "../common/detailsForm/ReviewStep";

const FORM_STEP_COUNT = 4;
const LOCAL_SAVE_TOAST_ID = "dd-form-local-save";
const MISSING_FIELDS_TOAST_ID = "dd-form-missing-fields";

const missingFieldsMessage = (missing) => {
  if (missing.length === 1) {
    return missing[0].message ?? `${missing[0].label} is required.`;
  }
  const labels = missing.map((f) => f.label);
  if (labels.length <= 3) return `Please complete: ${labels.join(", ")}.`;
  return `Please complete ${labels.length} required fields (e.g. ${labels.slice(0, 3).join(", ")}).`;
};

const scrollToField = (key) => {
  requestAnimationFrame(() => {
    document
      .getElementById(`dd-field-${key}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
};

/**
 * Create-page form: steps 1–4 driven by `?step=` on `/direct-deposit/create`.
 */
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
  const prevStepRef = useRef(currentStep);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    scrollDirectDepositFlowIntoView();
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

    if (currentStep !== DD_FORM_STEPS.REVIEW) return;

    const missing = findIncompleteDirectDepositFields(formData);
    if (missing.length > 0) {
      markIncomplete(missing);
      return;
    }

    setFieldErrors((prev) => (Object.keys(prev).length === 0 ? prev : {}));
    // Toast only on deposit → review (3 → 4). Back from checkout remounts silently.
    if (previousStep === DD_FORM_STEPS.DEPOSIT) {
      toast.success("Your direct deposit information has been saved.", {
        id: LOCAL_SAVE_TOAST_ID,
        duration: 4000,
      });
    }
  }, [currentStep, formData]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const ensureCompleteOrFocus = () => {
    const missing = findIncompleteDirectDepositFields(formData);
    if (missing.length === 0) {
      setFieldErrors({});
      return true;
    }
    markIncomplete(missing);
    return false;
  };

  const goToReview = () => {
    if (!ensureCompleteOrFocus()) return;
    setFormStep(DD_FORM_STEPS.REVIEW);
  };

  const handleContinueToCheckout = () => {
    if (!ensureCompleteOrFocus()) return;
    onContinueToCheckout();
  };

  const handleStepperClick = (step) => {
    if (step === DD_FORM_STEPS.REVIEW) {
      goToReview();
      return;
    }
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
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onNext={() => setFormStep(DD_FORM_STEPS.EMPLOYEE)}
            />
          )}

          {currentStep === DD_FORM_STEPS.EMPLOYEE && (
            <EmployeeStep
              formData={formData}
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onBack={() => setFormStep(DD_FORM_STEPS.EMPLOYER)}
              onNext={() => setFormStep(DD_FORM_STEPS.DEPOSIT)}
            />
          )}

          {currentStep === DD_FORM_STEPS.DEPOSIT && (
            <DepositStep
              formData={formData}
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onBack={() => setFormStep(DD_FORM_STEPS.EMPLOYEE)}
              onNext={goToReview}
            />
          )}

          {currentStep === DD_FORM_STEPS.REVIEW && (
            <ReviewStep
              formData={formData}
              onEdit={setFormStep}
              onBack={() => setFormStep(DD_FORM_STEPS.DEPOSIT)}
              onContinue={handleContinueToCheckout}
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
