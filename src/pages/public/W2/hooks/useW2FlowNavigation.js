import { useNavigate } from "react-router-dom";
import { W2_FORM_STEPS, W2_FLOW } from "../utils/w2Flow";

/** Navigation callbacks for each transition in the W-2 flow. */
export function useW2FlowNavigation() {
  const navigate = useNavigate();
  const { paths, paidFlag } = W2_FLOW;

  return {
    onBackToFormStep: (step) => navigate(paths.form, { state: { step } }),
    onBackToReview: () =>
      navigate(paths.form, { state: { step: W2_FORM_STEPS.REVIEW } }),
    onContinueToCheckout: () => navigate(paths.checkout),
    onPaymentSuccess: () => {
      paidFlag.markPaid();
      navigate(paths.success, { replace: true });
    },
    onStartOver: () => {
      paidFlag.clearPaid();
      navigate(paths.form);
    },
    /** Stepper clicks: form steps → landing with state; checkout → checkout route. */
    goToStep: (step) => {
      if (step <= W2_FORM_STEPS.REVIEW) {
        navigate(paths.form, { state: { step } });
        return;
      }
      navigate(paths.checkout);
    },
  };
}
