import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GeneratorHeroSection from "./components/sections/GeneratorHeroSection";
import TemplateSelectionSection from "./components/sections/TemplateSelectionSection";
import {
  TEMPLATE_QUERY_PARAM,
  buildPaystubCreatePath,
  fromTemplateSlug,
} from "../../../config/paths";
import { useSessionStorageState } from "../../../hooks/useSessionStorageState";
import { getTemplateById, usePaystubTemplates } from "./utils/templateUtils";
import { LAST_TEMPLATE_STORAGE_KEY } from "./utils/generatorStorage";

const GeneratorView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { templates, defaultTemplateId } = usePaystubTemplates();
  const [lastTemplateId, setLastTemplateId] = useSessionStorageState(
    LAST_TEMPLATE_STORAGE_KEY,
    defaultTemplateId,
  );

  // Optional legacy `?templateId=` only preselects — does not navigate.
  const queryTemplate = getTemplateById(
    fromTemplateSlug(searchParams.get(TEMPLATE_QUERY_PARAM) ?? ""),
    templates,
  );
  const selectedTemplateId =
    queryTemplate?.id ??
    getTemplateById(lastTemplateId, templates)?.id ??
    defaultTemplateId;

  const handleSelectTemplate = (id) => {
    setLastTemplateId(id);
  };

  const handleContinue = () => {
    navigate(buildPaystubCreatePath(selectedTemplateId));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <GeneratorHeroSection />

      <TemplateSelectionSection
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={handleSelectTemplate}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default GeneratorView;
