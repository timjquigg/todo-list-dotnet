import { Button, Snackbar } from "@mui/material";
import { useContext, useEffect } from "react";
import { snackbarContext } from "../providers/snackbarProvider";
import { todosContext } from "../providers/todosProvider";

export default function FeedbackMessage(props) {
  const {
    snackbarOpen,
    setSnackbarOpen,
    snackbarContent,
    setSnackbarContent,
    snackPack,
    setSnackPack,
  } = useContext(snackbarContext);

  const { createTodo } = useContext(todosContext);

  useEffect(() => {
    if (snackPack.length && !snackbarContent) {
      // Set new snack when we don't have an active one
      setSnackbarContent({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setSnackbarOpen(true);
    } else if (snackPack.length && snackbarContent && snackbarOpen) {
      // Close active snack when new one is added
      setSnackbarOpen(false);
    }
  }, [
    setSnackPack,
    setSnackbarContent,
    setSnackbarOpen,
    snackPack,
    snackbarContent,
    snackbarOpen,
  ]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleExited = () => {
    setSnackbarContent(undefined);
  };

  const handleUndo = () => {
    createTodo(snackbarContent.todo);
  };

  return (
    <Snackbar
      key={snackbarContent ? snackbarContent.key : undefined}
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message={snackbarContent ? snackbarContent.message : undefined}
      action={
        snackbarContent?.todo && (
          <>
            <Button onClick={handleUndo}>Undo</Button>
          </>
        )
      }
      sx={{ maxWidth: "200px" }}
    />
  );
}
