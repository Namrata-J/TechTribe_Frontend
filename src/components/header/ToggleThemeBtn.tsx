"use client";

import React from "react";
import { IconButton } from "@mui/material";
import { useTheme } from "@/app/_theme/ThemeRegistery";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ToggleThemeBtn = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton color="primary" onClick={toggleTheme}>
      {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export { ToggleThemeBtn };
