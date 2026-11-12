import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Lock, Mail } from "lucide-react";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 30;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Spinner = () => (
  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
);

const OtpInputs = ({ value, onChange, disabled }) => {
  const inputsRef = useRef([]);
  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] ?? "");

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const focusAt = (index) => {
    inputsRef.current[Math.max(0, Math.min(OTP_LENGTH - 1, index))]?.focus();
  };

  const setDigitAt = (index, digit) => {
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(""));
  };

  const handlePasteValue = (index, pasted) => {
    const next = [...digits];
    pasted
      .slice(0, OTP_LENGTH - index)
      .split("")
      .forEach((digit, offset) => {
        next[index + offset] = digit;
      });
    onChange(next.join(""));
    focusAt(index + pasted.length);
  };

  const handleChange = (index, raw) => {
    const typed = raw.replace(/\D/g, "");
    if (!typed) return;
    if (typed.length > 1) {
      handlePasteValue(index, typed);
      return;
    }
    setDigitAt(index, typed);
    focusAt(index + 1);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        setDigitAt(index, "");
      } else {
        setDigitAt(index - 1, "");
        focusAt(index - 1);
      }
    } else if (e.key === "ArrowLeft") {
      focusAt(index - 1);
    } else if (e.key === "ArrowRight") {
      focusAt(index + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={OTP_LENGTH}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1}`}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => {
            e.preventDefault();
            const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
            if (pasted) handlePasteValue(index, pasted);
          }}
          onFocus={(e) => e.target.select()}
          className="flex-1 min-w-0 max-w-11 sm:max-w-12 h-12 sm:h-14 rounded-lg bg-[#F0F6FF] border border-blue-100 focus:border-[#1E60F2] focus:bg-white focus:ring-2 focus:ring-[#1E60F2]/10 text-center text-[18px] sm:text-[20px] font-bold text-slate-800 outline-none transition disabled:opacity-60"
        />
      ))}
    </div>
  );
};

const CheckoutSection = ({
  email,
  onEmailChange,
  totalLabel,
  isProcessingPayment,
  onPay,
  onSendCode,
  verifyLabel,
  onBack,
  backLabel = "Back to package",
  className = "max-w-xl mx-auto",
}) => {
  const [phase, setPhase] = useState("email"); // 'email' | 'otp'
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendIn, setResendIn] = useState(0);
  const [emailTouched, setEmailTouched] = useState(false);

  const isEmailValid = EMAIL_PATTERN.test(email.trim());
  const isOtpComplete = otp.replace(/\D/g, "").length === OTP_LENGTH;

  useEffect(() => {
    if (resendIn <= 0) return undefined;
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendIn]);

  // `onSendCode(email)` resolves true once the code was sent; flows without it keep the simulated delay.
  const sendCode = async (onSent) => {
    setIsSendingCode(true);
    if (onSendCode) {
      const sent = await onSendCode(email.trim());
      setIsSendingCode(false);
      if (!sent) return;
      setResendIn(RESEND_COOLDOWN_SECONDS);
      onSent?.();
      return;
    }
    setTimeout(() => {
      setIsSendingCode(false);
      setResendIn(RESEND_COOLDOWN_SECONDS);
      onSent?.();
    }, 800);
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!isEmailValid || !agreedToTerms || isSendingCode) return;
    sendCode(() => {
      setOtp("");
      setPhase("otp");
    });
  };

  const handleResend = () => {
    if (resendIn > 0 || isSendingCode) return;
    setOtp("");
    sendCode();
  };

  const handleVerifyAndPay = (e) => {
    e.preventDefault();
    if (!isOtpComplete || isProcessingPayment) return;
    onPay(otp);
  };

  return (
    <div className={`animate-in fade-in-50 duration-200 ${className}`}>
      {/* <div className="mb-4">
        <button
          type="button"
          onClick={phase === "otp" ? () => setPhase("email") : onBack}
          className="inline-flex items-center gap-1 text-[13.5px] font-semibold text-[#1E60F2] hover:underline cursor-pointer mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{phase === "otp" ? "Back to email" : backLabel}</span>
        </button>

        <p className="text-slate-500 text-[14px] mt-1">
          No account needed — we'll send your documents to your email.
        </p>
      </div> */}

      {phase === "email" && (
        <form
          onSubmit={handleSendCode}
          noValidate
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in-50 duration-200"
        >
          <div>
            <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
              STEP 1 OF 2
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Enter your email
            </h3>
            <p className="text-slate-400 text-[13px] mt-0.5">
              We&apos;ll send a {OTP_LENGTH}-digit verification code to this
              address.
            </p>
          </div>

          <div>
            <label
              htmlFor="checkout-email"
              className="block text-[13px] font-semibold text-slate-700 mb-1.5"
            >
              Email address <span className="text-rose-500">*</span>
            </label>
            <input
              id="checkout-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="Enter your email address here"
              className={`w-full px-3.5 py-2.5 rounded-lg bg-[#F0F6FF] border focus:bg-white text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition ${
                emailTouched && !isEmailValid
                  ? "border-rose-300 focus:border-rose-400"
                  : "border-blue-100 focus:border-[#1E60F2]"
              }`}
            />
            {emailTouched && !isEmailValid && (
              <p className="text-[12px] text-rose-500 mt-1">
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div
            onClick={() => setAgreedToTerms(!agreedToTerms)}
            className="flex items-center gap-2.5 cursor-pointer pt-1"
          >
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                agreedToTerms
                  ? "bg-[#1E60F2] text-white"
                  : "border border-slate-300 bg-white"
              }`}
            >
              {agreedToTerms && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
            <span className="text-[13px] text-slate-600">
              I agree to the Terms &amp; Conditions and Privacy Policy.
            </span>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSendingCode || !agreedToTerms}
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSendingCode ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Sending code...
                </span>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>Send verification code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {phase === "email" && onBack && (
        <div className="mt-5">
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel}
            className="px-5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium text-[14px] hover:bg-slate-50 transition cursor-pointer"
          >
            &lt; Back
          </button>
        </div>
      )}

      {phase === "otp" && (
        <form
          onSubmit={handleVerifyAndPay}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 animate-in fade-in-50 duration-200"
        >
          <div>
            <p className="text-[#1E60F2] font-bold text-[12px] uppercase tracking-wider mb-1">
              STEP 2 OF 2
            </p>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Enter verification code
            </h3>
            <p className="text-slate-500 text-[13px] mt-0.5">
              We sent a {OTP_LENGTH}-digit code to{" "}
              <strong className="text-slate-800 break-all">{email}</strong>.{" "}
              <button
                type="button"
                onClick={() => setPhase("email")}
                className="text-[#1E60F2] font-semibold hover:underline cursor-pointer"
              >
                Change
              </button>
            </p>
          </div>

          <OtpInputs
            value={otp}
            onChange={setOtp}
            disabled={isProcessingPayment}
          />

          <div className="flex items-center justify-between text-[13px]">
            <span className="text-slate-400">Didn&apos;t get the code?</span>
            <button
              type="button"
              onClick={handleResend}
              disabled={resendIn > 0 || isSendingCode}
              className="inline-flex items-center gap-1.5 font-semibold text-[#1E60F2] hover:underline cursor-pointer disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
            >
              <Mail className="w-4 h-4" />
              {isSendingCode
                ? "Sending..."
                : resendIn > 0
                  ? `Resend code in ${resendIn}s`
                  : "Resend code"}
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!isOtpComplete || isProcessingPayment}
              className="w-full py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white font-semibold text-[15px] shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isProcessingPayment ? (
                <span className="inline-flex items-center gap-2">
                  <Spinner />
                  Processing Payment...
                </span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>{verifyLabel ?? <>Verify &amp; pay {totalLabel} securely</>}</span>
                </>
              )}
            </button>
            <p className="text-center text-slate-400 text-[12px] mt-2.5">
              Payments processed securely by Stripe.
            </p>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutSection;
