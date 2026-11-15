import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import W2HeroSection from "./components/sections/W2HeroSection";
import W2DetailsForm from "./components/sections/W2DetailsForm";
import W2CheckoutPanel from "./components/sections/W2CheckoutPanel";
import W2SuccessPanel from "./components/sections/W2SuccessPanel";
import { useW2FormData } from "./hooks/useW2FormData";
import { useW2FlowNavigation } from "./hooks/useW2FlowNavigation";
import {
  W2_CHECKOUT_PHASE,
  W2_CHECKOUT_QUERY_PARAM,
  W2_STEP_QUERY_PARAM,
  readW2CheckoutPhase,
  readW2Step,
} from "./hooks/useW2FormStep";
import { W2_PAGE_STEPS } from "./utils/w2Flow";

/** Create flow: form (`step=1–4`) or checkout (`step=5&checkout=…`). */
const W2CreateView = () => {
  const form = useW2FormData();
  const { onContinueToCheckout, goToStep } = useW2FlowNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = readW2Step(searchParams);
  const checkoutPhase = readW2CheckoutPhase(searchParams);
  const isCheckout = step === W2_PAGE_STEPS.CHECKOUT;
  const isSuccess = isCheckout && checkoutPhase === W2_CHECKOUT_PHASE.SUCCESS;

  // Normalize bare `/w-2/create` → `?step=1`; step 5 without checkout → verifying.
  useEffect(() => {
    if (!searchParams.get(W2_STEP_QUERY_PARAM)) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(W2_STEP_QUERY_PARAM, "1");
          next.delete(W2_CHECKOUT_QUERY_PARAM);
          return next;
        },
        { replace: true },
      );
      return;
    }
    if (isCheckout && !checkoutPhase) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(W2_STEP_QUERY_PARAM, String(W2_PAGE_STEPS.CHECKOUT));
          next.set(W2_CHECKOUT_QUERY_PARAM, W2_CHECKOUT_PHASE.VERIFYING);
          return next;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams, isCheckout, checkoutPhase]);

  return (
    <div className={`w-full bg-white ${isSuccess ? "" : "min-h-screen"}`}>
      {!isCheckout ? <W2HeroSection /> : null}

      <section
        className={`w-full ${
          isSuccess ? "py-8 sm:py-10 pb-12 sm:pb-14" : "py-10 sm:py-16"
        } ${
          isCheckout
            ? "bg-[#F7FAFF]"
            : "bg-[#F7FAFF] border-t border-slate-200/80"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          {isSuccess ? (
            <W2SuccessPanel />
          ) : isCheckout ? (
            <W2CheckoutPanel />
          ) : (
            <W2DetailsForm
              form={form}
              onContinueToCheckout={onContinueToCheckout}
              onStepClick={goToStep}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default W2CreateView;
