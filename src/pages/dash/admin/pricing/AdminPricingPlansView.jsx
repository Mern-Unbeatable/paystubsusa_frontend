import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Plus, Power, PowerOff, RefreshCw, Trash2 } from "lucide-react";
import {
  DashboardFilterToolbar,
  DashboardHeader,
  DashboardPagination,
  DashboardTable,
} from "../../../../Components/Dashboard";
import ConfirmModal from "../../../../Components/modal/ConfirmModal";
import { usePricing } from "./hooks/usePricing";
import { describeRequestError } from "../../customer/Profile/utils/profileFormat";
import ProductDetailsModal from "./components/ProductDetailsModal";
import ProductFormModal from "./components/ProductFormModal";
import {
  BillingTag,
  DocumentTypeLabel,
  ProductIdentity,
  ProductRowActions,
  ProductStatusBadge,
} from "./components/ProductCells";
import {
  DOCUMENT_TYPE_OPTIONS,
  KIND_OPTIONS,
  STATUS_OPTIONS,
  formatPrice,
  formatShortDate,
} from "./utils/pricingFormat";

const FILTER_SELECTS = [
  { key: "documentType", label: "Filter by document type", options: DOCUMENT_TYPE_OPTIONS },
  { key: "kind", label: "Filter by billing", options: KIND_OPTIONS },
  { key: "status", label: "Filter by status", options: STATUS_OPTIONS },
];

const AdminPricingPlansView = () => {
  const {
    products,
    meta,
    filters,
    loading,
    error,
    loadProducts,
    setFilter: updateFilter,
    resetFilters: resetPricingFilters,
    updateProduct,
    deleteProduct: removeProduct,
  } = usePricing();
  const [search, setSearch] = useState(filters.q);
  const [reloadKey, setReloadKey] = useState(0);
  // { type: "view" | "create" | "edit" | "toggle" | "delete", product }
  const [dialog, setDialog] = useState(null);
  const open = (type) => (product) => setDialog({ type, product });
  const closeDialog = () => setDialog(null);

  useEffect(() => {
    const trimmed = search.trim();
    if (trimmed === filters.q) return undefined;
    const timer = setTimeout(() => updateFilter("q", trimmed), 300);
    return () => clearTimeout(timer);
  }, [search, filters.q, updateFilter]);

  useEffect(() => {
    const request = loadProducts(filters);
    return () => request.abort();
  }, [filters, reloadKey, loadProducts]);

  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  const resetFilters = () => {
    setSearch("");
    resetPricingFilters();
  };

  // The store already holds the updated row; under a status filter it may no longer belong here.
  const toggleActive = async () => {
    const { product } = dialog;
    await updateProduct({ code: product.code, changes: { isActive: !product.isActive } });
    toast.success(`${product.name} was ${product.isActive ? "deactivated" : "activated"}.`);
    if (filters.status) reload();
  };

  // Refetch so the page refills from the next one and the total stays accurate.
  const deleteProduct = async () => {
    const { product } = dialog;
    await removeProduct(product.code);
    toast.success(`${product.name} was deleted.`);
    reload();
  };

  const actions = (product) => (
    <ProductRowActions
      product={product}
      onView={open("view")}
      onEdit={open("edit")}
      onToggle={open("toggle")}
      onDelete={open("delete")}
    />
  );

  const columns = [
    { header: "Product", render: (p) => <ProductIdentity product={p} /> },
    {
      header: "Document",
      render: (p) => <DocumentTypeLabel product={p} />,
      cellClassName: "whitespace-nowrap",
    },
    { header: "Billing", render: (p) => <BillingTag product={p} /> },
    {
      header: "Price",
      align: "right",
      render: (p) => <span className="font-semibold tabular-nums text-slate-900">{formatPrice(p)}</span>,
      cellClassName: "whitespace-nowrap",
    },
    { header: "Docs", align: "right", render: (p) => p.creditQuantity, cellClassName: "tabular-nums" },
    { header: "Status", render: (p) => <ProductStatusBadge product={p} /> },
    {
      header: "Updated",
      render: (p) => formatShortDate(p.updatedAt),
      cellClassName: "whitespace-nowrap text-slate-500",
    },
    { header: "Actions", align: "right", render: actions },
  ];

  const renderMobileRow = (p) => (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <ProductIdentity product={p} />
        <span className="shrink-0 font-semibold tabular-nums text-slate-900">{formatPrice(p)}</span>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
        <ProductStatusBadge product={p} />
        <BillingTag product={p} />
        <span>
          <DocumentTypeLabel product={p} /> · {p.creditQuantity} doc{p.creditQuantity === 1 ? "" : "s"}
        </span>
      </div>
      <div className="flex justify-end">{actions(p)}</div>
    </div>
  );

  const hasQuery = Boolean(filters.q || filters.kind || filters.documentType || filters.status);
  const target = dialog?.product;

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Pricing & Plans"
        description="Manage document prices, packages and the subscription plan used by checkout."
        badge={
          !loading && (
            <span className="rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-bold text-secondary">
              {meta.totalItems}
            </span>
          )
        }
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={reload}
              disabled={loading}
              aria-label="Refresh products"
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button
              type="button"
              onClick={() => setDialog({ type: "create", product: null })}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New product
            </button>
          </div>
        }
      />

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <span>{describeRequestError(error, "Couldn't load products.")}</span>
          <button type="button" onClick={reload} className="font-semibold underline cursor-pointer">
            Try again
          </button>
        </div>
      )}

      <DashboardTable
        title="Product catalog"
        minWidth="min-w-[980px]"
        toolbar={
          <DashboardFilterToolbar
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search by name or code"
            selects={FILTER_SELECTS}
            filters={filters}
            onFilterChange={updateFilter}
            onReset={resetFilters}
          />
        }
        columns={columns}
        data={error ? [] : products}
        loading={loading}
        renderMobileRow={renderMobileRow}
        rowKey={(p) => p.code}
        emptyMessage={hasQuery ? "No products match your search or filters." : "No products yet."}
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

      {dialog?.type === "view" && (
        <ProductDetailsModal key={target.code} product={target} onClose={closeDialog} onEdit={open("edit")} />
      )}

      {(dialog?.type === "create" || dialog?.type === "edit") && (
        <ProductFormModal
          key={target?.code ?? "new"}
          product={target}
          onClose={closeDialog}
          onSaved={reload}
        />
      )}

      <ConfirmModal
        key={`toggle-${target?.code}`}
        open={dialog?.type === "toggle"}
        onClose={closeDialog}
        onConfirm={toggleActive}
        icon={target?.isActive ? PowerOff : Power}
        tone={target?.isActive ? "danger" : "success"}
        title={target?.isActive ? "Deactivate product" : "Activate product"}
        confirmLabel={target?.isActive ? "Deactivate" : "Activate"}
        pendingLabel="Saving…"
        errorFallback="Couldn't update this product. Please try again."
      >
        <p className="text-sm leading-relaxed text-slate-600">
          {target?.isActive
            ? target?.kind === "subscription"
              ? `New customers won't be able to subscribe to ${target?.name}. Existing subscriptions keep renewing.`
              : `${target?.name} will be hidden from checkout. Existing orders and documents are not affected.`
            : `${target?.name} will be available in checkout again at ${target ? formatPrice(target) : ""}.`}
        </p>
      </ConfirmModal>

      <ConfirmModal
        key={`delete-${target?.code}`}
        open={dialog?.type === "delete"}
        onClose={closeDialog}
        onConfirm={deleteProduct}
        icon={Trash2}
        tone="danger"
        title="Delete product"
        confirmLabel="Delete permanently"
        pendingLabel="Deleting…"
        errorFallback="Couldn't delete this product. Please try again."
      >
        <p className="text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-800">{target?.name}</span> has never been ordered and will be
          removed permanently. This can't be undone.
        </p>
      </ConfirmModal>
    </div>
  );
};

export default AdminPricingPlansView;
