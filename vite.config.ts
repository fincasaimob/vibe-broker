import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tsConfigPaths()],
  server: {
    middlewareMode: false,
  },
  build: {
    target: "es2020",
  },
});
