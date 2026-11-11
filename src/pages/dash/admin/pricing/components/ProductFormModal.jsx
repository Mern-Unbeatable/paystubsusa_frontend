import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AlertTriangle, PackagePlus, Pencil } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { describeRequestError } from "../../../customer/Profile/utils/profileFormat";
import {
  createAdminProductApi,
  updateAdminProductApi,
} from "../../../../../features/dash/admin/Pricing/adminPricingApi";
import {
  DOCUMENT_TYPE_LABELS,
  PRODUCT_CODE_PATTERN,
  centsToDollars,
  dollarsToCents,
  suggestCode,
} from "../utils/pricingFormat";

const MIN_CENTS = 50;
const MAX_CENTS = 1_000_000;

const inputClass =
  "mt-1.5 h-10 w-full rounded-xl border px-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500";
const inputState = (hasError) =>
  hasError
    ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
    : "border-slate-200 focus:border-secondary focus:ring-secondary/20";

const Field = ({ id, label, hint, error, children }) => (
  <div>
    <label htmlFor={id} className="text-sm font-semibold text-slate-700">
      {label}
    </label>
    {children}
    {error ? (
      <p id={`${id}-error`} className="mt-1 text-xs font-medium text-rose-600">
        {error}
      </p>
    ) : (
      hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>
    )}
  </div>
);

const initialValues = (product) =>
  product
    ? {
        name: product.name,
        code: product.code,
        documentType: product.documentType || "",
        price: centsToDollars(product.amountCents),
        creditQuantity: String(product.creditQuantity),
        badge: product.badge || "",
        sortOrder: String(product.sortOrder),
        isActive: product.isActive,
      }
    : {
        name: "",
        code: "",
        documentType: "paystub",
        price: "",
        creditQuantity: "1",
        badge: "",
        sortOrder: "0",
        isActive: true,
      };

const isIntInRange = (value, min, max) => /^\d+$/.test(value) && Number(value) >= min && Number(value) <= max;

function validate(values, isCreate) {
  const errors = {};
  const name = values.name.trim();
  if (!name) errors.name = "Enter a product name.";
  else if (name.length > 100) errors.name = "Use 100 characters or fewer.";

  if (isCreate && !PRODUCT_CODE_PATTERN.test(values.code)) {
    errors.code = "Use 3–64 lowercase letters, digits or underscores, starting with a letter.";
  }

  const cents = dollarsToCents(values.price);
  if (cents === null) errors.price = "Enter a price like 12.99.";
  else if (cents < MIN_CENTS || cents > MAX_CENTS) errors.price = "Price must be between $0.50 and $10,000.00.";

  if (isCreate) {
    if (!isIntInRange(values.creditQuantity, 1, 50)) errors.creditQuantity = "Enter a whole number from 1 to 50.";
    else if (Number(values.creditQuantity) > 1 && values.documentType !== "paystub") {
      errors.creditQuantity = "Only paystub packages can include more than one document.";
    }
  }

  if (values.badge.trim().length > 40) errors.badge = "Use 40 characters or fewer.";
  if (!isIntInRange(values.sortOrder, 0, 10_000)) errors.sortOrder = "Enter a whole number from 0 to 10000.";
  return { errors, cents };
}

/** Server field names → form field names. */
const SERVER_FIELDS = { amountCents: "price" };

/** Create (no `product`) or edit. Code, document type and pack size are fixed after creation. */
const ProductFormModal = ({ product, onClose, onSaved }) => {
  const isCreate = !product;
  const [values, setValues] = useState(() => initialValues(product));
  const [codeTouched, setCodeTouched] = useState(!isCreate);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const inFlightRef = useRef(false);

  const set = (key) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && isCreate && !codeTouched) next.code = suggestCode(value);
      return next;
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const priceCents = dollarsToCents(values.price);
  const repricingSubscription =
    product?.kind === "subscription" && priceCents !== null && priceCents !== product.amountCents;

  const buildBody = (cents) => {
    const body = {
      name: values.name.trim(),
      amountCents: cents,
      badge: values.badge.trim() || null,
      sortOrder: Number(values.sortOrder),
      isActive: values.isActive,
    };
    if (isCreate) {
      return {
        ...body,
        code: values.code,
        documentType: values.documentType,
        creditQuantity: Number(values.creditQuantity),
      };
    }
    // Send only what changed so the audit log records the real edit.
    return Object.fromEntries(
      Object.entries(body).filter(([key, value]) => value !== (product[key] ?? null)),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    const { errors: found, cents } = validate(values, isCreate);
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length > 0) return;

    const body = buildBody(cents);
    if (!isCreate && Object.keys(body).length === 0) {
      onClose();
      return;
    }

    inFlightRef.current = true;
    setSubmitting(true);
    try {
      const saved = isCreate
        ? await createAdminProductApi(body)
        : await updateAdminProductApi(product.code, body);
      toast.success(isCreate ? `${saved.name} was created.` : `${saved.name} was updated.`);
      onSaved(saved);
      onClose();
    } catch (err) {
      const serverErrors = Object.fromEntries(
        Object.entries(err?.fieldErrors || {}).map(([key, messages]) => [
          SERVER_FIELDS[key] || key,
          [].concat(messages)[0],
        ]),
      );
      if (Object.keys(serverErrors).length > 0) setErrors(serverErrors);
      if (err?.status === 409) setErrors((prev) => ({ ...prev, code: err.message }));
      setFormError(describeRequestError(err, "Couldn't save this product. Please try again."));
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  };

  const a11y = (key, id) => ({
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${id}-error` : undefined,
  });

  return (
    <ProfileModal
      open
      onClose={onClose}
      dismissible={!submitting}
      size="lg"
      icon={isCreate ? PackagePlus : Pencil}
      title={isCreate ? "New product" : "Edit product"}
      description={
        isCreate
          ? "New products are one-time packages and appear in checkout once active."
          : `Changes apply to new orders only; existing orders keep their original price.`
      }
      footer={
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="product-form"
            disabled={submitting}
            className="h-10 rounded-xl bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary/90 disabled:opacity-60 cursor-pointer"
          >
            {submitting ? "Saving…" : isCreate ? "Create product" : "Save changes"}
          </button>
        </div>
      }
    >
      <form id="product-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field id="product-name" label="Name" error={errors.name}>
            <input
              id="product-name"
              data-autofocus
              value={values.name}
              onChange={set("name")}
              maxLength={100}
              disabled={submitting}
              {...a11y("name", "product-name")}
              className={`${inputClass} ${inputState(errors.name)}`}
            />
          </Field>

          <Field
            id="product-code"
            label="Code"
            error={errors.code}
            hint={isCreate ? "Used by checkout; can't be changed later." : "Codes can't be changed."}
          >
            <input
              id="product-code"
              value={values.code}
              onChange={(e) => {
                setCodeTouched(true);
                set("code")(e);
              }}
              maxLength={64}
              disabled={!isCreate || submitting}
              {...a11y("code", "product-code")}
              className={`${inputClass} font-mono ${inputState(errors.code)}`}
            />
          </Field>

          <Field
            id="product-document-type"
            label="Document type"
            hint={isCreate ? undefined : "Fixed after creation."}
          >
            <select
              id="product-document-type"
              value={values.documentType}
              onChange={set("documentType")}
              disabled={!isCreate || submitting}
              className={`${inputClass} ${inputState(false)} cursor-pointer`}
            >
              {!values.documentType && <option value="">All documents</option>}
              {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="product-price"
            label={product?.interval ? "Price (USD per month)" : "Price (USD)"}
            error={errors.price}
          >
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 mt-0.75 -translate-y-1/2 text-sm text-slate-400">
                $
              </span>
              <input
                id="product-price"
                inputMode="decimal"
                value={values.price}
                onChange={set("price")}
                placeholder="0.00"
                disabled={submitting}
                {...a11y("price", "product-price")}
                className={`${inputClass} pl-7 ${inputState(errors.price)}`}
              />
            </div>
          </Field>

          <Field
            id="product-credits"
            label="Documents included"
            error={errors.creditQuantity}
            hint={isCreate ? "More than 1 is allowed for paystub packages only." : "Fixed after creation."}
          >
            <input
              id="product-credits"
              inputMode="numeric"
              value={values.creditQuantity}
              onChange={set("creditQuantity")}
              disabled={!isCreate || submitting}
              {...a11y("creditQuantity", "product-credits")}
              className={`${inputClass} ${inputState(errors.creditQuantity)}`}
            />
          </Field>

          <Field id="product-badge" label="Badge" error={errors.badge} hint="Optional, e.g. “Save 35%”.">
            <input
              id="product-badge"
              value={values.badge}
              onChange={set("badge")}
              maxLength={40}
              disabled={submitting}
              {...a11y("badge", "product-badge")}
              className={`${inputClass} ${inputState(errors.badge)}`}
            />
          </Field>

          <Field
            id="product-sort"
            label="Sort order"
            error={errors.sortOrder}
            hint="Lower numbers appear first."
          >
            <input
              id="product-sort"
              inputMode="numeric"
              value={values.sortOrder}
              onChange={set("sortOrder")}
              disabled={submitting}
              {...a11y("sortOrder", "product-sort")}
              className={`${inputClass} ${inputState(errors.sortOrder)}`}
            />
          </Field>

          <div className="flex items-end">
            <label className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-3 text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={values.isActive}
                onChange={set("isActive")}
                disabled={submitting}
                className="h-4 w-4 accent-secondary"
              />
              Active (available in checkout)
            </label>
          </div>
        </div>

        {repricingSubscription && (
          <p className="flex gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            A new Stripe price will be created for new subscribers. Existing subscribers keep their current price.
          </p>
        )}

        {formError && (
          <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
            {formError}
          </p>
        )}
      </form>
    </ProfileModal>
  );
};

export default ProductFormModal;
