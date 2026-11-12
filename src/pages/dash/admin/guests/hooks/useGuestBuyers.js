import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminGuestBuyers,
  selectAdminGuestError,
  selectAdminGuestLoading,
  selectAdminGuestMeta,
} from "../../../../../features/dash/admin/guest/guestSelectors";
import { fetchGuestBuyers } from "../../../../../features/dash/admin/guest/guestThunks";

export function useGuestBuyers() {
  const dispatch = useDispatch();
  const guests = useSelector(selectAdminGuestBuyers);
  const meta = useSelector(selectAdminGuestMeta);
  const loading = useSelector(selectAdminGuestLoading);
  const error = useSelector(selectAdminGuestError);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadGuests = useCallback(
    (filters) => dispatch(fetchGuestBuyers(filters)),
    [dispatch],
  );

  return { guests, meta, loading, error, loadGuests };
}
