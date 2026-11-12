import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import PaystubFlowPage from "./components/common/PaystubFlowPage";
import PrintablePaystub from "./components/common/PrintablePaystub";
import PaymentSuccessSection from "./components/sections/PaymentSuccessSection";
import { usePaystubFormData } from "./hooks/usePaystubFormData";
import { usePaystubOrder } from "./hooks/usePaystubOrder";
import { usePaystubFlowNavigation } from "./hooks/usePaystubFlowNavigation";
import { buildPaystubCheckoutPath } from "../../../config/paths";
import { downloadPaystubPdf } from "./utils/downloadPaystubPdf";
import { stripePromise } from "./utils/stripeClient";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { setPaymentStatus } from "../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutPaid,
} from "../../../features/public/checkout/checkoutSelectors";
import {
  downloadCheckoutDocument,
  refreshCheckoutOrder,
} from "../../../features/public/checkout/checkoutThunks";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 40;
const SETTLED_DOCUMENT_STATUSES = new Set(["ready", "failed", "revoked"]);

/** Polls the order until the webhook marks it paid and its documents finish rendering; true while still waiting. */
function useOrderPolling(checkout, dispatch) {
  const { order } = checkout;
  const [timedOut, setTimedOut] = useState(false);
  const settled =
    order?.status === "paid" &&
    (order.documents ?? []).length > 0 &&
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
  }, [order?.id, settled, dispatch]);

  return Boolean(order?.id) && !settled && !timedOut;
}

const PaystubSuccessContent = ({ template }) => {
  const dispatch = useDispatch();
  const pkg = usePaystubOrder();
  const checkout = useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const { formData, calculations } = usePaystubFormData();
  const { onBackToTemplates } = usePaystubFlowNavigation(template.id);
  // Set by Stripe when a payment method redirected away and back (memory state is gone then).
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

  if (checkingRedirect)
    return <div className="min-h-[40vh]" aria-busy="true" />;

  const processing = !paid && checkout.paymentStatus === "processing";
  if (!paid && !processing) {
    return <Navigate to={buildPaystubCheckoutPath(template.id)} replace />;
  }

  const readyDocument = checkout.order?.documents?.find(
    (d) => d.status === "ready",
  );
  const handleDownload = async () => {
    // The server PDF is the real deliverable; printing is only a fallback once it can't be produced.
    if (!readyDocument) {
      if (!waitingForDocument) downloadPaystubPdf(formData);
      return;
    }
    const action = await dispatch(downloadCheckoutDocument(readyDocument.id));
    if (downloadCheckoutDocument.fulfilled.match(action))
      window.location.assign(action.payload.url);
    else toast.error(getErrorMessage(action.payload));
  };

  // Prefer what the server recorded for the paid order over the locally selected package.
  const summary = {
    grandTotal: checkout.order
      ? checkout.order.totalCents / 100
      : pkg.grandTotal,
    packageName: checkout.order?.summary ?? pkg.currentPkg.name,
    orderNumber: checkout.order?.orderNumber,
    checkoutEmail: checkout.order?.email ?? checkout.email ?? pkg.checkoutEmail,
  };

  return (
    <>
      <PaymentSuccessSection
        formData={formData}
        order={summary}
        processing={processing}
        preparingDocument={!readyDocument && waitingForDocument}        onDownload={handleDownload}
        onStartOver={onBackToTemplates}
      />
      <PrintablePaystub
        template={template}
        formData={formData}
        calculations={calculations}
      />
    </>
  );
};

const PaystubSuccessView = () => (
  <PaystubFlowPage>
    {(template) => <PaystubSuccessContent template={template} />}
  </PaystubFlowPage>
);

export default PaystubSuccessView;
