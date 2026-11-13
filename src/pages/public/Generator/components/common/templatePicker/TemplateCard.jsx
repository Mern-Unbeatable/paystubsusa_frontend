import React from "react";
import { Check, Eye } from "lucide-react";
import { PaystubThumbnail } from "../preview/PaystubThumbnail";

/**
 * Selectable template card shared by the template page grid and the
 * template selection modal. `onPreview` / `showSelectButton` are optional.
 */
const TemplateCard = ({
  template,
  isSelected,
  onSelect,
  onPreview,
  showSelectButton = true,
  className = "",
}) => (
  <div
    role="radio"
    aria-checked={isSelected}
    tabIndex={0}
    onClick={() => onSelect(template.id)}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(template.id);
      }
    }}
    className={`group relative bg-white rounded-xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#1E60F2]/40 ${
      isSelected
        ? "border-2 border-[#1E60F2] shadow-[0_4px_16px_rgba(30,96,242,0.12)]"
        : "border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md"
    } ${className}`}
  >
    {isSelected && (
      <div
        className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-[#1E60F2] text-white flex items-center justify-center shadow-md z-20 animate-in zoom-in-50 duration-200"
        aria-label="Selected Template"
      >
        <Check className="w-3.5 h-3.5 stroke-[3]" />
      </div>
    )}

    <div className="w-full mb-3.5 overflow-hidden">
      <PaystubThumbnail template={template} />
    </div>

    <div>
      <div
        className={`flex items-center justify-between ${showSelectButton ? "mb-3" : ""}`}
      >
        <div>
          <h3 className="font-bold text-[#111827] text-[15px] leading-tight">
            {template.title}
          </h3>
          <p className="text-slate-400 text-[13px] font-normal mt-0.5">
            {template.subtitle}
          </p>
        </div>

        {onPreview && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template);
            }}
            className="inline-flex items-center gap-1.5 text-secondary hover:text-[#0080d0] text-[13px] font-medium transition cursor-pointer py-1 px-1.5 rounded hover:bg-sky-50"
            aria-label={`Preview ${template.title}`}
          >
            <Eye className="w-4 h-4 stroke-[2]" />
            <span>Preview</span>
          </button>
        )}
      </div>

      {showSelectButton && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(template.id);
          }}
          className={`w-full py-2.5 rounded-lg font-semibold text-[14px] transition-all duration-200 cursor-pointer ${
            isSelected
              ? "bg-[#1E60F2] text-white shadow-sm hover:bg-[#1550cf]"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300"
          }`}
        >
          {isSelected ? "Selected" : "Use this template"}
        </button>
      )}
    </div>
  </div>
);

export default TemplateCard;
