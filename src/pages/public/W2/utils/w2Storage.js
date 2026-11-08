const PAID_STORAGE_KEY = "w2Generator.paid";

// Storage can be unavailable (private mode, quota); every helper degrades to a no-op.
export const isW2Paid = () => {
  try {
    return window.sessionStorage.getItem(PAID_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const markW2Paid = () => {
  try {
    window.sessionStorage.setItem(PAID_STORAGE_KEY, "true");
  } catch {
    /* ignore */
  }
};

export const clearW2Paid = () => {
  try {
    window.sessionStorage.removeItem(PAID_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};
