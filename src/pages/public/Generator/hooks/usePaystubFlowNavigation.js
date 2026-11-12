import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  buildPaystubCheckoutPath,
  buildPaystubCreatePath,
  buildPaystubGeneratorPath,
  buildPaystubPackagePath,
  buildPaystubSuccessPath,
} from "../../../../config/paths";
import { PAYSTUB_FORM_STEPS, getFlowPathBuilder } from "../utils/paystubFlow";
import { clearCheckoutOrder, resetCheckout } from "../../../../features/public/checkout/checkoutSlice";

/** Navigation callbacks for each transition in the paystub flow. */
export function usePaystubFlowNavigation(templateId) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  return {
    onBackToTemplates: () => {
      dispatch(resetCheckout());
      navigate(buildPaystubGeneratorPath(templateId));
    },
    /** Swaps the template while staying on the current flow page. */
    onSwitchTemplate: (nextTemplateId, state) => {
      dispatch(clearCheckoutOrder());
      navigate(getFlowPathBuilder(pathname)(nextTemplateId), { replace: true, state });
    },
    onContinueToPackage: () => navigate(buildPaystubPackagePath(templateId)),
    onBackToReview: () =>
      navigate(buildPaystubCreatePath(templateId), {
        state: { step: PAYSTUB_FORM_STEPS.REVIEW },
      }),
    onBackToFormStep: (step) =>
      navigate(buildPaystubCreatePath(templateId), { state: { step } }),
    onContinueToCheckout: () => navigate(buildPaystubCheckoutPath(templateId)),
    onBackToPackage: () => navigate(buildPaystubPackagePath(templateId)),
    onPaymentSuccess: () => navigate(buildPaystubSuccessPath(templateId), { replace: true }),
    onStartOver: () => {
      dispatch(resetCheckout());
      navigate(buildPaystubCreatePath(templateId));
    },
  };
}
