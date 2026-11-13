import React from "react";
import { Link } from "react-router";
import { AlertCircle, FileSearch, Lock, Plus, RotateCw } from "lucide-react";

const STATES = {
  locked: {
    icon: Lock,
    tone: "bg-blue-50 text-secondary",
    title: "Your documents are protected",
    text: "Verify your email above to see the paystubs and documents you've generated.",
  },
  loading: {
    icon: FileSearch,
    tone: "bg-blue-50 text-secondary",
    title: "Looking for your documents...",
    text: "This only takes a moment.",
  },
  none: {
    icon: FileSearch,
    tone: "bg-slate-100 text-slate-500",
    title: "No documents found",
    text: "We couldn't find any documents for this email yet. Paystubs appear here once their payment is complete.",
  },
  error: {
    icon: AlertCircle,
    tone: "bg-rose-50 text-rose-500",
    title: "Your documents couldn't be loaded",
    text: "Something went wrong while loading your documents. Please try again.",
  },
};

/** Shown in place of the documents table until there are documents to list. */
const DocumentsStatusMessage = ({ state, onRetry }) => {
  const { icon: Icon, tone, title, text } = STATES[state] ?? STATES.locked;

  return (
    <div
      role={state === "error" ? "alert" : "status"}
      className="rounded-2xl border border-dashed border-slate-200 px-6 py-12 sm:py-16 flex flex-col items-center text-center"
    >
      <div
        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${tone}`}
      >
        {state === "loading" ? (
          <span className="w-6 h-6 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
        ) : (
          <Icon className="w-6 h-6" />
        )}
      </div>
      <h2 className="mt-4 text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
        {title}
      </h2>
      <p className="mt-1.5 max-w-md text-sm text-slate-500">{text}</p>

      {state === "none" && (
        <Link
          to="/paystub-generator"
          className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-[#0089e0] text-white font-semibold text-sm transition shadow-sm hover:shadow active:scale-98 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Generate Paystub</span>
        </Link>
      )}
      {state === "error" && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition cursor-pointer"
        >
          <RotateCw className="w-4 h-4" />
          <span>Try again</span>
        </button>
      )}
    </div>
  );
};

export default DocumentsStatusMessage;
