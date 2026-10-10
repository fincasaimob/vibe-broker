import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import legacy from "@vitejs/plugin-legacy";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [TanStackRouterVite(), react(), tailwindcss(), legacy({ targets: ["defaults"] }), tsConfigPaths()],
  server: {
    middlewareMode: false,
  },
  build: {
    target: "esnext",
  },
});
