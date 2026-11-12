import React from "react";
import LegalDocument from "./components/LegalDocument";
import privacy from "../data/legal/privacy.json";

const PrivacyPolicyView = () => <LegalDocument doc={privacy} eyebrow="Legal" />;

export default PrivacyPolicyView;
