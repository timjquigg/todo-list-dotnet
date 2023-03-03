import { ThemeProvider } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createContext, useMemo, useState } from "react";

export const colorModeContext = createContext();

export default function ColorModeProvider(props) {
  const [mode, setMode] = useState("light");

  const colorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" && {
        primary: {
          main: "#658EA9",
        },
        secondary: {
          main: "#E98973",
        },
        background: {
          default: "#88B2CC",
          paper: "#E7D4C0",
        },
      }),
      ...(mode === "dark" && {
        primary: {
          main: "#F2F1E8",
        },
        secondary: {
          main: "#E34234",
          dark: "#E34234",
        },
        background: {
          default: "#050533",
          paper: "#0D698B",
        },
      }),
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: "none",
            padding: "0.25rem",
          },
        },
      },
      MuiTooltip: {
        defaultProps: {
          placement: "top",
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // backgroundImage: "none",
          },
        },
      },
    },
    typography: {
      allVariants: {
        fontFamily: ["Hanken Grotesk", " sans-serif"].join(","),
      },
      body1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      },
      h2: {
        fontFamily: ["Source Serif Pro", "serif"].join(","),
      },
      h4: {
        fontFamily: ["Source Serif Pro", "serif"].join(","),
      },
    },
  });
  theme = responsiveFontSizes(theme);

  return (
    <colorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </colorModeContext.Provider>
  );
}
