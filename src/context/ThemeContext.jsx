import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = typeof localStorage !== "undefined" && localStorage.getItem("portfolio_theme");
    if (saved) return saved === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? true;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute("data-theme", "dark");
    } else {
      root.setAttribute("data-theme", "light");
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("portfolio_theme", dark ? "dark" : "light");
    }
  }, [dark]);

  const toggle = () => setDark((d) => !d);

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
