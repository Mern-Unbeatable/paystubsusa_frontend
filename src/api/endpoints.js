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
    PASSWORD: "/me/password",
    AVATAR: "/me/avatar",
  }),
  CATALOG: Object.freeze({
    TEMPLATES: "/catalog/templates",
  }),
  VERIFICATIONS: Object.freeze({
    SEND: "/verifications",
    VERIFY: (challengeId) => `${buildResourcePath("verifications", challengeId)}/verify`,
  }),
  ORDERS: Object.freeze({
    CREATE: "/orders",
    DETAILS: (id) => buildResourcePath("orders", id),
  }),
  DOCUMENTS: Object.freeze({
    DOWNLOAD: (id) => `${buildResourcePath("documents", id)}/download`,
  }),
  ADMIN: Object.freeze({
    CUSTOMERS: "/admin/customers",
    CUSTOMER: (id) => buildResourcePath("admin/customers", id),
    ORDERS: "/admin/orders",
    ORDER: (id) => buildResourcePath("admin/orders", id),
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

