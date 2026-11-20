<<<<<<< HEAD
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import OrderSummaryCard from "../common/order/OrderSummaryCard";
import CheckoutSection from "./CheckoutSection";
import CheckoutPaySection from "./CheckoutPaySection";
import StripePaymentModal from "./StripePaymentModal";
import UnlimitedCheckoutSection from "./UnlimitedCheckoutSection";
import CreditsRemainingBanner from "../common/order/CreditsRemainingBanner";
import {
  PAYSTUB_DD_SLIP_PRODUCT_CODE,
  usePaystubOrder,
} from "../../hooks/usePaystubOrder";
import {
  findIncompleteField,
  usePaystubFormData,
} from "../../hooks/usePaystubFormData";
import { usePaystubFlowNavigation } from "../../hooks/usePaystubFlowNavigation";
import {
  PAYSTUB_CHECKOUT_PHASE,
  readPaystubCheckoutPhase,
} from "../../hooks/usePaystubFormStep";
import { formatCurrency } from "../../utils/formatCurrency";
import PaystubStepper from "../common/flow/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "../../utils/paystubFlow";
import { buildPaystubSuccessPath } from "../../../../../config/paths";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import {
  clearCheckoutOrder,
  resetCheckout,
  resumeCreditOrder,
  setPaymentStatus,
} from "../../../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutPaid,
} from "../../../../../features/public/checkout/checkoutSelectors";
import { selectAuthUser } from "../../../../../features/auth/authSelectors";
import {
  createCheckoutOrder,
  findOrderWithCredits,
  sendCheckoutCode,
  verifyCheckoutCode,
} from "../../../../../features/public/checkout/checkoutThunks";

/** Step 6: email verify / pay — URL `?step=6&checkout=verifying|verified`. */
const PaystubCheckoutPanel = ({ template }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const phase =
    readPaystubCheckoutPhase(searchParams) ?? PAYSTUB_CHECKOUT_PHASE.VERIFYING;
  const {
    checkoutEmail,
    setCheckoutEmail,
    grandTotal,
    items,
    summaryLines,
    currentPkg,
  } = usePaystubOrder();
  const isUnlimited = currentPkg.productCode === "unlimited_monthly";
  const { formData, calculations, toApiFormData } = usePaystubFormData();
  const { guestToken, email, order, clientSecret, credit } =
    useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const authUser = useSelector(selectAuthUser);
  const accountEmail =
    authUser?.role === "customer" && authUser.emailVerified
      ? authUser.email
      : null;
  const verifiedEmail = guestToken ? email : accountEmail;
  const {
    onBackToPackage,
    onBackToFormStep,
    onPaymentSuccess,
    onCheckoutVerifying,
    onCheckoutVerified,
    goToStep,
  } = usePaystubFlowNavigation(template.id);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  useEffect(() => {
    if (authUser?.email && !accountEmail && !guestToken)
      setCheckoutEmail(authUser.email);
  }, [authUser?.email, accountEmail]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const missing = findIncompleteField(formData);
    if (!missing) return;
    toast.error(`${missing.label} is required.`);
    onBackToFormStep(missing.step);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    if (paid && !credit) {
      onPaymentSuccess();
      return;
    }
    if (verifiedEmail && phase !== PAYSTUB_CHECKOUT_PHASE.VERIFIED) {
      onCheckoutVerified({ replace: true });
      return;
    }
    if (!verifiedEmail && phase === PAYSTUB_CHECKOUT_PHASE.VERIFIED) {
      onCheckoutVerifying({ replace: true });
    }
  }, [paid, credit, verifiedEmail, phase]); // eslint-disable-line react-hooks/exhaustive-deps

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
    savedLookup && savedLookup.email === verifiedEmail
      ? savedLookup.order
      : null;
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

  const createOrder = (idempotencyKey) => {
    const api = toApiFormData();
    // Cart line is the purchase intent — sync form `enabled` to match (never invent a line).
    const wantsDd = items.some(
      (i) => i.productCode === PAYSTUB_DD_SLIP_PRODUCT_CODE,
    );
    const formData = {
      ...api,
      steps: {
        ...api.steps,
        directDeposit: {
          ...api.steps.directDeposit,
          enabled: wantsDd,
        },
      },
    };
    const payload = {
      documentType: "paystub",
      templateId: template.catalogId,
      items,
      formData,
      idempotencyKey,
    };
    return dispatch(createCheckoutOrder(payload));
  };

  const handlePayNow = async () => {
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

  const lines = order
    ? order.items.map((item) => ({
        key: item.productCode,
        label:
          item.quantity > 1 ? `${item.name} × ${item.quantity}` : item.name,
        amount: item.amountCents / 100,
      }))
    : summaryLines;
  const total = order ? order.totalCents / 100 : grandTotal;

  const showVerifiedUi =
    Boolean(verifiedEmail) || phase === PAYSTUB_CHECKOUT_PHASE.VERIFIED;

  return (
    <>
      <PaystubStepper
        currentStep={PAYSTUB_PAGE_STEPS.CHECKOUT}
        onStepClick={goToStep}
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
          ) : showVerifiedUi && verifiedEmail ? (
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
              backLabel="Back to package"
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

export default PaystubCheckoutPanel;
=======
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import OrderSummaryCard from "../common/order/OrderSummaryCard";
import CheckoutSection from "./CheckoutSection";
import CheckoutPaySection from "./CheckoutPaySection";
import StripePaymentModal from "./StripePaymentModal";
import UnlimitedCheckoutSection from "./UnlimitedCheckoutSection";
import CreditsRemainingBanner from "../common/order/CreditsRemainingBanner";
import { usePaystubOrder } from "../../hooks/usePaystubOrder";
import {
  findIncompleteField,
  usePaystubFormData,
} from "../../hooks/usePaystubFormData";
import { usePaystubFlowNavigation } from "../../hooks/usePaystubFlowNavigation";
import {
  PAYSTUB_CHECKOUT_PHASE,
  readPaystubCheckoutPhase,
} from "../../hooks/usePaystubFormStep";
import { formatCurrency } from "../../utils/formatCurrency";
import PaystubStepper from "../common/flow/PaystubStepper";
import { PAYSTUB_PAGE_STEPS } from "../../utils/paystubFlow";
import { buildPaystubSuccessPath } from "../../../../../config/paths";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import {
  clearCheckoutOrder,
  resetCheckout,
  resumeCreditOrder,
  setPaymentStatus,
} from "../../../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutPaid,
} from "../../../../../features/public/checkout/checkoutSelectors";
import { selectAuthUser } from "../../../../../features/auth/authSelectors";
import {
  createCheckoutOrder,
  findOrderWithCredits,
  sendCheckoutCode,
  verifyCheckoutCode,
} from "../../../../../features/public/checkout/checkoutThunks";

/** Step 6: email verify / pay — URL `?step=6&checkout=verifying|verified`. */
const PaystubCheckoutPanel = ({ template }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const phase =
    readPaystubCheckoutPhase(searchParams) ?? PAYSTUB_CHECKOUT_PHASE.VERIFYING;
  const {
    checkoutEmail,
    setCheckoutEmail,
    grandTotal,
    items,
    summaryLines,
    currentPkg,
  } = usePaystubOrder();
  const isUnlimited = currentPkg.productCode === "unlimited_monthly";
  const { formData, calculations, toApiFormData } = usePaystubFormData();
  const { guestToken, email, order, clientSecret, credit } =
    useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const authUser = useSelector(selectAuthUser);
  const accountEmail =
    authUser?.role === "customer" && authUser.emailVerified
      ? authUser.email
      : null;
  const verifiedEmail = guestToken ? email : accountEmail;
  const {
    onBackToPackage,
    onBackToFormStep,
    onPaymentSuccess,
    onCheckoutVerifying,
    onCheckoutVerified,
    goToStep,
  } = usePaystubFlowNavigation(template.id);

  const [isVerifying, setIsVerifying] = useState(false);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const idempotencyKeyRef = useRef(crypto.randomUUID());

  useEffect(() => {
    if (authUser?.email && !accountEmail && !guestToken)
      setCheckoutEmail(authUser.email);
  }, [authUser?.email, accountEmail]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const missing = findIncompleteField(formData);
    if (!missing) return;
    toast.error(`${missing.label} is required.`);
    onBackToFormStep(missing.step);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  useEffect(() => {
    if (paid && !credit) {
      onPaymentSuccess();
      return;
    }
    if (verifiedEmail && phase !== PAYSTUB_CHECKOUT_PHASE.VERIFIED) {
      onCheckoutVerified({ replace: true });
      return;
    }
    if (!verifiedEmail && phase === PAYSTUB_CHECKOUT_PHASE.VERIFIED) {
      onCheckoutVerifying({ replace: true });
    }
  }, [paid, credit, verifiedEmail, phase]); // eslint-disable-line react-hooks/exhaustive-deps

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
    savedLookup && savedLookup.email === verifiedEmail
      ? savedLookup.order
      : null;
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

  const createOrder = (idempotencyKey) => {
    const payload = {
      documentType: "paystub",
      templateId: template.catalogId,
      items,
      formData: toApiFormData(),
      idempotencyKey,
    };
    // Temporary: inspect checkout submit shape in the browser console.
    console.log("[paystub checkout submit]", payload);
    return dispatch(createCheckoutOrder(payload));
  };

  const handlePayNow = async () => {
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

  const lines = order
    ? order.items.map((item) => ({
        key: item.productCode,
        label:
          item.quantity > 1 ? `${item.name} × ${item.quantity}` : item.name,
        amount: item.amountCents / 100,
      }))
    : summaryLines;
  const total = order ? order.totalCents / 100 : grandTotal;

  const showVerifiedUi =
    Boolean(verifiedEmail) || phase === PAYSTUB_CHECKOUT_PHASE.VERIFIED;

  return (
    <>
      <PaystubStepper
        currentStep={PAYSTUB_PAGE_STEPS.CHECKOUT}
        onStepClick={goToStep}
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
          ) : showVerifiedUi && verifiedEmail ? (
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
              backLabel="Back to package"
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

export default PaystubCheckoutPanel;
>>>>>>> 925e0dca3d6ce63aa3b5108ff89adee725836e25
