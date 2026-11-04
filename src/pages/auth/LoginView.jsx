import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import logoImg from "../../assets/logo.png";

const AuthInvoicePreview = lazy(() =>
  import("../../Components/Auth/AuthInvoicePreview")
);

const LoginView = () => {
  const navigate = useNavigate();
  const { login, loginAs, loading, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formError, setFormError] = useState("");

  const errorMessage = formError || authError?.message || "";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDemoLogin = async (role) => {
    setFormError("");

    const targetRole = role === "admin" ? "admin" : "customer";

    if (role === "admin") {
      setEmail("admin@demo.test");
      setPassword("admin123");
    } else {
      setEmail("customer@demo.test");
      setPassword("password123");
    }

    try {
      const result = await loginAs(targetRole);
      const nextRole = result?.user?.role === "admin" ? "admin" : "customer";
      navigate(nextRole === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      setFormError(error?.message || "Unable to log in with demo account.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!email || !password) {
      setFormError("Please enter your email and password");
      return;
    }

    try {
      const result = await login({ email, password, rememberMe });
      const nextRole = result?.user?.role === "admin" ? "admin" : "customer";
      navigate(nextRole === "admin" ? "/admin" : "/dashboard");
    } catch (error) {
      setFormError(error?.message || "Unable to sign in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 select-none">
      {/* Left Column: Interactive Invoice Preview Showcase (50% width) */}
      <div className="hidden lg:block w-full h-full">
        <Suspense
          fallback={
            <div className="w-full h-full min-h-screen bg-slate-100 animate-pulse" />
          }
        >
          <AuthInvoicePreview />
        </Suspense>
      </div>

      {/* Right Column: Clean Authentication Form (50% width) */}
      <div className="w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white min-h-screen">
        {/* Top Header / Back Button */}
        <div className="w-full flex items-center justify-end">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Form Body Container */}
        <div className="w-full max-w-sm mx-auto my-auto py-8">
          {/* Logo */}
          <div className="mb-6">
            <Link to="/" className="inline-block">
              <img
                src={logoImg}
                alt="Logo"
                className="h-10 w-auto object-contain"
                loading="eager"
                decoding="async"
              />
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your email and password to access your account.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Password reset link sent to your email.");
                  }}
                  className="text-xs font-medium text-secondary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
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

            {/* Remember Me */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-secondary border-slate-300 focus:ring-secondary cursor-pointer"
                />
                <span className="text-xs text-slate-600 font-medium">
                  Remember me on this device
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
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login Bar */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Fast Demo Login
              </span>
              <span className="text-[10.5px] text-slate-400">
                1-click access
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleDemoLogin("customer")}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-sky-50/60 border border-slate-200/90 hover:border-[#009BFB]/40 text-slate-700 hover:text-[#009BFB] font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs group"
              >
                <User className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#009BFB] transition-colors" />
                <span>Customer Demo</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin("admin")}
                disabled={loading}
                className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200/90 hover:border-purple-300 text-slate-700 hover:text-purple-600 font-semibold text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs group"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 transition-colors" />
                <span>Admin Demo</span>
              </button>
            </div>
          </div>

          {/* Switch to Register */}
          <div className="mt-5 text-center text-xs text-slate-500">
            <span>Don't have an account? </span>
            <Link
              to="/register"
              className="font-semibold text-secondary hover:underline"
            >
              Create an account
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

export default LoginView;
