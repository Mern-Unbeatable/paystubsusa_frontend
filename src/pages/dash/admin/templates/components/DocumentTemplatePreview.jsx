import React from "react";
import { PaystubThumbnail } from "../../../../public/Generator/components/common/preview/PaystubThumbnail";
import TemplatePagePreview from "../../../../public/Generator/components/common/preview/TemplatePagePreview";
import ScaledDocument from "../../../../public/Generator/components/common/preview/ScaledDocument";
import W2FormDocument from "../../../../public/W2/templates/W2FormDocument";
import { W2_SAMPLE_FORM_DATA } from "../../../../public/W2/hooks/useW2FormData";
import Nec1099FormDocument from "../../../../public/1099/templates/Nec1099FormDocument";
import { NEC1099_SAMPLE_FORM_DATA } from "../../../../public/1099/hooks/useNec1099FormData";
import DirectDepositSlipDocument from "../../../../public/DirectDeposit/templates/DirectDepositSlipDocument";
import { DIRECT_DEPOSIT_SAMPLE_FORM_DATA } from "../../../../public/DirectDeposit/hooks/useDirectDepositFormData";
import { previewImageSrc, toThumbnailTemplate } from "../utils/templateFormat";

/** Layout width used on the public W-2 / 1099 / DD live preview. */
const FORM_CONTENT_WIDTH = 480;

const FORM_DOCUMENTS = {
  w2: { Document: W2FormDocument, sample: W2_SAMPLE_FORM_DATA },
  nec1099: { Document: Nec1099FormDocument, sample: NEC1099_SAMPLE_FORM_DATA },
  direct_deposit: {
    Document: DirectDepositSlipDocument,
    sample: DIRECT_DEPOSIT_SAMPLE_FORM_DATA,
  },
};

/** Scale the form to card/modal width; height follows content (no empty A4 gap). */
const FormDocumentPreview = ({ documentType, framed, className }) => {
  const entry = FORM_DOCUMENTS[documentType];
  if (!entry) return null;
  const { Document, sample } = entry;

  return (
    <div
      className={`w-full overflow-hidden bg-white ${
        framed
          ? "border border-slate-200/80 rounded-md shadow-[0_1px_3px_rgba(0,0,0,0.03)]"
          : ""
      } ${className}`}
    >
      <ScaledDocument width={FORM_CONTENT_WIDTH}>
        <div className="w-full bg-white border border-slate-200">
          <Document formData={sample} />
        </div>
      </ScaledDocument>
    </div>
  );
};

/**
 * Admin template preview: paystub layouts for paystubs; public W-2 / 1099-NEC /
 * Direct Deposit form documents for those types (same as customer generators).
 *
 * `mode`: `card` / `inline` (content height), `page` (A4 for paystubs; content height for forms).
 * `imageSrc` overrides the stored preview image (e.g. local file pick).
 */
const DocumentTemplatePreview = ({
  template,
  mode = "card",
  framed = true,
  className = "",
  imageSrc,
  width,
}) => {
  const src = imageSrc === undefined ? previewImageSrc(template) : imageSrc;
  const alt = `${template.title || "Template"} preview`;
  const documentType = template.documentType || "paystub";
  const isPaystub = documentType === "paystub";

  if (src) {
    if (!width) {
      return (
        <div
          className={`overflow-hidden rounded-xl border border-slate-200 bg-white ${className}`}
        >
          <img src={src} alt={alt} className="block w-full object-contain" />
        </div>
      );
    }
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white ${className}`}
        style={{ width, height: Math.round(width * 1.3) }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover object-top"
        />
      </div>
    );
  }

  if (!isPaystub) {
    if (width) {
      return (
        <div
          className={`shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white ${className}`}
          style={{ width }}
        >
          <FormDocumentPreview documentType={documentType} framed={false} />
        </div>
      );
    }
    return (
      <FormDocumentPreview
        documentType={documentType}
        framed={framed}
        className={className}
      />
    );
  }

  const paystubTemplate = toThumbnailTemplate(template);

  if (mode === "page") {
    return (
      <TemplatePagePreview
        template={paystubTemplate}
        framed={framed}
        className={className}
      />
    );
  }

  if (width) {
    const THUMBNAIL_BASE_WIDTH = 320;
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-md border border-slate-200 bg-white ${className}`}
        style={{ width, height: Math.round(width * 1.3) }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 origin-top-left"
          style={{
            width: THUMBNAIL_BASE_WIDTH,
            transform: `scale(${width / THUMBNAIL_BASE_WIDTH})`,
          }}
        >
          <PaystubThumbnail template={paystubTemplate} framed={false} />
        </div>
      </div>
    );
  }

  return (
    <PaystubThumbnail
      template={paystubTemplate}
      full={mode === "inline"}
      framed={framed}
    />
  );
};

export default DocumentTemplatePreview;
