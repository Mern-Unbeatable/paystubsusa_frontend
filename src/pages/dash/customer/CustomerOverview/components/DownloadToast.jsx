import React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

const DownloadToast = ({ message, tone = "success" }) => {
  if (!message) {
    return null;
  }

  const isError = tone === "error";
  const Icon = isError ? AlertCircle : CheckCircle2;

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`fixed top-5 right-5 z-50 text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200 ${
        isError ? "bg-rose-600" : "bg-emerald-600"
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{message}</span>
    </div>
  );
};

export default DownloadToast;
