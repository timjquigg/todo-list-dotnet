import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const mode = "light";

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
    // Add dark theme below
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

export default theme;
