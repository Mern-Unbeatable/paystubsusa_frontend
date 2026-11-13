export const selectDocumentAccess = (state) => state.documentAccess;
export const selectDocumentAccessSession = (state) => state.documentAccess.session;
export const selectFoundDocumentsFilters = (state) => state.documentAccess.filters;
export const selectFoundDocumentsList = (state) => state.documentAccess.list;

/**
 * Identifies whose documents a list belongs to, so one buyer's results are never shown to another.
 * A signed-in account wins over a leftover guest session (the page hides the guest form then).
 */
export const documentsOwnerOf = (session, user) =>
  user?.id ? `account:${user.id}` : session ? `guest:${session.email}` : null;

export const isGuestOwner = (owner) => Boolean(owner?.startsWith("guest:"));

export const foundDocumentsKey = (owner, filters, pageSize) => JSON.stringify({ owner, filters, pageSize });
