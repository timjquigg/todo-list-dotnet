import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    mode: "light",
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
  },
  // palette: {
  //   mode: "light",
  //   primary: {
  //     main: "#868B8E",
  //   },
  //   secondary: {
  //     main: "#B9B7BD",
  //   },
  //   background: {
  //     default: "#E7D2CC",
  //     paper: "#EEEDE7",
  //   },
  // },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "none",
          padding: "0.25rem",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
