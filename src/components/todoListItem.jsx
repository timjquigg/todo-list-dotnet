import {
  IconButton,
  Typography,
  TableRow,
  TableCell,
  ButtonGroup,
} from "@mui/material";
import { TaskAlt, Delete, Edit } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import EditTodo from "./editTodo";
import { todosContext } from "../providers/todosProvider";

export default function TodoListItem(props) {
  const id = props.todo.id;
  const [description, setDescription] = useState(props.todo.description);
  const [isComplete, setIsComplete] = useState(props.todo.isComplete);
  const [open, setOpen] = useState(false);
  const { updateTodo } = useContext(todosContext);

  useEffect(() => {
    setDescription(props.todo.description);
    setIsComplete(props.todo.isComplete);
  }, [props]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleComplete = () => {
    console.log(!isComplete);
    updateTodo({
      id,
      description,
      isComplete: !isComplete,
    });
    // setTodo()
  };

  return (
    <TableRow>
      <TableCell sx={{ width: 3 / 4 }}>
        <Typography variant="body" color="primary">
          {description}
        </Typography>
      </TableCell>
      <TableCell size="string" sx={{ width: 1 / 4 }}>
        <ButtonGroup>
          <IconButton onClick={handleComplete}>
            <TaskAlt color="success" />
          </IconButton>
          <IconButton size="string">
            <Delete color="error" />
          </IconButton>
          <IconButton onClick={handleOpen}>
            <Edit color="warning" />
          </IconButton>
        </ButtonGroup>
      </TableCell>
      <EditTodo open={open} setOpen={setOpen} todo={props.todo} />
    </TableRow>
  );
}
