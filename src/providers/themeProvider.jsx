import { ThemeProvider } from "@emotion/react";
import { useMediaQuery } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { createContext, useState } from "react";

export const colorModeContext = createContext();

export default function ColorModeProvider(props) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState(prefersDarkMode ? "dark" : "light");

  const colorMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "light" && {
        primary: {
          main: "#537C97",
        },
        secondary: {
          main: "#A35F50",
          dark: "#A35F50",
        },
        background: {
          default: "#88B2CC",
          paper: "#E7D4C0",
        },
      }),
      ...(mode === "dark" && {
        primary: {
          main: "#FFF",
        },
        secondary: {
          main: "#F2F1E8",
          dark: "#F2F1E8",
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
