import React from "react";
import { Link } from "react-router";
import logoImg from "../../../assets/logo.png";
import illustration from "../../../assets/find-paystubs-illustration.png";

/** Left-hand panel of the auth pages (desktop only). */
const AuthIllustrationPanel = ({ title }) => (
  <div className="hidden lg:flex w-full h-full min-h-screen bg-gradient-to-b from-slate-50 via-sky-50/40 to-slate-100/60 p-8 lg:p-14 flex-col justify-center items-center relative overflow-hidden border-r border-slate-200/60">
    <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />

    <div className="relative z-10 text-center mb-8 max-w-sm">
      <Link to="/" className="mb-4 block mx-auto w-fit">
        <img
          src={logoImg}
          alt="Logo"
          className="h-10 w-auto object-contain"
          loading="eager"
          decoding="async"
        />
      </Link>
      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
    </div>
    <img
      src={illustration}
      alt=""
      className="relative z-10 w-full max-w-md h-auto object-contain mix-blend-multiply"
      loading="eager"
      decoding="async"
    />
  </div>
);

export default AuthIllustrationPanel;
