import { ReactNode } from "react";
import { PaletteMode } from "@mui/material";

export interface ThemeContextType {
    toggleTheme: () => void;
    mode: PaletteMode;
  }

export interface ThemeRegisteryProps {
    children: ReactNode
  }