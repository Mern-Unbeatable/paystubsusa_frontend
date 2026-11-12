import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import OrderSummaryCard from "./components/common/OrderSummaryCard";
import CheckoutSection from "./components/sections/CheckoutSection";
import CheckoutPaySection from "./components/sections/CheckoutPaySection";
import StripePaymentModal from "./components/sections/StripePaymentModal";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { findIncompleteField, usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { formatCurrency } from "./utils/formatCurrency";
import PaystubStepper from "./components/common/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";
import { buildPaystubSuccessPath } from "../../../config/paths";
import { getErrorMessage } from "../../../api/errorNormalizer";
import {
  clearCheckoutOrder,
  resetCheckout,
  setPaymentStatus,
} from "../../../features/public/checkout/checkoutSlice";
import { selectCheckout, selectCheckoutPaid } from "../../../features/public/checkout/checkoutSelectors";
import {
  createCheckoutOrder,
  sendCheckoutCode,
  verifyCheckoutCode,
} from "../../../features/public/checkout/checkoutThunks";

const PaystubCheckoutContent = ({ template }) => {
  const dispatch = useDispatch();
  const { checkoutEmail, setCheckoutEmail, grandTotal, items, summaryLines } = usePaystubOrder();
  const { formData, calculations } = usePaystubFormData();
  const { guestToken, email, order, clientSecret } = useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const { onBackToPackage, onBackToFormStep, onPaymentSuccess } =
    usePaystubFlowNavigation(template.id);
  const handleStepClick = (step) =>
    step === PAYSTUB_PAGE_STEPS.PACKAGE ? onBackToPackage() : onBackToFormStep(step);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  // One key per order attempt: a double click or retry replays the same order instead of creating two.
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  // Checkout needs a complete form; send the user back to the first step with a gap.
  useEffect(() => {
    const missing = findIncompleteField(formData);
    if (!missing) return;
    toast.error(`${missing.label} is required.`);
    onBackToFormStep(missing.step);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Leaving checkout unpaid drops the pending order (the package or form may change) but keeps the verified email.
  useEffect(
    () => () =>
      dispatch((next, getState) => {
        if (!selectCheckoutPaid(getState()) && !getState().checkout.paymentStatus) next(clearCheckoutOrder());
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
    setIsVerifying(true);
    const verified = await dispatch(verifyCheckoutCode(code));
    setIsVerifying(false);
    if (!verifyCheckoutCode.fulfilled.match(verified)) fail(verified.payload);
  };

  const handlePayNow = async () => {
    // Reopening after closing the dialog reuses the same order and PaymentIntent.
    if (order && clientSecret) {
      setPaymentOpen(true);
      return;
    }
    if (!template.catalogId) return fail({ message: "This template is unavailable right now. Please try again later." });
    setIsPreparingPayment(true);
    const created = await dispatch(
      createCheckoutOrder({ templateId: template.catalogId, items, formData, idempotencyKey: idempotencyKeyRef.current }),
    );
    setIsPreparingPayment(false);
    if (createCheckoutOrder.fulfilled.match(created)) {
      if (created.payload.payment) setPaymentOpen(true);
      return;
    }
    // An expired verification needs a fresh code, and a fresh order key for the new guest session.
    if (created.payload?.status === 401) {
      idempotencyKeyRef.current = crypto.randomUUID();
      dispatch(resetCheckout());
    }
    fail(created.payload);
  };

  const handlePaid = (status) => {
    dispatch(setPaymentStatus(status));
    if (status !== "succeeded") onPaymentSuccess();
  };

  const handleChangeEmail = () => {
    idempotencyKeyRef.current = crypto.randomUUID();
    dispatch(resetCheckout());
  };

  // Once the server has priced the order, show its lines instead of the estimate.
  const lines = order
    ? order.items.map((item) => ({
        key: item.productCode,
        label: item.quantity > 1 ? `${item.name} × ${item.quantity}` : item.name,
        amount: item.amountCents / 100,
      }))
    : summaryLines;
  const total = order ? order.totalCents / 100 : grandTotal;

  return (
    <>
      <PaystubStepper currentStep={PAYSTUB_PAGE_STEPS.CHECKOUT} onStepClick={handleStepClick} />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          {guestToken ? (
            <CheckoutPaySection
              email={email}
              totalLabel={formatCurrency(total)}
              paying={isPreparingPayment}
              onPay={handlePayNow}
              onChangeEmail={handleChangeEmail}
            />
          ) : (
            <CheckoutSection
              email={checkoutEmail}
              onEmailChange={setCheckoutEmail}
              totalLabel={formatCurrency(total)}
              isProcessingPayment={isVerifying}
              onSendCode={handleSendCode}
              onPay={handleVerify}
              verifyLabel="Verify email"
              processingLabel="Verifying..."
              onBack={onBackToPackage}
              className=""
            />
          )}
        </div>

        <OrderSummaryCard
          className="lg:col-span-5"
          template={template}
          formData={formData}
          calculations={calculations}
          lines={lines}
          total={total}
          eyebrow={order && `Order #${order.orderNumber}`}
          action={
            <button
              type="button"
              onClick={onBackToPackage}
              disabled={isPreparingPayment}
              className="text-[#1E60F2] text-[13px] font-semibold hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Change package
            </button>
          }
        />
      </div>
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
