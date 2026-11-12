export const selectAdminContactState = (state) => state.adminContact;

export const selectAdminContactMessages = (state) =>
  selectAdminContactState(state).messages;
export const selectAdminContactMeta = (state) =>
  selectAdminContactState(state).meta;
export const selectAdminContactError = (state) =>
  selectAdminContactState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No messages yet".
export const selectAdminContactLoading = (state) =>
  selectAdminContactState(state).loading ||
  selectAdminContactState(state).status === "idle";
