import { useCallback } from "react";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import { listAdminProductsApi } from "./adminPricingApi";

export { PAGE_SIZE_OPTIONS } from "../../hooks/usePaginatedList";

const INITIAL_FILTERS = {
  q: "",
  kind: "",
  documentType: "",
  status: "",
  page: 1,
  pageSize: 20,
};

/** Server-side search, filtering and pagination for the admin product catalog. */
export function useAdminPricing() {
  const { items, replaceItem, ...list } = usePaginatedList(listAdminProductsApi, INITIAL_FILTERS);
  const replaceProduct = useCallback(
    (updated) => replaceItem(updated, (p) => p.code === updated.code),
    [replaceItem],
  );
  return { ...list, products: items, replaceProduct };
}
