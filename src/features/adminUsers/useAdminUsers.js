import { useCallback } from "react";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import { listAdminUsersApi } from "./adminUsersApi";

export { PAGE_SIZE_OPTIONS } from "../../hooks/usePaginatedList";

const INITIAL_FILTERS = {
  q: "",
  status: "",
  subscription: "",
  emailVerified: "",
  sort: "-createdAt",
  page: 1,
  pageSize: 20,
};

const fetchUsers = async (filters, options) => {
  const { users, meta } = await listAdminUsersApi(filters, options);
  return { items: users, meta };
};

/** Server-side search, filtering and pagination for the admin user list. */
export function useAdminUsers() {
  const { items, replaceItem, ...list } = usePaginatedList(fetchUsers, INITIAL_FILTERS);
  const replaceUser = useCallback(
    (updated) => replaceItem(updated, (u) => u.id === updated.id),
    [replaceItem],
  );
  return { ...list, users: items, replaceUser };
}
