import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css'; 
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();
const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
} else {
  console.error("root element 찾기 실패");
}