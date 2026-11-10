import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import TemplateNotFound from "./TemplateNotFound";
import { usePaystubFlowRoute } from "../../hooks/usePaystubFlowRoute";
import { rememberLastTemplateId } from "../../utils/generatorStorage";

/**
 * Shared shell for every page after template selection: resolves the template
 * from the URL, handles redirects / unknown ids, and renders the common layout.
 * `children` is a render function receiving the resolved template.
 */
const PaystubFlowPage = ({ children }) => {
  const { templateSlug, template, redirectTo } = usePaystubFlowRoute();

  useEffect(() => {
    if (template) rememberLastTemplateId(template.id);
  }, [template]);

  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  if (!template) {
    return <TemplateNotFound templateSlug={templateSlug} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#F4F7FB] border-t border-slate-200/80 py-8 sm:py-14">
      <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-0 sm:py-12 select-none">
        {children(template)}
      </div>
    </div>
  );
};

export default PaystubFlowPage;
