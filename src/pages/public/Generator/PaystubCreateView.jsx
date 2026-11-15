import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaystubFlowPage from "./components/common/flow/PaystubFlowPage";
import TemplateSelectionModal from "./components/common/templatePicker/TemplateSelectionModal";
import PaystubDetailsForm from "./components/sections/PaystubDetailsForm";
import PaystubPackagePanel from "./components/sections/PaystubPackagePanel";
import PaystubCheckoutPanel from "./components/sections/PaystubCheckoutPanel";
import PaystubSuccessPanel from "./components/sections/PaystubSuccessPanel";
import { usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import {
  PAYSTUB_CHECKOUT_PHASE,
  PAYSTUB_CHECKOUT_QUERY_PARAM,
  PAYSTUB_STEP_QUERY_PARAM,
  readPaystubCheckoutPhase,
  readPaystubStep,
} from "./hooks/usePaystubFormStep";
import { PAYSTUB_FORM_STEPS, PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";

/**
 * Create flow on one URL:
 * - form `?step=1–4`
 * - package `?step=5&checkout=package`
 * - checkout `?step=6&checkout=verifying|verified|success`
 */
const PaystubCreateContent = ({ template }) => {
  const form = usePaystubFormData();
  const {
    onBackToTemplates,
    onSwitchTemplate,
    onContinueToPackage,
    goToStep,
  } = usePaystubFlowNavigation(template.id);
  const [searchParams, setSearchParams] = useSearchParams();
  const step = readPaystubStep(searchParams);
  const checkoutPhase = readPaystubCheckoutPhase(searchParams);
  const isPackage =
    step === PAYSTUB_PAGE_STEPS.PACKAGE ||
    checkoutPhase === PAYSTUB_CHECKOUT_PHASE.PACKAGE;
  const isCheckout = step === PAYSTUB_PAGE_STEPS.CHECKOUT;
  const isSuccess =
    isCheckout && checkoutPhase === PAYSTUB_CHECKOUT_PHASE.SUCCESS;
  const [templateModalStep, setTemplateModalStep] = useState(null);

  useEffect(() => {
    if (!searchParams.get(PAYSTUB_STEP_QUERY_PARAM)) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(PAYSTUB_STEP_QUERY_PARAM, "1");
          next.delete(PAYSTUB_CHECKOUT_QUERY_PARAM);
          return next;
        },
        { replace: true },
      );
      return;
    }
    if (step === PAYSTUB_PAGE_STEPS.PACKAGE && !checkoutPhase) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(PAYSTUB_STEP_QUERY_PARAM, String(PAYSTUB_PAGE_STEPS.PACKAGE));
          next.set(
            PAYSTUB_CHECKOUT_QUERY_PARAM,
            PAYSTUB_CHECKOUT_PHASE.PACKAGE,
          );
          return next;
        },
        { replace: true },
      );
      return;
    }
    if (isCheckout && !checkoutPhase) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(
            PAYSTUB_STEP_QUERY_PARAM,
            String(PAYSTUB_PAGE_STEPS.CHECKOUT),
          );
          next.set(
            PAYSTUB_CHECKOUT_QUERY_PARAM,
            PAYSTUB_CHECKOUT_PHASE.VERIFYING,
          );
          return next;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams, step, checkoutPhase, isCheckout]);

  if (isSuccess) return <PaystubSuccessPanel template={template} />;
  if (isCheckout) return <PaystubCheckoutPanel template={template} />;
  if (isPackage) return <PaystubPackagePanel template={template} />;

  return (
    <>
      <PaystubDetailsForm
        template={template}
        form={form}
        onBackToTemplates={onBackToTemplates}
        onChangeTemplate={setTemplateModalStep}
        onContinueToPackage={onContinueToPackage}
        onStepClick={goToStep}
      />
      <TemplateSelectionModal
        open={templateModalStep !== null}
        selectedTemplateId={template.id}
        onClose={() => setTemplateModalStep(null)}
        onConfirm={(nextId) => {
          onSwitchTemplate(nextId, {
            step: templateModalStep ?? PAYSTUB_FORM_STEPS.EMPLOYER,
          });
          setTemplateModalStep(null);
        }}
      />
    </>
  );
};

const PaystubCreateView = () => {
  const [searchParams] = useSearchParams();
  const checkoutPhase = readPaystubCheckoutPhase(searchParams);
  const step = readPaystubStep(searchParams);
  const isSuccess =
    step === PAYSTUB_PAGE_STEPS.CHECKOUT &&
    checkoutPhase === PAYSTUB_CHECKOUT_PHASE.SUCCESS;

  return (
    <PaystubFlowPage compact={isSuccess}>
      {(template) => <PaystubCreateContent template={template} />}
    </PaystubFlowPage>
  );
};

export default PaystubCreateView;
