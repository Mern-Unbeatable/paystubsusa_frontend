import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminOrderDetails,
  selectAdminOrders,
  selectAdminOrdersError,
  selectAdminOrdersLoading,
  selectAdminOrdersMeta,
} from "../../../../../features/dash/admin/order/orderSelectors";
import { fetchOrderDetails, fetchOrders } from "../../../../../features/dash/admin/order/orderThunks";

export function useAdminOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAdminOrders);
  const meta = useSelector(selectAdminOrdersMeta);
  const loading = useSelector(selectAdminOrdersLoading);
  const error = useSelector(selectAdminOrdersError);
  const details = useSelector(selectAdminOrderDetails);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadOrders = useCallback((requestFilters) => dispatch(fetchOrders(requestFilters)), [dispatch]);
  const loadOrderDetails = useCallback((id) => dispatch(fetchOrderDetails(id)), [dispatch]);

  return { orders, meta, loading, error, details, loadOrders, loadOrderDetails };
}
