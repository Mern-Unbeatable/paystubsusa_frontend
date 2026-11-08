import React, { useState } from "react";
import { Lock, ZoomIn, ZoomOut } from "lucide-react";
import W2FormDocument from "./W2FormDocument";

const MIN_ZOOM = 70;
const MAX_ZOOM = 120;
const ZOOM_STEP = 10;

/** Live preview card with zoom controls around the rendered W-2. */
const W2LivePreview = ({ formData }) => {
  const [zoomLevel, setZoomLevel] = useState(90);

  const handleZoom = (delta) =>
    setZoomLevel((prev) => Math.min(Math.max(prev + delta, MIN_ZOOM), MAX_ZOOM));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Header: Live Preview Status & Zoom Controls */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-800 text-[14px]">
            Live preview
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-slate-600">
          <button
            type="button"
            onClick={() => handleZoom(-ZOOM_STEP)}
            disabled={zoomLevel <= MIN_ZOOM}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4 stroke-[2]" />
          </button>
          <span className="text-[13px] font-medium text-slate-700 min-w-[36px] text-center">
            {zoomLevel}%
          </span>
          <button
            type="button"
            onClick={() => handleZoom(ZOOM_STEP)}
            disabled={zoomLevel >= MAX_ZOOM}
            className="p-1 rounded hover:bg-slate-100 disabled:opacity-40 transition cursor-pointer"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>

      {/* Inner Preview Canvas (#F1F9FF matching Figma) */}
      <div className="p-4 sm:p-5 bg-[#F1F9FF] flex items-center justify-center overflow-x-auto min-h-[360px]">
        <div
          className="transition-transform duration-200 origin-top shadow-md bg-white border border-slate-300 w-full max-w-[480px]"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <W2FormDocument formData={formData} />
        </div>
      </div>

      {/* Bottom Security Callout matching Figma */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center justify-center gap-2 bg-white text-slate-500 text-[13px]">
        <Lock className="w-3.5 h-3.5 text-slate-400 stroke-[2]" />
        <span>Your information is encrypted and securely processed.</span>
      </div>
    </div>
  );
};

export default W2LivePreview;
