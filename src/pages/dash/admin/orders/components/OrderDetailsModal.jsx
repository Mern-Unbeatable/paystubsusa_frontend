import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  CreditCard,
  ExternalLink,
  FileText,
  Hash,
  Mail,
  Receipt,
  ShoppingBag,
  UserRound,
  Wallet,
} from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import { formatMoney } from "../../users/utils/userFormat";
import { useAdminOrders } from "../hooks/useAdminOrders";
import { DOCUMENT_TYPE_LABELS, formatDateTime, humanize } from "../utils/orderFormat";
import OrderStatusBadge from "./OrderStatusBadge";

const Field = ({ label, icon: Icon, children }) => (
  <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5">
    {Icon && (
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-secondary ring-1 ring-slate-100">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
    )}
    <div className="min-w-0">
      <dt className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</dt>
      <dd className="mt-1 truncate text-sm font-semibold text-slate-800">{children}</dd>
    </div>
  </div>
);

const Section = ({ title, icon: Icon, children }) => (
  <section className="space-y-2">
    <h3 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.08em] text-slate-500">
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {title}
    </h3>
    {children}
  </section>
);

const ListBox = ({ children }) => (
  <ul className="divide-y divide-slate-100 rounded-xl border border-slate-100 text-sm">{children}</ul>
);

const Skeleton = () => <div className="h-12 animate-pulse rounded-xl bg-slate-100" />;

/** `order` is the list row (shown immediately); items, documents and payments load from the API. */
const OrderDetailsModal = ({ order, onClose }) => {
  const { details: loaded, loadOrderDetails } = useAdminOrders();
  const [attempt, setAttempt] = useState(0);
  const orderId = order?.id;

  useEffect(() => {
    if (!orderId) return undefined;
    const request = loadOrderDetails(orderId);
    return () => request.abort();
  }, [orderId, attempt, loadOrderDetails]);

  const current = loaded.id === orderId ? loaded : { order: null, error: null };
  const details = current.order;
  const error = current.error && describeRequestError(current.error, "Couldn't load this order.");
  const record = details || order;
  const pending = !details && !error;

  const footer = (
    <div className="flex justify-end">
      <button
        type="button"
        onClick={onClose}
        className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 cursor-pointer"
      >
        Close
      </button>
    </div>
  );

  return (
    <ProfileModal
      open={Boolean(order)}
      onClose={onClose}
      title="Order details"
      description={record?.orderNumber}
      icon={Receipt}
      size="lg"
      footer={footer}
    >
      {record && (
        <div className="space-y-5" aria-busy={pending}>
          <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Field label="Order number" icon={Hash}>
              {record.orderNumber}
            </Field>
            <Field label="Status" icon={Receipt}>
              <OrderStatusBadge status={record.status} />
            </Field>
            <Field label="Customer email" icon={Mail}>
              {record.email}
            </Field>
            <Field label="Account" icon={UserRound}>
              {pending ? "…" : details?.user ? details.user.name || details.user.email : "Guest checkout"}
            </Field>
            <Field label="Created" icon={CalendarDays}>
              {formatDateTime(record.createdAt)}
            </Field>
            <Field label="Paid" icon={CalendarDays}>
              {formatDateTime(record.paidAt)}
            </Field>
            <Field label="Document type" icon={FileText}>
              {DOCUMENT_TYPE_LABELS[record.documentType] ?? humanize(record.documentType)}
            </Field>
            <Field label="Total" icon={Wallet}>
              {formatMoney(record.totalCents, record.currency)}
            </Field>
          </dl>

          <Section title="Items" icon={ShoppingBag}>
            {pending ? (
              <Skeleton />
            ) : (
              <ListBox>
                {(details?.items ?? []).map((item) => (
                  <li key={item.productCode} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                    <span className="text-slate-700">
                      {item.name}
                      {item.quantity > 1 && <span className="text-slate-400"> × {item.quantity}</span>}
                    </span>
                    <span className="font-semibold text-slate-800">{formatMoney(item.amountCents, record.currency)}</span>
                  </li>
                ))}
                <li className="flex items-center justify-between gap-3 bg-slate-50/60 px-3.5 py-2.5 font-bold text-slate-900">
                  <span>Total</span>
                  <span>{formatMoney(record.totalCents, record.currency)}</span>
                </li>
              </ListBox>
            )}
          </Section>

          <Section title="Documents" icon={FileText}>
            {pending ? (
              <Skeleton />
            ) : details?.documents?.length ? (
              <ListBox>
                {details.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-800">{doc.title}</p>
                      <p className="text-xs text-slate-400">{doc.documentNumber}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-slate-600">
                      {humanize(doc.status)}
                    </span>
                  </li>
                ))}
              </ListBox>
            ) : (
              <p className="text-sm text-slate-400">No documents.</p>
            )}
          </Section>

          <Section title="Payments" icon={CreditCard}>
            {pending ? (
              <Skeleton />
            ) : details?.payments?.length ? (
              <ListBox>
                {details.payments.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
                    <div className="min-w-0">
                      <p className="font-semibold capitalize text-slate-800">
                        {p.cardLast4 ? `${p.cardBrand ?? "Card"} •••• ${p.cardLast4}` : "Card"}
                      </p>
                      <p className="text-xs capitalize text-slate-400">
                        {humanize(p.status)} · {formatDateTime(p.createdAt)}
                        {p.amountRefundedCents > 0 && ` · refunded ${formatMoney(p.amountRefundedCents, p.currency)}`}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <span className="font-semibold text-slate-800">{formatMoney(p.amountCents, p.currency)}</span>
                      {p.receiptUrl && (
                        <a
                          href={p.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open Stripe receipt"
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-secondary hover:bg-slate-100"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </li>
                ))}
              </ListBox>
            ) : (
              <p className="text-sm text-slate-400">No payments recorded.</p>
            )}
          </Section>

          {error && (
            <div
              role="alert"
              className="flex items-center justify-between gap-3 rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700"
            >
              <span>{error}</span>
              <button
                type="button"
                onClick={() => setAttempt((n) => n + 1)}
                className="shrink-0 font-semibold underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}
    </ProfileModal>
  );
};

export default OrderDetailsModal;
