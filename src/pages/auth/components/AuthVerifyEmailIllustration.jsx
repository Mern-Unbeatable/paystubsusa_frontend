import React from "react";
import { Link } from "react-router";
import logoImg from "../../../assets/logo.png";

const AuthVerifyEmailIllustration = () => {
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
          Check Your Inbox
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          One quick step to secure your account
        </p>
      </div>

      <svg
        viewBox="0 0 420 340"
        className="relative z-10 w-full max-w-[400px] h-auto"
        role="img"
        aria-label="Envelope with a verification code and a check mark"
      >
        <defs>
          <linearGradient id="ve-env" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="#eef5ff" />
          </linearGradient>
          <linearGradient id="ve-badge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#009bfb" />
          </linearGradient>
          <filter id="ve-shadow" x="-20%" y="-20%" width="140%" height="160%">
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

        {/* Letter card rising from envelope */}
        <g filter="url(#ve-shadow)">
          <rect x="112" y="46" width="196" height="150" rx="14" fill="#ffffff" stroke="#e2e8f0" />
        </g>
        <rect x="134" y="68" width="84" height="8" rx="4" fill="#092258" opacity="0.85" />
        <rect x="134" y="84" width="128" height="6" rx="3" fill="#cbd5e1" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i}>
            <rect
              x={134 + i * 26}
              y="104"
              width="22"
              height="28"
              rx="6"
              fill={i < 4 ? "#eff6ff" : "#f8fafc"}
              stroke={i < 4 ? "#009bfb" : "#e2e8f0"}
              strokeWidth="1.5"
            />
            {i < 4 && <circle cx={145 + i * 26} cy="118" r="3.5" fill="#092258" />}
          </g>
        ))}

        {/* Envelope */}
        <g filter="url(#ve-shadow)">
          <path d="M80 150 L210 236 L340 150 V286 a12 12 0 0 1 -12 12 H92 a12 12 0 0 1 -12 -12z" fill="url(#ve-env)" stroke="#dbe3ee" />
        </g>
        <path d="M80 150 L210 236 L340 150" fill="none" stroke="#c7d6ea" strokeWidth="2" />
        <path d="M84 296 L180 216 M336 296 L240 216" stroke="#dbe3ee" strokeWidth="2" fill="none" />
        {/* Check badge */}
        <g filter="url(#ve-shadow)">
          <circle cx="318" cy="246" r="34" fill="url(#ve-badge)" />
        </g>
        <circle cx="318" cy="246" r="34" fill="none" stroke="#ffffff" strokeWidth="4" />
        <path d="M303 246 l10 10 20 -21" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-2 text-[11px] font-medium text-slate-500">
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">6-digit code</span>
        <span className="rounded-full bg-white px-3 py-1 ring-1 ring-slate-200">Expires in 10 minutes</span>
      </div>
    </div>
  );
};

export default AuthVerifyEmailIllustration;
