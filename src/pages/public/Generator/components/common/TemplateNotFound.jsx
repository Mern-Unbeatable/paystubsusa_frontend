import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PATHS } from "../../../../../config/paths";

const TemplateNotFound = ({ templateSlug }) => (
  <div className="w-full min-h-[60vh] bg-[#F4F7FB] flex items-center justify-center px-4 py-16">
    <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] text-center">
      <h1 className="text-2xl font-bold text-[#092258]">Template not found</h1>
      <p className="text-slate-500 text-[14px] mt-2">
        We couldn&apos;t find the template &ldquo;{templateSlug}&rdquo;. Please
        choose one of the available templates to continue.
      </p>
      <Link
        to={PATHS.PUBLIC.paystubGenerator}
        className="mt-6 inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#1E60F2] text-white font-semibold text-[14px] shadow-sm hover:bg-[#1550cf] transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Choose a template</span>
      </Link>
    </div>
  </div>
);

export default TemplateNotFound;
