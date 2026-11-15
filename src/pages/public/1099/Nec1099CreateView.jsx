import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Nec1099HeroSection from "./components/sections/Nec1099HeroSection";
import Nec1099DetailsForm from "./components/sections/Nec1099DetailsForm";
import Nec1099CheckoutPanel from "./components/sections/Nec1099CheckoutPanel";
import Nec1099SuccessPanel from "./components/sections/Nec1099SuccessPanel";
import { useNec1099FormData } from "./hooks/useNec1099FormData";
import { useNec1099FlowNavigation } from "./hooks/useNec1099FlowNavigation";
import {
  NEC1099_CHECKOUT_PHASE,
  NEC1099_CHECKOUT_QUERY_PARAM,
  NEC1099_STEP_QUERY_PARAM,
  readNec1099CheckoutPhase,
  readNec1099Step,
} from "./hooks/useNec1099FormStep";
import { NEC1099_PAGE_STEPS } from "./utils/nec1099Flow";

/** Create flow: form (`step=1–4`) or checkout (`step=5&checkout=…`). */
const Nec1099CreateView = () => {
  const form = useNec1099FormData();
  const { onContinueToCheckout, goToStep } = useNec1099FlowNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = readNec1099Step(searchParams);
  const checkoutPhase = readNec1099CheckoutPhase(searchParams);
  const isCheckout = step === NEC1099_PAGE_STEPS.CHECKOUT;
  const isSuccess =
    isCheckout && checkoutPhase === NEC1099_CHECKOUT_PHASE.SUCCESS;

  useEffect(() => {
    if (!searchParams.get(NEC1099_STEP_QUERY_PARAM)) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(NEC1099_STEP_QUERY_PARAM, "1");
          next.delete(NEC1099_CHECKOUT_QUERY_PARAM);
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
          next.set(NEC1099_STEP_QUERY_PARAM, String(NEC1099_PAGE_STEPS.CHECKOUT));
          next.set(
            NEC1099_CHECKOUT_QUERY_PARAM,
            NEC1099_CHECKOUT_PHASE.VERIFYING,
          );
          return next;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams, isCheckout, checkoutPhase]);

  return (
    <div className={`w-full bg-white ${isSuccess ? "" : "min-h-screen"}`}>
      {!isCheckout ? <Nec1099HeroSection /> : null}

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
            <Nec1099SuccessPanel />
          ) : isCheckout ? (
            <Nec1099CheckoutPanel />
          ) : (
            <Nec1099DetailsForm
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

export default Nec1099CreateView;
