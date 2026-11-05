import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import logoImg from '../../../assets/logo.png';
import AuthInvoicePreview from '../../../Components/Auth/AuthInvoicePreview';

const ResetPasswordView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-white grid grid-cols-1 lg:grid-cols-2 select-none">
      {/* Left Column: Interactive Invoice Preview Showcase (50% width) */}
      <div className="hidden lg:block w-full h-full">
        <AuthInvoicePreview />
      </div>

      {/* Right Column: Authentication Form (50% width) */}
      <div className="w-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 bg-white min-h-screen">
        {/* Top Header / Back Button */}
        <div className="w-full flex items-center justify-end">
          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-800 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Sign In</span>
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
              />
            </Link>
          </div>

          {!success ? (
            <>
              {/* Heading */}
              <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Reset Password
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {emailParam ? (
                    <>
                      Create a new password for{' '}
                      <span className="font-semibold text-slate-800">{emailParam}</span>.
                    </>
                  ) : (
                    'Choose a strong, secure new password for your account.'
                  )}
                </p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 text-center">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* New Password Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
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
            /* Success State */
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Password updated!
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
                  Your password has been reset successfully. You can now use your new credentials to sign in.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/login"
                  className="w-full py-3 px-4 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 flex items-center justify-center gap-2"
                >
                  <span>Sign In with New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Remember your password?{' '}
              <Link to="/login" className="font-semibold text-secondary hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Footer / Copyright */}
        <div className="w-full text-center">
          <p className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Paystubs. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordView;

