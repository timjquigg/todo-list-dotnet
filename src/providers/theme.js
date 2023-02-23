import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
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
