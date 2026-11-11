export const selectPricingState = (state) => state.pricing;

export const selectProducts = (state) => selectPricingState(state).products;
export const selectProductsMeta = (state) => selectPricingState(state).meta;
export const selectPricingFilters = (state) => selectPricingState(state).filters;
export const selectPricingStatus = (state) => selectPricingState(state).status;
export const selectPricingError = (state) => selectPricingState(state).error;
// "idle" counts as loading so the first render shows skeletons, not "No products yet".
export const selectPricingLoading = (state) =>
  selectPricingState(state).loading || selectPricingStatus(state) === "idle";
export const selectProductDetails = (state) => selectPricingState(state).details;
