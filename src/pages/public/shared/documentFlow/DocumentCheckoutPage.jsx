import React, { useEffect, useRef, useState } from "react";
import DocumentFlowLayout from "./components/DocumentFlowLayout";
import CheckoutSection from "../../Generator/components/sections/CheckoutSection";
import { useDocumentFlowNavigation } from "./hooks/useDocumentFlowNavigation";
import { DOCUMENT_STEPS } from "./utils/documentFlow";

const SIMULATED_PAYMENT_MS = 1200;

/** Checkout step: the paystub email + verification + payment flow. */
const DocumentCheckoutPage = ({ flow, email, onEmailChange }) => {
  const { goToStep, onBackToPreview, onPaymentSuccess } =
    useDocumentFlowNavigation(flow);
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
    <DocumentFlowLayout
      steps={flow.steps}
      currentStep={DOCUMENT_STEPS.CHECKOUT}
      onStepClick={goToStep}
    >
      <CheckoutSection
        email={email}
        onEmailChange={onEmailChange}
        totalLabel={flow.priceLabel}
        isProcessingPayment={isProcessingPayment}
        onPay={handlePay}
        onBack={onBackToPreview}
        backLabel="Back to preview"
      />
    </DocumentFlowLayout>
  );
};

export default DocumentCheckoutPage;
