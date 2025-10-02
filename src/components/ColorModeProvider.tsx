"use client";

import * as React from "react";
import {
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
} from "@mui/material";
import { getDesignTokens } from "@/theme/tokens";

type Ctx = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  setMode: (m: PaletteMode) => void;
};
export const ColorModeContext = React.createContext<Ctx>({
  mode: "light",
  toggleColorMode: () => {},
  setMode: () => {},
});

const STORAGE_KEY = "mui-mode";

export default function ColorModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setModeState] = React.useState<PaletteMode>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as PaletteMode) || null;
    if (saved === "light" || saved === "dark") setModeState(saved);
    else
      setModeState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    setMounted(true);
  }, []);

  const setMode = (m: PaletteMode) => {
    setModeState(m);
    localStorage.setItem(STORAGE_KEY, m);
  };
  const toggleColorMode = () => setMode(mode === "light" ? "dark" : "light");
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  if (!mounted) return null; // avoid flicker

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
