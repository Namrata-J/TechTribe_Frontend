"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
  PaletteMode,
  Theme,
} from "@mui/material";
import { orange, red, lightBlue, green } from "@mui/material/colors";
import { ThemeContextType, ThemeRegisteryProps } from "./themeRegistery.types";

const themeContext = createContext<ThemeContextType>({
  toggleTheme: () => {},
  mode: null,
});

const ThemeRegistery = ({ children }: ThemeRegisteryProps) => {
  const [mode, setMode] = useState<PaletteMode | null>(null);

  useEffect(() => {
    if (window !== undefined) {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(dark ? "dark" : "light");
    }
  }, []);

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

  if (!mode) return null;

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
    },
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
              primary: "#ffffff",
              secondary: "#ffffff",
              disabled: "#ffffff",
            },
            accent: {
              main: "#889E73",
            },
            ...sharedPalette,
          }),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: "500",
            fontSize: "0.9rem",
          },
          containedPrimary: {
            color: "#ffffff",
          },
        },
        variants: [
          {
            props: { variant: "text" },
            style: {
              color: mode === "light" ? "secondary" : "#ffffff",
            },
          },
        ],
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            width: "100%",
            "& .MuiInputLabel-root": {
              fontFamily: "var(--font-poppins)",
              fontWeight: "300",
              fontSize: "0.85rem",
              lineHeight: "0.85rem",
            },
            "& .MuiOutlinedInput-root": {
              fontFamily: "var(--font-poppins)",
              fontWeight: "300",
              fontSize: "0.85rem",
              lineHeight: "0.85rem",
              borderRadius: "6px",
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: "1.5px",
              },
            },
            "& .MuiOutlinedInput-input": {
              height: "0.85rem",
              padding: "14.5px 14px",
            },
            "& .MuiFormHelperText-root": {
              fontSize: "0.6rem",
              fontWeight: "300",
              fontFamily: "var(--font-poppins)",
              color: sharedPalette.grey[500],
            },
          },
        },
      },
    },
    typography: {
      fontFamily: "var(--font-montserrat)",
      h1: {
        fontWeight: 700,
      },
      subtitle1: {
        fontFamily: "var(--font-poppins)",
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
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
              backgroundColor: "var(--mui-bg)",
              height: "100vh",
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
