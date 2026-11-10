import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { Pencil, UserRound } from "lucide-react";
import SectionCard from "./SectionCard";
import { useAuth } from "../../../../../hooks/useAuth";
import { describeRequestError } from "../utils/profileFormat";

const NAME_MAX = 100;
// Mirrors the API rule: international (E.164) format.
const PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;

const normalizePhone = (value) => value.replace(/[\s().-]/g, "");

function validate({ name, phone }) {
  const errors = {};
  const trimmedName = name.trim();
  if (!trimmedName) errors.name = "Name is required.";
  else if (trimmedName.length > NAME_MAX) errors.name = `Name must be ${NAME_MAX} characters or fewer.`;

  const normalizedPhone = normalizePhone(phone);
  if (normalizedPhone && !PHONE_PATTERN.test(normalizedPhone)) {
    errors.phone = "Use international format, e.g. +15551234567.";
  }
  return errors;
}

const inputClass = (hasError) =>
  `w-full rounded-xl border px-3.5 py-2.5 text-sm text-slate-800 transition placeholder:text-slate-400 focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
    hasError
      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
      : "border-slate-200 focus:border-secondary focus:ring-secondary/20"
  }`;

const ReadOnlyField = ({ label, value, placeholder }) => (
  <div>
    <dt className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
    <dd className={`mt-1 text-sm font-medium ${value ? "text-slate-800" : "text-slate-400"}`}>
      {value || placeholder}
    </dd>
  </div>
);

const PersonalInfoCard = ({ user }) => {
  const { updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const inFlightRef = useRef(false);

  const startEditing = () => {
    setForm({ name: user.name || "", phone: user.phone || "" });
    setErrors({});
    setEditing(true);
  };

  const cancel = () => {
    setEditing(false);
    setErrors({});
  };

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const changes = {};
    const name = form.name.trim();
    const phone = normalizePhone(form.phone) || null;
    if (name !== user.name) changes.name = name;
    if (phone !== (user.phone || null)) changes.phone = phone;

    if (Object.keys(changes).length === 0) {
      setEditing(false);
      return;
    }

    inFlightRef.current = true;
    setSaving(true);
    try {
      await updateProfile(changes);
      toast.success("Profile updated.", { id: "profile-updated" });
      setEditing(false);
    } catch (err) {
      const fieldErrors = err?.fieldErrors || {};
      const mapped = {
        name: fieldErrors.name?.[0],
        phone: fieldErrors.phone?.[0],
      };
      if (mapped.name || mapped.phone) setErrors(mapped);
      else toast.error(describeRequestError(err, "We couldn't update your profile."), { id: "profile-updated" });
    } finally {
      inFlightRef.current = false;
      setSaving(false);
    }
  };

  return (
    <SectionCard
      icon={UserRound}
      title="Personal Information"
      description="Your name and contact number."
      action={
        !editing && (
          <button
            type="button"
            onClick={startEditing}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition hover:border-secondary/40 hover:text-secondary cursor-pointer"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Edit Profile
          </button>
        )
      }
    >
      {editing ? (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="profile-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Full name
              </label>
              <input
                id="profile-name"
                type="text"
                autoComplete="name"
                autoFocus
                maxLength={NAME_MAX}
                value={form.name}
                onChange={updateField("name")}
                disabled={saving}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "profile-name-error" : undefined}
                className={inputClass(errors.name)}
              />
              {errors.name && (
                <p id="profile-name-error" className="mt-1 text-[12px] text-rose-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="profile-phone" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Phone number <span className="font-normal normal-case tracking-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="profile-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="+15551234567"
                value={form.phone}
                onChange={updateField("phone")}
                disabled={saving}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "profile-phone-error" : "profile-phone-hint"}
                className={inputClass(errors.phone)}
              />
              {errors.phone ? (
                <p id="profile-phone-error" className="mt-1 text-[12px] text-rose-600">{errors.phone}</p>
              ) : (
                <p id="profile-phone-hint" className="mt-1 text-[12px] text-slate-400">
                  Include the country code. Leave empty to remove it.
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={cancel}
              disabled={saving}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0089e0] disabled:opacity-60 cursor-pointer"
            >
              {saving && <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </form>
      ) : (
        <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <ReadOnlyField label="Full name" value={user.name} placeholder="Not set" />
          <ReadOnlyField label="Phone number" value={user.phone} placeholder="Not added" />
        </dl>
      )}
    </SectionCard>
  );
};

export default PersonalInfoCard;
