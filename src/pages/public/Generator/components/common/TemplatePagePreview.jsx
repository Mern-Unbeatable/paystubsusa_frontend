import React from "react";
import stubData from "../../../data/generator/templateStubData.json";
import A4PreviewPage from "./A4PreviewPage";
import { PaystubThumbnail } from "./PaystubThumbnail";
import {
  DOCUMENT_PAGE,
  SAMPLE_LOGO,
  SAMPLE_PAYSTUB_DOCUMENT,
  VARIANT_TEMPLATE_WIDTH,
  TemplateDocument,
  hasTemplateDocument,
} from "../../templates";

// Same page margin the PDF uses around the variant templates (01–08).
const VARIANT_PAGE_MARGIN = 32;

const SAMPLE_VARIANT_DATA = { ...stubData, company: { ...stubData.company, logo: SAMPLE_LOGO } };

/**
 * Any template on a standard A4 preview page. `data` is the template's own data shape
 * (`buildPaystubDocument` / `buildThumbnailData`); sample data is shown when omitted.
 */
const TemplatePagePreview = ({ template, data, framed, className }) =>
  hasTemplateDocument(template) ? (
    <A4PreviewPage contentWidth={DOCUMENT_PAGE.width} framed={framed} className={className}>
      <TemplateDocument template={template} data={data ?? SAMPLE_PAYSTUB_DOCUMENT} />
    </A4PreviewPage>
  ) : (
    <A4PreviewPage
      contentWidth={VARIANT_TEMPLATE_WIDTH}
      inset={VARIANT_PAGE_MARGIN}
      framed={framed}
      className={className}
    >
      <PaystubThumbnail template={template} framed={false} data={data ?? SAMPLE_VARIANT_DATA} />
    </A4PreviewPage>
  );

export default TemplatePagePreview;
