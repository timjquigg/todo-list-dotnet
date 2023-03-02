import { IconButton, Typography, Paper } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserMenu from "./userMenu";

export default function Banner(props) {
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
      <IconButton hidden disabled size="small">
        <MenuIcon
          sx={{ mr: "1rem", color: (theme) => theme.palette.background.paper }}
        />
      </IconButton>
    </Paper>
  );
}
