import { Box, Table, TableBody, Typography } from "@mui/material";
import TodoListItem from "./todoListItem";
import { useContext } from "react";
import { todosContext } from "../providers/todosProvider";

export default function TodoList(props) {
  const { todos } = useContext(todosContext);

  const todoList = todos.map((todo, index) => {
    return <TodoListItem todo={todo} key={index} />;
  });

  return (
    <Box sx={{ p: "1rem" }}>
      <Typography color="primary" variant="h4">
        Outstanding
      </Typography>
      <Table>
        <TableBody>{todoList}</TableBody>
      </Table>
    </Box>
  );
}
