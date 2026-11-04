export const DUMMY_USERS = {
  customer: {
    id: "u_customer_1",
    name: "Ada Customer",
    email: "customer@demo.test",
    role: "customer",
    permissions: ["customer:read"],
  },
  admin: {
    id: "u_admin_1",
    name: "Grace Admin",
    email: "admin@demo.test",
    role: "admin",
    permissions: ["customer:read", "admin:read", "admin:write"],
  },
};

export const DUMMY_SESSION_KEY = "__demo_session_user__";
