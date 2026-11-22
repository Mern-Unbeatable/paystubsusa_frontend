import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../../../features/auth/authSelectors";
import {
  selectMySubscription,
  selectMySubscriptionLoading,
  selectSubscriptionPlan,
} from "../../../../features/dash/customer/subscription/subscriptionSelectors";
import { fetchMySubscription } from "../../../../features/dash/customer/subscription/subscriptionThunks";
import { fetchCatalogProducts } from "../../../../features/public/catalog/publicCatalogThunks";
import {
  selectCatalogProducts,
  selectCatalogStatus,
} from "../../../../features/public/catalog/publicCatalogSelectors";

const UNLIMITED_CODE = "unlimited_monthly";

/**
 * Application Unlimited access. Prefers server `accessActive` (Stripe billing + global
 * unlimited_monthly product isActive). Falls back to billing status only when the field is absent.
 */
export const isSubscriptionActive = (subscription) => {
  if (!subscription) return false;
  if (typeof subscription.accessActive === "boolean") return subscription.accessActive;
  return subscription.status === "active" || subscription.status === "past_due";
};

/** Stripe-mirrored billing eligibility (active / past_due grace), ignoring the global product switch. */
export const isBillingEligible = (subscription) =>
  subscription?.status === "active" || subscription?.status === "past_due";

/**
 * Whether Admin Pricing Plans has Unlimited marked Active.
 * Prefer the subscription DTO field; otherwise use the public catalog plan presence.
 */
export const isPlanAvailable = (subscription, plan) => {
  if (typeof subscription?.planAvailable === "boolean") return subscription.planAvailable;
  return Boolean(plan);
};

/** Reads the stored subscription state without fetching; only customers can hold a plan. */
export const useHasActiveSubscription = () => {
  const user = useSelector(selectAuthUser);
  const subscription = useSelector(selectMySubscription);
  return user?.role === "customer" && isSubscriptionActive(subscription);
};

/** Loads subscription + public catalog so Unlimited availability is known for guests and customers. */
export function useActiveSubscription() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const subscriptionLoading = useSelector(selectMySubscriptionLoading);
  const subscription = useSelector(selectMySubscription);
  const plan = useSelector(selectSubscriptionPlan);
  const catalogProducts = useSelector(selectCatalogProducts);
  const catalogStatus = useSelector(selectCatalogStatus);
  const isActive = useHasActiveSubscription();
  const isCustomer = user?.role === "customer";
  const catalogLoading = catalogStatus === "idle" || catalogStatus === "loading";

  const catalogPlan = useMemo(
    () => catalogProducts.find((p) => p.code === UNLIMITED_CODE) ?? null,
    [catalogProducts],
  );

  // Prefer subscription DTO / customer plan; fall back to public catalog (guests + marketing surfaces).
  const resolvedPlan = plan ?? catalogPlan;
  const availabilityLoading = (isCustomer && subscriptionLoading) || catalogLoading;
  // Hide Unlimited until we know the global product is Active — avoids showing it while Inactive.
  const planAvailable = availabilityLoading ? false : isPlanAvailable(subscription, resolvedPlan);

  useEffect(() => {
    // Force so Admin Active/Inactive changes are picked up without a full reload.
    dispatch(fetchCatalogProducts({ force: true }));
  }, [dispatch]);

  useEffect(() => {
    if (!isCustomer) return undefined;
    const request = dispatch(fetchMySubscription());
    return () => request.abort();
  }, [dispatch, isCustomer]);

  return {
    isActive,
    planAvailable,
    billingEligible: isBillingEligible(subscription),
    loading: availabilityLoading,
  };
}
