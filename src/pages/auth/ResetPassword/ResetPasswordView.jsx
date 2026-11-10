import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import logoImg from "../../../assets/logo.png";
import AuthPasswordIllustration from "../components/AuthPasswordIllustration";
import { useAuth } from "../../../hooks/useAuth";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { PATHS } from "../../../config/paths";

const MISSING_TOKEN_MESSAGE =
  "This reset link is invalid. Please request a new one.";

const ResetPasswordView = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const { resetPassword, user, logout } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tokenInvalid, setTokenInvalid] = useState(!token);

  const showError = (message) => toast.error(message, { id: "reset-password" });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!token) showError(MISSING_TOKEN_MESSAGE);
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      showError(MISSING_TOKEN_MESSAGE);
      return;
    }

    if (!password || !confirmPassword) {
      showError("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      showError("Password must be at least 8 characters long");
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await resetPassword({ token, password });
      // The API revoked every session, including this tab's.
      if (user) await logout().catch(() => {});
      setSuccess(true);
      toast.success("Password updated. Sign in with your new password.", { id: "reset-password" });
    } catch (err) {
      setTokenInvalid(err?.code === "RESET_TOKEN_INVALID");
      showError(getErrorMessage(err, "Unable to reset your password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 select-none">
      <div className="hidden lg:block w-full h-full">
        <AuthPasswordIllustration
          title="Almost There"
          subtitle="Choose a strong password you haven't used before"
          chips={["At least 8 characters", "Signs you out on all devices"]}
          badge="check"
        />
      </div>

      <div className="w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white min-h-screen">
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
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Sign In</span>
          </Link>

          {!success ? (
            <>
              <div className="my-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Reset Password
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Choose a strong, secure new password for your account.
                </p>
              </div>

              {tokenInvalid && (
                <p className="mb-4 text-xs text-slate-500 text-center">
                  This link can&apos;t be used.{" "}
                  <Link
                    to={PATHS.AUTH.forgotPassword}
                    className="font-semibold text-secondary hover:underline"
                  >
                    Request a new reset link
                  </Link>
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={confirmPassword}
                      onChange={(event) =>
                        setConfirmPassword(event.target.value)
                      }
                      placeholder="Repeat new password"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
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
                      <span>Update Password</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="mt-6 space-y-5 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Password updated!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Your password has been reset successfully. You can now sign in
                  with your new credentials.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to={PATHS.AUTH.login}
                  className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Sign In with New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
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

export default ResetPasswordView;
