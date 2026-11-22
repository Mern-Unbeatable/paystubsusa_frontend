import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import PrintablePaystub from "../common/print/PrintablePaystub";
import TemplateDocumentPreview from "../common/preview/TemplateDocumentPreview";
import PaymentSuccessSection from "./PaymentSuccessSection";
import { usePaystubFormData } from "../../hooks/usePaystubFormData";
import {
  PAYSTUB_DD_SLIP_PRODUCT_CODE,
  usePaystubOrder,
} from "../../hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "../../hooks/usePaystubFlowNavigation";
import { downloadPaystubPdf } from "../../utils/downloadPaystubPdf";
import { stripePromise } from "../../utils/stripeClient";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import { PAYSTUB_FORM_STEPS } from "../../utils/paystubFlow";
import {
  beginAnotherPaystub,
  setPaymentStatus,
  startCreditRedeem,
} from "../../../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutCredits,
  selectCheckoutPaid,
} from "../../../../../features/public/checkout/checkoutSelectors";
import {
  downloadCheckoutDocument,
  refreshCheckoutOrder,
} from "../../../../../features/public/checkout/checkoutThunks";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 40;
const SETTLED_DOCUMENT_STATUSES = new Set(["ready", "failed", "revoked"]);

function useOrderPolling(checkout, dispatch) {
  const { order, lastDocumentId } = checkout;
  const [timedOut, setTimedOut] = useState(false);
  const settled =
    order?.status === "paid" &&
    (order.documents ?? []).length > 0 &&
    (!lastDocumentId || order.documents.some((d) => d.id === lastDocumentId)) &&
    order.documents.every((d) => SETTLED_DOCUMENT_STATUSES.has(d.status));

  useEffect(() => {
    if (!order?.id || settled) return undefined;
    let polls = 0;
    const timer = setInterval(() => {
      polls += 1;
      if (polls > MAX_POLLS) {
        clearInterval(timer);
        setTimedOut(true);
      } else dispatch(refreshCheckoutOrder());
    }, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [order?.id, lastDocumentId, settled, dispatch]);

  return Boolean(order?.id) && !settled && !timedOut;
}

/** Step 6 success — URL `?step=6&checkout=success`. */
const PaystubSuccessPanel = ({ template }) => {
  const dispatch = useDispatch();
  const pkg = usePaystubOrder();
  const checkout = useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const { formData, calculations, updateDirectDeposit } = usePaystubFormData();
  const credits = useSelector(selectCheckoutCredits);
  const { onBackToFormStep, onCheckoutVerifying } = usePaystubFlowNavigation(
    template.id,
  );
  const [searchParams] = useSearchParams();
  const redirectSecret = searchParams.get("payment_intent_client_secret");
  const [checkingRedirect, setCheckingRedirect] = useState(
    Boolean(redirectSecret && !checkout.paymentStatus),
  );

  useEffect(() => {
    if (!checkingRedirect) return;
    let active = true;
    Promise.resolve(stripePromise)
      .then((stripe) => stripe?.retrievePaymentIntent(redirectSecret))
      .then((result) => {
        if (active && result?.paymentIntent)
          dispatch(setPaymentStatus(result.paymentIntent.status));
      })
      .catch(() => {})
      .finally(() => active && setCheckingRedirect(false));
    return () => {
      active = false;
    };
  }, [checkingRedirect, redirectSecret, dispatch]);

  const waitingForDocument = useOrderPolling(checkout, dispatch);

  useEffect(() => {
    if (checkingRedirect) return;
    const processing = !paid && checkout.paymentStatus === "processing";
    if (!paid && !processing) {
      onCheckoutVerifying({ replace: true });
    }
  }, [checkingRedirect, paid, checkout.paymentStatus]); // eslint-disable-line react-hooks/exhaustive-deps

  if (checkingRedirect)
    return <div className="min-h-[40vh]" aria-busy="true" />;

  const processing = !paid && checkout.paymentStatus === "processing";
  if (!paid && !processing) {
    return <div className="min-h-[40vh]" aria-busy="true" />;
  }

  const documents = checkout.order?.documents ?? [];
  const readyDocument = checkout.lastDocumentId
    ? documents.find(
        (d) => d.id === checkout.lastDocumentId && d.status === "ready",
      )
    : documents.find((d) => d.status === "ready");

  // Both post-success CTAs resume the create flow on Pay Details (`?step=3`).
  const goToPayDetails = () => onBackToFormStep(PAYSTUB_FORM_STEPS.PAY);

  const resetDdToggle = () => {
    pkg.setIncludeDdSlip(false);
    updateDirectDeposit({ enabled: false });
  };

  const handleUseCredit = () => {
    dispatch(startCreditRedeem({ entitlementId: credits.id }));
    // Next stub must opt in again — don't inherit prior toggle/enabled.
    resetDdToggle();
    goToPayDetails();
  };

  const handleStartOver = () => {
    dispatch(beginAnotherPaystub());
    resetDdToggle();
    goToPayDetails();
  };

  // Paid order lines are the source of truth — not session toggle leftovers.
  const ddSlipPurchased = Boolean(
    checkout.order?.items?.some(
      (item) => item.productCode === PAYSTUB_DD_SLIP_PRODUCT_CODE,
    ),
  );

  const handleDownload = async () => {
    if (!readyDocument) {
      if (!waitingForDocument) downloadPaystubPdf(formData);
      return;
    }
    const action = await dispatch(downloadCheckoutDocument(readyDocument.id));
    if (downloadCheckoutDocument.fulfilled.match(action))
      window.location.assign(action.payload.url);
    else toast.error(getErrorMessage(action.payload));
  };

  const summary = {
    grandTotal: checkout.order
      ? checkout.order.totalCents / 100
      : pkg.grandTotal,
    packageName: checkout.order?.summary ?? pkg.currentPkg.name,
    orderNumber: checkout.order?.orderNumber,
    checkoutEmail: checkout.order?.email ?? checkout.email ?? pkg.checkoutEmail,
    includeDdSlip: ddSlipPurchased,
  };

  // Preview / print must match the paid PDF: slip only when the add-on was purchased.
  const previewFormData = {
    ...formData,
    directDeposit: {
      ...(formData.directDeposit ?? {}),
      enabled: ddSlipPurchased,
      includeInPdf: ddSlipPurchased,
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-5">
        <PaymentSuccessSection
          formData={formData}
          order={summary}
          processing={processing}
          preparingDocument={!readyDocument && waitingForDocument}
          redeemed={Boolean(checkout.lastDocumentId)}
          creditsRemaining={credits?.creditsRemaining ?? 0}
          onUseCredit={handleUseCredit}
          onDownload={handleDownload}
          onStartOver={handleStartOver}
        />
      </div>
      <div className="lg:col-span-7">
        <p className="text-[14px] font-bold text-slate-800 mb-3 px-1">
          Your paystub
        </p>
        <TemplateDocumentPreview
          key={`success-preview-${ddSlipPurchased ? "dd" : "plain"}`}
          template={template}
          formData={previewFormData}
          calculations={calculations}
        />
      </div>
      <PrintablePaystub
        template={template}
        formData={previewFormData}
        calculations={calculations}
      />
    </div>
  );
};

export default PaystubSuccessPanel;
