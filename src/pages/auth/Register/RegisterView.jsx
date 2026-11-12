import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, Eye, EyeOff, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth";
import logoImg from "../../../assets/logo.png";
import AuthIllustrationPanel from "../components/AuthIllustrationPanel";
import { getErrorMessage } from "../../../api/errorNormalizer";
import { PATHS } from "../../../config/paths";

const RegisterView = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const submittingRef = useRef(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const showError = (message) => toast.error(message, { id: "register" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      showError("Please enter your full name");
      return;
    }

    if (password.length < 8) {
      showError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    if (!agreed) {
      showError("Please accept the Terms & Conditions");
      return;
    }

    // The disabled button only applies after a re-render; this blocks a fast double click.
    if (submittingRef.current) return;
    submittingRef.current = true;

    try {
      await register({ name: fullName.trim(), email, password });
      // Replace: going Back must not land on a guest-only page that would bounce forward again.
      // flushSync: the store update has already swapped this page for RequireGuest's empty
      // <Navigate>; a transition-scheduled route change would let that blank frame paint.
      navigate(PATHS.AUTH.verifyEmail, { replace: true, flushSync: true });
      toast.success(
        "Account created. Check your email for a verification code.",
        {
          id: "register-success",
        },
      );
    } catch (error) {
      showError(getErrorMessage(error, "Unable to create your account."));
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 select-none">
      {/* Left Column: Illustration (desktop only) */}
      <AuthIllustrationPanel title="Your paystubs, secured" />

      {/* Right Column: Clean Registration Form (50% width) */}
      <div className="w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white min-h-screen">
        {/* Top Header: Logo + Back Button */}
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

        {/* Form Body Container */}
        <div className="w-full max-w-sm mx-auto my-auto py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
          {/* Heading */}
          <div className="my-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Start creating and sending professional invoices in seconds.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
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

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Confirm Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
              />
            </div>

            {/* Terms Agreement */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I agree to the{" "}
                  <a
                    href={PATHS.PUBLIC.terms}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-secondary hover:underline"
                  >
                    Terms &amp; Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href={PATHS.PUBLIC.privacy}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-secondary hover:underline"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 group"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-5 text-center text-xs text-slate-500">
            <span>Already have an account? </span>
            <Link
              to={PATHS.AUTH.login}
              className="font-semibold text-secondary hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-slate-400 py-2">
          © {new Date().getFullYear()} Paystuba. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default RegisterView;
