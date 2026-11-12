import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  selectAdminOrderDetails,
  selectAdminOrders,
  selectAdminOrdersError,
  selectAdminOrdersLoading,
  selectAdminOrdersMeta,
} from "../../../../../features/dash/admin/order/orderSelectors";
import { fetchOrderDetails, fetchOrders } from "../../../../../features/dash/admin/order/orderThunks";
import { DOCUMENT_TYPE_LABELS, ORDER_STATUS } from "../utils/orderFormat";

const DEFAULT_PAGE_SIZE = 10;
const PAGE_SIZES = [10, 20, 50, 100];

/** Hand-edited URLs fall back to defaults instead of reaching the API as invalid filters. */
function filtersFromParams(params) {
  const page = Number.parseInt(params.get("page") ?? "", 10);
  const pageSize = Number.parseInt(params.get("pageSize") ?? "", 10);
  const status = params.get("status") ?? "";
  const documentType = params.get("documentType") ?? "";
  return {
    q: (params.get("q") ?? "").trim().slice(0, 100),
    status: status in ORDER_STATUS ? status : "",
    documentType: documentType in DOCUMENT_TYPE_LABELS ? documentType : "",
    page: page >= 1 ? page : 1,
    pageSize: PAGE_SIZES.includes(pageSize) ? pageSize : DEFAULT_PAGE_SIZE,
  };
}

function paramsFromFilters({ q, status, documentType, page, pageSize }) {
  const params = new URLSearchParams({ pageSize: String(pageSize), page: String(page) });
  if (q) params.set("q", q);
  if (status) params.set("status", status);
  if (documentType) params.set("documentType", documentType);
  return params;
}

export function useAdminOrders() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const orders = useSelector(selectAdminOrders);
  const meta = useSelector(selectAdminOrdersMeta);
  const loading = useSelector(selectAdminOrdersLoading);
  const error = useSelector(selectAdminOrdersError);
  const details = useSelector(selectAdminOrderDetails);

  const query = searchParams.toString();
  const canonical = paramsFromFilters(filtersFromParams(searchParams)).toString();
  // Keyed on the canonical string, so normalizing the URL below doesn't refetch.
  const filters = useMemo(() => filtersFromParams(new URLSearchParams(canonical)), [canonical]);

  useEffect(() => {
    if (canonical !== query) setSearchParams(canonical, { replace: true });
  }, [canonical, query, setSearchParams]);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadOrders = useCallback((requestFilters) => dispatch(fetchOrders(requestFilters)), [dispatch]);
  const loadOrderDetails = useCallback((id) => dispatch(fetchOrderDetails(id)), [dispatch]);

  /** Any filter change except paging returns to the first page. Typing in search replaces history. */
  const setFilter = useCallback(
    (key, value, { replace = key === "q" } = {}) => {
      setSearchParams(
        (current) => {
          const next = { ...filtersFromParams(current), [key]: value };
          if (key !== "page") next.page = 1;
          return paramsFromFilters(next);
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(
    () => setSearchParams(paramsFromFilters(filtersFromParams(new URLSearchParams()))),
    [setSearchParams],
  );

  return { orders, meta, filters, loading, error, details, loadOrders, loadOrderDetails, setFilter, resetFilters };
}
