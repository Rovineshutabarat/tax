"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthProvider from "@/components/providers/auth-provider";
import { useTheme } from "@/hooks/use-theme";

type AppLayoutProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      refetchOnWindowFocus: false,
      retry: 2,
      retryDelay: 1000,
    },
  },
});

const AppLayout = ({ children }: AppLayoutProps) => {
  const {theme} = useTheme()

  return (
    <body className={`${theme}`}>
      <Toaster
        visibleToasts={4}
        expand={true}
        theme={theme as "dark" | "light"}
        richColors={true}
      />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </body>
  );
};

export default AppLayout;
