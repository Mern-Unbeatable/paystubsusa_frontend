const buildResourcePath = (resource, id) =>
  `/${resource}/${encodeURIComponent(id)}`;

export const API_ENDPOINTS = Object.freeze({
  AUTH: Object.freeze({
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    PROFILE: "/auth/me",
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

