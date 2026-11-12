import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import CheckoutSection from "./components/sections/CheckoutSection";
import CheckoutPaySection from "./components/sections/CheckoutPaySection";
import StripePaymentModal from "./components/sections/StripePaymentModal";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { formatCurrency } from "./utils/formatCurrency";
import PaystubStepper from "./components/common/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";
import { buildPaystubSuccessPath } from "../../../config/paths";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { resetCheckout, setPaymentStatus } from "../../../features/public/checkout/checkoutSlice";
import { selectCheckout, selectCheckoutPaid } from "../../../features/public/checkout/checkoutSelectors";
import {
  createCheckoutOrder,
  sendCheckoutCode,
  verifyCheckoutCode,
} from "../../../features/public/checkout/checkoutThunks";

const PaystubCheckoutContent = ({ template }) => {
  const dispatch = useDispatch();
  const { checkoutEmail, setCheckoutEmail, grandTotal, items } = usePaystubOrder();
  const { formData } = usePaystubFormData();
  const { guestToken, email, order, clientSecret } = useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const { onBackToPackage, onBackToFormStep, onPaymentSuccess } =
    usePaystubFlowNavigation(template.id);
  const handleStepClick = (step) =>
    step === PAYSTUB_PAGE_STEPS.PACKAGE ? onBackToPackage() : onBackToFormStep(step);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  // One key per checkout visit: a double click or retry replays the same order instead of creating two.
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  // Leaving checkout unpaid drops the pending order so a changed package or form gets a fresh one.
  useEffect(
    () => () =>
      dispatch((next, getState) => {
        if (!selectCheckoutPaid(getState()) && !getState().checkout.paymentStatus) next(resetCheckout());
      }),
    [dispatch],
  );

  useEffect(() => {
    if (paid) onPaymentSuccess();
  }, [paid]); // eslint-disable-line react-hooks/exhaustive-deps

  const fail = (error) => {
    toast.error(getErrorMessage(error));
    return false;
  };

  const handleSendCode = async (value) => {
    const action = await dispatch(sendCheckoutCode(value));
    return sendCheckoutCode.fulfilled.match(action) || fail(action.payload);
  };

  const handleVerify = async (code) => {
    if (!template.catalogId) return fail({ message: "This template is unavailable right now. Please try again later." });
    setIsProcessingPayment(true);
    try {
      if (!guestToken) {
        const verified = await dispatch(verifyCheckoutCode(code));
        if (!verifyCheckoutCode.fulfilled.match(verified)) return fail(verified.payload);
      }
      const created = await dispatch(
        createCheckoutOrder({ templateId: template.catalogId, items, formData, idempotencyKey: idempotencyKeyRef.current }),
      );
      if (!createCheckoutOrder.fulfilled.match(created)) return fail(created.payload);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handlePaid = (status) => {
    dispatch(setPaymentStatus(status));
    if (status !== "succeeded") onPaymentSuccess();
  };

  return (
    <>
      <PaystubStepper currentStep={PAYSTUB_PAGE_STEPS.CHECKOUT} onStepClick={handleStepClick} />
      {order && clientSecret ? (
        <CheckoutPaySection
          order={order}
          templateTitle={template.title}
          onPay={() => setPaymentOpen(true)}
        />
      ) : (
        <CheckoutSection
          email={checkoutEmail}
          onEmailChange={setCheckoutEmail}
          totalLabel={formatCurrency(grandTotal)}
          isProcessingPayment={isProcessingPayment}
          onSendCode={handleSendCode}
          onPay={handleVerify}
          verifyLabel="Verify code"
          onBack={onBackToPackage}
        />
      )}
      {order && clientSecret && (
        <StripePaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          clientSecret={clientSecret}
          email={email}
          totalLabel={formatCurrency(order.totalCents / 100)}
          returnUrl={`${window.location.origin}${buildPaystubSuccessPath(template.id)}`}
          onPaid={handlePaid}
        />
      )}
    </>
  );
};

const PaystubCheckoutView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubCheckoutContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubCheckoutView;
