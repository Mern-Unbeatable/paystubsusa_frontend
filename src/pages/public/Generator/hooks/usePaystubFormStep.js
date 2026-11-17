import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PAYSTUB_FORM_STEPS,
  PAYSTUB_PAGE_STEPS,
} from "../utils/paystubFlow";
import { toTemplateSlug } from "../../../../config/paths";

export const PAYSTUB_STEP_QUERY_PARAM = "step";
export const PAYSTUB_CHECKOUT_QUERY_PARAM = "checkout";

export const PAYSTUB_CHECKOUT_PHASE = {
  PACKAGE: "package",
  VERIFYING: "verifying",
  VERIFIED: "verified",
  SUCCESS: "success",
};

const FIRST = PAYSTUB_FORM_STEPS.EMPLOYER;
const LAST_FORM = PAYSTUB_FORM_STEPS.REVIEW;
const PACKAGE = PAYSTUB_PAGE_STEPS.PACKAGE;
const CHECKOUT = PAYSTUB_PAGE_STEPS.CHECKOUT;

const VALID_CHECKOUT = new Set(Object.values(PAYSTUB_CHECKOUT_PHASE));
const CHECKOUT_PHASES = new Set([
  PAYSTUB_CHECKOUT_PHASE.VERIFYING,
  PAYSTUB_CHECKOUT_PHASE.VERIFIED,
  PAYSTUB_CHECKOUT_PHASE.SUCCESS,
]);

export const readPaystubStep = (searchParams) => {
  const step = Number(searchParams.get(PAYSTUB_STEP_QUERY_PARAM));
  if (step === PACKAGE || step === CHECKOUT) return step;
  return step >= FIRST && step <= LAST_FORM ? step : FIRST;
};

export const readPaystubCheckoutPhase = (searchParams) => {
  const phase = searchParams.get(PAYSTUB_CHECKOUT_QUERY_PARAM);
  return VALID_CHECKOUT.has(phase) ? phase : null;
};

/**
 * Builds `/paystub-generator/create/:slug?step=N` or
 * `?step=5&checkout=package` / `?step=6&checkout=verifying|verified|success`.
 */
export function buildPaystubCreateQueryPath(
  templateId,
  step = FIRST,
  checkoutPhase = null,
) {
  const base = `/paystub-generator/create/${encodeURIComponent(toTemplateSlug(templateId))}`;
  const params = new URLSearchParams();

  if (step === PACKAGE) {
    params.set(PAYSTUB_STEP_QUERY_PARAM, String(PACKAGE));
    params.set(PAYSTUB_CHECKOUT_QUERY_PARAM, PAYSTUB_CHECKOUT_PHASE.PACKAGE);
  } else if (step === CHECKOUT) {
    params.set(PAYSTUB_STEP_QUERY_PARAM, String(CHECKOUT));
    params.set(
      PAYSTUB_CHECKOUT_QUERY_PARAM,
      checkoutPhase && CHECKOUT_PHASES.has(checkoutPhase)
        ? checkoutPhase
        : PAYSTUB_CHECKOUT_PHASE.VERIFYING,
    );
  } else {
    const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
    params.set(PAYSTUB_STEP_QUERY_PARAM, String(nextStep));
  }

  return `${base}?${params}`;
}

/** Scroll to the form/checkout block (under sticky nav). */
export function scrollPaystubFlowIntoView() {
  const run = () => {
    const el = document.getElementById("paystub-flow");
    if (!el) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
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

/**
 * Form steps 1–4 on the create URL. Steps 5–6 are package/checkout panels.
 */
export function usePaystubFormStep() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStep = readPaystubStep(searchParams);
  const currentStep =
    rawStep >= FIRST && rawStep <= LAST_FORM ? rawStep : FIRST;

  const setFormStep = useCallback(
    (step) => {
      const nextStep = step >= FIRST && step <= LAST_FORM ? step : FIRST;
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(PAYSTUB_STEP_QUERY_PARAM, String(nextStep));
          next.delete(PAYSTUB_CHECKOUT_QUERY_PARAM);
          return next;
        },
        { replace: false },
      );
    },
    [setSearchParams],
  );

  return { currentStep, setFormStep };
}
