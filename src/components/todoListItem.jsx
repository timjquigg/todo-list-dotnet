import {
  IconButton,
  Typography,
  TableRow,
  TableCell,
  ButtonGroup,
  Tooltip,
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
import { snackbarContext } from "../providers/snackbarProvider";

export default function TodoListItem(props) {
  const id = props.todo.id;
  const [description, setDescription] = useState(props.todo.description);
  const [isComplete, setIsComplete] = useState(props.todo.isComplete);
  const [dateCompleted, setDateCompeted] = useState(props.todo.dateCompleted);
  const [open, setOpen] = useState(false);
  const { setSnackPack } = useContext(snackbarContext);
  const { updateTodo, deleteTodo } = useContext(todosContext);

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

    setSnackPack((prev) => [
      ...prev,
      {
        message: `${description} \
         ${!isComplete ? "Marked Complete" : "Marked Incomplete"}`,
        key: new Date().getTime(),
      },
    ]);
  };

  const handleDelete = () => {
    deleteTodo(id);
    // setSnackbarOpen(true);
    setSnackPack((prev) => [
      ...prev,
      {
        message: `${description} - Deleted`,
        key: new Date().getTime(),
        todo: { id, description, isComplete, dateCompleted },
      },
    ]);
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ width: isComplete ? 2 / 5 : 2 / 5 }}>
          <Typography
            variant="body1"
            color="secondary.dark"
            sx={{ textDecoration: isComplete ? "line-through" : "" }}
          >
            {description}
          </Typography>
        </TableCell>
        {isComplete && (
          <TableCell>
            <Typography
              variant="body1"
              textAlign="center"
              color="secondary.dark"
            >
              {dateCompleted &&
                formatDistanceToNow(new Date(dateCompleted), {
                  addSuffix: true,
                })}
            </Typography>
          </TableCell>
        )}
        <TableCell size="string" sx={{ alignContent: "flex-end" }}>
          <ButtonGroup>
            <Tooltip title={!isComplete ? "Edit" : ""}>
              <IconButton onClick={handleOpen} disabled={isComplete} hidden>
                <Edit
                  sx={{
                    color: (theme) =>
                      isComplete
                        ? theme.palette.background.paper
                        : theme.palette.secondary.main,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="string" onClick={handleDelete}>
                <Delete color="secondary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={isComplete ? "Mark Incomplete" : "Mark Complete"}>
              <IconButton onClick={handleComplete}>
                {isComplete ? (
                  <CheckBoxOutlined color="secondary" />
                ) : (
                  <CheckBoxOutlineBlankOutlined color="secondary" />
                )}
              </IconButton>
            </Tooltip>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <EditTodo open={open} setOpen={setOpen} todo={props.todo} />
    </>
  );
}
