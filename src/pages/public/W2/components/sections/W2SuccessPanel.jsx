import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import PrintableDocument from "../../../shared/documentFlow/components/PrintableDocument";
import { printDocument } from "../../../shared/documentFlow/utils/documentFlow";
import PaymentSuccessSection from "../../../Generator/components/sections/PaymentSuccessSection";
import { useW2FormData } from "../../hooks/useW2FormData";
import { useW2Order } from "../../hooks/useW2Order";
import { useW2FlowNavigation } from "../../hooks/useW2FlowNavigation";
import { W2_FLOW } from "../../utils/w2Flow";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import { setPaymentStatus } from "../../../../../features/public/checkout/checkoutSlice";
import {
  selectCheckout,
  selectCheckoutPaid,
} from "../../../../../features/public/checkout/checkoutSelectors";
import {
  downloadCheckoutDocument,
  refreshCheckoutOrder,
} from "../../../../../features/public/checkout/checkoutThunks";
import { stripePromise } from "../../../Generator/utils/stripeClient";

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 40;
const SETTLED = new Set(["ready", "failed", "revoked"]);

function useOrderPolling(checkout, dispatch) {
  const { order } = checkout;
  const [timedOut, setTimedOut] = useState(false);
  const settled =
    order?.status === "paid" &&
    (order.documents ?? []).length > 0 &&
    order.documents.every((d) => SETTLED.has(d.status));

  useEffect(() => {
    if (!order?.id || settled || order.documentType !== "w2") return undefined;
    let polls = 0;
    const timer = setInterval(() => {
      polls += 1;
      if (polls > MAX_POLLS) {
        clearInterval(timer);
        setTimedOut(true);
      } else dispatch(refreshCheckoutOrder());
    }, POLL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [order?.id, order?.documentType, settled, dispatch]);

  return Boolean(order?.id) && !settled && !timedOut;
}

/** Step 5 success — URL `?step=5&checkout=success`. */
const W2SuccessPanel = () => {
  const dispatch = useDispatch();
  const pkg = useW2Order();
  const checkout = useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const { formData } = useW2FormData();
  const { onStartOver, onCheckoutVerifying } = useW2FlowNavigation();
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
    const isW2Order = !checkout.order || checkout.order.documentType === "w2";
    if ((!paid && !processing) || !isW2Order) {
      onCheckoutVerifying({ replace: true });
    }
  }, [checkingRedirect, paid, checkout.paymentStatus, checkout.order]); // eslint-disable-line react-hooks/exhaustive-deps

  if (checkingRedirect)
    return <div className="min-h-[40vh]" aria-busy="true" />;

  const processing = !paid && checkout.paymentStatus === "processing";
  const isW2Order = !checkout.order || checkout.order.documentType === "w2";
  if ((!paid && !processing) || !isW2Order) {
    return <div className="min-h-[40vh]" aria-busy="true" />;
  }

  const documents = checkout.order?.documents ?? [];
  const readyDocument = documents.find((d) => d.status === "ready");
  const { Document } = W2_FLOW;

  const handleDownload = async () => {
    if (!readyDocument) {
      if (!waitingForDocument)
        printDocument(W2_FLOW.getPdfFileNameParts(formData));
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
    packageName: checkout.order?.summary ?? pkg.product.name,
    orderNumber: checkout.order?.orderNumber,
    checkoutEmail: checkout.order?.email ?? checkout.email ?? pkg.checkoutEmail,
  };

  return (
    <>
      <div className="w-full flex justify-center py-4 sm:py-8">
        <PaymentSuccessSection
          formData={formData}
          order={summary}
          processing={processing}
          preparingDocument={!readyDocument && waitingForDocument}
          documentLabel="W-2"
          downloadLabel="Download W-2 PDF"
          startOverLabel="Create Another W-2"
          centered
          onDownload={handleDownload}
          onStartOver={onStartOver}
        />
      </div>
      <PrintableDocument>
        <Document formData={formData} />
      </PrintableDocument>
    </>
  );
};

export default W2SuccessPanel;
