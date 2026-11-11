import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserDetails,
  selectUserFilters,
  selectUsers,
  selectUsersError,
  selectUsersLoading,
  selectUsersMeta,
  selectUsersStatus,
} from "../../../../../features/dash/admin/user/userSelectors";
import { resetUserFilters, setUserFilter } from "../../../../../features/dash/admin/user/userSlice";
import {
  fetchUserDetails,
  fetchUsers,
  updateUserStatus as updateUserStatusThunk,
} from "../../../../../features/dash/admin/user/userThunks";

export function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const meta = useSelector(selectUsersMeta);
  const filters = useSelector(selectUserFilters);
  const loading = useSelector(selectUsersLoading);
  const status = useSelector(selectUsersStatus);
  const error = useSelector(selectUsersError);
  const details = useSelector(selectUserDetails);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadUsers = useCallback(
    (requestFilters) => dispatch(fetchUsers(requestFilters)),
    [dispatch],
  );

  const loadUserDetails = useCallback(
    (id) => dispatch(fetchUserDetails(id)),
    [dispatch],
  );

  const setFilter = useCallback(
    (key, value) => dispatch(setUserFilter({ key, value })),
    [dispatch],
  );

  const resetFilters = useCallback(() => dispatch(resetUserFilters()), [dispatch]);

  const updateUserStatus = useCallback(
    (payload) => dispatch(updateUserStatusThunk(payload)).unwrap(),
    [dispatch],
  );

  return {
    users,
    meta,
    filters,
    loading,
    status,
    error,
    details,
    loadUsers,
    loadUserDetails,
    setFilter,
    resetFilters,
    updateUserStatus,
  };
}
