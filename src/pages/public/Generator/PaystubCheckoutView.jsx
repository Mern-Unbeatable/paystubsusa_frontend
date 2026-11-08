import React, { useEffect, useRef, useState } from "react";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import CheckoutSection from "./components/sections/CheckoutSection";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { formatCurrency } from "./utils/formatCurrency";

const SIMULATED_PAYMENT_MS = 1200;

const PaystubCheckoutContent = ({ template }) => {
  const { checkoutEmail, setCheckoutEmail, grandTotal } = usePaystubOrder();
  const { onBackToPackage, onPaymentSuccess } = usePaystubFlowNavigation(
    template.id,
  );
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
    <CheckoutSection
      email={checkoutEmail}
      onEmailChange={setCheckoutEmail}
      totalLabel={formatCurrency(grandTotal)}
      isProcessingPayment={isProcessingPayment}
      onPay={handlePay}
      onBack={onBackToPackage}
    />
  );
};

const PaystubCheckoutView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubCheckoutContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubCheckoutView;
