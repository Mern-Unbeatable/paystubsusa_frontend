import { useCallback, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZES = [10, 20, 50, 100];
const DEFAULT_PAGE_SIZE = 10;

/**
 * `selects` maps each filter key to its allowed values; the first value is the default and is
 * left out of the URL. Hand-edited URLs fall back to defaults instead of reaching the API.
 */
function read(params, selects) {
  const page = Number.parseInt(params.get("page") ?? "", 10);
  const pageSize = Number.parseInt(params.get("pageSize") ?? "", 10);
  const filters = {
    q: (params.get("q") ?? "").trim().slice(0, 100),
    page: page >= 1 ? page : 1,
    pageSize: PAGE_SIZES.includes(pageSize) ? pageSize : DEFAULT_PAGE_SIZE,
  };
  for (const [key, allowed] of Object.entries(selects)) {
    const value = params.get(key);
    filters[key] = allowed.includes(value) ? value : allowed[0];
  }
  return filters;
}

function write(filters, selects) {
  const params = new URLSearchParams({ pageSize: String(filters.pageSize), page: String(filters.page) });
  if (filters.q) params.set("q", filters.q);
  for (const [key, allowed] of Object.entries(selects)) {
    if (filters[key] !== allowed[0]) params.set(key, filters[key]);
  }
  return params;
}

/** List filters kept in the query string (`?pageSize=10&page=1&q=...`); pass a module-level `selects`. */
export function useUrlFilters(selects) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.toString();
  const canonical = write(read(searchParams, selects), selects).toString();
  // Keyed on the canonical string, so normalizing the URL below doesn't refetch.
  const filters = useMemo(() => read(new URLSearchParams(canonical), selects), [canonical, selects]);

  useEffect(() => {
    if (canonical !== query) setSearchParams(canonical, { replace: true });
  }, [canonical, query, setSearchParams]);

  /** Any change except paging returns to page 1. Typing in search replaces the history entry. */
  const setFilter = useCallback(
    (key, value, { replace = key === "q" } = {}) => {
      setSearchParams(
        (current) => {
          const next = { ...read(current, selects), [key]: value };
          if (key !== "page") next.page = 1;
          return write(next, selects);
        },
        { replace },
      );
    },
    [setSearchParams, selects],
  );

  const resetFilters = useCallback(
    () => setSearchParams(write(read(new URLSearchParams(), selects), selects)),
    [setSearchParams, selects],
  );

  return { filters, setFilter, resetFilters };
}
