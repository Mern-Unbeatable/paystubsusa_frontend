import React, { useCallback, useState, useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import TemplateCard from "../common/templatePicker/TemplateCard";
import TemplatePreviewModal from "../common/templatePicker/TemplatePreviewModal";
import { PaystubThumbnail, TEMPLATES } from "../common/preview/PaystubThumbnail";
import { usePaystubTemplates } from "../../utils/templateUtils";

export { PaystubThumbnail, TEMPLATES };

const TemplateSelectionSection = ({
  selectedTemplateId = "01",
  onSelectTemplate,
  onContinue,
}) => {
  const [internalSelected, setInternalSelected] = useState(selectedTemplateId);
  const selectedTemplate = onSelectTemplate
    ? selectedTemplateId
    : internalSelected;

  const handleSelect = (id) => {
    setInternalSelected(id);
    onSelectTemplate?.(id);
  };

  const { templates } = usePaystubTemplates();
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const closePreview = useCallback(() => setPreviewTemplate(null), []);
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".template-card-item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform",
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#F0F5FA] py-14 sm:py-20 select-none border-t border-slate-200/60"
    >
      <div className="max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8">
        {/* Section Header matching Figma */}
        <div className="mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#092258] tracking-tight">
            Choose Your Paystub Template
          </h2>
          <p className="mt-1.5 text-slate-500 text-[14px] sm:text-[15px]">
            Select the layout that best suits your needs.
          </p>
        </div>

        {/* 8 Templates Grid (4 columns desktop, 2 tablet, 1 mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {templates.map((tmpl) => (
            <TemplateCard
              key={tmpl.id}
              template={tmpl}
              isSelected={selectedTemplate === tmpl.id}
              onSelect={handleSelect}
              onPreview={setPreviewTemplate}
              className="template-card-item"
            />
          ))}
        </div>

        {onContinue && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={onContinue}
              className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[#1E60F2] hover:bg-[#1550cf] text-white font-semibold text-[15px] shadow-sm transition inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Continue to Create Paystub</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <TemplatePreviewModal
        template={previewTemplate}
        onClose={closePreview}
        onUseTemplate={(id) => {
          handleSelect(id);
          closePreview();
        }}
      />
    </section>
  );
};

export default TemplateSelectionSection;
