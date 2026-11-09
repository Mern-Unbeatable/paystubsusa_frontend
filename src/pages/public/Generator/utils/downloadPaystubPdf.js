const toFileSafe = (value) =>
  String(value || "")
    .trim()
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-|-$/g, "");

/**
 * Opens the browser print dialog for the `.paystub-print-root` document
 * ("Save as PDF"). The document title becomes the suggested PDF file name.
 */
export const downloadPaystubPdf = (formData) => {
  const previousTitle = document.title;
  document.title = ["Paystub", toFileSafe(formData.employeeName), formData.payDate]
    .filter(Boolean)
    .join("-");

  const restoreTitle = () => {
    document.title = previousTitle;
    window.removeEventListener("afterprint", restoreTitle);
  };
  window.addEventListener("afterprint", restoreTitle);
  window.print();
};
