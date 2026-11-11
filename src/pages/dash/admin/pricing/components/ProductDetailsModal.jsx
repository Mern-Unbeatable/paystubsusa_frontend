import React, { useEffect, useState } from "react";
import {
  BadgeDollarSign,
  CalendarClock,
  CreditCard,
  FileStack,
  FileText,
  Hash,
  ListOrdered,
  Lock,
  Package,
  Pencil,
  Repeat,
  ShoppingBag,
  Tag,
  ToggleRight,
} from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { getAdminProductApi } from "../../../../../features/adminPricing/adminPricingApi";
import { formatPrice, formatShortDate } from "../utils/pricingFormat";
import { BillingTag, DocumentTypeLabel, ProductStatusBadge } from "./ProductCells";

const Field = ({ label, icon: Icon, children, hint }) => (
  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
    {Icon && (
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-secondary ring-1 ring-slate-100">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    )}
    <div className="min-w-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</dt>
      <dd className="mt-1 truncate text-sm font-semibold text-slate-800">{children}</dd>
      {hint && <p className="mt-0.5 truncate text-xs text-slate-400">{hint}</p>}
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <section className="space-y-2">
    <h3 className="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">{title}</h3>
    <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">{children}</dl>
  </section>
);

/** `product` is the list row (shown immediately); usage counts are refreshed from the API. */
const ProductDetailsModal = ({ product, onClose, onEdit }) => {
  const [loaded, setLoaded] = useState({ details: null, error: null });
  const code = product.code;

  useEffect(() => {
    const controller = new AbortController();
    getAdminProductApi(code, { signal: controller.signal })
      .then((details) => setLoaded({ details, error: null }))
      .catch((err) => {
        if (!err?.isCanceled) {
          setLoaded({ details: null, error: describeRequestError(err, "Couldn't refresh this product.") });
        }
      });
    return () => controller.abort();
  }, [code]);

  const record = loaded.details || product;
  const usage = record.usage || { orderItems: 0, subscriptions: 0 };

  return (
    <ProfileModal
      open
      onClose={onClose}
      size="lg"
      icon={record.kind === "subscription" ? Repeat : Package}
      title={record.name}
      description={record.isSystem ? "System product: checkout depends on it, so it can't be deleted." : undefined}
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onEdit(record)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 cursor-pointer"
          >
            <Pencil className="h-4 w-4" />
            Edit product
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <Section title="Pricing">
          <Field label="Price" icon={BadgeDollarSign}>
            {formatPrice(record)}
          </Field>
          <Field label="Billing" icon={Repeat}>
            <BillingTag product={record} />
          </Field>
          <Field label="Status" icon={ToggleRight}>
            <ProductStatusBadge product={record} />
          </Field>
          <Field label="Badge" icon={Tag}>
            {record.badge || "—"}
          </Field>
        </Section>

        <Section title="Catalog">
          <Field label="Code" icon={record.isSystem ? Lock : Hash}>
            <span className="font-mono">{record.code}</span>
          </Field>
          <Field label="Document type" icon={FileText}>
            <DocumentTypeLabel product={record} />
          </Field>
          <Field label="Documents included" icon={FileStack}>
            {record.creditQuantity}
          </Field>
          <Field label="Sort order" icon={ListOrdered}>
            {record.sortOrder}
          </Field>
          <Field label="Last updated" icon={CalendarClock}>
            {formatShortDate(record.updatedAt)}
          </Field>
          {(record.kind === "subscription" || record.stripePriceId) && (
            <Field label="Stripe price" icon={CreditCard} hint={record.stripePriceId || undefined}>
              {record.stripePriceId ? "Configured" : "Not configured"}
            </Field>
          )}
        </Section>

        <Section title="Usage">
          <Field label="Order lines" icon={ShoppingBag}>
            {usage.orderItems}
          </Field>
          <Field label="Subscriptions" icon={Repeat}>
            {usage.subscriptions}
          </Field>
        </Section>

        {loaded.error && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {loaded.error}
          </p>
        )}
      </div>
    </ProfileModal>
  );
};

export default ProductDetailsModal;
