import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AlertCircle, CheckCircle2, Infinity as InfinityIcon, Lock } from "lucide-react";
import { PATHS } from "../../../../../config/paths";
import { getErrorMessage } from "../../../../../api/errorNormalizer";
import { selectAuthUser } from "../../../../../features/auth/authSelectors";
import {
  selectMySubscription,
  selectMySubscriptionError,
  selectMySubscriptionLoading,
} from "../../../../../features/dash/customer/subscription/subscriptionSelectors";
import { fetchMySubscription } from "../../../../../features/dash/customer/subscription/subscriptionThunks";
import { rememberSubscriptionReturn } from "../../../../../features/dash/customer/subscription/subscriptionReturn";
import SubscriptionCheckoutModal from "../../../../../Components/modal/SubscriptionCheckoutModal";
import { isSubscriptionActive } from "../../hooks/useActiveSubscription";

const card = "bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in-50 duration-200";
const primaryButton =
  "w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";
const Spinner = () => <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />;

// After paying, the webhook activates the plan within a few seconds; poll until it does.
const ACTIVATION_POLL_MS = 2500;
const ACTIVATION_MAX_POLLS = 12;

/**
 * Checkout for the Unlimited package: no card payment for the document itself. Subscribers create
 * it for $0; everyone else signs in and subscribes in the Stripe checkout dialog first.
 */
const UnlimitedCheckoutSection = ({ generating, onGenerate }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(selectAuthUser);
  const subscription = useSelector(selectMySubscription);
  const loading = useSelector(selectMySubscriptionLoading);
  const error = useSelector(selectMySubscriptionError);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activating, setActivating] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const isCustomer = user?.role === "customer";
  const isActive = isSubscriptionActive(subscription);
  const stillActivating = activating && !isActive && pollCount < ACTIVATION_MAX_POLLS;

  useEffect(() => {
    if (!isCustomer) return undefined;
    const request = dispatch(fetchMySubscription());
    return () => request.abort();
  }, [dispatch, isCustomer]);

  useEffect(() => {
    if (!stillActivating) return undefined;
    const timer = setTimeout(() => {
      dispatch(fetchMySubscription());
      setPollCount((n) => n + 1);
    }, ACTIVATION_POLL_MS);
    return () => clearTimeout(timer);
  }, [stillActivating, pollCount, dispatch]);

  if (!isCustomer) {
    return (
      <div className={card}>
        <div className="flex items-start gap-3">
          <InfinityIcon className="w-6 h-6 text-[#2563EB] flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">Sign in to use Unlimited Access</h2>
            <p className="text-[14px] text-slate-500 mt-1">
              The Unlimited plan is tied to your account. Sign in or create a free account, then subscribe or use your
              active plan. Your paystub details are kept.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link to={PATHS.AUTH.login} state={{ from: location }} className={primaryButton}>
            Sign in
          </Link>
          <Link
            to={PATHS.AUTH.register}
            state={{ from: location }}
            className="w-full py-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-[15px] transition flex items-center justify-center"
          >
            Create account
          </Link>
        </div>
      </div>
    );
  }

  const openCheckout = () => {
    // Redirect-based payment methods come back to /customer/subscription; offer a way back here.
    rememberSubscriptionReturn(`${location.pathname}${location.search}`);
    setCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCheckoutOpen(false);
    setPollCount(0);
    setActivating(true);
    dispatch(fetchMySubscription());
  };

  if (loading && !subscription && !activating) {
    return (
      <div className={card}>
        <div className="h-6 w-48 rounded bg-slate-100 animate-pulse" />
        <div className="h-12 w-full rounded-xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  const activationTimedOut = activating && !isActive && !stillActivating;

  return (
    <div className={card}>
      {isActive ? (
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-emerald-800">Unlimited Access is active</p>
            <p className="text-[13px] text-emerald-700 break-all">
              This paystub is included in your plan. It will be sent to {user.email}.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <InfinityIcon className="w-6 h-6 text-[#2563EB] flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-slate-900">Subscribe to Unlimited Access</h2>
            <p className="text-[14px] text-slate-500 mt-1">
              Pay securely with Stripe right here, then create this paystub at no extra cost.
            </p>
          </div>
        </div>
      )}

      {!user.emailVerified && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3 text-[13px] text-amber-800">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            Verify your email first.{" "}
            <Link to={PATHS.CUSTOMER.profile} className="font-semibold underline">
              Go to your profile
            </Link>
          </span>
        </div>
      )}

      {activationTimedOut && (
        <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3.5 py-3 text-[13px] text-amber-800" role="status">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>
            Payment received, but your plan isn't active yet. Please wait a moment and{" "}
            <button type="button" onClick={handleCheckoutComplete} className="font-semibold underline cursor-pointer">
              check again
            </button>
            .
          </span>
        </div>
      )}

      {error && !subscription && !activating && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 px-3.5 py-3 text-[13px] text-rose-700" role="alert">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{getErrorMessage(error)}</span>
        </div>
      )}

      <div>
        {isActive ? (
          <button type="button" onClick={onGenerate} disabled={generating || !user.emailVerified} className={primaryButton}>
            {generating ? (
              <>
                <Spinner /> Creating your paystub...
              </>
            ) : (
              <>
                <InfinityIcon className="w-4 h-4" /> Create paystub with Unlimited
              </>
            )}
          </button>
        ) : stillActivating ? (
          <button type="button" disabled className={primaryButton}>
            <Spinner /> Activating your plan...
          </button>
        ) : (
          <button type="button" onClick={openCheckout} disabled={!user.emailVerified} className={primaryButton}>
            <Lock className="w-4 h-4" /> Subscribe with Stripe
          </button>
        )}
        <p className="text-center text-slate-400 text-[12px] mt-2.5">
          {isActive ? "No payment needed for this paystub." : "Billed monthly by Stripe. Cancel anytime from your dashboard."}
        </p>
      </div>

      <SubscriptionCheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onComplete={handleCheckoutComplete}
      />
    </div>
  );
};

export default UnlimitedCheckoutSection;
