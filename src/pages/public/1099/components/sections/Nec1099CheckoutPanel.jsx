import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import CheckoutSection from "../../../Generator/components/sections/CheckoutSection";
import CheckoutPaySection from "../../../Generator/components/sections/CheckoutPaySection";
import StripePaymentModal from "../../../Generator/components/sections/StripePaymentModal";
import Nec1099OrderSummaryCard from "../common/order/Nec1099OrderSummaryCard";
import Nec1099Stepper from "../common/flow/Nec1099Stepper";
import { useNec1099FormData } from "../../hooks/useNec1099FormData";
import { useNec1099Order } from "../../hooks/useNec1099Order";
import { useNec1099Template } from "../../hooks/useNec1099Template";
import { useNec1099FlowNavigation } from "../../hooks/useNec1099FlowNavigation";
import { NEC1099_FLOW, NEC1099_PAGE_STEPS } from "../../utils/nec1099Flow";
import { toNec1099OrderFormData } from "../../utils/nec1099OrderFormData";
import { findIncompleteNec1099Field } from "../../utils/nec1099Validation";
import {
  NEC1099_CHECKOUT_PHASE,
  readNec1099CheckoutPhase,
} from "../../hooks/useNec1099FormStep";
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

const Nec1099CheckoutPanel = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const phase =
    readNec1099CheckoutPhase(searchParams) ??
    NEC1099_CHECKOUT_PHASE.VERIFYING;
  const { formData } = useNec1099FormData();
  const { checkoutEmail, setCheckoutEmail, items, summaryLines, grandTotal } =
    useNec1099Order();
  const { template, ready: templateReady } = useNec1099Template();
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
  } = useNec1099FlowNavigation();

  const [isVerifying, setIsVerifying] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  useEffect(() => {
    if (authUser?.email && !accountEmail && !guestToken)
      setCheckoutEmail(authUser.email);
  }, [authUser?.email, accountEmail]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const missing = findIncompleteNec1099Field(formData);
    if (!missing) return;
    toast.error(`${missing.label} is required.`);
    onBackToFormStep(missing.step);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (order && order.documentType && order.documentType !== "nec1099") {
      dispatch(clearCheckoutOrder());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (paid) {
      onPaymentSuccess();
      return;
    }
    if (verifiedEmail && phase !== NEC1099_CHECKOUT_PHASE.VERIFIED) {
      onCheckoutVerified({ replace: true });
      return;
    }
    if (!verifiedEmail && phase === NEC1099_CHECKOUT_PHASE.VERIFIED) {
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
        documentType: "nec1099",
        templateId: template.catalogId,
        items,
        formData: toNec1099OrderFormData(formData),
        idempotencyKey,
      }),
    );

  const handlePayNow = async () => {
    if (order && clientSecret && order.documentType === "nec1099") {
      setPaymentOpen(true);
      return;
    }
    if (!template?.catalogId)
      return fail({
        message: templateReady
          ? "This 1099-NEC template is unavailable right now. Please try again later."
          : "Loading 1099-NEC template… please try again in a moment.",
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
    order?.documentType === "nec1099"
      ? order.items.map((item) => ({
          key: item.productCode,
          label:
            item.quantity > 1 ? `${item.name} × ${item.quantity}` : item.name,
          amount: item.amountCents / 100,
        }))
      : summaryLines;
  const total =
    order?.documentType === "nec1099" ? order.totalCents / 100 : grandTotal;

  const showVerifiedUi =
    Boolean(verifiedEmail) || phase === NEC1099_CHECKOUT_PHASE.VERIFIED;

  return (
    <>
      <Nec1099Stepper
        currentStep={NEC1099_PAGE_STEPS.CHECKOUT}
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

        <Nec1099OrderSummaryCard
          className="lg:col-span-5"
          templateTitle={template?.title || NEC1099_FLOW.documentLabel}
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

      {order?.documentType === "nec1099" && clientSecret ? (
        <StripePaymentModal
          open={paymentOpen}
          onClose={() => setPaymentOpen(false)}
          clientSecret={clientSecret}
          email={verifiedEmail}
          totalLabel={formatCurrency(order.totalCents / 100)}
          returnUrl={`${window.location.origin}${PATHS.PUBLIC.nec1099CheckoutSuccess}`}
          onPaid={handlePaid}
        />
      ) : null}
    </>
  );
};

export default Nec1099CheckoutPanel;
