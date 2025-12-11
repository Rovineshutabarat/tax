import React from "react";
import { ThemeProviderContext } from "@/components/providers/theme-provider";

export function useTheme() {
  const ctx = React.useContext(ThemeProviderContext);
  if (ctx === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }
  return ctx;
}