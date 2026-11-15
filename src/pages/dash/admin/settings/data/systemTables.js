/**
 * Catalog of inspectable system tables for the Admin Settings page.
 * Descriptions are UI copy only; records are always loaded from the API.
 */
export const SYSTEM_TABLES = [
  {
    slug: "audit-logs",
    name: "audit_logs",
    title: "Audit Logs",
    description:
      "Security and admin activity trail: who did what, to which target, and when.",
  },
  {
    slug: "jobs",
    name: "jobs",
    title: "Jobs",
    description:
      "Background work queue for document rendering, email delivery, and retention tasks.",
  },
  {
    slug: "idempotency-keys",
    name: "idempotency_keys",
    title: "Idempotency Keys",
    description:
      "Cached request/response pairs that make safe retries of payment and admin mutations.",
  },
  {
    slug: "entitlements",
    name: "entitlements",
    title: "Entitlements",
    description:
      "Document credits granted by paid orders, including remaining and used balances.",
  },
  {
    slug: "email-deliveries",
    name: "email_deliveries",
    title: "Email Deliveries",
    description:
      "Outbound email queue status, attempts, provider message ids, and delivery errors.",
  },
  {
    slug: "verification-challenges",
    name: "verification_challenges",
    title: "Verification Challenges",
    description:
      "OTP and reset challenges for checkout, document access, email verification, and password reset.",
  },
  {
    slug: "webhook-events",
    name: "webhook_events",
    title: "Webhook Events",
    description:
      "Stripe webhook receipts with processing status, errors, and stored payloads.",
  },
  {
    slug: "order-items",
    name: "order_items",
    title: "Order Items",
    description:
      "Line items on orders: product code, quantity, and amounts charged per product.",
  },
  {
    slug: "rate-limit-counters",
    name: "rate_limit_counters",
    title: "Rate Limit Counters",
    description:
      "Per-key request counters used by API rate limiting, keyed by window start time.",
  },
];

export const SYSTEM_TABLE_BY_SLUG = Object.fromEntries(
  SYSTEM_TABLES.map((table) => [table.slug, table]),
);

/** Summary columns shown in the list table; the detail modal still shows every field. */
export const SYSTEM_TABLE_COLUMNS = {
  "audit-logs": ["id", "actorType", "action", "targetType", "createdAt"],
  jobs: ["id", "type", "status", "attempts", "runAt", "createdAt"],
  "idempotency-keys": ["key", "scope", "createdAt", "expiresAt"],
  entitlements: [
    "id",
    "orderId",
    "documentType",
    "creditsTotal",
    "creditsUsed",
    "createdAt",
  ],
  "email-deliveries": [
    "id",
    "toEmail",
    "template",
    "status",
    "attempts",
    "createdAt",
  ],
  "verification-challenges": [
    "id",
    "email",
    "purpose",
    "attempts",
    "expiresAt",
    "createdAt",
  ],
  "webhook-events": ["id", "type", "receivedAt", "processedAt", "error"],
  "order-items": [
    "id",
    "orderId",
    "productCode",
    "name",
    "quantity",
    "unitAmountCents",
    "amountCents",
  ],
  "rate-limit-counters": ["key", "windowStart", "count"],
};
