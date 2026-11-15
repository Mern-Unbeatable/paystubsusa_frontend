import { useSearchParams } from "react-router-dom";
import { W2_FORM_STEPS, W2_PAGE_STEPS } from "../utils/w2Flow";

export const W2_STEP_QUERY_PARAM = "step";
export const W2_CHECKOUT_QUERY_PARAM = "checkout";

export const W2_CHECKOUT_PHASE = {
  VERIFYING: "verifying",
  VERIFIED: "verified",
  SUCCESS: "success",
};

const FIRST = W2_FORM_STEPS.EMPLOYER;
const LAST_FORM = W2_FORM_STEPS.REVIEW;
const CHECKOUT = W2_PAGE_STEPS.CHECKOUT;

const VALID_CHECKOUT = new Set(Object.values(W2_CHECKOUT_PHASE));

export const readW2Step = (searchParams) => {
  const step = Number(searchParams.get(W2_STEP_QUERY_PARAM));
  if (step === CHECKOUT) return CHECKOUT;
  return step >= FIRST && step <= LAST_FORM ? step : FIRST;
};

export const readW2CheckoutPhase = (searchParams) => {
  const phase = searchParams.get(W2_CHECKOUT_QUERY_PARAM);
  return VALID_CHECKOUT.has(phase) ? phase : null;
};

/** Builds `/w-2/create?step=N` or `/w-2/create?step=5&checkout=…`. */
export function buildW2CreatePath(formPath, step = FIRST, checkoutPhase = null) {
  const params = new URLSearchParams();
  if (step === CHECKOUT) {
    params.set(W2_STEP_QUERY_PARAM, String(CHECKOUT));
    params.set(
      W2_CHECKOUT_QUERY_PARAM,
      checkoutPhase && VALID_CHECKOUT.has(checkoutPhase)
        ? checkoutPhase
        : W2_CHECKOUT_PHASE.VERIFYING,
    );
  } else {
    const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
    params.set(W2_STEP_QUERY_PARAM, String(nextStep));
  }
  return `${formPath}?${params}`;
}

/** @deprecated use buildW2CreatePath */
export function buildW2FormStepPath(formPath, step = FIRST) {
  return buildW2CreatePath(formPath, step);
}

/** Scroll to the form/checkout block so the hero stays above the viewport. */
export function scrollW2FlowIntoView() {
  const run = () => {
    const el = document.getElementById("w2-flow");
    if (!el) return;
    const navOffset = window.matchMedia("(min-width: 640px)").matches
      ? 96
      : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };
  // Wait for the next step to paint, then scroll up past the hero.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(run, 40);
    });
  });
}

/**
 * Form steps 1–4 on `/w-2/create?step=N`.
 * Step 5 is handled by the create page checkout panels.
 */
export function useW2FormStep() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStep = readW2Step(searchParams);
  // Details form only covers 1–4; step 5 is rendered by checkout panels.
  const currentStep =
    rawStep >= FIRST && rawStep <= LAST_FORM ? rawStep : FIRST;

  const setFormStep = (step) => {
    const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(W2_STEP_QUERY_PARAM, String(nextStep));
        next.delete(W2_CHECKOUT_QUERY_PARAM);
        return next;
      },
      { replace: false },
    );
  };

  return { currentStep, setFormStep };
}
