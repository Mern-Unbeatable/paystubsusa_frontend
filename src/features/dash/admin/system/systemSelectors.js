export const selectAdminSystemState = (state) => state.adminSystem;

export const selectAdminSystemRecords = (state) =>
  selectAdminSystemState(state).records;
export const selectAdminSystemMeta = (state) =>
  selectAdminSystemState(state).meta;
export const selectAdminSystemError = (state) =>
  selectAdminSystemState(state).error;
export const selectAdminSystemTable = (state) =>
  selectAdminSystemState(state).table;
export const selectAdminSystemLoading = (state) => {
  const s = selectAdminSystemState(state);
  if (s.loading) return true;
  // First paint only — never treat a later "idle" (e.g. aborted request) as perpetual loading.
  return s.status === "idle" && s.table === null;
};

export const selectAdminSystemDetail = (state) =>
  selectAdminSystemState(state).detail;
export const selectAdminSystemDetailRecord = (state) =>
  selectAdminSystemDetail(state).record;
export const selectAdminSystemDetailLoading = (state) =>
  selectAdminSystemDetail(state).loading;
export const selectAdminSystemDetailError = (state) =>
  selectAdminSystemDetail(state).error;
