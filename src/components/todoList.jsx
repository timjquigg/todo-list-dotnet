import {
  Box,
  IconButton,
  Table,
  TableBody,
  Typography,
  TableRow,
  TableCell,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import TodoListItem from "./todoListItem";
import { useContext, useState } from "react";
import { todosContext } from "../providers/todosProvider";
import EditTodo from "./editTodo";

export default function TodoList(props) {
  const { todos } = useContext(todosContext);
  const [open, setOpen] = useState(false);

  let incompleteTodoList = [];
  let completedTodoList = [];
  if (todos.length > 0) {
    incompleteTodoList = todos
      .filter((todo) => !todo.isComplete)
      .map((todo, index) => {
        return <TodoListItem todo={todo} key={index} />;
      });

    completedTodoList = todos
      .filter((todo) => todo.isComplete)
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
        <TableBody>
          {incompleteTodoList}
          <TableRow>
            <TableCell>
              <IconButton onClick={handleAdd}>
                <Add color="primary" />
              </IconButton>
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
    </Box>
  );
}
