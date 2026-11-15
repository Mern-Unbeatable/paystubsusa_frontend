import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DirectDepositHeroSection from "./components/sections/DirectDepositHeroSection";
import DirectDepositDetailsForm from "./components/sections/DirectDepositDetailsForm";
import DirectDepositCheckoutPanel from "./components/sections/DirectDepositCheckoutPanel";
import DirectDepositSuccessPanel from "./components/sections/DirectDepositSuccessPanel";
import { useDirectDepositFormData } from "./hooks/useDirectDepositFormData";
import { useDirectDepositFlowNavigation } from "./hooks/useDirectDepositFlowNavigation";
import {
  DD_CHECKOUT_PHASE,
  DD_CHECKOUT_QUERY_PARAM,
  DD_STEP_QUERY_PARAM,
  readDirectDepositCheckoutPhase,
  readDirectDepositStep,
} from "./hooks/useDirectDepositFormStep";
import { DD_PAGE_STEPS } from "./utils/directDepositFlow";

/** Create flow: form (`step=1–4`) or checkout (`step=5&checkout=…`). */
const DirectDepositCreateView = () => {
  const form = useDirectDepositFormData();
  const { onContinueToCheckout, goToStep } = useDirectDepositFlowNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const step = readDirectDepositStep(searchParams);
  const checkoutPhase = readDirectDepositCheckoutPhase(searchParams);
  const isCheckout = step === DD_PAGE_STEPS.CHECKOUT;
  const isSuccess =
    isCheckout && checkoutPhase === DD_CHECKOUT_PHASE.SUCCESS;

  useEffect(() => {
    if (!searchParams.get(DD_STEP_QUERY_PARAM)) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.set(DD_STEP_QUERY_PARAM, "1");
          next.delete(DD_CHECKOUT_QUERY_PARAM);
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
          next.set(DD_STEP_QUERY_PARAM, String(DD_PAGE_STEPS.CHECKOUT));
          next.set(DD_CHECKOUT_QUERY_PARAM, DD_CHECKOUT_PHASE.VERIFYING);
          return next;
        },
        { replace: true },
      );
    }
  }, [searchParams, setSearchParams, isCheckout, checkoutPhase]);

  return (
    <div className={`w-full bg-white ${isSuccess ? "" : "min-h-screen"}`}>
      {!isCheckout ? <DirectDepositHeroSection /> : null}

      <section
        id="direct-deposit-flow"
        className={`w-full scroll-mt-20 sm:scroll-mt-24 ${
          isSuccess ? "py-8 sm:py-10 pb-12 sm:pb-14" : "py-10 sm:py-16"
        } ${
          isCheckout
            ? "bg-[#F7FAFF]"
            : "bg-[#F7FAFF] border-t border-slate-200/80"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
          {isSuccess ? (
            <DirectDepositSuccessPanel />
          ) : isCheckout ? (
            <DirectDepositCheckoutPanel />
          ) : (
            <DirectDepositDetailsForm
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

export default DirectDepositCreateView;
