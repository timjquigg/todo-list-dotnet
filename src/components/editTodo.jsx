import { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { todosContext } from "../providers/todosProvider";
import { snackbarContext } from "../providers/snackbarProvider";

export default function EditTodo(props) {
  const { open, setOpen, todo } = props;
  const [description, setDescription] = useState(todo.description ?? "");
  const [errorMessage, setErrorMessage] = useState("");
  const elementId = `editTodo${todo.id ?? ""}`;
  const { updateTodo, createTodo } = useContext(todosContext);
  const { setSnackPack } = useContext(snackbarContext);

  const handleClose = () => {
    setDescription(todo.description ?? "");
    setOpen(false);
  };

  const handleEdit = (value) => {
    setDescription(value);
    setErrorMessage("");
  };

  const handleCancel = () => {
    handleClose();
    setDescription(todo.description);
  };

  const handleSave = () => {
    if (description.length === 0) {
      setErrorMessage("Description is required");
      return;
    }

    if (todo.id) {
      updateTodo({ description, id: todo.id, isComplete: todo.isComplete })
        .then((res) => {
          handleClose();
          setSnackPack((prev) => [
            ...prev,
            {
              message: `${description} updated successfully.`,
              key: new Date().getTime(),
            },
          ]);
        })
        .catch((err) => {
          //
        });
      return;
    }

    createTodo({ description, isComplete: todo.isComplete })
      .then((res) => {
        handleClose();
        setSnackPack((prev) => [
          ...prev,
          {
            message: `${description} created successfully.`,
            key: new Date().getTime(),
          },
        ]);
        setDescription(todo.description ?? "");
      })
      .catch((err) => {
        //
      });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle color="primary" textAlign="center">
        {todo.id ? "Edit Todo" : "Create Todo"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id={elementId}
          color="secondary"
          autoFocus
          multiline
          fullWidth
          error={errorMessage.length > 0}
          helperText={errorMessage}
          variant="filled"
          value={description}
          onChange={(e) => handleEdit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSave();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        {/* <Button color="secondary" onClick={handleCancel}> */}
        <Button
          onClick={handleCancel}
          sx={{ color: (theme) => theme.palette.secondary.main }}
        >
          Cancel
        </Button>
        {/* <Button color="primary" onClick={handleSave}> */}
        <Button
          onClick={handleSave}
          sx={{ color: (theme) => theme.palette.primary.dark }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
