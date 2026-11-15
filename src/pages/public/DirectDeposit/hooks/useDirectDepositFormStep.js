import { useSearchParams } from "react-router-dom";
import { DD_FORM_STEPS, DD_PAGE_STEPS } from "../utils/directDepositFlow";

export const DD_STEP_QUERY_PARAM = "step";
export const DD_CHECKOUT_QUERY_PARAM = "checkout";

export const DD_CHECKOUT_PHASE = {
  VERIFYING: "verifying",
  VERIFIED: "verified",
  SUCCESS: "success",
};

const FIRST = DD_FORM_STEPS.EMPLOYER;
const LAST_FORM = DD_FORM_STEPS.REVIEW;
const CHECKOUT = DD_PAGE_STEPS.CHECKOUT;
const VALID_CHECKOUT = new Set(Object.values(DD_CHECKOUT_PHASE));

export const readDirectDepositStep = (searchParams) => {
  const step = Number(searchParams.get(DD_STEP_QUERY_PARAM));
  if (step === CHECKOUT) return CHECKOUT;
  return step >= FIRST && step <= LAST_FORM ? step : FIRST;
};

export const readDirectDepositCheckoutPhase = (searchParams) => {
  const phase = searchParams.get(DD_CHECKOUT_QUERY_PARAM);
  return VALID_CHECKOUT.has(phase) ? phase : null;
};

export function buildDirectDepositCreatePath(
  formPath,
  step = FIRST,
  checkoutPhase = null,
) {
  const params = new URLSearchParams();
  if (step === CHECKOUT) {
    params.set(DD_STEP_QUERY_PARAM, String(CHECKOUT));
    params.set(
      DD_CHECKOUT_QUERY_PARAM,
      checkoutPhase && VALID_CHECKOUT.has(checkoutPhase)
        ? checkoutPhase
        : DD_CHECKOUT_PHASE.VERIFYING,
    );
  } else {
    const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
    params.set(DD_STEP_QUERY_PARAM, String(nextStep));
  }
  return `${formPath}?${params}`;
}

/** Scroll to the form/checkout block so the hero stays above the viewport. */
export function scrollDirectDepositFlowIntoView() {
  const run = () => {
    const el = document.getElementById("direct-deposit-flow");
    if (!el) return;
    const navOffset = window.matchMedia("(min-width: 640px)").matches
      ? 96
      : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(run, 40);
    });
  });
}

export function useDirectDepositFormStep() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStep = readDirectDepositStep(searchParams);
  const currentStep =
    rawStep >= FIRST && rawStep <= LAST_FORM ? rawStep : FIRST;

  const setFormStep = (step) => {
    const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(DD_STEP_QUERY_PARAM, String(nextStep));
        next.delete(DD_CHECKOUT_QUERY_PARAM);
        return next;
      },
      { replace: false },
    );
  };

  return { currentStep, setFormStep };
}
