import React, { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import {
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import { useUsers } from "./hooks/useUsers";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import UsersToolbar from "./components/UsersToolbar";
import UserDetailsModal from "./components/UserDetailsModal";
import UserStatusModal from "./components/UserStatusModal";
import {
  RoleBadge,
  SubscriptionBadge,
  UserIdentity,
  UserRowActions,
  UserStatusBadge,
  EmailVerifiedBadge,
} from "./components/UserCells";
import {
  EMAIL_VERIFIED_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  SUBSCRIPTION_OPTIONS,
  formatShortDate,
} from "./utils/userFormat";
import { useUrlFilters } from "../../../../hooks/useUrlFilters";

const URL_SELECTS = {
  status: STATUS_OPTIONS.map((o) => o.value),
  subscription: SUBSCRIPTION_OPTIONS.map((o) => o.value),
  emailVerified: EMAIL_VERIFIED_OPTIONS.map((o) => o.value),
  sort: SORT_OPTIONS.map((o) => o.value),
};

/** Also rendered as the Customers page; the API lists customer accounts only. */
const AdminUsersView = ({
  title = "Manage Users",
  description = "Search, review and manage customer accounts.",
}) => {
  const { users, meta, loading, error, loadUsers } = useUsers();
  const { filters, setFilter: updateFilter, resetFilters: resetUserFilters } = useUrlFilters(URL_SELECTS);
  const [search, setSearch] = useState(filters.q);
  const [urlQ, setUrlQ] = useState(filters.q);
  // Back/forward or a pasted link changed `q`: show it in the box (the debounce then has nothing to do).
  if (urlQ !== filters.q) {
    setUrlQ(filters.q);
    if (search.trim() !== filters.q) setSearch(filters.q);
  }
  const [reloadKey, setReloadKey] = useState(0);
  const [viewing, setViewing] = useState(null);
  const [changingStatus, setChangingStatus] = useState(null);

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => updateFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, updateFilter]);

  useEffect(() => {
    const request = loadUsers(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadUsers]);

  // A link past the last page, or a suspension under a status filter shrinking the list, lands on the last real page.
  useEffect(() => {
    if (!loading && meta.totalPages > 0 && filters.page > meta.totalPages) {
      updateFilter("page", meta.totalPages, { replace: true });
    }
  }, [loading, meta.totalPages, filters.page, updateFilter]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const resetFilters = () => {
    setSearch("");
    resetUserFilters();
  };

  // The store already holds the updated row; under a status filter it no longer belongs on this page.
  const handleStatusUpdated = () => {
    if (filters.status) reload();
  };

  const actions = (user) => (
    <UserRowActions user={user} onView={setViewing} onChangeStatus={setChangingStatus} />
  );

  const columns = [
    { header: "User", render: (user) => <UserIdentity user={user} /> },
    {
      header: "Email",
      render: (user) => <span className="block max-w-[16rem] truncate">{user.email}</span>,
    },
    { header: "Role", render: () => <RoleBadge /> },
    { header: "Status", render: (user) => <UserStatusBadge user={user} /> },
    { header: "Email verification", render: (user) => <EmailVerifiedBadge user={user} /> },
    { header: "Subscription", render: (user) => <SubscriptionBadge status={user.subscriptionStatus} /> },
    {
      header: "Joined",
      render: (user) => formatShortDate(user.createdAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Actions", align: "right", render: actions },
  ];

  const renderMobileRow = (user) => (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 space-y-2">
        <UserIdentity user={user} showEmail />
        <div className="flex flex-wrap items-center gap-1.5">
          <RoleBadge />
          <UserStatusBadge user={user} />
          <EmailVerifiedBadge user={user} />
          <SubscriptionBadge status={user.subscriptionStatus} />
        </div>
        <p className="text-xs text-slate-400">Joined {formatShortDate(user.createdAt)}</p>
      </div>
      {actions(user)}
    </div>
  );

  const hasQuery = Boolean(
    filters.q || filters.status || filters.subscription || filters.emailVerified,
  );

  return (
    <div className="space-y-6">
      <DashboardHeader
        title={title}
        description={description}
        badge={
          !loading && (
            <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
              {meta.totalItems}
            </span>
          )
        }
        action={
          <button
            type="button"
            onClick={reload}
            disabled={loading}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        }
      />

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{describeRequestError(error, "Couldn't load users.")}</span>
          <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
            Try again
          </button>
        </div>
      )}

      <DashboardTable
        title="Customer accounts"
        minWidth="min-w-[1080px]"
        toolbar={
          <UsersToolbar
            search={search}
            onSearchChange={setSearch}
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        }
        columns={columns}
        data={error ? [] : users}
        loading={loading}
        renderMobileRow={renderMobileRow}
        emptyMessage={hasQuery ? "No users match your search or filters." : "No users yet."}
        footer={
          !error && (
            <DashboardPagination
              page={meta.page}
              pageSize={meta.pageSize}
              totalItems={meta.totalItems}
              totalPages={meta.totalPages}
              onPageChange={(page) => updateFilter("page", page)}
              onPageSizeChange={(size) => updateFilter("pageSize", size)}
              disabled={loading}
            />
          )
        }
      />

      <UserDetailsModal
        key={viewing?.id ?? "none"}
        user={viewing}
        onClose={() => setViewing(null)}
        onChangeStatus={(user) => {
          setViewing(null);
          setChangingStatus(user);
        }}
      />
      <UserStatusModal
        key={changingStatus?.id ?? "none"}
        user={changingStatus}
        onClose={() => setChangingStatus(null)}
        onUpdated={handleStatusUpdated}
      />
    </div>
  );
};

export default AdminUsersView;
