import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Star, Check, HelpCircle, ExternalLink, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { DashboardHeader } from '../../../../Components/Dashboard';
import { describeRequestError } from '../Profile/utils/profileFormat';
import { formatMoney, formatShortDate } from '../../admin/users/utils/userFormat';
import { subscriptionStatusLabel } from '../CustomerOverview/utils/overviewFormat';
import { useMySubscription } from './hooks/useMySubscription';

// Marketing copy for the Unlimited plan; the catalog stores price and interval only.
const PLAN_FEATURES = [
  'Unlimited Paystub Generation',
  'Unlimited W-2 Generation',
  'Unlimited 1099 Generation',
  'Access to All Supported Document Types',
];

const STATUS_PILL = {
  active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  past_due: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
  unpaid: 'bg-rose-500/20 text-rose-200 border-rose-500/30',
  incomplete: 'bg-amber-500/20 text-amber-200 border-amber-500/30',
  canceled: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
};
const STATUS_DOT = {
  active: 'bg-emerald-400',
  past_due: 'bg-amber-400',
  unpaid: 'bg-rose-400',
  incomplete: 'bg-amber-400',
  canceled: 'bg-slate-400',
};

// Webhooks can land a few seconds after Stripe redirects back.
const CHECKOUT_RECHECK_MS = [3000, 8000, 15000];
const INTERVAL_LABELS = { month: 'Monthly', year: 'Yearly', week: 'Weekly', day: 'Daily' };

const isSafeRedirect = (url) => typeof url === 'string' && url.startsWith('https://');

const SubscriptionView = () => {
  const { subscription, plan, loading, error, loadSubscription, getCheckoutUrl, getPortalUrl } = useMySubscription();
  const [searchParams, setSearchParams] = useSearchParams();
  const checkoutResult = searchParams.get('checkout');
  const [redirecting, setRedirecting] = useState(null);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const request = loadSubscription();
    return () => request.abort();
  }, [loadSubscription]);

  const isActive = subscription?.status === 'active' || subscription?.status === 'past_due';

  useEffect(() => {
    if (checkoutResult !== 'success' || isActive) return undefined;
    const timers = CHECKOUT_RECHECK_MS.map((ms) => setTimeout(loadSubscription, ms));
    return () => timers.forEach(clearTimeout);
  }, [checkoutResult, isActive, loadSubscription]);

  const dismissCheckoutNotice = () => {
    const next = new URLSearchParams(searchParams);
    next.delete('checkout');
    setSearchParams(next, { replace: true });
  };

  const redirect = async (kind) => {
    setActionError(null);
    setRedirecting(kind);
    try {
      const url = kind === 'checkout' ? await getCheckoutUrl() : await getPortalUrl();
      if (!isSafeRedirect(url)) throw new Error();
      window.location.assign(url);
    } catch (err) {
      setActionError(describeRequestError(err, 'Could not open Stripe. Please try again.'));
      setRedirecting(null);
    }
  };

  const showSkeleton = loading && !subscription && !plan && !error;
  const shown = subscription ?? plan;
  const price = shown ? formatMoney(shown.amountCents, shown.currency) : null;
  const interval = shown?.interval;
  const status = subscription?.status;
  const canSubscribe = !isActive && Boolean(plan);
  const periodEnd = subscription?.currentPeriodEnd ? formatShortDate(subscription.currentPeriodEnd) : '—';

  const metadata = subscription
    ? [
        { label: 'Billing frequency', value: INTERVAL_LABELS[interval] ?? '—' },
        {
          label: subscription.cancelAtPeriodEnd || status === 'canceled' ? 'Access ends' : 'Current period ends',
          value: periodEnd,
        },
        {
          label: 'Next billing date',
          value: isActive && !subscription.cancelAtPeriodEnd ? periodEnd : 'No upcoming charge',
        },
        {
          label: 'Payment method',
          value: subscription.cardLast4
            ? `${subscription.cardBrand ?? 'Card'} ending in ${subscription.cardLast4}`
            : 'Managed in Stripe',
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="My Subscription"
        description="View your current subscription and unlimited access details."
      />

      {checkoutResult === 'success' && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>
              {isActive
                ? 'Your Unlimited subscription is active. Thank you!'
                : 'Payment received. We are activating your subscription; this can take a few seconds.'}
            </span>
          </div>
          <button type="button" onClick={dismissCheckoutNotice} aria-label="Dismiss" className="cursor-pointer text-emerald-700 hover:text-emerald-900">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {checkoutResult === 'canceled' && (
        <div className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700" role="status">
          <span>Checkout was canceled. You have not been charged.</span>
          <button type="button" onClick={dismissCheckoutNotice} aria-label="Dismiss" className="cursor-pointer text-slate-500 hover:text-slate-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {(error || actionError) && (
        <div className="flex flex-col gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between" role="alert">
          <span className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            {actionError ?? describeRequestError(error, 'Could not load your subscription.')}
          </span>
          {error && !actionError && (
            <button type="button" onClick={loadSubscription} className="font-semibold underline cursor-pointer self-start sm:self-auto">
              Try again
            </button>
          )}
        </div>
      )}

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B254E] via-[#0E2D5E] to-[#12366F] text-white p-6 sm:p-8 lg:p-10 shadow-lg">
        <div
          className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 rounded-l-full pointer-events-none blur-xl"
          aria-hidden="true"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-[#009BFB]" />
              <span>{subscription ? 'Current plan' : 'Available plan'}</span>
            </div>

            <div>
              {showSkeleton ? (
                <span className="block h-9 w-56 animate-pulse rounded bg-white/10" />
              ) : (
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {subscription?.planName ?? plan?.name ?? 'Unlimited Access'}
                </h2>
              )}
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-md">
                Everything you need to create professional documents, without limits.
              </p>
            </div>

            <div className="pt-2">
              {showSkeleton ? (
                <span className="block h-10 w-32 animate-pulse rounded bg-white/10" />
              ) : price ? (
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">{price}</span>
                  {interval && <span className="text-xs text-slate-400 font-medium">/{interval}</span>}
                </div>
              ) : (
                <p className="text-sm text-slate-300">The Unlimited plan is not available right now.</p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {status && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_PILL[status] ?? STATUS_PILL.canceled}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[status] ?? STATUS_DOT.canceled}`} />
                    <span>{subscriptionStatusLabel(status)}</span>
                  </span>
                )}
                {subscription?.cancelAtPeriodEnd && status !== 'canceled' && (
                  <span className="text-xs text-amber-200">Cancels on {periodEnd}</span>
                )}
                {status === 'past_due' && (
                  <span className="text-xs text-amber-200">Your last payment failed. Update your card to keep access.</span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {canSubscribe && (
                <button
                  type="button"
                  onClick={() => redirect('checkout')}
                  disabled={Boolean(redirecting)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-sm transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {redirecting === 'checkout' ? 'Opening checkout...' : subscription ? 'Resubscribe' : 'Subscribe now'}
                </button>
              )}
              {subscription && (
                <button
                  type="button"
                  onClick={() => redirect('portal')}
                  disabled={Boolean(redirecting)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded border border-white/30 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <ExternalLink className="w-4 h-4" />
                  {redirecting === 'portal' ? 'Opening portal...' : 'Manage subscription'}
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 backdrop-blur-xs rounded-2xl p-5 sm:p-6 border border-white/10">
            <h3 className="text-xs font-semibold text-slate-200 mb-3.5">
              {isActive ? 'Included with your plan' : 'What you get'}
            </h3>
            <ul className="space-y-2.5">
              {PLAN_FEATURES.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5 text-xs text-slate-200">
                  <div className="w-4 h-4 rounded-full bg-[#009BFB]/20 text-[#009BFB] flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {metadata.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-5 sm:p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {metadata.map((item) => (
              <div key={item.label}>
                <span className="text-xs font-medium text-slate-400 block mb-1">{item.label}</span>
                <p className="font-bold text-xs sm:text-sm text-slate-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#F0F7FF] border border-sky-100/80 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
        <div className="w-5 h-5 text-[#009BFB] flex-shrink-0 mt-0.5">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs sm:text-sm text-slate-900">Secure subscription management</h4>
          <p className="text-xs text-slate-500 mt-0.5">
            You'll be redirected to Stripe's secure checkout or customer portal to subscribe, update payment details, or cancel your plan.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionView;
