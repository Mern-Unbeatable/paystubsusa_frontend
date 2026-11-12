import process from "node:process";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), "VITE_"), ...process.env };

  return {
    plugins: [react(), tailwindcss()],
    // Only the Stripe publishable key is exposed beyond VITE_*; never widen this to "STRIPE_".
    envPrefix: ["VITE_", "STRIPE_PUBLISHABLE_KEY"],
    server: {
      proxy: {
        // changeOrigin sends the target's Host header, which a remote (proxied/TLS) API requires.
        "/api": {
          target: env.VITE_API_PROXY_TARGET || "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
  };
});
