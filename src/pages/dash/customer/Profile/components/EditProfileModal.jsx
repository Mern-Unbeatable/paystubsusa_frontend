import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Camera, Trash2, UserRound } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import UserAvatar from "./UserAvatar";
import { useAuth } from "../../../../../hooks/useAuth";
import { avatarSrc, describeRequestError } from "../utils/profileFormat";

const NAME_MAX = 100;
// Mirrors the API rules: international (E.164) phone, JPG/PNG/WebP avatar up to 2 MB.
const PHONE_PATTERN = /^\+[1-9]\d{6,14}$/;
const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

const normalizePhone = (value) => value.replace(/[\s().-]/g, "");

function validate({ name, phone }) {
  const errors = {};
  const trimmedName = name.trim();
  if (!trimmedName) errors.name = "Name is required.";
  else if (trimmedName.length > NAME_MAX)
    errors.name = `Name must be ${NAME_MAX} characters or fewer.`;

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

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600";

const EditProfileModal = ({ open, onClose, user }) => {
  const { updateProfile, uploadAvatar, removeAvatar } = useAuth();
  const [form, setForm] = useState({ name: "", phone: "" });
  // null = keep the current photo; { file, preview } = replace; "remove" = delete it.
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const inFlightRef = useRef(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setForm({ name: user.name || "", phone: user.phone || "" });
    setPhoto(null);
    setErrors({});
    // Only on open: later store updates (e.g. the avatar saving) must not wipe the form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const preview = photo && photo !== "remove" ? photo.preview : null;
  useEffect(
    () => (preview ? () => URL.revokeObjectURL(preview) : undefined),
    [preview],
  );

  const currentSrc = photo === "remove" ? null : preview || avatarSrc(user);

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const pickPhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!AVATAR_TYPES.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Use a JPG, PNG or WebP image.",
      }));
      return;
    }
    if (file.size > AVATAR_MAX_BYTES) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Image must be 2 MB or smaller.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, avatar: undefined }));
    setPhoto({ file, preview: URL.createObjectURL(file) });
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
    const photoChange =
      photo === "remove" ? (user.avatarUrl ? "remove" : null) : photo;

    if (!photoChange && Object.keys(changes).length === 0) {
      onClose();
      return;
    }

    inFlightRef.current = true;
    setSaving(true);
    try {
      if (photoChange) {
        try {
          await (photoChange === "remove"
            ? removeAvatar()
            : uploadAvatar(photoChange.file));
          setPhoto(null);
        } catch (err) {
          setErrors({
            avatar: describeRequestError(err, "We couldn't save your photo."),
          });
          return;
        }
      }
      if (Object.keys(changes).length > 0) {
        try {
          await updateProfile(changes);
        } catch (err) {
          const fieldErrors = err?.fieldErrors || {};
          const mapped = {
            name: fieldErrors.name?.[0],
            phone: fieldErrors.phone?.[0],
          };
          if (mapped.name || mapped.phone) setErrors(mapped);
          else
            toast.error(
              describeRequestError(err, "We couldn't update your profile."),
              { id: "profile-updated" },
            );
          return;
        }
      }
      toast.success("Profile updated.", { id: "profile-updated" });
      onClose();
    } finally {
      inFlightRef.current = false;
      setSaving(false);
    }
  };

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      title="Edit Profile"
      description="Update your photo, name and contact number."
      icon={UserRound}
      dismissible={!saving}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div>
          <span className={labelClass}>Profile photo</span>
          <div className="flex items-center gap-4">
            <UserAvatar
              src={currentSrc}
              name={form.name || user.name}
              email={user.email}
              className="h-16 w-16 text-lg"
            />
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-[13px] font-semibold text-slate-700 transition hover:border-secondary/40 hover:text-secondary disabled:opacity-60 cursor-pointer"
              >
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                {currentSrc ? "Change photo" : "Upload photo"}
              </button>
              {currentSrc && (
                <button
                  type="button"
                  onClick={() => {
                    setPhoto("remove");
                    setErrors((prev) => ({ ...prev, avatar: undefined }));
                  }}
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              id="profile-avatar"
              type="file"
              accept={AVATAR_TYPES.join(",")}
              onChange={pickPhoto}
              className="sr-only"
              tabIndex={-1}
              aria-describedby={
                errors.avatar ? "profile-avatar-error" : "profile-avatar-hint"
              }
            />
          </div>
          {errors.avatar ? (
            <p
              id="profile-avatar-error"
              role="alert"
              className="mt-1.5 text-[12px] text-rose-600"
            >
              {errors.avatar}
            </p>
          ) : (
            <p
              id="profile-avatar-hint"
              className="mt-1.5 text-[12px] text-slate-400"
            >
              JPG, PNG or WebP, up to 2 MB.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-name" className={labelClass}>
            Full name
          </label>
          <input
            id="profile-name"
            type="text"
            autoComplete="name"
            data-autofocus
            maxLength={NAME_MAX}
            value={form.name}
            onChange={updateField("name")}
            disabled={saving}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "profile-name-error" : undefined}
            className={inputClass(errors.name)}
          />
          {errors.name && (
            <p
              id="profile-name-error"
              className="mt-1 text-[12px] text-rose-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="profile-phone" className={labelClass}>
            Phone number{" "}
            <span className="font-normal normal-case tracking-normal text-slate-400">
              (optional)
            </span>
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
            aria-describedby={
              errors.phone ? "profile-phone-error" : "profile-phone-hint"
            }
            className={inputClass(errors.phone)}
          />
          {errors.phone ? (
            <p
              id="profile-phone-error"
              className="mt-1 text-[12px] text-rose-600"
            >
              {errors.phone}
            </p>
          ) : (
            <p
              id="profile-phone-hint"
              className="mt-1 text-[12px] text-slate-400"
            >
              Include the country code. Leave empty to remove it.
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
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
            {saving && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </ProfileModal>
  );
};

export default EditProfileModal;
