import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AlertCircle, Check, Eye, EyeOff, KeyRound } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { useAuth } from "../../../../../hooks/useAuth";
import { describeRequestError } from "../utils/profileFormat";

// Mirrors the API password policy (8–128 characters; the API also rejects common passwords).
const MIN_LENGTH = 8;
const MAX_LENGTH = 128;
const EMPTY = { currentPassword: "", newPassword: "", confirmPassword: "" };

const PasswordField = ({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
  disabled,
  autoFocus,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          disabled={disabled}
          maxLength={MAX_LENGTH}
          data-autofocus={autoFocus || undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`w-full rounded-xl border py-2.5 pl-3.5 pr-11 text-sm text-slate-800 transition focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
            error
              ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
              : "border-slate-200 focus:border-secondary focus:ring-secondary/20"
          }`}
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:text-slate-600 cursor-pointer"
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[12px] text-rose-600">
          {error}
        </p>
      )}
    </div>
  );
};

const Rule = ({ met, children }) => (
  <li
    className={`flex items-center gap-2 ${met ? "text-emerald-700" : "text-slate-500"}`}
  >
    <span
      className={`flex h-4 w-4 items-center justify-center rounded-full ${
        met ? "bg-emerald-100" : "bg-slate-100"
      }`}
    >
      {met && <Check className="h-3 w-3" aria-hidden="true" />}
    </span>
    {children}
  </li>
);

const ChangePasswordModal = ({ open, onClose }) => {
  const { changePassword } = useAuth();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(null);
  const [saving, setSaving] = useState(false);
  const inFlightRef = useRef(false);

  // Never keep typed passwords around once the dialog is closed.
  useEffect(() => {
    if (!open) {
      setForm(EMPTY);
      setErrors({});
      setGeneralError(null);
    }
  }, [open]);

  const { currentPassword, newPassword, confirmPassword } = form;
  const rules = {
    length:
      newPassword.length >= MIN_LENGTH && newPassword.length <= MAX_LENGTH,
    different: newPassword.length > 0 && newPassword !== currentPassword,
    matches: confirmPassword.length > 0 && newPassword === confirmPassword,
  };
  const canSubmit =
    currentPassword.length > 0 &&
    rules.length &&
    rules.different &&
    rules.matches;

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setGeneralError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    if (!canSubmit) {
      setGeneralError("Check the password requirements below.");
      return;
    }

    inFlightRef.current = true;
    setSaving(true);
    setGeneralError(null);
    try {
      await changePassword({ currentPassword, newPassword });
      toast.success("Password updated. Other devices have been signed out.", {
        id: "password-changed",
      });
      onClose();
    } catch (err) {
      const fieldErrors = err?.fieldErrors || {};
      const mapped = {
        currentPassword: fieldErrors.currentPassword?.[0],
        newPassword: fieldErrors.newPassword?.[0],
      };
      if (mapped.currentPassword || mapped.newPassword) setErrors(mapped);
      else
        setGeneralError(
          describeRequestError(err, "We couldn't change your password."),
        );
    } finally {
      inFlightRef.current = false;
      setSaving(false);
    }
  };

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      dismissible={!saving}
      icon={KeyRound}
      title="Change Password"
      description="You'll stay signed in on this device. Other devices will be signed out."
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <PasswordField
          id="current-password"
          label="Current password"
          autoComplete="current-password"
          autoFocus
          value={currentPassword}
          onChange={update("currentPassword")}
          error={errors.currentPassword}
          disabled={saving}
        />
        <PasswordField
          id="new-password"
          label="New password"
          autoComplete="new-password"
          value={newPassword}
          onChange={update("newPassword")}
          error={errors.newPassword}
          disabled={saving}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm new password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={update("confirmPassword")}
          error={
            confirmPassword && !rules.matches
              ? "Passwords don't match."
              : undefined
          }
          disabled={saving}
        />

        <ul
          className="space-y-1.5 rounded-xl bg-slate-50 px-3.5 py-3 text-[12.5px]"
          aria-label="Password requirements"
        >
          <Rule met={rules.length}>
            {MIN_LENGTH}–{MAX_LENGTH} characters
          </Rule>
          <Rule met={rules.different}>
            Different from your current password
          </Rule>
          <Rule met={rules.matches}>Both new passwords match</Rule>
          <li className="pl-6 text-[12px] text-slate-400">
            Very common passwords are not accepted.
          </li>
        </ul>

        {generalError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl bg-rose-50 px-3 py-2.5 text-[13px] text-rose-700 ring-1 ring-rose-200"
          >
            <AlertCircle
              className="mt-0.5 h-4 w-4 flex-shrink-0"
              aria-hidden="true"
            />
            <span>{generalError}</span>
          </div>
        )}

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
            disabled={saving || !canSubmit}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0089e0] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {saving && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {saving ? "Saving…" : "Save New Password"}
          </button>
        </div>
      </form>
    </ProfileModal>
  );
};

export default ChangePasswordModal;
