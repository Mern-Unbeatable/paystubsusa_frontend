import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../config/paths";
import {
  PAYSTUB_FORM_STEPS,
  PAYSTUB_PAGE_STEPS,
} from "../utils/paystubFlow";
import {
  beginAnotherPaystub,
  clearCheckoutOrder,
  resetCheckout,
} from "../../../../features/public/checkout/checkoutSlice";
import {
  PAYSTUB_CHECKOUT_PHASE,
  buildPaystubCreateQueryPath,
  scrollPaystubFlowIntoView,
} from "./usePaystubFormStep";

/** Navigation callbacks for each transition in the paystub flow. */
export function usePaystubFlowNavigation(templateId) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToFormStep = (step) => {
    navigate(buildPaystubCreateQueryPath(templateId, step));
    scrollPaystubFlowIntoView();
  };

  const goToPackage = () => {
    navigate(
      buildPaystubCreateQueryPath(
        templateId,
        PAYSTUB_PAGE_STEPS.PACKAGE,
        PAYSTUB_CHECKOUT_PHASE.PACKAGE,
      ),
      // Sync update so package isn't blocked by review-step state work.
      { flushSync: true },
    );
    scrollPaystubFlowIntoView();
  };

  const goToCheckout = (
    phase = PAYSTUB_CHECKOUT_PHASE.VERIFYING,
    { replace = false } = {},
  ) => {
    navigate(
      buildPaystubCreateQueryPath(
        templateId,
        PAYSTUB_PAGE_STEPS.CHECKOUT,
        phase,
      ),
      { replace },
    );
    scrollPaystubFlowIntoView();
  };

  return {
    onBackToTemplates: () => {
      navigate(PATHS.PUBLIC.paystubGenerator);
      dispatch(resetCheckout());
    },
    /** Create another stub on the same template, starting at package selection. */
    onStartOver: () => {
      dispatch(beginAnotherPaystub());
      goToPackage();
    },
    /** Swaps the template while staying on the same step/checkout phase. */
    onSwitchTemplate: (nextTemplateId, { step, checkoutPhase } = {}) => {
      dispatch(clearCheckoutOrder());
      const nextStep = step ?? PAYSTUB_FORM_STEPS.EMPLOYER;
      navigate(
        buildPaystubCreateQueryPath(nextTemplateId, nextStep, checkoutPhase),
        { replace: true },
      );
      scrollPaystubFlowIntoView();
    },
    onContinueToPackage: goToPackage,
    onBackToReview: () => goToFormStep(PAYSTUB_FORM_STEPS.REVIEW),
    onBackToFormStep: goToFormStep,
    onContinueToCheckout: () =>
      goToCheckout(PAYSTUB_CHECKOUT_PHASE.VERIFYING),
    onBackToPackage: goToPackage,
    onCheckoutVerifying: (opts) =>
      goToCheckout(PAYSTUB_CHECKOUT_PHASE.VERIFYING, opts),
    onCheckoutVerified: (opts) =>
      goToCheckout(PAYSTUB_CHECKOUT_PHASE.VERIFIED, opts),
    onPaymentSuccess: () =>
      goToCheckout(PAYSTUB_CHECKOUT_PHASE.SUCCESS, { replace: true }),
    goToStep: (step) => {
      if (step <= PAYSTUB_FORM_STEPS.REVIEW) {
        goToFormStep(step);
        return;
      }
      if (step === PAYSTUB_PAGE_STEPS.PACKAGE) {
        goToPackage();
        return;
      }
      goToCheckout(PAYSTUB_CHECKOUT_PHASE.VERIFYING);
    },
  };
}
