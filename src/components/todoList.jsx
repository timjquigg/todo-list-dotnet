import {
  Box,
  IconButton,
  Table,
  TableBody,
  Typography,
  TableRow,
  TableCell,
  TableHead,
  Tooltip,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import TodoListItem from "./todoListItem";
import { useContext, useState } from "react";
import { todosContext } from "../providers/todosProvider";
import EditTodo from "./editTodo";
import FeedbackMessage from "./feedbackMessage";

export default function TodoList(props) {
  const { todos } = useContext(todosContext);
  const [open, setOpen] = useState(false);

  let incompleteTodoList = [];
  let completedTodoList = [];
  if (todos.length > 0) {
    incompleteTodoList = todos
      .filter((todo) => !todo.isComplete)
      .sort((left, right) => left.id - right.id)
      .map((todo, index) => {
        return <TodoListItem todo={todo} key={index} />;
      });

    completedTodoList = todos
      .filter((todo) => todo.isComplete)
      .sort((left, right) => left.id - right.id)
      .map((todo, index) => {
        return <TodoListItem todo={todo} key={index} />;
      });
  }

  const handleAdd = () => {
    setOpen(true);
  };

  return (
    <Box sx={{ p: "1rem" }}>
      {incompleteTodoList.length > 0 && (
        <Typography color="primary" variant="h4">
          Outstanding
        </Typography>
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 14 / 20, px: 0 }}>
              <Typography variant="h6" textAlign="left" color="primary">
                Description
              </Typography>
            </TableCell>
            <TableCell sx={{ width: 6 / 20, px: 0 }}>
              <Typography variant="h6" textAlign="center" color="primary">
                Actions
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incompleteTodoList}
          <TableRow>
            <TableCell>
              <Tooltip title="Add">
                <IconButton onClick={handleAdd}>
                  <Add sx={{ color: (theme) => theme.palette.primary.main }} />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {completedTodoList.length > 0 && (
        <>
          <Typography color="primary" variant="h4">
            Completed
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 7 / 20, px: 0 }}>
                  <Typography variant="h6" textAlign="left" color="primary">
                    Description
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: 7 / 20, px: 0 }}>
                  <Typography variant="h6" textAlign="center" color="primary">
                    Completed
                  </Typography>
                </TableCell>
                <TableCell sx={{ width: 5 / 20, px: 0 }}>
                  <Typography variant="h6" textAlign="center" color="primary">
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{completedTodoList}</TableBody>
          </Table>
        </>
      )}
      <EditTodo
        // class="editTodo"
        open={open}
        setOpen={setOpen}
        todo={{ id: null, description: "", completed: false }}
      />
      <FeedbackMessage />
    </Box>
  );
}
