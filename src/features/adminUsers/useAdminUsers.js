import { useCallback, useEffect, useState } from "react";
import { listAdminUsersApi } from "./adminUsersApi";

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
const SEARCH_DEBOUNCE_MS = 300;
const EMPTY_META = { page: 1, pageSize: 20, totalItems: 0, totalPages: 0 };

const INITIAL_FILTERS = {
  q: "",
  status: "",
  subscription: "",
  emailVerified: "",
  sort: "-createdAt",
  page: 1,
  pageSize: 20,
};

/** Server-side search, filtering and pagination for the admin user list. */
export function useAdminUsers() {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [search, setSearch] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  // `key` identifies the request a result belongs to; a mismatch means a newer request is loading.
  const [result, setResult] = useState({ key: null, users: [], meta: EMPTY_META, error: null });
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

    listAdminUsersApi(filters, { signal: controller.signal })
      .then(({ users, meta }) => {
        setResult({ key: requestKey, users, meta, error: null });
        // The total can shrink (e.g. after a suspension under a status filter); stay on a real page.
        if (meta.totalPages > 0 && filters.page > meta.totalPages) {
          setFilters((prev) => ({ ...prev, page: meta.totalPages }));
        }
      })
      .catch((err) => {
        if (!err?.isCanceled) setResult((prev) => ({ ...prev, key: requestKey, error: err }));
      });

    return () => controller.abort();
  }, [filters, requestKey]);

  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: key === "page" ? value : 1 }));
  }, []);

  const resetFilters = useCallback(() => {
    setSearch("");
    setFilters(INITIAL_FILTERS);
  }, []);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  /** Applies a server-confirmed change without refetching the page. */
  const replaceUser = useCallback((updated) => {
    setResult((prev) => ({
      ...prev,
      users: prev.users.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)),
    }));
  }, []);

  const loading = result.key !== requestKey;

  return {
    users: result.users,
    meta: result.meta,
    filters,
    search,
    setSearch,
    updateFilter,
    resetFilters,
    loading,
    error: loading ? null : result.error,
    reload,
    replaceUser,
  };
}
