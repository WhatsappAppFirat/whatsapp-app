import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "src/router";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryCilent = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryCilent}>
    <RouterProvider router={router} />
    <Toaster />
  </QueryClientProvider>
);
