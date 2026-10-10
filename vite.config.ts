// Same config as the Lovable project, plus the Vercel Nitro preset.
// The Lovable wrapper defaults to the cloudflare-module preset; Vercel needs "vercel".
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  nitro: { preset: "vercel" },
});
