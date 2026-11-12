import React from "react";
import { Link } from "react-router";
import { PATHS } from "../../../config/paths";

/** Shared frame for the legal pages: header, one centered card, contact footer. */
const PublicDocPage = ({ eyebrow, title, updated, intro, children }) => (
  <div className="min-h-screen bg-[#FBFBFA] py-16 sm:py-24">
    <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="space-y-4 mb-10">
          <span className="text-xs font-bold text-[#009BFB] tracking-widest uppercase block">{eyebrow}</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">{title}</h1>
          {updated && <p className="text-sm text-slate-500">Last updated {updated}</p>}
          {intro && <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{intro}</p>}
        </header>

        <article className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-10">{children}</article>

        <p className="mt-8 text-sm text-slate-500 text-center">
          Still have questions?{" "}
          <Link to={PATHS.PUBLIC.contact} className="font-semibold text-[#009BFB] hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </div>
  </div>
);

export default PublicDocPage;
