import { useContext, useState } from "react";
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
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { snackbarContext } from "../providers/snackbarProvider";

export default function UserCredentials(props) {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverMessage, setServerMessage] = useState([]);
  const [showServerMessage, setShowServerMessage] = useState(false);

  const { setSnackPack } = useContext(snackbarContext);

  const { open, setOpen, title, action } = props.params;

  const handleCloseDialog = () => {
    setOpen({ ...open, open: false });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setPasswordMatchError("");
    setServerMessage([]);
    setShowServerMessage(false);
    setOldPassword("");
    setOldPasswordError("");
    setShowOldPassword(false);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError("");
    setShowServerMessage(false);
  };

  const handleOldPasswordChange = (value) => {
    setOldPassword(value);
    setOldPasswordError("");
    setShowServerMessage(false);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError("");
    setShowServerMessage(false);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordMatchError("");
  };

  const handleSubmitUpdatePassword = () => {
    if (oldPassword.length > 0 && password.length > 0 && matchPasswords()) {
      action(oldPassword, password)
        .then((res) => {
          handleCloseDialog();
          setSnackPack((prev) => [
            ...prev,
            {
              message: "Password updated successfully",
              key: new Date().getTime(),
            },
          ]);
        })
        .catch((err) => {
          setServerMessage(err);
          setShowServerMessage(true);
        });
    }
    setOldPasswordError("Old password must not be blank");
    setPasswordError("New password must not be blank");
  };

  const handleSubmit = () => {
    if (email.length > 0 && password.length > 0 && matchPasswords()) {
      action(email, password)
        .then((res) => {
          handleCloseDialog();
        })
        .catch((err) => {
          setServerMessage(err);
          setShowServerMessage(true);
        });
      return;
    }
    setEmailError("Email must not be blank");
    setPasswordError("Password must not be blank");

    return;
  };

  const matchPasswords = () => {
    if (title === "Sign In") {
      return true;
    }

    if (password === confirmPassword) {
      return true;
    }
    setPasswordMatchError("Passwords must match");
    return false;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const serverErrorList = serverMessage
    .filter((message) => {
      return !message.description.includes("Username");
    })
    .map((message, index) => {
      return (
        <FormHelperText key={index} error>
          {message.description}
        </FormHelperText>
      );
    });

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
        {title !== "Update Password" && (
          <TextField
            color="secondary"
            autoFocus
            fullWidth
            error={emailError.length > 0}
            helperText={email.length === 0 && emailError}
            variant="filled"
            value={email}
            type="email"
            label="E-mail"
            onChange={(e) => handleEmailChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                title === "Update Password"
                  ? handleSubmitUpdatePassword()
                  : handleSubmit();
              }
            }}
            sx={{ mb: "1rem" }}
          />
        )}
        {title === "Update Password" && (
          <FormControl variant="filled" fullWidth sx={{ mb: "1rem" }}>
            <InputLabel>Old Password</InputLabel>
            <FilledInput
              type={showOldPassword ? "text" : "password"}
              fullWidth
              autoFocus
              value={oldPassword}
              error={oldPassword.length === 0}
              onChange={(e) => handleOldPasswordChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  title === "Update Password"
                    ? handleSubmitUpdatePassword()
                    : handleSubmit();
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
            <FormHelperText error={oldPasswordError.length > 0}>
              {oldPassword.length === 0 && oldPasswordError}
            </FormHelperText>
          </FormControl>
        )}

        <FormControl variant="filled" fullWidth>
          <InputLabel>
            {title === "Update Password" ? "New Password" : "Password"}
          </InputLabel>
          <FilledInput
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            error={password.length === 0}
            onChange={(e) => handlePasswordChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                title === "Update Password"
                  ? handleSubmitUpdatePassword()
                  : handleSubmit();
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
          <FormHelperText error={passwordError.length > 0}>
            {password.length === 0 && passwordError}
          </FormHelperText>
        </FormControl>
        {title === "Sign Up" ||
          (title === "Update Password" && (
            <FormControl variant="filled" fullWidth sx={{ mt: "1rem" }}>
              <InputLabel>
                Confirm{" "}
                {title === "Update Password" ? "New Password" : "Password"}
              </InputLabel>
              <FilledInput
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                error={passwordMatchError.length > 0}
                value={confirmPassword}
                onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    title === "Update Password"
                      ? handleSubmitUpdatePassword()
                      : handleSubmit();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText error={passwordMatchError.length > 0}>
                {passwordMatchError}
              </FormHelperText>
            </FormControl>
          ))}
        {showServerMessage && serverErrorList}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseDialog}
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Cancel
        </Button>
        <Button
          onClick={
            title === "Update Password"
              ? handleSubmitUpdatePassword
              : handleSubmit
          }
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
