"use client";

import type React from "react";
import { createContext, useContext } from "react";

type Theme = "light";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void; // still required if UI uses it
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme: Theme = "light";

  const toggleTheme = () => {
    console.warn("Dark mode is disabled. Theme always stays 'light'.");
  };

  // Ensure the HTML class never has dark mode
  if (typeof window !== "undefined") {
    document.documentElement.classList.remove("dark");
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
