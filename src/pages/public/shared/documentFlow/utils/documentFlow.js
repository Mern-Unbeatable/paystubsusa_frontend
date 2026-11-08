// Step ids shared by every document flow (see data/*/steps.json): form steps 1-3, then preview and checkout.
export const DOCUMENT_STEPS = {
  FIRST_FORM_STEP: 1,
  LAST_FORM_STEP: 3,
  PREVIEW: 4,
  CHECKOUT: 5,
};

export const FORM_STEP_QUERY_PARAM = "step";

// "/w-2?step=3" — the form page keeps its current step in the URL.
export const buildFormStepPath = (formPath, step) =>
  step > DOCUMENT_STEPS.FIRST_FORM_STEP
    ? `${formPath}?${new URLSearchParams({ [FORM_STEP_QUERY_PARAM]: step })}`
    : formPath;

// Storage can be unavailable (private mode, quota); every helper degrades to a no-op.
export const createPaidFlag = (storageKey) => ({
  isPaid() {
    try {
      return window.sessionStorage.getItem(storageKey) === "true";
    } catch {
      return false;
    }
  },
  markPaid() {
    try {
      window.sessionStorage.setItem(storageKey, "true");
    } catch {
      /* ignore */
    }
  },
  clearPaid() {
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  },
});

const toFileSafe = (value) =>
  String(value || "")
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");

/**
 * Opens the browser print dialog for the `.paystub-print-root` document
 * ("Save as PDF"). The document title becomes the suggested PDF file name.
 */
export const printDocument = (fileNameParts) => {
  const previousTitle = document.title;
  document.title = fileNameParts.map(toFileSafe).filter(Boolean).join("-");

  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };
  window.addEventListener("afterprint", restoreTitle);
  window.print();
};
