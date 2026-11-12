import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMySubscription,
  selectMySubscriptionError,
  selectMySubscriptionLoading,
  selectSubscriptionPlan,
} from "../../../../../features/dash/customer/subscription/subscriptionSelectors";
import {
  fetchMySubscription,
  openSubscriptionPortal,
  startSubscriptionCheckout,
} from "../../../../../features/dash/customer/subscription/subscriptionThunks";

export function useMySubscription() {
  const dispatch = useDispatch();
  const subscription = useSelector(selectMySubscription);
  const plan = useSelector(selectSubscriptionPlan);
  const loading = useSelector(selectMySubscriptionLoading);
  const error = useSelector(selectMySubscriptionError);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadSubscription = useCallback(() => dispatch(fetchMySubscription()), [dispatch]);
  const getCheckoutUrl = useCallback(() => dispatch(startSubscriptionCheckout()).unwrap(), [dispatch]);
  const getPortalUrl = useCallback(() => dispatch(openSubscriptionPortal()).unwrap(), [dispatch]);

  return { subscription, plan, loading, error, loadSubscription, getCheckoutUrl, getPortalUrl };
}
