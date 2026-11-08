import React, { useId, useRef, useState } from "react";
import { ImagePlus, Trash2, Upload } from "lucide-react";
import { LOGO_ACCEPT, readLogoFile, toLogoSrc } from "../../utils/readLogoFile";

const TRANSPARENCY_GRID = {
  backgroundColor: "#ffffff",
  backgroundImage: "repeating-conic-gradient(#e2e8f0 0% 25%, transparent 0% 50%)",
  backgroundSize: "12px 12px",
};

/** Optional company logo upload with drag & drop, preview, replace and remove. */
const CompanyLogoField = ({ value, onChange }) => {
  const logoSrc = toLogoSrc(value);
  const inputId = useId();
  const inputRef = useRef(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setIsLoading(true);
    try {
      onChange(await readLogoFile(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const openPicker = () => inputRef.current?.click();

  return (
    <div>
      <label htmlFor={inputId} className="block text-[13px] font-semibold text-slate-700 mb-1.5">
        Company Logo <span className="font-normal text-slate-400">(optional)</span>
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept={LOGO_ACCEPT}
        className="sr-only"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {logoSrc ? (
        <div className="flex items-center gap-4 p-3 rounded-lg border border-slate-200">
          <div
            className="w-20 h-14 shrink-0 rounded-md border border-slate-200 flex items-center justify-center p-1.5"
            style={TRANSPARENCY_GRID}
            title="Checkered areas are transparent"
          >
            <img src={logoSrc} alt="Company logo" className="max-w-full max-h-full object-contain" />
          </div>
          <div className="flex flex-wrap gap-2 ml-auto">
            <button
              type="button"
              onClick={openPicker}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 text-[13px] font-medium hover:bg-slate-50 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Replace
            </button>
            <button
              type="button"
              onClick={() => {
                setError("");
                onChange("");
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-rose-600 text-[13px] font-medium hover:bg-rose-50 transition cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={openPicker}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            handleFile(e.dataTransfer.files?.[0]);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg border border-dashed text-left transition cursor-pointer ${
            isDragging
              ? "border-[#1E60F2] bg-blue-50/60"
              : "border-slate-300 hover:border-[#1E60F2] hover:bg-slate-50"
          }`}
        >
          <span className="w-10 h-10 shrink-0 rounded-lg bg-blue-50 text-[#1E60F2] flex items-center justify-center">
            <ImagePlus className="w-5 h-5" />
          </span>
          <span>
            <span className="block text-[14px] font-medium text-slate-700">
              {isLoading ? "Processing logo…" : "Upload logo or drag & drop"}
            </span>
            <span className="block text-[12px] text-slate-400">PNG, JPG or JPEG · up to 5 MB · transparency is kept</span>
          </span>
        </button>
      )}

      {error && <p className="text-[12px] text-rose-500 mt-1">{error}</p>}
    </div>
  );
};

export default CompanyLogoField;
