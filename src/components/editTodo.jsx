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
  const [description, setDescription] = useState(todo.description);
  // const [complete, setComplete] = useState(todo.isComplete);

  const { updateTodo } = useContext(todosContext);

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
    updateTodo({ description, id: todo.id, iscomplete: todo.iscomplete });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth={true}>
      <DialogTitle color="primary" textAlign="center">
        Edit Todo
      </DialogTitle>
      <DialogContent>
        <TextField
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
