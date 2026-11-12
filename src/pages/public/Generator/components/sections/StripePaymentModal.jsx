import React, { useState } from "react";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { CreditCard, Lock } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { stripePromise } from "../../utils/stripeClient";

// Card and validation messages are written for the customer; anything else stays generic.
const paymentErrorMessage = (error) =>
  error.type === "card_error" || error.type === "validation_error"
    ? error.message
    : "Your payment could not be processed. Please try again.";

const PaymentForm = ({ totalLabel, returnUrl, onPaid, onBusyChange }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const setBusy = (busy) => {
    setSubmitting(busy);
    onBusyChange(busy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || submitting) return;
    setBusy(true);
    setError(null);
    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: { return_url: returnUrl },
    });
    setBusy(false);
    if (result.error) {
      setError(paymentErrorMessage(result.error));
      return;
    }
    if (result.paymentIntent.status === "succeeded" || result.paymentIntent.status === "processing") {
      onPaid(result.paymentIntent.status);
    } else {
      setError("Your payment was not completed. Please try another payment method.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && (
        <p role="alert" className="text-[13px] text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
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
            <span>Pay {totalLabel} securely</span>
          </>
        )}
      </button>
      <p className="text-center text-slate-400 text-[12px]">Payments processed securely by Stripe.</p>
    </form>
  );
};

/** Stripe Payment Element bound to the server-created PaymentIntent, shown in a dialog. */
const StripePaymentModal = ({ open, onClose, clientSecret, email, totalLabel, returnUrl, onPaid }) => {
  const [busy, setBusy] = useState(false);

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      dismissible={!busy}
      closeOnOverlayClick={false}
      size="lg"
      icon={CreditCard}
      title={`Pay ${totalLabel}`}
      description={`Your documents will be sent to ${email}.`}
    >
      {stripePromise ? (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#1E60F2" } } }}
        >
          <PaymentForm totalLabel={totalLabel} returnUrl={returnUrl} onPaid={onPaid} onBusyChange={setBusy} />
        </Elements>
      ) : (
        <p role="alert" className="text-[13px] text-rose-600 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
          Online payments are not available right now. Please contact support.
        </p>
      )}
    </ProfileModal>
  );
};

export default StripePaymentModal;
