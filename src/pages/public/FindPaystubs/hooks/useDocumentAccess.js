import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDocumentAccess } from "../../../../features/public/documentAccess/documentAccessSelectors";
import { documentAccessExpired, endDocumentAccess } from "../../../../features/public/documentAccess/documentAccessSlice";
import {
  sendDocumentAccessCode,
  verifyDocumentAccessCode,
} from "../../../../features/public/documentAccess/documentAccessThunks";

/**
 * Email + 6-digit code → a 30-minute guest token scoped to that email (held in the store, memory only).
 * `onExpired` runs when the server-issued expiry passes, including on returning after it lapsed.
 */
export function useDocumentAccess({ onExpired } = {}) {
  const dispatch = useDispatch();
  const { email, challengeId, session, pending } = useSelector(selectDocumentAccess);
  const expiredRef = useRef(onExpired);
  useEffect(() => {
    expiredRef.current = onExpired;
  }, [onExpired]);

  const expiresAt = session?.expiresAt ? Date.parse(session.expiresAt) : NaN;
  useEffect(() => {
    if (Number.isNaN(expiresAt)) return undefined;
    const timer = setTimeout(() => {
      dispatch(documentAccessExpired());
      expiredRef.current?.();
    }, Math.max(expiresAt - Date.now(), 0));
    return () => clearTimeout(timer);
  }, [expiresAt, dispatch]);

  const sendCode = useCallback((value) => dispatch(sendDocumentAccessCode(value)).unwrap(), [dispatch]);
  const verifyCode = useCallback((code) => dispatch(verifyDocumentAccessCode(code)).unwrap(), [dispatch]);
  const reset = useCallback(() => dispatch(endDocumentAccess()), [dispatch]);

  return { email, codeSent: Boolean(challengeId), session, pending, sendCode, verifyCode, reset };
}
