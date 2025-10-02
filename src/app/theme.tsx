"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1e88e5" },
    secondary: { main: "#8e24aa" },
    background: {
      default: "#f7f9fc",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Arial",
      "sans-serif",
    ].join(","),
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      defaultProps: { variant: "contained" },
    },
    MuiTextField: {
      defaultProps: { fullWidth: true, size: "small" },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
  },
});

export default theme;
