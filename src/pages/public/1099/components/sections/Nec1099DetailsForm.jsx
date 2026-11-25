import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import DocumentLivePreview from "../../../shared/documentFlow/components/DocumentLivePreview";
import DocumentOrderSummary from "../../../shared/documentFlow/components/DocumentOrderSummary";
import { NEC1099_FLOW, NEC1099_FORM_STEPS } from "../../utils/nec1099Flow";
import { findIncompleteNec1099Fields } from "../../utils/nec1099Validation";
import {
  scrollNec1099FlowIntoView,
  useNec1099FormStep,
} from "../../hooks/useNec1099FormStep";
import { toFieldErrorMap } from "../../../Generator/components/common/detailsForm/fieldValidation";
import Nec1099Stepper from "../common/flow/Nec1099Stepper";
import StepRibbon from "../common/flow/StepRibbon";
import PayerStep from "../common/detailsForm/PayerStep";
import RecipientStep from "../common/detailsForm/RecipientStep";
import CompensationStep from "../common/detailsForm/CompensationStep";
import ReviewStep from "../common/detailsForm/ReviewStep";

const FORM_STEP_COUNT = 4;
const LOCAL_SAVE_TOAST_ID = "nec1099-form-local-save";
const MISSING_FIELDS_TOAST_ID = "nec1099-form-missing-fields";

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
      .getElementById(`nec1099-field-${key}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
};

/**
 * Create-page form: steps 1–4 driven by `?step=` on `/1099-nec/create`.
 */
const Nec1099DetailsForm = ({ form, onContinueToCheckout, onStepClick }) => {
  const { currentStep, setFormStep } = useNec1099FormStep();
  const { formData, updateField } = form;
  const { Document } = NEC1099_FLOW;
  const showOrderSummary = currentStep === NEC1099_FORM_STEPS.REVIEW;
  const skipScrollOnMount = useRef(true);
  const prevStepRef = useRef(currentStep);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (skipScrollOnMount.current) {
      skipScrollOnMount.current = false;
      return;
    }
    scrollNec1099FlowIntoView();
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

    if (currentStep !== NEC1099_FORM_STEPS.REVIEW) return;

    const missing = findIncompleteNec1099Fields(formData);
    if (missing.length > 0) {
      markIncomplete(missing);
      return;
    }

    setFieldErrors((prev) => (Object.keys(prev).length === 0 ? prev : {}));
    // Toast only on compensation → review (3 → 4). Back from checkout remounts silently.
    if (previousStep === NEC1099_FORM_STEPS.COMPENSATION) {
      toast.success("Your 1099-NEC information has been saved.", {
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
    const missing = findIncompleteNec1099Fields(formData);
    if (missing.length === 0) {
      setFieldErrors({});
      return true;
    }
    markIncomplete(missing);
    return false;
  };

  const goToReview = () => {
    if (!ensureCompleteOrFocus()) return;
    setFormStep(NEC1099_FORM_STEPS.REVIEW);
  };

  const handleContinueToCheckout = () => {
    if (!ensureCompleteOrFocus()) return;
    onContinueToCheckout();
  };

  const handleStepperClick = (step) => {
    if (step === NEC1099_FORM_STEPS.REVIEW) {
      goToReview();
      return;
    }
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
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onNext={() => setFormStep(NEC1099_FORM_STEPS.RECIPIENT)}
            />
          )}

          {currentStep === NEC1099_FORM_STEPS.RECIPIENT && (
            <RecipientStep
              formData={formData}
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onBack={() => setFormStep(NEC1099_FORM_STEPS.PAYER)}
              onNext={() => setFormStep(NEC1099_FORM_STEPS.COMPENSATION)}
            />
          )}

          {currentStep === NEC1099_FORM_STEPS.COMPENSATION && (
            <CompensationStep
              formData={formData}
              fieldErrors={fieldErrors}
              updateField={handleUpdateField}
              onBack={() => setFormStep(NEC1099_FORM_STEPS.RECIPIENT)}
              onNext={goToReview}
            />
          )}

          {currentStep === NEC1099_FORM_STEPS.REVIEW && (
            <ReviewStep
              formData={formData}
              onEdit={setFormStep}
              onBack={() => setFormStep(NEC1099_FORM_STEPS.COMPENSATION)}
              onContinue={handleContinueToCheckout}
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
