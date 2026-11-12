export const STATUS_LABELS = { active: "Active", suspended: "Suspended" };

export const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
];

export const SUBSCRIPTION_LABELS = { active: "Active", past_due: "Past due" };

export const SUBSCRIPTION_OPTIONS = [
  { value: "", label: "All subscriptions" },
  { value: "active", label: "Subscribed" },
  { value: "none", label: "No subscription" },
];

export const EMAIL_VERIFIED_OPTIONS = [
  { value: "", label: "All emails" },
  { value: "verified", label: "Verified" },
  { value: "unverified", label: "Unverified" },
];

export const SORT_OPTIONS = [
  { value: "-createdAt", label: "Newest first" },
  { value: "-lifetimeSpend", label: "Highest spend" },
];
