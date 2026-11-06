import React from "react";
import { CheckCircle2 } from "lucide-react";

const DownloadToast = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded shadow-lg flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-200">
      <CheckCircle2 className="w-4 h-4" />
      <span>{message}</span>
    </div>
  );
};

export default DownloadToast;
