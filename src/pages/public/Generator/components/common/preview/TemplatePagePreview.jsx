import React from "react";
import stubData from "../../../../data/generator/templateStubData.json";
import A4PreviewPage from "./A4PreviewPage";
import { PaystubThumbnail } from "./PaystubThumbnail";
import {
  DOCUMENT_PAGE,
  SAMPLE_LOGO,
  SAMPLE_PAYSTUB_DOCUMENT,
  VARIANT_TEMPLATE_WIDTH,
  TemplateDocument,
  hasTemplateDocument,
} from "../../../templates";
import DirectDepositSlip from "../../../templates/DirectDepositSlip";
import { shouldRenderDirectDepositSlip } from "../../../templates/shouldRenderDirectDepositSlip";

// Same page margin the PDF uses around the variant templates (01–08).
const VARIANT_PAGE_MARGIN = 32;

const SAMPLE_VARIANT_DATA = {
  ...stubData,
  company: { ...stubData.company, logo: SAMPLE_LOGO },
};

/** Sample DD used only when the preview modal toggles the deposit slip on. */
const PREVIEW_DIRECT_DEPOSIT = {
  enabled: true,
  includeInPdf: true,
  bankName: "Chase Bank",
  accountHolderName: "Jordan A. Miller",
  accountNumber: "123456789",
  routingNumber: "021000021",
  checkNumber: "1001",
  netPayText: "$1,908.62",
};

const withDepositSlip = (base, showDepositSlip) => {
  if (!showDepositSlip) {
    return {
      ...base,
      directDeposit: { enabled: false, includeInPdf: false },
    };
  }
  const net =
    base.totals?.net ||
    base.netPay ||
    base.summary?.net ||
    PREVIEW_DIRECT_DEPOSIT.netPayText;
  const holder =
    base.employee?.name ||
    base.employeeName ||
    PREVIEW_DIRECT_DEPOSIT.accountHolderName;
  return {
    ...base,
    directDeposit: {
      ...PREVIEW_DIRECT_DEPOSIT,
      accountHolderName: holder,
      netPayText: net,
    },
  };
};

/**
 * Any template on a standard A4 preview page.
 * Pass `showDepositSlip` only from the template picker modal (forces sample DD).
 * Live form preview omits it and keeps `data.directDeposit` from the builders.
 */
const TemplatePagePreview = ({
  template,
  data,
  framed,
  className,
  showDepositSlip,
}) => {
  const isFullPage = hasTemplateDocument(template);
  const base =
    data ?? (isFullPage ? SAMPLE_PAYSTUB_DOCUMENT : SAMPLE_VARIANT_DATA);
  const pageData =
    typeof showDepositSlip === "boolean"
      ? withDepositSlip(base, showDepositSlip)
      : base;
  const showVariantDd =
    !isFullPage &&
    (typeof showDepositSlip === "boolean"
      ? showDepositSlip
      : shouldRenderDirectDepositSlip(pageData.directDeposit));

  return (
    <div className={className}>
      {isFullPage ? (
        <A4PreviewPage contentWidth={DOCUMENT_PAGE.width} framed={framed}>
          <TemplateDocument template={template} data={pageData} />
        </A4PreviewPage>
      ) : (
        <A4PreviewPage
          contentWidth={VARIANT_TEMPLATE_WIDTH}
          inset={VARIANT_PAGE_MARGIN}
          framed={framed}
        >
          <PaystubThumbnail
            template={template}
            framed={false}
            data={pageData}
          />
          {showVariantDd ? <DirectDepositSlip data={pageData} compact /> : null}
        </A4PreviewPage>
      )}
    </div>
  );
};

export default TemplatePagePreview;
