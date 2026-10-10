// @tanstack/react-start provides vite configuration through its default export.
// You can extend it here with additional config.
// Build timestamp: 1728572400 - Webhook trigger final
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  server: {
    middlewareMode: false,
  },
});
