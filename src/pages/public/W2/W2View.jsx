import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";

/** `/w-2` → `/w-2/create?step=1` (nav entry and legacy bookmarks). */
const W2View = () => (
  <Navigate to={PATHS.PUBLIC.w2CreateStep1} replace />
);

export default W2View;
