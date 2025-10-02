import { PaletteMode, ThemeOptions } from "@mui/material";

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
        primary: { main: "#1976d2" },
        background: { default: "#fafafa", paper: "#fff" },
      }
      : {
        primary: { main: "#90caf9" },
        background: { default: "#0b0f14", paper: "#11161c" },
      }),
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
  },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans"',
  },
});
