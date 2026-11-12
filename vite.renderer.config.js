import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const INDEX_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./renderer.css" />
  </head>
  <body>
    <div id="root" class="paystub-print-root"></div>
    <script src="./renderer.js"></script>
  </body>
</html>
`;

/**
 * Offline bundle for the server's PDF renderer (RENDERER_BUNDLE_PATH -> dist-renderer/index.html).
 * Built as a classic IIFE script because Chromium blocks ES modules on file:// pages.
 */
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "renderer-index-html",
      generateBundle() {
        this.emitFile({ type: "asset", fileName: "index.html", source: INDEX_HTML });
      },
    },
  ],
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  publicDir: false,
  build: {
    outDir: "dist-renderer",
    emptyOutDir: true,
    lib: {
      entry: "src/renderer/main.jsx",
      formats: ["iife"],
      name: "PaystubRenderer",
      fileName: () => "renderer.js",
      cssFileName: "renderer",
    },
  },
});
