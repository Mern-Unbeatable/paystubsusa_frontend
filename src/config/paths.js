// router/paths.js
export const PATHS = {
  PUBLIC: {
    home: "/",
    paystubGenerator: "/paystub-generator",
    /** Canonical create flow; form/package/checkout live as query params. */
    paystubCreate: "/paystub-generator/create/:templateSlug",
    /** Legacy nested paths; redirect into create query URLs. */
    paystubCreateLegacy: "/paystub-generator/:templateSlug/create",
    paystubPackage: "/paystub-generator/:templateSlug/create/package",
    paystubCheckout: "/paystub-generator/:templateSlug/create/package/checkout",
    paystubSuccess:
      "/paystub-generator/:templateSlug/create/package/checkout/success",
    /** Legacy create-first package/checkout paths (pre-query-param). */
    paystubPackageLegacy: "/paystub-generator/create/:templateSlug/package",
    paystubCheckoutLegacy:
      "/paystub-generator/create/:templateSlug/package/checkout",
    paystubSuccessLegacy:
      "/paystub-generator/create/:templateSlug/package/checkout/success",
    w2: "/w-2",
    w2Create: "/w-2/create",
    /** Nav / marketing entry into the W-2 form. */
    w2CreateStep1: "/w-2/create?step=1",
    /** Canonical checkout / success live as query params on create. */
    w2CheckoutVerifying: "/w-2/create?step=5&checkout=verifying",
    w2CheckoutVerified: "/w-2/create?step=5&checkout=verified",
    w2CheckoutSuccess: "/w-2/create?step=5&checkout=success",
    w2Preview: "/w-2/create/preview",
    /** Legacy path routes; redirect into create query URLs. */
    w2Checkout: "/w-2/create/checkout",
    w2Success: "/w-2/create/checkout/success",
    w2SuccessLegacy: "/w-2/create/success",
    nec1099: "/1099-nec",
    nec1099Create: "/1099-nec/create",
    nec1099CreateStep1: "/1099-nec/create?step=1",
    nec1099CheckoutVerifying: "/1099-nec/create?step=5&checkout=verifying",
    nec1099CheckoutVerified: "/1099-nec/create?step=5&checkout=verified",
    nec1099CheckoutSuccess: "/1099-nec/create?step=5&checkout=success",
    nec1099Preview: "/1099-nec/create/preview",
    /** Legacy path routes; redirect into create query URLs. */
    nec1099Checkout: "/1099-nec/create/checkout",
    nec1099Success: "/1099-nec/create/checkout/success",
    nec1099SuccessLegacy: "/1099-nec/create/success",
    directDeposit: "/direct-deposit",
    directDepositCreate: "/direct-deposit/create",
    directDepositCreateStep1: "/direct-deposit/create?step=1",
    directDepositCheckoutVerifying:
      "/direct-deposit/create?step=5&checkout=verifying",
    directDepositCheckoutVerified:
      "/direct-deposit/create?step=5&checkout=verified",
    directDepositCheckoutSuccess:
      "/direct-deposit/create?step=5&checkout=success",
    directDepositPreview: "/direct-deposit/create/preview",
    /** Legacy path routes; redirect into create query URLs. */
    directDepositCheckout: "/direct-deposit/create/checkout",
    directDepositSuccess: "/direct-deposit/create/checkout/success",
    directDepositSuccessLegacy: "/direct-deposit/create/success",
    pricing: "/pricing",
    findPaystubs: "/find-paystubs",
    about: "/about",
    contact: "/contact",
    terms: "/terms-conditions",
    privacy: "/privacy-policy",
  },
  AUTH: {
    root: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    verifyEmail: "/auth/register/verify-email",
    // Must match the link the API emails (`${APP_URL}/reset-password?token=…`).
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
    customers: "/admin/customers",
    guestBuyers: "/admin/guest-buyers",
    documents: "/admin/documents",
    orders: "/admin/orders",
    transactions: "/admin/transactions",
    subscriptions: "/admin/subscriptions",
    contacts: "/admin/contacts",
    templates: "/admin/templates",
    templateNew: "/admin/templates/new",
    templateEdit: "/admin/templates/:id/edit",
    pricing: "/admin/pricing",
    settings: "/admin/settings",
    settingsTable: (table) => `/admin/settings/${table}`,
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

/** Listing page (no template query). Prefer create path after a template is chosen. */
export const buildPaystubGeneratorPath = () => PATHS.PUBLIC.paystubGenerator;

const fillTemplateSlug = (path, templateId) =>
  path.replace(":templateSlug", encodeURIComponent(toTemplateSlug(templateId)));

/** Form step 1 on the canonical create URL. */
export const buildPaystubCreatePath = (templateId) =>
  `${fillTemplateSlug(PATHS.PUBLIC.paystubCreate, templateId)}?step=1`;

/** Package selection: `?step=5&checkout=package`. */
export const buildPaystubPackagePath = (templateId) =>
  `${fillTemplateSlug(PATHS.PUBLIC.paystubCreate, templateId)}?step=5&checkout=package`;

/** Checkout verifying: `?step=6&checkout=verifying`. */
export const buildPaystubCheckoutPath = (templateId) =>
  `${fillTemplateSlug(PATHS.PUBLIC.paystubCreate, templateId)}?step=6&checkout=verifying`;

/** Checkout success: `?step=6&checkout=success`. */
export const buildPaystubSuccessPath = (templateId) =>
  `${fillTemplateSlug(PATHS.PUBLIC.paystubCreate, templateId)}?step=6&checkout=success`;

/** Bare create path without query (legacy redirect helpers). */
export const buildPaystubCreateBasePath = (templateId) =>
  fillTemplateSlug(PATHS.PUBLIC.paystubCreate, templateId);

export const buildAdminTemplateEditPath = (id) =>
  PATHS.ADMIN.templateEdit.replace(":id", encodeURIComponent(id));

// Legacy path -> canonical path. Rendered as <Navigate replace>.
export const ALIASES = {
  generator: PATHS.PUBLIC.paystubGenerator,
  w2: PATHS.PUBLIC.w2CreateStep1,
  1099: PATHS.PUBLIC.nec1099CreateStep1,
  "find-your-paystubs": PATHS.PUBLIC.findPaystubs,
  "about-us": PATHS.PUBLIC.about,
  "contact-us": PATHS.PUBLIC.contact,
  contracts: PATHS.PUBLIC.contact,
  terms: PATHS.PUBLIC.terms,
  privacy: PATHS.PUBLIC.privacy,
  "/login": PATHS.AUTH.login,
  "/register": PATHS.AUTH.register,
  "/forgot-password": PATHS.AUTH.forgotPassword,
  "/verify-email": PATHS.AUTH.verifyEmail,
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
