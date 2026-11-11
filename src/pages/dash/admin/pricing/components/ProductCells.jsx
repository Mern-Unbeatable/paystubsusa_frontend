import React from "react";
import { Eye, FileText, Lock, Pencil, Power, PowerOff, Repeat, Trash2 } from "lucide-react";
import { DashboardStatusBadge } from "../../../../../layouts";
import { DOCUMENT_TYPE_LABELS, billingLabel } from "../utils/pricingFormat";

export const ProductIdentity = ({ product }) => {
  const Icon = product.kind === "subscription" ? Repeat : FileText;
  return (
    <div className="flex min-w-0 items-center gap-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 truncate font-semibold text-slate-900">
          <span className="truncate">{product.name}</span>
          {product.isSystem && (
            <Lock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-label="System product" />
          )}
        </p>
        <p className="truncate font-mono text-xs text-slate-400">{product.code}</p>
      </div>
    </div>
  );
};

export const DocumentTypeLabel = ({ product }) =>
  product.documentType ? DOCUMENT_TYPE_LABELS[product.documentType] || product.documentType : "All documents";

export const BillingTag = ({ product }) => (
  <span
    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ${
      product.kind === "subscription" ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-slate-600"
    }`}
  >
    {billingLabel(product)}
  </span>
);

export const ProductStatusBadge = ({ product }) => (
  <DashboardStatusBadge status={product.isActive ? "Active" : "Inactive"} />
);

const actionButton =
  "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent transition focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer";

export const ProductRowActions = ({ product, onView, onEdit, onToggle, onDelete }) => {
  const ToggleIcon = product.isActive ? PowerOff : Power;
  const toggleLabel = product.isActive ? "Deactivate" : "Activate";
  const deleteHint = product.canDelete
    ? "Delete product"
    : product.isSystem
      ? "System products can't be deleted"
      : "Used by orders or subscriptions; deactivate instead";

  return (
    <div className="inline-flex items-center gap-1">
      <button
        type="button"
        onClick={() => onView(product)}
        title="View details"
        aria-label={`View ${product.name}`}
        className={`${actionButton} text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-secondary`}
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onEdit(product)}
        title="Edit product"
        aria-label={`Edit ${product.name}`}
        className={`${actionButton} text-slate-500 hover:border-slate-200 hover:bg-slate-50 hover:text-secondary`}
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onToggle(product)}
        title={`${toggleLabel} product`}
        aria-label={`${toggleLabel} ${product.name}`}
        className={`${actionButton} ${
          product.isActive
            ? "text-amber-600 hover:border-amber-100 hover:bg-amber-50"
            : "text-emerald-600 hover:border-emerald-100 hover:bg-emerald-50"
        }`}
      >
        <ToggleIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onDelete(product)}
        disabled={!product.canDelete}
        title={deleteHint}
        aria-label={`Delete ${product.name}`}
        className={`${actionButton} text-rose-500 hover:border-rose-100 hover:bg-rose-50`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
};
