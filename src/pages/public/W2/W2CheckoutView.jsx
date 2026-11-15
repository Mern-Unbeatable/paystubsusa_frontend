import React, { useEffect, useRef, useState } from "react";
import DocumentFlowLayout from "../shared/documentFlow/components/DocumentFlowLayout";
import CheckoutSection from "../Generator/components/sections/CheckoutSection";
import { useW2FormData } from "./hooks/useW2FormData";
import { useW2FlowNavigation } from "./hooks/useW2FlowNavigation";
import { W2_FLOW, W2_PAGE_STEPS } from "./utils/w2Flow";

const SIMULATED_PAYMENT_MS = 1200;

/** Checkout step: email + verification + simulated payment (same as prior documentFlow). */
const W2CheckoutView = () => {
  const { formData, updateField } = useW2FormData();
  const { goToStep, onBackToReview, onPaymentSuccess } = useW2FlowNavigation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const paymentTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(paymentTimerRef.current), []);

  const handlePay = () => {
    if (isProcessingPayment) return;
    setIsProcessingPayment(true);
    paymentTimerRef.current = setTimeout(() => {
      setIsProcessingPayment(false);
      onPaymentSuccess();
    }, SIMULATED_PAYMENT_MS);
  };

  return (
    <DocumentFlowLayout
      steps={W2_FLOW.steps}
      currentStep={W2_PAGE_STEPS.CHECKOUT}
      onStepClick={goToStep}
    >
      <CheckoutSection
        email={formData.email}
        onEmailChange={(email) => updateField("email", email)}
        totalLabel={W2_FLOW.priceLabel}
        isProcessingPayment={isProcessingPayment}
        onPay={handlePay}
        onBack={onBackToReview}
        backLabel="Back to review"
      />
    </DocumentFlowLayout>
  );
};

export default W2CheckoutView;
