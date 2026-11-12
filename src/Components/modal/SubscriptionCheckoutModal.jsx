import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CheckoutElementsProvider, PaymentElement, useCheckoutElements } from "@stripe/react-stripe-js/checkout";
import { CreditCard, Lock } from "lucide-react";
import ProfileModal from "./ProfileModal";
import { stripePromise } from "../../pages/public/Generator/utils/stripeClient";
import { getErrorMessage } from "../../api/errorNormalizer";
import { startSubscriptionCheckout } from "../../features/dash/customer/subscription/subscriptionThunks";

const Notice = ({ children }) => (
  <p role="alert" className="text-[13px] text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
    {children}
  </p>
);

const Loading = () => (
  <div className="flex items-center justify-center py-16 text-sm text-slate-500 gap-2">
    <span className="w-4 h-4 border-2 border-slate-200 border-t-[#2563EB] rounded-full animate-spin" />
    Loading secure checkout...
  </div>
);

const SubscribeForm = ({ onComplete, onBusyChange }) => {
  const result = useCheckoutElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (result.type === "loading") return <Loading />;
  if (result.type === "error") return <Notice>Could not load checkout. Please try again.</Notice>;
  const { checkout } = result;
  const price = checkout.total.total.amount;

  const setBusy = (busy) => {
    setSubmitting(busy);
    onBusyChange(busy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setBusy(true);
    setError(null);
    const res = await checkout.confirm({ redirect: "if_required" });
    setBusy(false);
    if (res.type === "error") {
      setError(res.error.message || "Your payment could not be processed. Please try again.");
      return;
    }
    onComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && <Notice>{error}</Notice>}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing Payment...
          </span>
        ) : (
          <>
            <Lock className="w-4 h-4" />
            <span>Subscribe for {price}/month</span>
          </>
        )}
      </button>
      <p className="text-center text-slate-400 text-[12px]">
        Payments processed securely by Stripe. Renews monthly until you cancel.
      </p>
    </form>
  );
};

/** Session secret is fetched per open, so the dialog body unmounts on close. */
const CheckoutBody = ({ onComplete, onBusyChange }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ clientSecret: null, error: null });
  // StrictMode runs effects twice in development; reuse the request so only one session is created.
  const request = useRef(null);

  useEffect(() => {
    let active = true;
    request.current ??= dispatch(startSubscriptionCheckout());
    request.current.then((action) => {
      if (!active) return;
      if (startSubscriptionCheckout.fulfilled.match(action) && action.payload) {
        setState({ clientSecret: action.payload, error: null });
      } else {
        setState({ clientSecret: null, error: getErrorMessage(action.payload, "Could not start checkout. Please try again.") });
      }
    });
    return () => {
      active = false;
    };
  }, [dispatch]);

  const options = useMemo(
    () => ({
      clientSecret: state.clientSecret,
      elementsOptions: { appearance: { theme: "stripe", variables: { colorPrimary: "#1E60F2" } } },
    }),
    [state.clientSecret],
  );

  if (state.error) return <Notice>{state.error}</Notice>;
  if (!state.clientSecret) return <Loading />;
  return (
    <CheckoutElementsProvider stripe={stripePromise} options={options}>
      <SubscribeForm onComplete={onComplete} onBusyChange={onBusyChange} />
    </CheckoutElementsProvider>
  );
};

/** Unlimited plan checkout: Stripe Payment Element in our dialog, same look as the paystub payment dialog. */
const SubscriptionCheckoutModal = ({ open, onClose, onComplete, planLabel = "Unlimited Access" }) => {
  const [busy, setBusy] = useState(false);

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      dismissible={!busy}
      closeOnOverlayClick={false}
      size="lg"
      icon={CreditCard}
      title={`Subscribe to ${planLabel}`}
      description="Billed monthly. Cancel anytime from your dashboard."
    >
      {!open ? null : stripePromise ? (
        <CheckoutBody onComplete={onComplete} onBusyChange={setBusy} />
      ) : (
        <Notice>Online payments are not available right now. Please contact support.</Notice>
      )}
    </ProfileModal>
  );
};

export default SubscriptionCheckoutModal;
