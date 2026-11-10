import { useSearchParams } from "react-router-dom";
import { useDocumentFlowNavigation } from "./useDocumentFlowNavigation";
import { DOCUMENT_STEPS, FORM_STEP_QUERY_PARAM } from "../utils/documentFlow";

const readFormStep = (searchParams) => {
  const step = Number(searchParams.get(FORM_STEP_QUERY_PARAM));
  return step >= DOCUMENT_STEPS.FIRST_FORM_STEP &&
    step <= DOCUMENT_STEPS.LAST_FORM_STEP
    ? step
    : DOCUMENT_STEPS.FIRST_FORM_STEP;
};

/**
 * Current form step (1-3), stored in `?step=` so browser back/forward moves
 * between steps. Next on the last form step goes to the preview route.
 */
export function useFormStep(flow) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStep = readFormStep(searchParams);
  const { goToStep, onContinueToPreview } = useDocumentFlowNavigation(flow);

  const setFormStep = (step) => {
    setSearchParams(
      step > DOCUMENT_STEPS.FIRST_FORM_STEP
        ? { [FORM_STEP_QUERY_PARAM]: String(step) }
        : {},
    );
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  return {
    currentStep,
    handleNext: () =>
      currentStep < DOCUMENT_STEPS.LAST_FORM_STEP
        ? setFormStep(currentStep + 1)
        : onContinueToPreview(),
    handleBack: () => {
      if (currentStep > DOCUMENT_STEPS.FIRST_FORM_STEP)
        setFormStep(currentStep - 1);
    },
    onStepClick: (step) =>
      step <= DOCUMENT_STEPS.LAST_FORM_STEP
        ? setFormStep(step)
        : goToStep(step),
  };
}
