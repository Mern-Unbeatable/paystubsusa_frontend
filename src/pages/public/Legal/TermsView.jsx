import React from "react";
import LegalDocument from "./components/LegalDocument";
import terms from "../data/legal/terms.json";

const TermsView = () => <LegalDocument doc={terms} eyebrow="Legal" />;

export default TermsView;
