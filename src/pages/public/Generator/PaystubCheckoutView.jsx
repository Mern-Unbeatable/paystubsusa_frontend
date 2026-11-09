import React, { useEffect, useRef, useState } from "react";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import CheckoutSection from "./components/sections/CheckoutSection";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { formatCurrency } from "./utils/formatCurrency";
import PaystubStepper from "./components/common/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";

const SIMULATED_PAYMENT_MS = 1200;

const PaystubCheckoutContent = ({ template }) => {
  const { checkoutEmail, setCheckoutEmail, grandTotal } = usePaystubOrder();
  const { onBackToPackage, onBackToFormStep, onPaymentSuccess } =
    usePaystubFlowNavigation(template.id);
  const handleStepClick = (step) =>
    step === PAYSTUB_PAGE_STEPS.PACKAGE ? onBackToPackage() : onBackToFormStep(step);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const paymentTimerRef = useRef(null);

  useEffect(() => () => clearTimeout(paymentTimerRef.current), []);

  // TODO: replace the simulated delay with the payment provider integration.
  const handlePay = () => {
    setIsProcessingPayment(true);
    paymentTimerRef.current = setTimeout(() => {
      setIsProcessingPayment(false);
      onPaymentSuccess();
    }, SIMULATED_PAYMENT_MS);
  };

  return (
    <>
      <PaystubStepper currentStep={PAYSTUB_PAGE_STEPS.CHECKOUT} onStepClick={handleStepClick} />
      <CheckoutSection
        email={checkoutEmail}
        onEmailChange={setCheckoutEmail}
        totalLabel={formatCurrency(grandTotal)}
        isProcessingPayment={isProcessingPayment}
        onPay={handlePay}
        onBack={onBackToPackage}
      />
    </>
  );
};

const PaystubCheckoutView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubCheckoutContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubCheckoutView;
