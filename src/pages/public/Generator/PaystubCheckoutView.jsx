import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PaystubFlowPage from "./components/common/flow/PaystubFlowPage";
import OrderSummaryCard from "./components/common/order/OrderSummaryCard";
import CheckoutSection from "./components/sections/CheckoutSection";
import CheckoutPaySection from "./components/sections/CheckoutPaySection";
import StripePaymentModal from "./components/sections/StripePaymentModal";
import UnlimitedCheckoutSection from "./components/sections/UnlimitedCheckoutSection";
import CreditsRemainingBanner from "./components/common/order/CreditsRemainingBanner";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import {
  findIncompleteField,
  usePaystubFormData,
} from "./hooks/usePaystubFormData";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { formatCurrency } from "./utils/formatCurrency";
import PaystubStepper from "./components/common/flow/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "./utils/paystubFlow";
import { buildPaystubSuccessPath } from "../../../config/paths";
import { getErrorMessage } from "../../../api/errorNormalizer";
import {
  clearCheckoutOrder,
  resetCheckout,
  resumeCreditOrder,
  setPaymentStatus,
} from "../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutPaid,
} from "../../../features/public/checkout/checkoutSelectors";
import { selectAuthUser } from "../../../features/auth/authSelectors";
import {
  createCheckoutOrder,
  findOrderWithCredits,
  sendCheckoutCode,
  verifyCheckoutCode,
} from "../../../features/public/checkout/checkoutThunks";

const PaystubCheckoutContent = ({ template }) => {
  const dispatch = useDispatch();
  const {
    checkoutEmail,
    setCheckoutEmail,
    grandTotal,
    items,
    summaryLines,
    currentPkg,
  } = usePaystubOrder();
  const isUnlimited = currentPkg.productCode === "unlimited_monthly";
  const { formData, calculations } = usePaystubFormData();
  const { guestToken, email, order, clientSecret, credit } =
    useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const authUser = useSelector(selectAuthUser);
  // A signed-in account with a verified email pays with its own session; no guest code needed.
  const accountEmail =
    authUser?.role === "customer" && authUser.emailVerified
      ? authUser.email
      : null;
  const verifiedEmail = guestToken ? email : accountEmail;
  const { onBackToPackage, onBackToFormStep, onPaymentSuccess } =
    usePaystubFlowNavigation(template.id);
  const handleStepClick = (step) =>
    step === PAYSTUB_PAGE_STEPS.PACKAGE
      ? onBackToPackage()
      : onBackToFormStep(step);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  // One key per order attempt: a double click or retry replays the same order instead of creating two.
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  // Signed in but unverified: the same code flow as guests, starting from the account email.
  useEffect(() => {
    if (authUser?.email && !accountEmail && !guestToken)
      setCheckoutEmail(authUser.email);
  }, [authUser?.email, accountEmail]); // eslint-disable-line react-hooks/exhaustive-deps

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
        if (
          !selectCheckoutPaid(getState()) &&
          !getState().checkout.paymentStatus
        )
          next(clearCheckoutOrder());
      }),
    [dispatch],
  );

  // A resumed credit order is already paid but still needs this paystub redeemed on the package step.
  useEffect(() => {
    if (paid && !credit) onPaymentSuccess();
  }, [paid]); // eslint-disable-line react-hooks/exhaustive-deps

  // Paid credits outlive the in-memory session; look them up again once the buyer is verified.
  const [savedLookup, setSavedLookup] = useState(null);
  useEffect(() => {
    if (!verifiedEmail) return undefined;
    let active = true;
    dispatch(findOrderWithCredits()).then((action) => {
      if (active && findOrderWithCredits.fulfilled.match(action))
        setSavedLookup({ email: verifiedEmail, order: action.payload });
    });
    return () => {
      active = false;
    };
  }, [verifiedEmail, dispatch]);
  const savedCreditOrder =
    savedLookup && savedLookup.email === verifiedEmail ? savedLookup.order : null;
  const savedCredits =
    savedCreditOrder?.entitlements.find(
      (e) => e.documentType === "paystub" && e.creditsRemaining > 0,
    ) ?? null;

  const handleUseSavedCredit = () => {
    dispatch(resumeCreditOrder(savedCreditOrder));
    onBackToPackage();
  };

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
    if (!template.catalogId)
      return fail({
        message:
          "This template is unavailable right now. Please try again later.",
      });
    setIsPreparingPayment(true);
    const created = await dispatch(
      createCheckoutOrder({
        templateId: template.catalogId,
        items,
        formData,
        idempotencyKey: idempotencyKeyRef.current,
      }),
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
        label:
          item.quantity > 1 ? `${item.name} × ${item.quantity}` : item.name,
        amount: item.amountCents / 100,
      }))
    : summaryLines;
  const total = order ? order.totalCents / 100 : grandTotal;

  return (
    <>
      <PaystubStepper
        currentStep={PAYSTUB_PAGE_STEPS.CHECKOUT}
        onStepClick={handleStepClick}
      />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          {savedCredits && (
            <CreditsRemainingBanner
              className="mb-4"
              creditsRemaining={savedCredits.creditsRemaining}
              description={`Already paid on order #${savedCreditOrder.orderNumber}. Use one for this paystub instead of paying again.`}
              actionLabel="Use a Paystub"
              onUseCredit={handleUseSavedCredit}
            />
          )}
          {isUnlimited ? (
            <UnlimitedCheckoutSection
              generating={isPreparingPayment}
              onGenerate={handlePayNow}
            />
          ) : verifiedEmail ? (
            <CheckoutPaySection
              email={verifiedEmail}
              title={guestToken ? "Email verified" : "Signed in"}
              totalLabel={formatCurrency(total)}
              paying={isPreparingPayment}
              onPay={handlePayNow}
              onChangeEmail={guestToken ? handleChangeEmail : undefined}
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
          email={verifiedEmail}
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
