export const selectAdminDocumentState = (state) => state.adminDocument;

export const selectAdminDocuments = (state) => selectAdminDocumentState(state).documents;
export const selectAdminDocumentsMeta = (state) => selectAdminDocumentState(state).meta;
export const selectAdminDocumentsError = (state) => selectAdminDocumentState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No documents yet".
export const selectAdminDocumentsLoading = (state) =>
  selectAdminDocumentState(state).loading || selectAdminDocumentState(state).status === "idle";
export const selectAdminDocumentDetails = (state) => selectAdminDocumentState(state).details;
