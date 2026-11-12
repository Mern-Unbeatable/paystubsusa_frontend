import React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import "../index.css";
import "./renderer.css";
import PaystubPrintDocument from "../pages/public/Generator/components/common/PaystubPrintDocument";
import { calculatePaystub } from "../pages/public/Generator/hooks/usePaystubFormData";
import { toGeneratorTemplate } from "../pages/public/Generator/utils/generatorTemplate";

const container = document.getElementById("root");
const root = createRoot(container);

const waitForImages = () =>
  Promise.all(
    [...container.querySelectorAll("img")].map((img) =>
      img.complete
        ? null
        : new Promise((resolve) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve);
          }),
    ),
  );

/**
 * Entry point for the server's PDF renderer (server/src/integrations/renderer.ts): draws the
 * paystub on the page, then marks the root `data-ready` once fonts and images have loaded.
 */
window.renderDocument = async ({ type, template, formData }) => {
  if (type !== "paystub") throw new Error(`Unsupported document type: ${type}`);
  const generatorTemplate = toGeneratorTemplate(template);
  flushSync(() => {
    root.render(
      <PaystubPrintDocument
        template={generatorTemplate}
        formData={formData}
        calculations={calculatePaystub(formData)}
      />,
    );
  });
  await document.fonts.ready;
  await waitForImages();
  container.dataset.ready = "true";
};
