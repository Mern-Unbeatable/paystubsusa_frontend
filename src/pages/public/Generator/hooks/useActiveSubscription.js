import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../../../features/auth/authSelectors";
import {
  selectMySubscription,
  selectMySubscriptionLoading,
} from "../../../../features/dash/customer/subscription/subscriptionSelectors";
import { fetchMySubscription } from "../../../../features/dash/customer/subscription/subscriptionThunks";

// Same statuses the server accepts for Unlimited orders (findActiveForUser).
export const isSubscriptionActive = (subscription) =>
  subscription?.status === "active" || subscription?.status === "past_due";

/** Reads the stored subscription state without fetching; only customers can hold a plan. */
export const useHasActiveSubscription = () => {
  const user = useSelector(selectAuthUser);
  const subscription = useSelector(selectMySubscription);
  return user?.role === "customer" && isSubscriptionActive(subscription);
};

/** Loads the signed-in customer's subscription and reports whether Unlimited is active. */
export function useActiveSubscription() {
  const dispatch = useDispatch();
  const user = useSelector(selectAuthUser);
  const loading = useSelector(selectMySubscriptionLoading);
  const isActive = useHasActiveSubscription();
  const isCustomer = user?.role === "customer";

  useEffect(() => {
    if (!isCustomer) return undefined;
    const request = dispatch(fetchMySubscription());
    return () => request.abort();
  }, [dispatch, isCustomer]);

  return { isActive, loading: isCustomer && loading };
}
