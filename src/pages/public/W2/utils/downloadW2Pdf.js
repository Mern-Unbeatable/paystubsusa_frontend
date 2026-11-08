const toFileSafe = (value) =>
  String(value || "")
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");

/**
 * Opens the browser print dialog for the `.paystub-print-root` W-2
 * ("Save as PDF"). The document title becomes the suggested PDF file name.
 */
export const downloadW2Pdf = (formData) => {
  const previousTitle = document.title;
  document.title = ["W-2", toFileSafe(formData.firstName), toFileSafe(formData.lastName), "2025"]
    .filter(Boolean)
    .join("-");

  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };
  window.addEventListener("afterprint", restoreTitle);
  window.print();
};
