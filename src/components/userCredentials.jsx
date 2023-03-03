import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  FilledInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function UserCredentials(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { open, setOpen, title, action } = props.params;

  const handleCloseDialog = () => {
    setOpen({ setOpen: null, open: false, title: "", action: null });
    setEmail("");
    setPassword("");
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = () => {
    action(email, password);
    handleCloseDialog();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle color="primary" textAlign="center">
        {title}
      </DialogTitle>
      <DialogContent>
        <TextField
          color="secondary"
          autoFocus
          fullWidth
          variant="filled"
          value={email}
          type="email"
          label="E-mail"
          onChange={(e) => handleEmailChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          sx={{ mb: "1rem" }}
        />
        <FormControl variant="filled" fullWidth>
          <InputLabel>Password</InputLabel>
          <FilledInput
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => handlePasswordChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        {/* <TextField
          color="secondary"
          fullWidth
          variant="filled"
          value={password}
          type="password"
          label="Password"
          inputProps={{
            
          }}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseDialog}
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
