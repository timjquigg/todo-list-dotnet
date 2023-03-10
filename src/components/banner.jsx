import { IconButton, Typography, Paper } from "@mui/material";
import UserMenu from "./userMenu";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useContext } from "react";
import { colorModeContext } from "../providers/themeProvider";
import { useTheme } from "@emotion/react";

export default function Banner(props) {
  const colorMode = useContext(colorModeContext);
  const theme = useTheme();

  return (
    <Paper
      id="banner"
      elevation={4}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
        height: "auto",
        mt: "2rem",
        p: 0,
      }}
    >
      <UserMenu />
      <Typography color="primary" variant="h2" sx={{ my: "auto", p: "0" }}>
        To-do List
      </Typography>
      <IconButton
        size="small"
        onClick={colorMode}
        sx={{
          mr: "1rem",
          my: "auto",
        }}
      >
        {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
      </IconButton>
    </Paper>
  );
}
