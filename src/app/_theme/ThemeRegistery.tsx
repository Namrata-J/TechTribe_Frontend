"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  useMediaQuery,
  GlobalStyles,
  PaletteMode,
  Theme,
} from "@mui/material";
import { orange, red, lightBlue, green } from "@mui/material/colors";
import { ThemeContextType, ThemeRegisteryProps } from "./themeRegistery.types";

const themeContext = createContext<ThemeContextType>({ toggleTheme: () => {}, mode: "light" });

const ThemeRegistery = ({ children }: ThemeRegisteryProps) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<PaletteMode>(prefersDarkMode ? "dark" : "light");

  const toggleMode = useMemo<ThemeContextType>(
    () => ({
      toggleTheme: () => {
        if (mode === "dark") {
          setMode("light");
        } else {
          setMode("dark");
        }
      },
      mode,
    }),
    [mode]
  );

  const sharedPalette = {
    error: {
      light: red[400],
      main: red[700],
      dark: red[900],
    },
    warning: {
      light: orange[700],
      main: orange[800],
      dark: orange[900],
    },
    info: {
      light: lightBlue[400],
      main: lightBlue[700],
      dark: lightBlue[900],
    },
    success: {
      light: green[400],
      main: green[700],
      dark: green[900],
    },
    grey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    }
  };

  const theme: Theme = createTheme({
    palette: {
      mode: mode === "light" ? "light" : "dark",
      ...(mode === "light"
        ? {
            background: {
              default: "#FFFDF6",
              paper: "#ffffff",
            },
            primary: {
              light: "#ebc171",
              main: "#EFB036",
              dark: "#e59801",
            },
            secondary: {
              light: "#6caae3",
              main: "#3B6790",
              dark: "#184a79",
            },
            accent: {
              main: "#889E73",
            },
            text: {
              primary: "#171717",
              secondary: "#4a4a4a",
              disabled: "#9e9e9e",
            },
            ...sharedPalette,
          }
        : {
            background: {
              default: "#1d1d1a",
              paper: "#000000",
            },
            primary: {
              light: "#c49d51",
              main: "#b88421",
              dark: "#9f6d0c",
            },
            secondary: {
              light: "#4884bb",
              main: "#205b92",
              dark: "#144e83",
            },
            text: {
              primary: "#171717",
              secondary: "#4a4a4a",
              disabled: "#9e9e9e",
            },
            accent: {
              main: "#889E73",
            },
            ...sharedPalette,
          }),
    },
    components: {},
    typography: {
      fontFamily: "var(--font-montserrat)",
      subtitle1: {
        fontFamily: "var(--font-poppins)",
      },
    },
  });

  return (
    <themeContext.Provider value={toggleMode}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{
            ":root": {
              "--mui-bg": theme.palette.background.default,
              "--mui-paper": theme.palette.background.paper,
            },
            body: {
              background: "var(--mui-bg)",
            },
          }}
        />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </themeContext.Provider>
  );
};

const useTheme = () => useContext(themeContext);

export { useTheme, ThemeRegistery };
