import React from "react";
import { Link } from "react-router";
import logoImg from "../../../assets/logo.png";

const AuthForgotPasswordIllustration = () => {
  return (
    <div className="w-full h-full min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100/60 p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-center relative overflow-hidden select-none border-r border-slate-200/60">
      <div
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-sky-100/50 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 text-center mb-8 max-w-sm">
        <Link to="/" className="inline-block mb-4">
          <img
            src={logoImg}
            alt="Logo"
            className="h-10 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
        </Link>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
          Locked Out? No Problem.
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          We'll email you a secure link to set a new one
        </p>
      </div>

      <svg
        viewBox="0 0 420 340"
        className="relative z-10 w-full max-w-[400px] h-auto"
        role="img"
        aria-label="Padlock in front of a password reset email, with a key"
      >
        <defs>
          <linearGradient id="fp-lock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#eef5ff" />
          </linearGradient>
          <linearGradient id="fp-badge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#009bfb" />
          </linearGradient>
          <filter id="fp-shadow" x="-20%" y="-20%" width="140%" height="160%">
            <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#0f172a" floodOpacity="0.10" />
          </filter>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="210" cy="312" rx="150" ry="12" fill="#cbd5e1" opacity="0.45" />

        {/* Decorative dots & sparkles */}
        <circle cx="52" cy="78" r="5" fill="#93c5fd" />
        <circle cx="372" cy="62" r="4" fill="#009bfb" opacity="0.6" />
        <circle cx="384" cy="232" r="6" fill="#bfdbfe" />
        <circle cx="36" cy="232" r="3.5" fill="#009bfb" opacity="0.5" />
        <path d="M86 40 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z" fill="#009bfb" opacity="0.55" />
        <path d="M338 130 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3z" fill="#60a5fa" opacity="0.7" />

        {/* Reset email card behind the lock */}
        <g filter="url(#fp-shadow)">
          <rect x="70" y="58" width="280" height="120" rx="14" fill="#ffffff" stroke="#e2e8f0" />
        </g>
        <rect x="92" y="78" width="70" height="8" rx="4" fill="#092258" opacity="0.85" />
        <rect x="92" y="94" width="120" height="6" rx="3" fill="#cbd5e1" />
        <rect x="92" y="108" width="96" height="6" rx="3" fill="#e2e8f0" />
        <rect x="248" y="78" width="80" height="24" rx="12" fill="#009bfb" />
        <rect x="262" y="88" width="52" height="4" rx="2" fill="#ffffff" />

        {/* Masked password field */}
        <rect x="92" y="128" width="236" height="30" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <circle key={i} cx={110 + i * 16} cy="143" r="4" fill="#092258" opacity="0.75" />
        ))}

        {/* Padlock */}
        <path
          d="M174 196 v-26 a36 36 0 0 1 72 0 v26"
          fill="none"
          stroke="#092258"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <g filter="url(#fp-shadow)">
          <rect x="146" y="190" width="128" height="104" rx="18" fill="url(#fp-lock)" stroke="#dbe3ee" />
        </g>
        <circle cx="210" cy="234" r="12" fill="#092258" />
        <rect x="205" y="240" width="10" height="26" rx="5" fill="#092258" />

        {/* Key badge */}
        <g filter="url(#fp-shadow)">
          <circle cx="318" cy="246" r="34" fill="url(#fp-badge)" />
        </g>
        <circle cx="318" cy="246" r="34" fill="none" stroke="#ffffff" strokeWidth="4" />
        <circle cx="306" cy="246" r="9" fill="none" stroke="#ffffff" strokeWidth="5" />
        <path
          d="M315 246 h20 m-6 0 v8 m-7 -8 v6"
          fill="none"
          stroke="#ffffff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-2 text-[11px] font-medium text-slate-500">
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">Secure reset link</span>
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">Valid for 30 minutes</span>
      </div>
    </div>
  );
};

export default AuthForgotPasswordIllustration;
