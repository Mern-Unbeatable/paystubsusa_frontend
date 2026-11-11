import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { AlertCircle, Clock, MailCheck, RefreshCw } from "lucide-react";
import ProfileModal from "../../../../../Components/modal/ProfileModal";
import { useAuth } from "../../../../../hooks/useAuth";
import {
  describeRequestError,
  maskEmail,
  secondsUntil,
} from "../utils/profileFormat";

const CODE_LENGTH = 6;
// Used only when the API answers RESEND_COOLDOWN without a retry time.
const FALLBACK_COOLDOWN_SECONDS = 30;

const VerifyEmailModal = ({ open, onClose, email }) => {
  const { verifyEmail, resendVerification, reloadUser } = useAuth();
  const [code, setCode] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState(null);
  // State updates land after the next render; a ref stops same-tick double submits.
  const inFlightRef = useRef(false);

  useEffect(() => {
    if (open) {
      setCode("");
      setError(null);
    }
  }, [open]);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const busy = verifying || resending;

  const finishAlreadyVerified = async () => {
    await reloadUser().catch(() => {});
    toast.success("Your email is already verified.", { id: "email-verified" });
    onClose();
  };

  const handleVerify = async (event) => {
    event.preventDefault();
    if (inFlightRef.current) return;
    if (code.length !== CODE_LENGTH) {
      setError({
        kind: "invalid",
        message: `Enter the ${CODE_LENGTH}-digit code from your email.`,
      });
      return;
    }

    inFlightRef.current = true;
    setVerifying(true);
    setError(null);
    try {
      await verifyEmail(code);
      toast.success("Email verified successfully.", { id: "email-verified" });
      onClose();
    } catch (err) {
      if (err?.code === "EMAIL_ALREADY_VERIFIED") {
        await finishAlreadyVerified();
      } else if (err?.code === "CODE_EXPIRED") {
        setError({
          kind: "expired",
          message: "This code has expired. Request a new code below.",
        });
      } else if (err?.code === "CHALLENGE_LOCKED") {
        setError({
          kind: "expired",
          message: "Too many incorrect attempts. Request a new code below.",
        });
      } else {
        setError({
          kind: "invalid",
          message: describeRequestError(err, "We couldn't verify that code."),
        });
      }
    } finally {
      inFlightRef.current = false;
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    if (inFlightRef.current || cooldown > 0) return;
    inFlightRef.current = true;
    setResending(true);
    try {
      const availableAt = await resendVerification();
      setCooldown(
        availableAt ? secondsUntil(availableAt) : FALLBACK_COOLDOWN_SECONDS,
      );
      setCode("");
      setError(null);
      toast.success("A new code is on its way.", { id: "verification-resent" });
    } catch (err) {
      if (err?.code === "EMAIL_ALREADY_VERIFIED") {
        await finishAlreadyVerified();
        return;
      }
      if (err?.code === "RESEND_COOLDOWN")
        setCooldown(FALLBACK_COOLDOWN_SECONDS);
      setError({
        kind: "error",
        message: describeRequestError(err, "We couldn't send a new code."),
      });
    } finally {
      inFlightRef.current = false;
      setResending(false);
    }
  };

  const errorId = "verify-email-error";

  return (
    <ProfileModal
      open={open}
      onClose={onClose}
      dismissible={!busy}
      icon={MailCheck}
      title="Verify Your Email Address"
      description={
        <>
          Enter the {CODE_LENGTH}-digit verification code we emailed to{" "}
          <span className="font-semibold text-slate-700">
            {maskEmail(email)}
          </span>
          .
        </>
      }
    >
      <form onSubmit={handleVerify} noValidate className="space-y-4">
        <div>
          <label
            htmlFor="profile-verification-code"
            className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600"
          >
            Verification code
          </label>
          <input
            id="profile-verification-code"
            data-autofocus
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={CODE_LENGTH}
            value={code}
            disabled={verifying}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => {
              setCode(
                event.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH),
              );
              if (error?.kind === "invalid") setError(null);
            }}
            placeholder={"0".repeat(CODE_LENGTH)}
            className={`w-full rounded-xl border px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] text-slate-800 placeholder:text-slate-200 transition focus:outline-none focus:ring-2 disabled:bg-slate-50 ${
              error
                ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                : "border-slate-200 focus:border-secondary focus:ring-secondary/20"
            }`}
          />
        </div>

        {error && (
          <div
            id={errorId}
            role="alert"
            className={`flex items-start gap-2 rounded-xl px-3 py-2.5 text-[13px] ${
              error.kind === "expired"
                ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
            }`}
          >
            {error.kind === "expired" ? (
              <Clock
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              />
            ) : (
              <AlertCircle
                className="mt-0.5 h-4 w-4 flex-shrink-0"
                aria-hidden="true"
              />
            )}
            <span>{error.message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={busy || code.length !== CODE_LENGTH}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0089e0] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
        >
          {verifying ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Verifying…</span>
            </>
          ) : (
            "Verify Email"
          )}
        </button>
      </form>

      <div className="mt-5 flex flex-col items-center gap-1 border-t border-slate-100 pt-4 text-center">
        <p className="text-[13px] text-slate-500">
          Didn&apos;t get a code, or did it expire?
        </p>
        <button
          type="button"
          onClick={handleResend}
          disabled={busy || cooldown > 0}
          aria-live="polite"
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-[13px] font-semibold text-secondary transition hover:underline disabled:cursor-not-allowed disabled:text-slate-400 disabled:no-underline cursor-pointer"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${resending ? "animate-spin" : ""}`}
            aria-hidden="true"
          />
          {resending
            ? "Sending…"
            : cooldown > 0
              ? `Resend code in ${cooldown}s`
              : "Resend code"}
        </button>
        <p className="mt-1 text-[12px] text-slate-400">
          Requesting a new code makes earlier codes invalid.
        </p>
      </div>
    </ProfileModal>
  );
};

export default VerifyEmailModal;
