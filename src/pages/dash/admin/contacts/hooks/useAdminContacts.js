import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAdminContactError,
  selectAdminContactLoading,
  selectAdminContactMessages,
  selectAdminContactMeta,
} from "../../../../../features/dash/admin/contact/contactSelectors";
import {
  createContactMessage,
  deleteContactMessage,
  fetchContactMessages,
  updateContactMessage,
} from "../../../../../features/dash/admin/contact/contactThunks";

export function useAdminContacts() {
  const dispatch = useDispatch();
  const messages = useSelector(selectAdminContactMessages);
  const meta = useSelector(selectAdminContactMeta);
  const loading = useSelector(selectAdminContactLoading);
  const error = useSelector(selectAdminContactError);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadMessages = useCallback(
    (filters) => dispatch(fetchContactMessages(filters)),
    [dispatch],
  );
  const createMessage = useCallback(
    (body) => dispatch(createContactMessage(body)).unwrap(),
    [dispatch],
  );
  const updateMessage = useCallback(
    (id, changes) => dispatch(updateContactMessage({ id, changes })).unwrap(),
    [dispatch],
  );
  const setStatus = useCallback(
    (id, status) => updateMessage(id, { status }),
    [updateMessage],
  );
  const removeMessage = useCallback(
    (id) => dispatch(deleteContactMessage(id)).unwrap(),
    [dispatch],
  );

  return {
    messages,
    meta,
    loading,
    error,
    loadMessages,
    createMessage,
    updateMessage,
    setStatus,
    removeMessage,
  };
}
