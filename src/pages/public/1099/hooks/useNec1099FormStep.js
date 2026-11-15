import { useSearchParams } from "react-router-dom";
import { NEC1099_FORM_STEPS, NEC1099_PAGE_STEPS } from "../utils/nec1099Flow";

export const NEC1099_STEP_QUERY_PARAM = "step";
export const NEC1099_CHECKOUT_QUERY_PARAM = "checkout";

export const NEC1099_CHECKOUT_PHASE = {
  VERIFYING: "verifying",
  VERIFIED: "verified",
  SUCCESS: "success",
};

const FIRST = NEC1099_FORM_STEPS.PAYER;
const LAST_FORM = NEC1099_FORM_STEPS.REVIEW;
const CHECKOUT = NEC1099_PAGE_STEPS.CHECKOUT;
const VALID_CHECKOUT = new Set(Object.values(NEC1099_CHECKOUT_PHASE));

export const readNec1099Step = (searchParams) => {
  const step = Number(searchParams.get(NEC1099_STEP_QUERY_PARAM));
  if (step === CHECKOUT) return CHECKOUT;
  return step >= FIRST && step <= LAST_FORM ? step : FIRST;
};

export const readNec1099CheckoutPhase = (searchParams) => {
  const phase = searchParams.get(NEC1099_CHECKOUT_QUERY_PARAM);
  return VALID_CHECKOUT.has(phase) ? phase : null;
};

export function buildNec1099CreatePath(
  formPath,
  step = FIRST,
  checkoutPhase = null,
) {
  const params = new URLSearchParams();
  if (step === CHECKOUT) {
    params.set(NEC1099_STEP_QUERY_PARAM, String(CHECKOUT));
    params.set(
      NEC1099_CHECKOUT_QUERY_PARAM,
      checkoutPhase && VALID_CHECKOUT.has(checkoutPhase)
        ? checkoutPhase
        : NEC1099_CHECKOUT_PHASE.VERIFYING,
    );
  } else {
    const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
    params.set(NEC1099_STEP_QUERY_PARAM, String(nextStep));
  }
  return `${formPath}?${params}`;
}

/** Scroll to the form/checkout block so the hero stays above the viewport. */
export function scrollNec1099FlowIntoView() {
  requestAnimationFrame(() => {
    document
      .getElementById("nec1099-flow")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

export function useNec1099FormStep() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStep = readNec1099Step(searchParams);
  const currentStep =
    rawStep >= FIRST && rawStep <= LAST_FORM ? rawStep : FIRST;

  const setFormStep = (step) => {
    const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(NEC1099_STEP_QUERY_PARAM, String(nextStep));
        next.delete(NEC1099_CHECKOUT_QUERY_PARAM);
        return next;
      },
      { replace: false },
    );
    scrollNec1099FlowIntoView();
  };

  return { currentStep, setFormStep };
}
