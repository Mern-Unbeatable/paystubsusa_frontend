export const AUTH_STORAGE_KEYS = Object.freeze({
  demoSessionUser: "__demo_session_user__",
});

export const DEMO_USERS = Object.freeze({
  customer: Object.freeze({
    id: "u_customer_1",
    name: "Ada Customer",
    email: "customer@demo.test",
    role: "customer",
    permissions: ["customer:read"],
  }),
  admin: Object.freeze({
    id: "u_admin_1",
    name: "Grace Admin",
    email: "admin@demo.test",
    role: "admin",
    permissions: ["customer:read", "admin:read", "admin:write"],
  }),
});

export const DEMO_CREDENTIALS = Object.freeze({
  customer: Object.freeze({
    email: "customer@demo.test",
    password: "password123",
  }),
  admin: Object.freeze({
    email: "admin@demo.test",
    password: "admin123",
  }),
});
