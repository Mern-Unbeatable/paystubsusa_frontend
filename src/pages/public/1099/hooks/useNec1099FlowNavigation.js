import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCheckout } from "../../../../features/public/checkout/checkoutSlice";
import {
  NEC1099_FORM_STEPS,
  NEC1099_FLOW,
  NEC1099_PAGE_STEPS,
} from "../utils/nec1099Flow";
import {
  NEC1099_CHECKOUT_PHASE,
  buildNec1099CreatePath,
} from "./useNec1099FormStep";

export function useNec1099FlowNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paths } = NEC1099_FLOW;

  const goToFormStep = (step) =>
    navigate(buildNec1099CreatePath(paths.form, step));

  const goToCheckout = (
    phase = NEC1099_CHECKOUT_PHASE.VERIFYING,
    { replace = false } = {},
  ) =>
    navigate(
      buildNec1099CreatePath(paths.form, NEC1099_PAGE_STEPS.CHECKOUT, phase),
      { replace },
    );

  return {
    onBackToFormStep: goToFormStep,
    onBackToReview: () => goToFormStep(NEC1099_FORM_STEPS.REVIEW),
    onContinueToCheckout: () => goToCheckout(NEC1099_CHECKOUT_PHASE.VERIFYING),
    onCheckoutVerifying: (opts) =>
      goToCheckout(NEC1099_CHECKOUT_PHASE.VERIFYING, opts),
    onCheckoutVerified: (opts) =>
      goToCheckout(NEC1099_CHECKOUT_PHASE.VERIFIED, opts),
    onPaymentSuccess: () =>
      goToCheckout(NEC1099_CHECKOUT_PHASE.SUCCESS, { replace: true }),
    onStartOver: () => {
      dispatch(resetCheckout());
      navigate(buildNec1099CreatePath(paths.form, NEC1099_FORM_STEPS.PAYER));
    },
    goToStep: (step) => {
      if (step <= NEC1099_FORM_STEPS.REVIEW) {
        goToFormStep(step);
        return;
      }
      goToCheckout(NEC1099_CHECKOUT_PHASE.VERIFYING);
    },
  };
}
