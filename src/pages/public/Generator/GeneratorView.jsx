import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import GeneratorHeroSection from "./components/sections/GeneratorHeroSection";
import TemplateSelectionSection from "./components/sections/TemplateSelectionSection";
import {
  TEMPLATE_QUERY_PARAM,
  buildPaystubCreatePath,
  fromTemplateSlug,
  toTemplateSlug,
} from "../../../config/paths";
import { useSessionStorageState } from "../../../hooks/useSessionStorageState";
import { getTemplateById, usePaystubTemplates } from "./utils/templateUtils";
import { LAST_TEMPLATE_STORAGE_KEY } from "./utils/generatorStorage";

const GeneratorView = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { templates, defaultTemplateId } = usePaystubTemplates();
  const [lastTemplateId, setLastTemplateId] = useSessionStorageState(
    LAST_TEMPLATE_STORAGE_KEY,
    defaultTemplateId,
  );

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
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set(TEMPLATE_QUERY_PARAM, toTemplateSlug(id));
        return next;
      },
      { replace: true },
    );
  };

  const handleContinue = () => {
    navigate(buildPaystubCreatePath(selectedTemplateId));
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* 1. Hero Section */}
      <GeneratorHeroSection />

      {/* 2. Choose Your Paystub Template Section */}
      <TemplateSelectionSection
        selectedTemplateId={selectedTemplateId}
        onSelectTemplate={handleSelectTemplate}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default GeneratorView;
