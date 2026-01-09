import { createContext, useContext, useEffect, useState } from "react";
import { getLightDark, saveLightDark } from "../Utils/authUtils";
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => getLightDark() === 'dark');
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    saveLightDark(dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useLightDark() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useLightDark must be used inside ThemeProvider"
    );
  }

  return context;
}
