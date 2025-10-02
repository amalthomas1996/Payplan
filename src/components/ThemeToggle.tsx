"use client";

import * as React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ColorModeContext } from "@/components/ColorModeProvider";

export default function ThemeToggle() {
  const { mode, toggleColorMode } = React.useContext(ColorModeContext);
  if (!mode) return null;

  const isLight = mode === "light";
  const label = isLight ? "Switch to dark mode" : "Switch to light mode";

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={toggleColorMode}
        aria-label={label}
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: 2,
          p: { xs: 0.5, sm: 1 },
          "& svg": {
            fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
          },
        }}
      >
        {isLight ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
