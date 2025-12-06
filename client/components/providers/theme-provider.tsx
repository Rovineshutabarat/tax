"use client";

import React from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeProviderContext = {
  theme: "light" | "dark";
  changeTheme: () => void;
};

export const ThemeProviderContext = React.createContext<
  ThemeProviderContext | undefined
>(undefined);

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const storedTheme =
      (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(storedTheme);
    setMounted(true);
  }, []);

  const changeTheme = () => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", updatedTheme);
    setTheme(updatedTheme);
  };

  if (!mounted) {
    return <body></body>;
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export default ThemeProvider;
