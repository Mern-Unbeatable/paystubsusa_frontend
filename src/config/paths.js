// router/paths.js
export const PATHS = {
  PUBLIC: {
    home: "/",
    paystubGenerator: "/paystub-generator",
    paystubCreate: "/paystub-generator/:templateSlug/create",
    paystubPackage: "/paystub-generator/:templateSlug/create/package",
    paystubCheckout: "/paystub-generator/:templateSlug/create/package/checkout",
    paystubSuccess:
      "/paystub-generator/:templateSlug/create/package/checkout/success",
    w2: "/w-2",
    w2Preview: "/w-2/create/preview",
    w2Checkout: "/w-2/create/checkout",
    w2Success: "/w-2/create/success",
    nec1099: "/1099-nec",
    nec1099Preview: "/1099-nec/create/preview",
    nec1099Checkout: "/1099-nec/create/checkout",
    nec1099Success: "/1099-nec/create/success",
    directDeposit: "/direct-deposit",
    directDepositPreview: "/direct-deposit/create/preview",
    directDepositCheckout: "/direct-deposit/create/checkout",
    directDepositSuccess: "/direct-deposit/create/success",
    pricing: "/pricing",
    findPaystubs: "/find-paystubs",
    about: "/about",
  },
  AUTH: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
  CUSTOMER: {
    dashboard: "/customer/overview",
    home: "/customer/home",
    overview: "/customer/overview",
    documents: "/customer/documents",
    payments: "/customer/payments",
    subscription: "/customer/subscription",
    help: "/customer/help",
    profile: "/customer/profile",
  },
  ADMIN: {
    dashboard: "/admin/overview",
    home: "/admin/home",
    overview: "/admin/overview",
    users: "/admin/users",
    customers: "/admin/customers",
    documents: "/admin/documents",
    orders: "/admin/orders",
    transactions: "/admin/transactions",
    subscriptions: "/admin/subscriptions",
    templates: "/admin/templates",
    pricing: "/admin/pricing",
    profile: "/admin/profile",
  },
};

const TEMPLATE_SLUG_SUFFIX = "-template";

// "02" -> "02-template"
export const toTemplateSlug = (templateId) =>
  `${templateId}${TEMPLATE_SLUG_SUFFIX}`;

// "02-template" -> "02"; returns null when the slug is not in the expected format.
export const fromTemplateSlug = (templateSlug = "") =>
  templateSlug.endsWith(TEMPLATE_SLUG_SUFFIX)
    ? templateSlug.slice(0, -TEMPLATE_SLUG_SUFFIX.length)
    : null;

export const TEMPLATE_QUERY_PARAM = "templateId";

// "/paystub-generator?templateId=02-template"
export const buildPaystubGeneratorPath = (templateId) =>
  `${PATHS.PUBLIC.paystubGenerator}?${new URLSearchParams({
    [TEMPLATE_QUERY_PARAM]: toTemplateSlug(templateId),
  })}`;

const fillTemplateSlug = (path, templateId) =>
  path.replace(":templateSlug", encodeURIComponent(toTemplateSlug(templateId)));

export const buildPaystubCreatePath = (templateId) =>
  fillTemplateSlug(PATHS.PUBLIC.paystubCreate, templateId);

export const buildPaystubPackagePath = (templateId) =>
  fillTemplateSlug(PATHS.PUBLIC.paystubPackage, templateId);

export const buildPaystubCheckoutPath = (templateId) =>
  fillTemplateSlug(PATHS.PUBLIC.paystubCheckout, templateId);

export const buildPaystubSuccessPath = (templateId) =>
  fillTemplateSlug(PATHS.PUBLIC.paystubSuccess, templateId);

// Legacy path -> canonical path. Rendered as <Navigate replace>.
export const ALIASES = {
  generator: PATHS.PUBLIC.paystubGenerator,
  w2: PATHS.PUBLIC.w2,
  1099: PATHS.PUBLIC.nec1099,
  "find-your-paystubs": PATHS.PUBLIC.findPaystubs,
  "about-us": PATHS.PUBLIC.about,
  signin: PATHS.AUTH.login,
  signup: PATHS.AUTH.register,
  forgot: PATHS.AUTH.forgotPassword,
  forgotpassword: PATHS.AUTH.forgotPassword,
  reset: PATHS.AUTH.resetPassword,
  resetpassword: PATHS.AUTH.resetPassword,
  "customer/dashboard": PATHS.CUSTOMER.dashboard,
  "admin/dashboard": PATHS.ADMIN.dashboard,
  "/dashboard": PATHS.CUSTOMER.dashboard,
  "/dashboard/overview": PATHS.CUSTOMER.overview,
  "/dashboard/documents": PATHS.CUSTOMER.documents,
  "/dashboard/payments": PATHS.CUSTOMER.payments,
  "/dashboard/subscription": PATHS.CUSTOMER.subscription,
  "/dashboard/help": PATHS.CUSTOMER.help,
  "/dashboard/profile": PATHS.CUSTOMER.profile,
  "/admin": PATHS.ADMIN.dashboard,
};
