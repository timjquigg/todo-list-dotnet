import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          border: "none",
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

export default theme;
