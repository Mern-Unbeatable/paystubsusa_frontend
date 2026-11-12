import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatalogProducts } from "../../../../features/public/catalog/publicCatalogThunks";
import {
  selectCatalogError,
  selectCatalogProducts,
  selectCatalogStatus,
} from "../../../../features/public/catalog/publicCatalogSelectors";
import { getErrorMessage } from "../../../../api/errorNormalizer";
import { formatMoney } from "../../../../utils/format";

const ADDON_CODE = "paystub_additional";
const PACK_CODE = "paystub_pack_3";
const UNLIMITED_CODE = "unlimited_monthly";

// Marketing copy and links per product; price, name and badge always come from the catalog.
const CARD_COPY = {
  paystub_single: { feature: "Generate 1 professional paystub", btnText: "Create Paystub" },
  paystub_pack_3: { feature: "Generate 3 paystubs", btnText: "Get 3 Paystubs", isPopular: true },
  w2_single: { feature: "Create a professional W-2 PDF", btnText: "Create W-2" },
  nec1099_single: { feature: "Create a professional 1099-NEC PDF", btnText: "Create 1099" },
  direct_deposit_single: { feature: "Create a professional deposit slip", btnText: "Create Slip" },
};

const LINK_BY_TYPE = {
  paystub: "/paystub-generator",
  w2: "/w-2",
  nec1099: "/1099-nec",
  direct_deposit: "/direct-deposit",
};

/** Pricing page data from GET /catalog/products. */
export function usePricingCatalog() {
  const dispatch = useDispatch();
  const products = useSelector(selectCatalogProducts);
  const status = useSelector(selectCatalogStatus);
  const error = useSelector(selectCatalogError);

  const load = useCallback(() => dispatch(fetchCatalogProducts()), [dispatch]);

  // Not aborted on unmount: the result is cached for the session, and aborting would race the dedupe condition.
  useEffect(() => {
    load();
  }, [load]);

  const data = useMemo(() => {
    const byCode = Object.fromEntries(products.map((p) => [p.code, p]));
    const price = (p) => (p ? formatMoney(p.amountCents, p.currency) : null);
    const cards = products
      .filter((p) => p.kind === "one_time" && p.code !== ADDON_CODE && LINK_BY_TYPE[p.documentType])
      .map((p) => {
        const copy = CARD_COPY[p.code] ?? { feature: `Create your ${p.name}`, btnText: "Get Started" };
        return {
          id: p.code,
          name: p.name,
          price: price(p),
          feature: p.badge ? `${copy.feature} - ${p.badge}` : copy.feature,
          btnText: copy.btnText,
          btnLink: LINK_BY_TYPE[p.documentType],
          isPopular: Boolean(copy.isPopular),
        };
      });
    const pack = byCode[PACK_CODE];
    const addon = byCode[ADDON_CODE];
    const unlimited = byCode[UNLIMITED_CODE];
    return {
      cards,
      pack: pack ? { name: pack.name, price: price(pack), badge: pack.badge, quantity: pack.creditQuantity } : null,
      addonPrice: price(addon),
      unlimited: unlimited ? { price: price(unlimited).replace(/\.00$/, ""), interval: unlimited.interval ?? "month" } : null,
    };
  }, [products]);

  return {
    ...data,
    loading: status === "idle" || status === "loading",
    error: status === "failed" ? getErrorMessage(error, "We couldn't load prices right now.") : null,
    retry: load,
  };
}
