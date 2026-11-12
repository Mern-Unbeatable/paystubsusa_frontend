export const LAST_TEMPLATE_STORAGE_KEY = "paystubGenerator.lastTemplateId";

// Storage can be unavailable (private mode, quota); every helper degrades to a no-op.
const safeSessionStorage = {
  get(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      /* ignore */
    }
  },
  remove(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

// JSON-encoded to stay compatible with useSessionStorageState.
export const rememberLastTemplateId = (templateId) =>
  safeSessionStorage.set(LAST_TEMPLATE_STORAGE_KEY, JSON.stringify(templateId));
