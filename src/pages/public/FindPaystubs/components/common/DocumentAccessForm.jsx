import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import findPaystubsIllustration from "../../../../../assets/find-paystubs-illustration.png";

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition disabled:bg-slate-50 disabled:cursor-not-allowed";
const linkClass =
  "text-xs font-semibold text-secondary hover:underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

/**
 * Guest access: email → emailed code → verified. `onSendCode`/`onVerify` resolve true on success.
 * `defaultEmail` restores the last email entered in this browser session.
 */
const DocumentAccessForm = ({
  verifiedEmail,
  defaultEmail = "",
  codeSent,
  pending,
  onSendCode,
  onVerify,
  onReset,
}) => {
  const [email, setEmail] = useState(defaultEmail);
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
    setEmail("");
    setCode("");
    onReset();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="max-w-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome Back
        </h1>

        {verifiedEmail ? (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 shadow-sm animate-in fade-in slide-in-from-top-1 duration-300">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-bold text-emerald-900 leading-tight">
                  Email successfully verified
                </p>
                <p className="text-[13px] text-emerald-700 mt-1 break-all leading-snug">
                  Verified as{" "}
                  <strong className="font-semibold text-emerald-900">
                    {verifiedEmail}
                  </strong>
                  .
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="flex-shrink-0 self-start sm:self-auto px-4 py-2 text-[13px] font-semibold text-emerald-700 bg-white border border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-500 mt-1.5 mb-6">
              Enter the email address you used when creating your documents.
              We&apos;ll send you a verification code to access them.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="find-email"
                  className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                >
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

              {codeSent && (
                <div className="animate-in fade-in slide-in-from-top-1 duration-200">
                  <label
                    htmlFor="find-code"
                    className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5"
                  >
                    Verification Code
                  </label>
                  <input
                    id="find-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{6}"
                    maxLength={6}
                    required
                    autoFocus
                    value={code}
                    disabled={busy}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="0 0 0 0 0 0"
                    className={`${inputClass} tracking-widest font-mono`}
                  />
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                    <span className="text-xs text-slate-500">
                      Code sent. It expires in 10 minutes.
                    </span>
                    <span className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onSendCode(email.trim())}
                        disabled={busy}
                        className={linkClass}
                      >
                        Resend code
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        disabled={busy}
                        className={linkClass}
                      >
                        Change email
                      </button>
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span>
                    {pending === "send"
                      ? "Sending code..."
                      : pending === "verify"
                        ? "Verifying..."
                        : codeSent
                          ? "Continue"
                          : "Send code"}
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
