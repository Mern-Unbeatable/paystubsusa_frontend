export const selectAuthState = (state) => state.auth;

export const selectAuthUser = (state) => selectAuthState(state).user;
export const selectAuthLoading = (state) => selectAuthState(state).loading;
export const selectAuthStatus = (state) => selectAuthState(state).status;
export const selectAuthError = (state) => selectAuthState(state).error;
export const selectIsAuthenticated = (state) => Boolean(selectAuthUser(state));

