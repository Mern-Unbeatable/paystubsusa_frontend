import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerDocumentService } from "../../../../features/dash/customer/document/document.service";
import { guestAuth } from "../../../../features/public/checkout/checkoutApi";
import {
  foundDocumentsKey,
  isGuestOwner,
  selectDocumentAccess,
} from "../../../../features/public/documentAccess/documentAccessSelectors";
import {
  documentAccessExpired,
  setFoundDocumentsFilter,
} from "../../../../features/public/documentAccess/documentAccessSlice";
import { fetchFoundDocuments } from "../../../../features/public/documentAccess/documentAccessThunks";

const EMPTY_META = { page: 1, pageSize: 0, totalItems: 0, totalPages: 0 };

/**
 * Documents of paid orders for `owner` (verified guest email or signed-in account). Filters, page and the
 * last results live in the store, so returning to the page shows them at once and refetches in the
 * background; the API re-validates the session on that request. `onSessionExpired` runs on a guest 401.
 */
export function useDocumentHistory({ owner, pageSize, onSessionExpired }) {
  const dispatch = useDispatch();
  const { filters, list, documentsOwner, session } = useSelector(selectDocumentAccess);
  const guestToken = isGuestOwner(owner) ? session?.guestToken : null;
  const key = foundDocumentsKey(owner, filters, pageSize);
  const expiredRef = useRef(onSessionExpired);
  useEffect(() => {
    expiredRef.current = onSessionExpired;
  }, [onSessionExpired]);

  const load = useCallback(
    () =>
      dispatch(fetchFoundDocuments({ owner, pageSize })).then((action) => {
        if (fetchFoundDocuments.rejected.match(action) && action.payload?.status === 401 && isGuestOwner(owner)) {
          expiredRef.current?.();
        }
      }),
    [dispatch, owner, pageSize],
  );

  // Runs on arrival (including Back) and whenever the owner, filters or page change.
  useEffect(() => {
    if (owner) load();
  }, [key, owner, load]);

  const setFilter = useCallback((name, value) => dispatch(setFoundDocumentsFilter({ name, value })), [dispatch]);

  /** 5-minute signed URL; the server checks ownership, payment and readiness. */
  const getDownloadUrl = useCallback(
    async (id) => {
      try {
        const data = await customerDocumentService.download(id, { headers: guestAuth(guestToken) });
        if (!data?.url) throw new Error("Download link unavailable");
        return data.url;
      } catch (error) {
        if (error?.status === 401 && guestToken) {
          dispatch(documentAccessExpired());
          expiredRef.current?.();
        }
        throw error;
      }
    },
    [guestToken, dispatch],
  );

  /** The signed URL forces a download, so previews load the PDF into a local object URL instead. */
  const getPreviewUrl = useCallback(
    async (id) => {
      const response = await fetch(await getDownloadUrl(id));
      if (!response.ok) throw new Error("Preview unavailable");
      return URL.createObjectURL(new Blob([await response.blob()], { type: "application/pdf" }));
    },
    [getDownloadUrl],
  );

  const isOwn = Boolean(owner) && list.owner === owner;
  const failed = isOwn && list.key === key && list.status === "failed";
  return {
    filters,
    setFilter,
    documents: isOwn ? list.documents : [],
    meta: isOwn ? list.meta : EMPTY_META,
    loading: Boolean(owner) && list.loadedKey !== key && !failed,
    error: failed ? list.error : null,
    showDocuments: Boolean(owner) && documentsOwner === owner,
    reload: load,
    getDownloadUrl,
    getPreviewUrl,
  };
}
