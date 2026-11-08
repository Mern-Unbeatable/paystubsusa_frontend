import { useNavigate } from "react-router-dom";
import { DOCUMENT_STEPS, buildFormStepPath } from "../utils/documentFlow";

/** Navigation callbacks for each transition in a document flow (see `flow.paths`). */
export function useDocumentFlowNavigation(flow) {
  const navigate = useNavigate();
  const { paths, paidFlag } = flow;

  const goToStep = (step) => {
    if (step === DOCUMENT_STEPS.PREVIEW) navigate(paths.preview);
    else if (step === DOCUMENT_STEPS.CHECKOUT) navigate(paths.checkout);
    else navigate(buildFormStepPath(paths.form, step));
  };

  return {
    goToStep,
    onContinueToPreview: () => navigate(paths.preview),
    onBackToForm: () =>
      navigate(buildFormStepPath(paths.form, DOCUMENT_STEPS.LAST_FORM_STEP)),
    onContinueToCheckout: () => navigate(paths.checkout),
    onBackToPreview: () => navigate(paths.preview),
    onPaymentSuccess: () => {
      paidFlag.markPaid();
      navigate(paths.success, { replace: true });
    },
    onStartOver: () => {
      paidFlag.clearPaid();
      navigate(paths.form);
    },
  };
}
