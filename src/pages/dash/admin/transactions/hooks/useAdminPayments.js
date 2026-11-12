import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminPaymentDetails,
  selectAdminPayments,
  selectAdminPaymentsError,
  selectAdminPaymentsLoading,
  selectAdminPaymentsMeta,
} from "../../../../../features/dash/admin/payment/paymentSelectors";
import { fetchPaymentDetails, fetchPayments } from "../../../../../features/dash/admin/payment/paymentThunks";

export function useAdminPayments() {
  const dispatch = useDispatch();
  const payments = useSelector(selectAdminPayments);
  const meta = useSelector(selectAdminPaymentsMeta);
  const loading = useSelector(selectAdminPaymentsLoading);
  const error = useSelector(selectAdminPaymentsError);
  const details = useSelector(selectAdminPaymentDetails);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadPayments = useCallback((filters) => dispatch(fetchPayments(filters)), [dispatch]);
  const loadPaymentDetails = useCallback((id) => dispatch(fetchPaymentDetails(id)), [dispatch]);

  return { payments, meta, loading, error, details, loadPayments, loadPaymentDetails };
}
