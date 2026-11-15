import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import PrintableDocument from "../../../shared/documentFlow/components/PrintableDocument";
import { printDocument } from "../../../shared/documentFlow/utils/documentFlow";
import PaymentSuccessSection from "../../../Generator/components/sections/PaymentSuccessSection";
import { useNec1099FormData } from "../../hooks/useNec1099FormData";
import { useNec1099Order } from "../../hooks/useNec1099Order";
import { useNec1099FlowNavigation } from "../../hooks/useNec1099FlowNavigation";
import { NEC1099_FLOW } from "../../utils/nec1099Flow";
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
    if (!order?.id || settled || order.documentType !== "nec1099")
      return undefined;
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

const Nec1099SuccessPanel = () => {
  const dispatch = useDispatch();
  const pkg = useNec1099Order();
  const checkout = useSelector(selectCheckout);
  const paid = useSelector(selectCheckoutPaid);
  const { formData } = useNec1099FormData();
  const { onStartOver, onCheckoutVerifying } = useNec1099FlowNavigation();
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
    const isNec =
      !checkout.order || checkout.order.documentType === "nec1099";
    if ((!paid && !processing) || !isNec) {
      onCheckoutVerifying({ replace: true });
    }
  }, [checkingRedirect, paid, checkout.paymentStatus, checkout.order]); // eslint-disable-line react-hooks/exhaustive-deps

  if (checkingRedirect)
    return <div className="min-h-[40vh]" aria-busy="true" />;

  const processing = !paid && checkout.paymentStatus === "processing";
  const isNec = !checkout.order || checkout.order.documentType === "nec1099";
  if ((!paid && !processing) || !isNec) {
    return <div className="min-h-[40vh]" aria-busy="true" />;
  }

  const documents = checkout.order?.documents ?? [];
  const readyDocument = documents.find((d) => d.status === "ready");
  const { Document } = NEC1099_FLOW;

  const handleDownload = async () => {
    if (!readyDocument) {
      if (!waitingForDocument)
        printDocument(NEC1099_FLOW.getPdfFileNameParts(formData));
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
      <PaymentSuccessSection
        formData={{ employeeName: formData.recipientName, ...formData }}
        order={summary}
        processing={processing}
        preparingDocument={!readyDocument && waitingForDocument}
        documentLabel="1099-NEC"
        downloadLabel="Download 1099-NEC PDF"
        startOverLabel="Create Another 1099-NEC"
        onDownload={handleDownload}
        onStartOver={onStartOver}
      />
      <PrintableDocument>
        <Document formData={formData} />
      </PrintableDocument>
    </>
  );
};

export default Nec1099SuccessPanel;
