import { useCallback, useEffect, useRef, useState } from "react";
import { customerDocumentService } from "../../../../features/dash/customer/document/document.service";
import { guestAuth } from "../../../../features/public/checkout/checkoutApi";

const EMPTY_META = { page: 1, pageSize: 0, totalItems: 0, totalPages: 0 };

/**
 * Documents of paid orders for the verified guest email (or the signed-in customer).
 * The API scopes the list and every download to the caller; `onSessionExpired` runs on a 401.
 */
export function useDocumentHistory({ enabled, guestToken, pageSize, onSessionExpired }) {
  const [filters, setFilters] = useState({ type: "", q: "", sort: "-createdAt", page: 1 });
  const [reloadKey, setReloadKey] = useState(0);
  const [result, setResult] = useState({ key: null, documents: [], meta: EMPTY_META, error: null });
  const expiredRef = useRef(onSessionExpired);
  useEffect(() => {
    expiredRef.current = onSessionExpired;
  }, [onSessionExpired]);

  const requestKey = JSON.stringify({ guestToken, filters, pageSize, reloadKey });

  const handleError = useCallback(
    (error) => {
      if (error?.status === 401 && guestToken) expiredRef.current?.();
      throw error;
    },
    [guestToken],
  );

  useEffect(() => {
    if (!enabled) return undefined;
    const controller = new AbortController();
    customerDocumentService
      .list({ ...filters, pageSize }, { signal: controller.signal, headers: guestAuth(guestToken) })
      .then(({ documents, meta }) => setResult({ key: requestKey, documents, meta, error: null }))
      .catch((error) => {
        if (error?.isCanceled) return;
        if (error?.status === 401 && guestToken) expiredRef.current?.();
        setResult({ key: requestKey, documents: [], meta: EMPTY_META, error });
      });
    return () => controller.abort();
  }, [enabled, requestKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const setFilter = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: name === "page" ? value : 1 }));
  }, []);

  /** 5-minute signed URL; the server checks ownership, payment and readiness. */
  const getDownloadUrl = useCallback(
    async (id) => {
      const data = await customerDocumentService
        .download(id, { headers: guestAuth(guestToken) })
        .catch(handleError);
      if (!data?.url) throw new Error("Download link unavailable");
      return data.url;
    },
    [guestToken, handleError],
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

  const current = enabled && result.key === requestKey ? result : null;
  return {
    filters,
    setFilter,
    documents: current?.documents ?? [],
    meta: current?.meta ?? EMPTY_META,
    loading: enabled && !current,
    error: current?.error ?? null,
    reload: () => setReloadKey((k) => k + 1),
    getDownloadUrl,
    getPreviewUrl,
  };
}
