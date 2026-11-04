// router/paths.js
export const PATHS = {
  PUBLIC: {
    home: "/",
    paystubGenerator: "/paystub-generator",
    w2: "/w-2",
    nec1099: "/1099-nec",
    directDeposit: "/direct-deposit",
    pricing: "/pricing",
    findPaystubs: "/find-paystubs",
    about: "/about",
  },
  AUTH: {
    login: "/login",
    register: "/register",
  },
  CUSTOMER: {
    dashboard: "/dashboard",
  },
  ADMIN: {
    dashboard: "/admin",
  },
};

// Legacy path -> canonical path. Rendered as <Navigate replace>.
export const ALIASES = {
  generator: PATHS.PUBLIC.paystubGenerator,
  w2: PATHS.PUBLIC.w2,
  1099: PATHS.PUBLIC.nec1099,
  "find-your-paystubs": PATHS.PUBLIC.findPaystubs,
  "about-us": PATHS.PUBLIC.about,
  signin: PATHS.AUTH.login,
  signup: PATHS.AUTH.register,
  "customer/dashboard": PATHS.CUSTOMER.dashboard,
  "admin/dashboard": PATHS.ADMIN.dashboard,
};
