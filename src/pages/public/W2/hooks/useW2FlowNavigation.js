import { useNavigate } from "react-router-dom";
import { PATHS, buildW2FormPath } from "../../../../config/paths";
import { W2_STEPS } from "../utils/w2Flow";
import { clearW2Paid, markW2Paid } from "../utils/w2Storage";

/** Navigation callbacks for each transition in the W-2 flow. */
export function useW2FlowNavigation() {
  const navigate = useNavigate();

  const goToStep = (step) => {
    if (step === W2_STEPS.PREVIEW) navigate(PATHS.PUBLIC.w2Preview);
    else if (step === W2_STEPS.CHECKOUT) navigate(PATHS.PUBLIC.w2Checkout);
    else navigate(buildW2FormPath(step));
  };

  return {
    goToStep,
    onContinueToPreview: () => navigate(PATHS.PUBLIC.w2Preview),
    onBackToForm: () => navigate(buildW2FormPath(W2_STEPS.WAGES)),
    onContinueToCheckout: () => navigate(PATHS.PUBLIC.w2Checkout),
    onBackToPreview: () => navigate(PATHS.PUBLIC.w2Preview),
    onPaymentSuccess: () => {
      markW2Paid();
      navigate(PATHS.PUBLIC.w2Success, { replace: true });
    },
    onStartOver: () => {
      clearW2Paid();
      navigate(PATHS.PUBLIC.w2);
    },
  };
}
