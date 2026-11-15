import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import CheckoutSection from "../../../Generator/components/sections/CheckoutSection";
import CheckoutPaySection from "../../../Generator/components/sections/CheckoutPaySection";
import StripePaymentModal from "../../../Generator/components/sections/StripePaymentModal";
import W2OrderSummaryCard from "../common/order/W2OrderSummaryCard";
import W2Stepper from "../common/flow/W2Stepper";
import { useW2FormData } from "../../hooks/useW2FormData";
import { useW2Order } from "../../hooks/useW2Order";
import { useW2Template } from "../../hooks/useW2Template";
import { useW2FlowNavigation } from "../../hooks/useW2FlowNavigation";
import { W2_FLOW, W2_PAGE_STEPS } from "../../utils/w2Flow";
import { toW2OrderFormData } from "../../utils/w2OrderFormData";
import { findIncompleteW2Field } from "../../utils/w2Validation";
import {
  W2_CHECKOUT_PHASE,
  readW2CheckoutPhase,
} from "../../hooks/useW2FormStep";
import { formatCurrency } from "../../../Generator/utils/formatCurrency";
import { PATHS } from "../../../../../config/paths";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import {
  clearCheckoutOrder,
  resetCheckout,
  setPaymentStatus,
} from "../../../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutPaid,
} from "../../../../../features/public/checkout/checkoutSelectors";
import { selectAuthUser } from "../../../../../features/auth/authSelectors";
import {
  createCheckoutOrder,
  sendCheckoutCode,
  verifyCheckoutCode,
} from "../../../../../features/public/checkout/checkoutThunks";

/** Step 5: email verify / pay — URL `?step=5&checkout=verifying|verified`. */
const W2CheckoutPanel = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const phase =
    readW2CheckoutPhase(searchParams) ?? W2_CHECKOUT_PHASE.VERIFYING;
  const { formData } = useW2FormData();
  const { checkoutEmail, setCheckoutEmail, items, summaryLines, grandTotal } =
    useW2Order();
  const { template, ready: templateReady } = useW2Template();
  const { guestToken, email, order, clientSecret } = useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const authUser = useSelector(selectAuthUser);
  const accountEmail =
    authUser?.role === "customer" && authUser.emailVerified
      ? authUser.email
      : null;
  const verifiedEmail = guestToken ? email : accountEmail;
  const {
    onBackToReview,
    onBackToFormStep,
    onPaymentSuccess,
    onCheckoutVerifying,
    onCheckoutVerified,
    goToStep,
  } = useW2FlowNavigation();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  useEffect(() => {
    if (authUser?.email && !accountEmail && !guestToken)
      setCheckoutEmail(authUser.email);
  }, [authUser?.email, accountEmail]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const missing = findIncompleteW2Field(formData);
    if (!missing) return;
    toast.error(`${missing.label} is required.`);
    onBackToFormStep(missing.step);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (order && order.documentType && order.documentType !== "w2") {
      dispatch(clearCheckoutOrder());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Keep `checkout=` in sync with verification / payment state.
  useEffect(() => {
    if (paid) {
      onPaymentSuccess();
      return;
    }
    if (verifiedEmail && phase !== W2_CHECKOUT_PHASE.VERIFIED) {
      onCheckoutVerified({ replace: true });
      return;
    }
    if (!verifiedEmail && phase === W2_CHECKOUT_PHASE.VERIFIED) {
      onCheckoutVerifying({ replace: true });
    }
  }, [paid, verifiedEmail, phase]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const createOrder = (idempotencyKey) =>
    dispatch(
      createCheckoutOrder({
        documentType: "w2",
        templateId: template.catalogId,
        items,
        formData: toW2OrderFormData(formData),
        idempotencyKey,
      }),
    );

  const handlePayNow = async () => {
    if (order && clientSecret && order.documentType === "w2") {
      setPaymentOpen(true);
      return;
    }
    if (!template?.catalogId)
      return fail({
        message: templateReady
          ? "This W-2 template is unavailable right now. Please try again later."
          : "Loading W-2 template… please try again in a moment.",
      });

    setIsPreparingPayment(true);
    let created = await createOrder(idempotencyKeyRef.current);
    if (
      createCheckoutOrder.rejected.match(created) &&
      created.payload?.code === "IDEMPOTENCY_IN_PROGRESS"
    ) {
      await new Promise((r) => setTimeout(r, 800));
      created = await createOrder(idempotencyKeyRef.current);
      if (
        createCheckoutOrder.rejected.match(created) &&
        created.payload?.code === "IDEMPOTENCY_IN_PROGRESS"
      ) {
        idempotencyKeyRef.current = crypto.randomUUID();
        created = await createOrder(idempotencyKeyRef.current);
      }
    }
    setIsPreparingPayment(false);

    if (createCheckoutOrder.fulfilled.match(created)) {
      if (created.payload.payment) setPaymentOpen(true);
      return;
    }
    if (created.payload?.status === 401) {
      idempotencyKeyRef.current = crypto.randomUUID();
      dispatch(resetCheckout());
      onCheckoutVerifying({ replace: true });
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
    onCheckoutVerifying({ replace: true });
  };

  const lines =
    order?.documentType === "w2"
      ? order.items.map((item) => ({
          key: item.productCode,
          label:
            item.quantity > 1 ? `${item.name} × ${item.quantity}` : item.name,
          amount: item.amountCents / 100,
        }))
      : summaryLines;
  const total =
    order?.documentType === "w2" ? order.totalCents / 100 : grandTotal;

  const showVerifiedUi =
    Boolean(verifiedEmail) || phase === W2_CHECKOUT_PHASE.VERIFIED;

  return (
    <>
      <W2Stepper
        currentStep={W2_PAGE_STEPS.CHECKOUT}
        onStepClick={goToStep}
      />
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          {showVerifiedUi && verifiedEmail ? (
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
              onBack={onBackToReview}
              backLabel="Back to review"
              className=""
            />
          )}
        </div>

        <W2OrderSummaryCard
          className="lg:col-span-5"
          templateTitle={template?.title || W2_FLOW.documentLabel}
          formData={formData}
          lines={lines}
          total={total}
          action={
            <button
              type="button"
              onClick={onBackToReview}
              disabled={isPreparingPayment}
              className="text-[#1E60F2] text-[13px] font-semibold hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Edit details
            </button>
          }
        />
      </div>

      {order?.documentType === "w2" && clientSecret ? (
        <StripePaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          clientSecret={clientSecret}
          email={verifiedEmail}
          totalLabel={formatCurrency(order.totalCents / 100)}
          returnUrl={`${window.location.origin}${PATHS.PUBLIC.w2CheckoutSuccess}`}
          onPaid={handlePaid}
        />
      ) : null}
    </>
  );
};

export default W2CheckoutPanel;
