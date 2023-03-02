import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { userContext } from "../providers/userProvider";
import UserCredentials from "./userCredentials";

export default function Landing(props) {
  const { signIn, signUp } = useContext(userContext);

  const [dialogOpen, setDialogOpen] = useState({
    setOpen: null,
    open: false,
    title: "",
    action: null,
  });

  const handleSignUp = () => {
    setDialogOpen({
      setOpen: setDialogOpen,
      open: true,
      title: "Sign Up",
      action: signUp,
    });
  };

  const handleSignIn = () => {
    setDialogOpen({
      setOpen: setDialogOpen,
      open: true,
      title: "Sign In",
      action: signIn,
    });
  };

  return (
    <Box sx={{ textAlign: "center", my: "2rem", p: "1rem" }}>
      <Button
        variant="contained"
        onClick={handleSignIn}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.primary.main,
          m: "1rem",
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        onClick={handleSignUp}
        sx={{
          backgroundColor: (theme) => theme.palette.background.paper,
          color: (theme) => theme.palette.primary.main,
          m: "1rem",
        }}
      >
        Register
      </Button>
      <UserCredentials params={dialogOpen} />
    </Box>
  );
}
