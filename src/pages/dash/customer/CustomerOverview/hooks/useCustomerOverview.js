import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCustomerDashboard,
  selectCustomerDashboardError,
  selectCustomerDashboardLoading,
} from "../../../../../features/dash/customer/overview/overviewSelectors";
import { fetchCustomerDashboard } from "../../../../../features/dash/customer/overview/overviewThunks";
import { downloadMyDocument } from "../../../../../features/dash/customer/document/documentThunks";

export function useCustomerOverview() {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectCustomerDashboard);
  const loading = useSelector(selectCustomerDashboardLoading);
  const error = useSelector(selectCustomerDashboardError);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadDashboard = useCallback(() => dispatch(fetchCustomerDashboard()), [dispatch]);
  const getDownloadUrl = useCallback(
    async (id) => (await dispatch(downloadMyDocument(id)).unwrap())?.url,
    [dispatch],
  );

  return { dashboard, loading, error, loadDashboard, getDownloadUrl };
}
