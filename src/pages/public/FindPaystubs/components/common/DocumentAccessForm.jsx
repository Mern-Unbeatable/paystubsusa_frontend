import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import findPaystubsIllustration from "../../../../../assets/find-paystubs-illustration.png";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition disabled:bg-slate-50 disabled:cursor-not-allowed";
const linkClass =
  "text-xs font-semibold text-secondary hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

const LOOKUP_MESSAGES = {
  loading: "Looking for your documents...",
  none: "We couldn't find any documents for this email yet.",
  error: "Your documents couldn't be loaded.",
};

/**
 * Guest access: email → emailed code → verified. `onSendCode`/`onVerify` resolve true on success.
 * `lookupState` ("loading" | "none" | "error") explains why the documents table isn't shown yet.
 */
const DocumentAccessForm = ({ verifiedEmail, codeSent, pending, onSendCode, onVerify, onReset, lookupState, onRetry }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const busy = Boolean(pending);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!codeSent) {
      await onSendCode(email.trim());
      return;
    }
    if (await onVerify(code)) setCode("");
  };

  const handleReset = () => {
    setCode("");
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h1>

        {verifiedEmail ? (
          <div className="mt-5 flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-semibold text-emerald-800">Email verified</p>
              <p className="text-[13px] text-emerald-700 break-all">
                {lookupState ? "Verified as" : "Showing documents for"} <strong>{verifiedEmail}</strong>.
              </p>
              {lookupState && (
                <p className={`mt-1.5 text-[13px] ${lookupState === "error" ? "text-rose-600" : "text-slate-600"}`}>
                  {LOOKUP_MESSAGES[lookupState]}
                  {lookupState === "error" && (
                    <button type="button" onClick={onRetry} className={`${linkClass} ml-2`}>
                      Try again
                    </button>
                  )}
                </p>
              )}
            </div>
            <button type="button" onClick={handleReset} className={`${linkClass} whitespace-nowrap`}>
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mt-1.5 mb-6">
              Enter the email address you used when creating your documents. We&apos;ll send you a verification
              code to access them.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="find-email" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  id="find-email"
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  value={email}
                  disabled={codeSent || busy}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="find-code" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Verification Code
                </label>
                <input
                  id="find-code"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="\d{6}"
                  maxLength={6}
                  required={codeSent}
                  value={code}
                  disabled={!codeSent || busy}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="0 0 0 0 0 0"
                  className={`${inputClass} tracking-widest font-mono`}
                />
                {codeSent && (
                  <div className="mt-2 flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">Code sent. It expires in 10 minutes.</span>
                    <span className="flex items-center gap-3">
                      <button type="button" onClick={() => onSendCode(email.trim())} disabled={busy} className={linkClass}>
                        Resend code
                      </button>
                      <button type="button" onClick={handleReset} disabled={busy} className={linkClass}>
                        Change email
                      </button>
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>
                    {pending === "send" ? "Sending code..." : pending === "verify" ? "Verifying..." : codeSent ? "Continue" : "Send code"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <div className="hidden lg:flex items-center justify-center">
        <img
          src={findPaystubsIllustration}
          alt="Person on a laptop accessing secure paystub documents by email"
          className="w-full max-w-md h-auto select-none"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default DocumentAccessForm;
