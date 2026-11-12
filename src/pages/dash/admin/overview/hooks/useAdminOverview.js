import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminDashboard,
  selectAdminDashboardError,
  selectAdminDashboardLoading,
} from "../../../../../features/dash/admin/overview/overviewSelectors";
import { fetchDashboard } from "../../../../../features/dash/admin/overview/overviewThunks";

export function useAdminOverview() {
  const dispatch = useDispatch();
  const dashboard = useSelector(selectAdminDashboard);
  const loading = useSelector(selectAdminDashboardLoading);
  const error = useSelector(selectAdminDashboardError);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadDashboard = useCallback((range) => dispatch(fetchDashboard(range)), [dispatch]);

  return { dashboard, loading, error, loadDashboard };
}
