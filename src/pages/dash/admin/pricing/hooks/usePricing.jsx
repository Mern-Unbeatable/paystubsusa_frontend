import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPricingError,
  selectPricingFilters,
  selectPricingLoading,
  selectPricingStatus,
  selectProductDetails,
  selectProducts,
  selectProductsMeta,
} from "../../../../../features/dash/admin/Pricing/pricingSelectors";
import {
  resetPricingFilters,
  setPricingFilter,
} from "../../../../../features/dash/admin/Pricing/pricingSlice";
import {
  createProduct as createProductThunk,
  deleteProduct as deleteProductThunk,
  fetchProductDetails,
  fetchProducts,
  updateProduct as updateProductThunk,
} from "../../../../../features/dash/admin/Pricing/pricingThunks";

export function usePricing() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const meta = useSelector(selectProductsMeta);
  const filters = useSelector(selectPricingFilters);
  const loading = useSelector(selectPricingLoading);
  const status = useSelector(selectPricingStatus);
  const error = useSelector(selectPricingError);
  const details = useSelector(selectProductDetails);

  // Returns the thunk promise (not unwrapped) so callers can `.abort()` superseded requests.
  const loadProducts = useCallback(
    (requestFilters) => dispatch(fetchProducts(requestFilters)),
    [dispatch],
  );

  const loadProductDetails = useCallback(
    (code) => dispatch(fetchProductDetails(code)),
    [dispatch],
  );

  const setFilter = useCallback(
    (key, value) => dispatch(setPricingFilter({ key, value })),
    [dispatch],
  );

  const resetFilters = useCallback(() => dispatch(resetPricingFilters()), [dispatch]);

  const createProduct = useCallback(
    (body) => dispatch(createProductThunk(body)).unwrap(),
    [dispatch],
  );

  const updateProduct = useCallback(
    (payload) => dispatch(updateProductThunk(payload)).unwrap(),
    [dispatch],
  );

  const deleteProduct = useCallback(
    (code) => dispatch(deleteProductThunk(code)).unwrap(),
    [dispatch],
  );

  return {
    products,
    meta,
    filters,
    loading,
    status,
    error,
    details,
    loadProducts,
    loadProductDetails,
    setFilter,
    resetFilters,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
