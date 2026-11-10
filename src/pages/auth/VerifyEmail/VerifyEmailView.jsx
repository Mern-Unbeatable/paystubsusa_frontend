import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router";
import { ArrowLeft, ArrowRight, MailCheck } from "lucide-react";
import toast from "react-hot-toast";
import logoImg from "../../../assets/logo.png";
import AuthVerifyEmailIllustration from "../components/AuthVerifyEmailIllustration";
import { useAuth } from "../../../hooks/useAuth";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { PATHS } from "../../../config/paths";
import { CheckCircle2 } from "lucide-react";

const RESEND_COOLDOWN_SECONDS = 30;

const VerifyEmailView = () => {
  const { user, verifyEmail, resendVerification } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const dashboard =
    user?.role === "admin" ? PATHS.ADMIN.dashboard : PATHS.CUSTOMER.dashboard;

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (user?.emailVerified) {
    return <Navigate to={dashboard} replace />;
  }

  const showError = (message) => toast.error(message, { id: "verify-email" });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!/^\d{6}$/.test(code)) {
      showError("Enter the 6-digit code from your email");
      return;
    }

    setLoading(true);
    try {
      await verifyEmail(code);
      toast.success("Email verified!", { id: "email-verified" });
    } catch (err) {
      showError(getErrorMessage(err, "Unable to verify your email."));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerification();
      setCode("");
      setCooldown(RESEND_COOLDOWN_SECONDS);
      toast.success("A new code is on its way.", { id: "verification-resent" });
    } catch (err) {
      if (err?.code === "RESEND_COOLDOWN") setCooldown(RESEND_COOLDOWN_SECONDS);
      showError(getErrorMessage(err, "Unable to send a new code."));
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 select-none">
      <div className="hidden lg:block w-full h-full">
        <AuthVerifyEmailIllustration />
      </div>

      <div className="w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white min-h-screen">
        {/* Top Header: Logo (mobile only; desktop shows it in the left panel) */}
        <div className="w-full flex items-center justify-between lg:justify-end">
          <Link to="/" className="inline-block lg:hidden">
            <img
              src={logoImg}
              alt="Logo"
              className="h-10 w-auto object-contain"
              loading="eager"
              decoding="async"
            />
          </Link>
        </div>

        <div className="w-full max-w-sm mx-auto my-auto py-6">
          <Link
            to={dashboard}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors group mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Skip for now</span>
          </Link>
          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Verify Your Email
            </h1>

            {/* Trust hint */}
            <div className="mt-8 flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <MailCheck className="w-12 h-12 text-secondary" />
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We sent a 6-digit code to your email address{" "}
                <span className="font-semibold text-secondary">
                  {user?.email}
                </span>
                . You need a verified email to place orders.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Verification Code
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
                value={code}
                onChange={(event) =>
                  setCode(event.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="123456"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-lg tracking-[0.5em] text-center text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Verify Email</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Didn&apos;t get the code?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resending || cooldown > 0}
                className="font-semibold text-secondary hover:underline cursor-pointer disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
              </button>
            </p>
          </div>
        </div>

        <div className="w-full text-center">
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Paystuba. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailView;
