import React from 'react';
import { X, Check, Clock, AlertCircle, RotateCcw, ExternalLink } from 'lucide-react';
import { formatMoney } from '../../../admin/users/utils/userFormat';
import { formatDateTime } from '../../../admin/orders/utils/orderFormat';
import { describeCard, paymentStatusLabel } from '../../CustomerOverview/utils/overviewFormat';

const BANNERS = {
  succeeded: { icon: Check, className: 'bg-emerald-50/60 border-emerald-100/60', iconClassName: 'bg-emerald-100 text-emerald-600' },
  refunded: { icon: RotateCcw, className: 'bg-violet-50/60 border-violet-100/60', iconClassName: 'bg-violet-100 text-violet-600' },
  partially_refunded: { icon: RotateCcw, className: 'bg-violet-50/60 border-violet-100/60', iconClassName: 'bg-violet-100 text-violet-600' },
  failed: { icon: AlertCircle, className: 'bg-rose-50/60 border-rose-100/60', iconClassName: 'bg-rose-100 text-rose-600' },
};
const PENDING_BANNER = { icon: Clock, className: 'bg-amber-50/60 border-amber-100/60', iconClassName: 'bg-amber-100 text-amber-600' };

const Row = ({ label, children }) => (
  <div className="flex justify-between gap-4 py-3.5">
    <span className="text-slate-400 font-medium flex-shrink-0">{label}</span>
    <span className="font-semibold text-slate-800 text-right break-words min-w-0">{children}</span>
  </div>
);

const PaymentDetailsModal = ({ payment, onClose }) => {
  if (!payment) return null;

  const banner = BANNERS[payment.status] ?? PENDING_BANNER;
  const BannerIcon = banner.icon;
  const amount = formatMoney(payment.amountCents, payment.currency);
  const refunded = payment.amountRefundedCents > 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-details-title"
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 id="payment-details-title" className="text-lg font-bold text-slate-900">
            Payment Details
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded border border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50 flex items-center justify-center transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className={`p-6 border-b flex items-center gap-3.5 ${banner.className}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${banner.iconClassName}`}>
            {BannerIcon && <BannerIcon className="w-4 h-4 stroke-[2.5]" />}
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-slate-900 text-sm">{paymentStatusLabel(payment.status)}</h4>
            <p className="text-xs text-slate-500 mt-0.5 break-words">
              {amount} payment for {payment.description}
            </p>
          </div>
        </div>

        <div className="p-6 divide-y divide-slate-100 text-xs text-slate-600">
          <Row label="Order">
            <span className="font-mono font-bold text-slate-900">{payment.orderNumber ?? 'Subscription'}</span>
          </Row>
          <Row label="Payment Date">{formatDateTime(payment.createdAt)}</Row>
          <Row label="Purchased Item">{payment.description}</Row>
          <Row label="Payment Method">{describeCard(payment)}</Row>
          <Row label="Amount">
            <span className="font-extrabold text-slate-900 text-sm">{amount}</span>
          </Row>
          {refunded && (
            <Row label="Refunded">
              <span className="text-violet-700">{formatMoney(payment.amountRefundedCents, payment.currency)}</span>
            </Row>
          )}
        </div>

        <div className="px-6 pb-6 pt-2 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
          {payment.receiptUrl?.startsWith('https://') ? (
            <a
              href={payment.receiptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition"
            >
              View receipt <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded bg-[#009BFB] hover:bg-[#0089e0] text-white font-semibold text-xs sm:text-sm transition cursor-pointer active:scale-98 shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
