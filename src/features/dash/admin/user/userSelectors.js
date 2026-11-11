export const selectUserState = (state) => state.user;

export const selectUsers = (state) => selectUserState(state).users;
export const selectUsersMeta = (state) => selectUserState(state).meta;
export const selectUserFilters = (state) => selectUserState(state).filters;
export const selectUsersStatus = (state) => selectUserState(state).status;
export const selectUsersError = (state) => selectUserState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No users yet".
export const selectUsersLoading = (state) =>
  selectUserState(state).loading || selectUsersStatus(state) === "idle";
export const selectUserDetails = (state) => selectUserState(state).details;
