import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCheckout } from "../../../../features/public/checkout/checkoutSlice";
import { W2_FORM_STEPS, W2_FLOW, W2_PAGE_STEPS } from "../utils/w2Flow";
import {
  W2_CHECKOUT_PHASE,
  buildW2CreatePath,
} from "./useW2FormStep";

/** Navigation callbacks for each transition in the W-2 flow. */
export function useW2FlowNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paths } = W2_FLOW;

  const goToFormStep = (step) =>
    navigate(buildW2CreatePath(paths.form, step));

  const goToCheckout = (phase = W2_CHECKOUT_PHASE.VERIFYING, { replace = false } = {}) =>
    navigate(buildW2CreatePath(paths.form, W2_PAGE_STEPS.CHECKOUT, phase), {
      replace,
    });

  return {
    onBackToFormStep: goToFormStep,
    onBackToReview: () => goToFormStep(W2_FORM_STEPS.REVIEW),
    onContinueToCheckout: () => goToCheckout(W2_CHECKOUT_PHASE.VERIFYING),
    onCheckoutVerifying: (opts) =>
      goToCheckout(W2_CHECKOUT_PHASE.VERIFYING, opts),
    onCheckoutVerified: (opts) =>
      goToCheckout(W2_CHECKOUT_PHASE.VERIFIED, opts),
    onPaymentSuccess: () =>
      goToCheckout(W2_CHECKOUT_PHASE.SUCCESS, { replace: true }),
    onStartOver: () => {
      dispatch(resetCheckout());
      navigate(buildW2CreatePath(paths.form, W2_FORM_STEPS.EMPLOYER));
    },
    goToStep: (step) => {
      if (step <= W2_FORM_STEPS.REVIEW) {
        goToFormStep(step);
        return;
      }
      goToCheckout(W2_CHECKOUT_PHASE.VERIFYING);
    },
  };
}
