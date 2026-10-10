import "./styles.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Router, RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
});

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

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      QueryClientProvider,
      { client: queryClient },
      React.createElement(RouterProvider, { router })
    )
  )
);
