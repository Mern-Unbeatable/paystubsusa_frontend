import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCheckout } from "../../../../features/public/checkout/checkoutSlice";
import {
  DD_FORM_STEPS,
  DIRECT_DEPOSIT_FLOW,
  DD_PAGE_STEPS,
} from "../utils/directDepositFlow";
import {
  DD_CHECKOUT_PHASE,
  buildDirectDepositCreatePath,
  scrollDirectDepositFlowIntoView,
} from "./useDirectDepositFormStep";

export function useDirectDepositFlowNavigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { paths } = DIRECT_DEPOSIT_FLOW;

  const goToFormStep = (step) => {
    navigate(buildDirectDepositCreatePath(paths.form, step));
    scrollDirectDepositFlowIntoView();
  };

  const goToCheckout = (
    phase = DD_CHECKOUT_PHASE.VERIFYING,
    { replace = false } = {},
  ) => {
    navigate(
      buildDirectDepositCreatePath(paths.form, DD_PAGE_STEPS.CHECKOUT, phase),
      { replace },
    );
    scrollDirectDepositFlowIntoView();
  };

  return {
    onBackToFormStep: goToFormStep,
    onBackToReview: () => goToFormStep(DD_FORM_STEPS.REVIEW),
    onContinueToCheckout: () => goToCheckout(DD_CHECKOUT_PHASE.VERIFYING),
    onCheckoutVerifying: (opts) =>
      goToCheckout(DD_CHECKOUT_PHASE.VERIFYING, opts),
    onCheckoutVerified: (opts) =>
      goToCheckout(DD_CHECKOUT_PHASE.VERIFIED, opts),
    onPaymentSuccess: () =>
      goToCheckout(DD_CHECKOUT_PHASE.SUCCESS, { replace: true }),
    onStartOver: () => {
      dispatch(resetCheckout());
      navigate(buildDirectDepositCreatePath(paths.form, DD_FORM_STEPS.EMPLOYER));
      scrollDirectDepositFlowIntoView();
    },
    goToStep: (step) => {
      if (step <= DD_FORM_STEPS.REVIEW) {
        goToFormStep(step);
        return;
      }
      goToCheckout(DD_CHECKOUT_PHASE.VERIFYING);
    },
  };
}
