import {
  IconButton,
  Typography,
  TableRow,
  TableCell,
  ButtonGroup,
} from "@mui/material";
import {
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
  Delete,
  Edit,
} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import EditTodo from "./editTodo";
import { todosContext } from "../providers/todosProvider";
import { formatDistanceToNow } from "date-fns";

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
    updateTodo({
      id,
      description,
      isComplete: !isComplete,
    });
  };

  console.log(props.todo.dateCompleted);
  console.log(formatDistanceToNow(new Date(props.todo.dateCompleted)));

  return (
    <TableRow>
      <TableCell sx={{ width: 3 / 4 }}>
        <Typography
          variant="body1"
          color="primary"
          sx={{ textDecoration: isComplete ? "line-through" : "" }}
        >
          {description}
        </Typography>
      </TableCell>
      <TableCell size="string" colSpan={1}>
        <ButtonGroup>
          <IconButton onClick={handleComplete}>
            {isComplete ? (
              <CheckBoxOutlined />
            ) : (
              <CheckBoxOutlineBlankOutlined />
            )}
          </IconButton>
          <IconButton size="string">
            <Delete color="error" />
          </IconButton>
          {!isComplete && (
            <IconButton onClick={handleOpen}>
              <Edit color="primary" />
            </IconButton>
          )}
        </ButtonGroup>
      </TableCell>
      {isComplete && (
        <TableCell>
          {props.todo.dateCompleted &&
            formatDistanceToNow(new Date(props.todo.dateCompleted), {
              addSuffix: true,
            })}
        </TableCell>
      )}
      <EditTodo open={open} setOpen={setOpen} todo={props.todo} />
    </TableRow>
  );
}
