import { useCallback, useEffect, useState } from "react";

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const SEARCH_DEBOUNCE_MS = 300;
const EMPTY_META = { page: 1, pageSize: 20, totalItems: 0, totalPages: 0 };

/**
 * Server-side search, filtering and pagination. `fetchPage(filters, { signal })` must
 * resolve to `{ items, meta }` and be stable (module-level), and `initialFilters` must
 * contain `q`, `page` and `pageSize`.
 */
export function usePaginatedList(fetchPage, initialFilters) {
  const [filters, setFilters] = useState(initialFilters);
  const [search, setSearch] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  // `key` identifies the request a result belongs to; a mismatch means a newer request is loading.
  const [result, setResult] = useState({ key: null, items: [], meta: EMPTY_META, error: null });
  const requestKey = `${JSON.stringify(filters)}#${reloadKey}`;

  useEffect(() => {
    const trimmed = search.trim();
    const timer = setTimeout(() => {
      setFilters((prev) => (prev.q === trimmed ? prev : { ...prev, q: trimmed, page: 1 }));
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();

    fetchPage(filters, { signal: controller.signal })
      .then(({ items, meta }) => {
        setResult({ key: requestKey, items, meta, error: null });
        // The total can shrink (e.g. after a change under an active filter); stay on a real page.
        if (meta.totalPages > 0 && filters.page > meta.totalPages) {
          setFilters((prev) => ({ ...prev, page: meta.totalPages }));
        }
      })
      .catch((err) => {
        if (!err?.isCanceled) setResult((prev) => ({ ...prev, key: requestKey, error: err }));
      });

    return () => controller.abort();
  }, [fetchPage, filters, requestKey]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === "page" ? value : 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setFilters(initialFilters);
  }, [initialFilters]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  /** Applies a server-confirmed change to one row without refetching the page. */
  const replaceItem = useCallback((updated, matches) => {
    setResult((prev) => ({
      ...prev,
      items: prev.items.map((item) => (matches(item) ? { ...item, ...updated } : item)),
    }));
  }, []);

  const loading = result.key !== requestKey;

  return {
    items: result.items,
    meta: result.meta,
    filters,
    search,
    setSearch,
    updateFilter,
    resetFilters,
    loading,
    error: loading ? null : result.error,
    reload,
    replaceItem,
  };
}
