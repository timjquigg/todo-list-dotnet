import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { userContext } from "../providers/userProvider";
import UserCredentials from "./userCredentials";

const fabStyles = {
  ml: "1rem",
  backgroundColor: (theme) => theme.palette.background.paper,
};

export default function UserMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dialogOpen, setDialogOpen] = useState({
    setOpen: null,
    open: false,
    title: "",
    action: null,
  });

  const { token, signUp, signIn, signOut } = useContext(userContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignUp = () => {
    setDialogOpen({
      setOpen: setDialogOpen,
      open: true,
      title: "Sign Up",
      action: signUp,
    });
    handleClose();
  };

  const handleSignIn = () => {
    setDialogOpen({
      setOpen: setDialogOpen,
      open: true,
      title: "Sign In",
      action: signIn,
    });
    handleClose();
  };

  const handleSignOut = () => {
    signOut();
    handleClose();
  };

  return (
    <>
      <IconButton
        id="user-button"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
        sx={fabStyles}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-button",
        }}
      >
        {token && <MenuItem onClick={handleSignOut}>Logout</MenuItem>}
        {!token && <MenuItem onClick={handleSignUp}>Register</MenuItem>}
        {!token && <MenuItem onClick={handleSignIn}>Login</MenuItem>}
      </Menu>
      <UserCredentials params={dialogOpen} />
    </>
  );
}
