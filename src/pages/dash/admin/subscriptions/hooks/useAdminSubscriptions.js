import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminSubscriptionDetails,
  selectAdminSubscriptions,
  selectAdminSubscriptionsError,
  selectAdminSubscriptionsLoading,
  selectAdminSubscriptionsMeta,
} from "../../../../../features/dash/admin/subscription/subscriptionSelectors";
import {
  cancelSubscription as cancelSubscriptionThunk,
  fetchSubscriptionDetails,
  fetchSubscriptions,
} from "../../../../../features/dash/admin/subscription/subscriptionThunks";

export function useAdminSubscriptions() {
  const dispatch = useDispatch();
  const subscriptions = useSelector(selectAdminSubscriptions);
  const meta = useSelector(selectAdminSubscriptionsMeta);
  const loading = useSelector(selectAdminSubscriptionsLoading);
  const error = useSelector(selectAdminSubscriptionsError);
  const details = useSelector(selectAdminSubscriptionDetails);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadSubscriptions = useCallback((filters) => dispatch(fetchSubscriptions(filters)), [dispatch]);
  const loadSubscriptionDetails = useCallback((id) => dispatch(fetchSubscriptionDetails(id)), [dispatch]);
  const cancelSubscription = useCallback(
    (payload) => dispatch(cancelSubscriptionThunk(payload)).unwrap(),
    [dispatch],
  );

  return {
    subscriptions,
    meta,
    loading,
    error,
    details,
    loadSubscriptions,
    loadSubscriptionDetails,
    cancelSubscription,
  };
}
