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

export default function EditTodo(props) {
  const { open, setOpen, todo } = props;
  const [description, setDescription] = useState(todo.description ?? "");
  const elementId = `editTodo${todo.id ?? ""}`;
  const { updateTodo, createTodo } = useContext(todosContext);

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (value) => {
    setDescription(value);
  };

  const handleCancel = () => {
    handleClose();
    setDescription(todo.description);
  };

  const handleSave = () => {
    handleClose();
    if (todo.id) {
      updateTodo({ description, id: todo.id, isComplete: todo.isComplete });
      return;
    }
    createTodo({ description, isComplete: todo.isComplete });
    setDescription(todo.description ?? "");
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle color="primary" textAlign="center">
        {todo.id ? "Edit Todo" : "Create Todo"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id={elementId}
          autoFocus
          fullWidth
          value={description}
          onChange={(e) => handleEdit(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleCancel}>
          Cancel
        </Button>
        <Button color="success" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
