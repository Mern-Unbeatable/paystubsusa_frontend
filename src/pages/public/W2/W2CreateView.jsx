import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../../config/paths";

/** Legacy `/w-2/create` → landing (form lives on `/w-2`). */
const W2CreateView = () => <Navigate to={PATHS.PUBLIC.w2} replace />;

export default W2CreateView;
