export const selectAdminGuestState = (state) => state.adminGuest;

export const selectAdminGuestBuyers = (state) =>
  selectAdminGuestState(state).guests;
export const selectAdminGuestMeta = (state) =>
  selectAdminGuestState(state).meta;
export const selectAdminGuestError = (state) =>
  selectAdminGuestState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No guest buyers yet".
export const selectAdminGuestLoading = (state) =>
  selectAdminGuestState(state).loading ||
  selectAdminGuestState(state).status === "idle";
