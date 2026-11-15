import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminSystemDetailError,
  selectAdminSystemDetailLoading,
  selectAdminSystemDetailRecord,
  selectAdminSystemError,
  selectAdminSystemLoading,
  selectAdminSystemMeta,
  selectAdminSystemRecords,
} from "../../../../../features/dash/admin/system/systemSelectors";
import { clearSystemDetail } from "../../../../../features/dash/admin/system/systemSlice";
import {
  fetchSystemRecord,
  fetchSystemRecords,
} from "../../../../../features/dash/admin/system/systemThunks";

export function useAdminSystemTable() {
  const dispatch = useDispatch();
  const records = useSelector(selectAdminSystemRecords);
  const meta = useSelector(selectAdminSystemMeta);
  const loading = useSelector(selectAdminSystemLoading);
  const error = useSelector(selectAdminSystemError);
  const detailRecord = useSelector(selectAdminSystemDetailRecord);
  const detailLoading = useSelector(selectAdminSystemDetailLoading);
  const detailError = useSelector(selectAdminSystemDetailError);

  const loadRecords = useCallback(
    (args) => dispatch(fetchSystemRecords(args)),
    [dispatch],
  );

  const loadRecord = useCallback(
    (table, id) => dispatch(fetchSystemRecord({ table, id })),
    [dispatch],
  );

  const clearDetail = useCallback(() => {
    dispatch(clearSystemDetail());
  }, [dispatch]);

  return {
    records,
    meta,
    loading,
    error,
    detailRecord,
    detailLoading,
    detailError,
    loadRecords,
    loadRecord,
    clearDetail,
  };
}
