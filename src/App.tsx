import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Planning from "./pages/Planning";
import Login from "./pages/Login";
import { AuthProvider } from "./components/auth/AuthProvider";
import { RequireAuth } from "./components/auth/RequireAuth";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <RequireAuth>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </RequireAuth>
                  }
                />
                <Route
                  path="/transactions"
                  element={
                    <RequireAuth>
                      <Layout>
                        <Transactions />
                      </Layout>
                    </RequireAuth>
                  }
                />
                <Route
                  path="/planning"
                  element={
                    <RequireAuth>
                      <Layout>
                        <Planning />
                      </Layout>
                    </RequireAuth>
                  }
                />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;