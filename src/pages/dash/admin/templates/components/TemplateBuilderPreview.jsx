import React, { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import TemplatePagePreview from "../../../../public/Generator/components/common/TemplatePagePreview";
import { PaystubThumbnail } from "../../../../public/Generator/components/common/PaystubThumbnail";
import { toThumbnailTemplate } from "../utils/templateFormat";

const DEVICES = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

/**
 * Renders unsaved form values with the same components customers see: the A4 document
 * page (desktop) or the generator's template card at phone width (mobile).
 */
const TemplateBuilderPreview = ({ template }) => {
  const [device, setDevice] = useState("desktop");
  const rendered = toThumbnailTemplate(template);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
        <p className="text-sm font-semibold text-slate-800">Live preview</p>
        <div
          role="group"
          aria-label="Preview size"
          className="inline-flex rounded-xl bg-slate-100 p-1"
        >
          {DEVICES.map(({ id, label, icon }) => {
            const DeviceIcon = icon;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setDevice(id)}
                aria-pressed={device === id}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                  device === id
                    ? "bg-white text-secondary shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <DeviceIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center bg-slate-100/70 p-4 sm:p-6">
        {device === "desktop" ? (
          <TemplatePagePreview
            template={rendered}
            className="max-w-[680px] shadow-sm"
          />
        ) : (
          <div className="w-[320px] max-w-full rounded-[1.75rem] border-[6px] border-slate-800 bg-[#F0F5FA] p-3 shadow-lg">
            <div
              className="mx-auto mb-3 h-1 w-12 rounded-full bg-slate-300"
              aria-hidden="true"
            />
            <div className="rounded-xl bg-white p-2.5">
              <PaystubThumbnail template={rendered} full />
              <p className="mt-2 truncate text-sm font-bold text-[#092258]">
                {template.title}
              </p>
              {template.subtitle && (
                <p className="truncate text-xs text-slate-500">
                  {template.subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateBuilderPreview;
