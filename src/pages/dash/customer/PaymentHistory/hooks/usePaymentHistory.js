import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectMyPayments,
  selectMyPaymentsError,
  selectMyPaymentsLoading,
  selectMyPaymentsMeta,
} from "../../../../../features/dash/customer/payment/paymentSelectors";
import { fetchMyPayments } from "../../../../../features/dash/customer/payment/paymentThunks";

export function usePaymentHistory() {
  const dispatch = useDispatch();
  const payments = useSelector(selectMyPayments);
  const meta = useSelector(selectMyPaymentsMeta);
  const loading = useSelector(selectMyPaymentsLoading);
  const error = useSelector(selectMyPaymentsError);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadPayments = useCallback((filters) => dispatch(fetchMyPayments(filters)), [dispatch]);

  return { payments, meta, loading, error, loadPayments };
}
