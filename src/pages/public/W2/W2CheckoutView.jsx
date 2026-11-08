import React, { useEffect, useRef, useState } from "react";
import W2FlowLayout from "./components/common/W2FlowLayout";
import CheckoutSection from "../Generator/components/sections/CheckoutSection";
import { useW2FormData } from "./hooks/useW2FormData";
import { useW2FlowNavigation } from "./hooks/useW2FlowNavigation";
import { W2_PRICE_LABEL, W2_STEPS } from "./utils/w2Flow";

const SIMULATED_PAYMENT_MS = 1200;

const W2CheckoutView = () => {
  const { formData, updateField } = useW2FormData();
  const { onBackToPreview, onPaymentSuccess } = useW2FlowNavigation();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const paymentTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(paymentTimerRef.current), []);

  // TODO: replace the simulated delay with the payment provider integration.
  const handlePay = () => {
    if (isProcessingPayment) return;
    setIsProcessingPayment(true);
    paymentTimerRef.current = setTimeout(() => {
      setIsProcessingPayment(false);
      onPaymentSuccess();
    }, SIMULATED_PAYMENT_MS);
  };

  return (
    <W2FlowLayout currentStep={W2_STEPS.CHECKOUT}>
      <CheckoutSection
        email={formData.email}
        onEmailChange={(email) => updateField("email", email)}
        totalLabel={W2_PRICE_LABEL}
        isProcessingPayment={isProcessingPayment}
        onPay={handlePay}
        onBack={onBackToPreview}
        backLabel="Back to preview"
      />
    </W2FlowLayout>
  );
};

export default W2CheckoutView;
