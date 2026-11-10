import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import logoImg from "../../../assets/logo.png";
import AuthInvoicePreview from "../components/AuthInvoicePreview";
import { useAuth } from "../../../hooks/useAuth";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { PATHS } from "../../../config/paths";

const ForgotPasswordView = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      // The API answers 202 whether or not the account exists (no account enumeration).
      await forgotPassword(email.trim());
      setSubmitted(true);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to send reset instructions."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 select-none">
      <div className="hidden lg:block w-full h-full">
        <AuthInvoicePreview />
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
            to={PATHS.AUTH.login}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors group mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Sign In</span>
          </Link>

          {!submitted ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Forgot Password?
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Enter your email and we&apos;ll send reset instructions.
                </p>
              </div>

              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 group mt-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Check your inbox
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  If an account exists for{" "}
                  <span className="font-semibold text-slate-800">{email}</span>,
                  we sent a link to reset your password. The link expires soon,
                  so use it right away.
                </p>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs transition cursor-pointer"
                >
                  Didn&apos;t receive email? Try another
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Remember your password?{" "}
              <Link
                to={PATHS.AUTH.login}
                className="font-semibold text-secondary hover:underline"
              >
                Sign In
              </Link>
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

export default ForgotPasswordView;
