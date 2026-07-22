import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import { ThemeProvider, CssBaseline } from "@mui/material";

import { lightTheme, darkTheme } from "../theme/theme";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeContextProvider({
                                       children,
                                     }: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved) {
      setDarkMode(saved === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newValue = !darkMode;

    setDarkMode(newValue);

    localStorage.setItem(
      "theme",
      newValue ? "dark" : "light"
    );
  };

  const theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used inside ThemeContextProvider"
    );
  }

  return context;
}