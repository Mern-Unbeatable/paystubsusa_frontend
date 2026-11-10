import React, { useState } from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";
import toast from "react-hot-toast";
import logoImg from "../../../assets/logo.png";
import AuthPasswordIllustration from "../components/AuthPasswordIllustration";
import { useAuth } from "../../../hooks/useAuth";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { PATHS } from "../../../config/paths";

const ForgotPasswordView = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error("Please enter your email address", { id: "forgot-password" });
      return;
    }

    setLoading(true);
    try {
      // The API answers 202 whether or not the account exists (no account enumeration).
      await forgotPassword(email.trim());
      setSubmitted(true);
      toast.success("Reset link sent. Check your inbox.", { id: "forgot-password" });
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to send reset instructions."), { id: "forgot-password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 select-none">
      <div className="hidden lg:block w-full h-full">
        <AuthPasswordIllustration
          title="Locked Out? No Problem."
          subtitle="We'll email you a secure link to set a new one"
          chips={["Secure reset link", "Valid for 30 minutes"]}
        />
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
              <div>
                <h2 className="text-2xl text-center font-extrabold text-slate-900 tracking-tight">
                  Check your inbox
                </h2>

                {/* Trust hint */}
                <div className="mt-8 flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-slate-700">
                      We sent a link to reset your password this
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5 leading-relaxed">
                      <span className="font-semibold text-secondary">
                        {email}
                      </span>{" "}
                      address.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm text-red-600 mt-0.5 leading-relaxed">
                      The link expires soon, so use it right away.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full py-2.5 px-4 bg-secondary hover:bg-[#0089e0] text-white rounded-xl border border-slate-200  font-semibold text-xs transition cursor-pointer"
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
