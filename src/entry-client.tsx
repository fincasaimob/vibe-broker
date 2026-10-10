import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Router } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RootRoute } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient();

const router = new Router({
  routeTree,
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadDelay: 50,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root");
if (!rootElement?.innerHTML) {
  const root = createRoot(rootElement!);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
