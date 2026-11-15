import {
  ClipboardList,
  Database,
  Gauge,
  KeyRound,
  Mail,
  ShieldCheck,
  ShoppingCart,
  Ticket,
  Webhook,
} from "lucide-react";

/** Per-table icons for Settings cards and the record details modal. */
export const SYSTEM_TABLE_ICONS = {
  "audit-logs": ClipboardList,
  jobs: Database,
  "idempotency-keys": KeyRound,
  entitlements: Ticket,
  "email-deliveries": Mail,
  "verification-challenges": ShieldCheck,
  "webhook-events": Webhook,
  "order-items": ShoppingCart,
  "rate-limit-counters": Gauge,
};

export const systemTableIcon = (slug) =>
  SYSTEM_TABLE_ICONS[slug] || Database;
