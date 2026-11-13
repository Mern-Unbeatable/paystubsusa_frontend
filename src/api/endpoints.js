const buildResourcePath = (resource, id) =>
  `/${resource}/${encodeURIComponent(id)}`;

export const API_ENDPOINTS = Object.freeze({
  AUTH: Object.freeze({
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/me",
    FORGOT_PASSWORD: "/auth/password/forgot",
    RESET_PASSWORD: "/auth/password/reset",
    RESEND_VERIFICATION: "/auth/email/verification",
    VERIFY_EMAIL: "/auth/email/verify",
  }),
  ACCOUNT: Object.freeze({
    PROFILE: "/me",
    DASHBOARD: "/me/dashboard",
    SUBSCRIPTION: "/me/subscription",
    SUBSCRIPTION_CHECKOUT: "/me/subscription/checkout-session",
    SUBSCRIPTION_PORTAL: "/me/subscription/portal-session",
    PASSWORD: "/me/password",
    AVATAR: "/me/avatar",
  }),
  CATALOG: Object.freeze({
    TEMPLATES: "/catalog/templates",
    PRODUCTS: "/catalog/products",
  }),
  VERIFICATIONS: Object.freeze({
    SEND: "/verifications",
    VERIFY: (challengeId) => `${buildResourcePath("verifications", challengeId)}/verify`,
  }),
  ORDERS: Object.freeze({
    CREATE: "/orders",
    LIST: "/orders",
    DETAILS: (id) => buildResourcePath("orders", id),
  }),
  PAYMENTS: Object.freeze({
    LIST: "/payments",
  }),
  SUPPORT: Object.freeze({
    CONTACT_MESSAGES: "/contact-messages",
  }),
  DOCUMENTS: Object.freeze({
    LIST: "/documents",
    REDEEM_CREDIT: "/documents",
    DOWNLOAD: (id) => `${buildResourcePath("documents", id)}/download`,
  }),
  ADMIN: Object.freeze({
    DASHBOARD: "/admin/dashboard",
    CUSTOMERS: "/admin/customers",
    CUSTOMER: (id) => buildResourcePath("admin/customers", id),
    GUEST_BUYERS: "/admin/guest-buyers",
    ORDERS: "/admin/orders",
    ORDER: (id) => buildResourcePath("admin/orders", id),
    PAYMENTS: "/admin/payments",
    PAYMENT: (id) => buildResourcePath("admin/payments", id),
    DOCUMENTS: "/admin/documents",
    DOCUMENT: (id) => buildResourcePath("admin/documents", id),
    DOCUMENT_DOWNLOAD: (id) => `${buildResourcePath("admin/documents", id)}/download`,
    DOCUMENT_REGENERATE: (id) => `${buildResourcePath("admin/documents", id)}/regenerate`,
    SUBSCRIPTIONS: "/admin/subscriptions",
    SUBSCRIPTION: (id) => buildResourcePath("admin/subscriptions", id),
    SUBSCRIPTION_CANCEL: (id) => `${buildResourcePath("admin/subscriptions", id)}/cancel`,
    CONTACT_MESSAGES: "/admin/contact-messages",
    CONTACT_MESSAGE: (id) => buildResourcePath("admin/contact-messages", id),
    CONTACT_MESSAGE_REPLY: (id) => `${buildResourcePath("admin/contact-messages", id)}/reply`,
    PRODUCTS: "/admin/products",
    PRODUCT: (code) => buildResourcePath("admin/products", code),
    TEMPLATES: "/admin/templates",
    TEMPLATE: (id) => buildResourcePath("admin/templates", id),
    TEMPLATE_DEFAULT: (id) => `${buildResourcePath("admin/templates", id)}/default`,
    TEMPLATE_PREVIEW: (id) => `${buildResourcePath("admin/templates", id)}/preview`,
  }),
  USERS: Object.freeze({
    LIST: "/users",
    DETAILS: (id) => buildResourcePath("users", id),
  }),
  PRODUCTS: Object.freeze({
    LIST: "/products",
    DETAILS: (id) => buildResourcePath("products", id),
  }),
});

