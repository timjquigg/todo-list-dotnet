import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const todosContext = createContext();

export default function TodosProvider(props) {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    const res = await axios.get(`/api/TodoItems`);
    console.log(res.data);
    setTodos(res.data);
  };

  const createTodo = async (todo) => {
    const res = await axios.post("/api/TodoItems", todo);
    console.log(res.data);
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos.push(res.data);
      return newTodos;
    });
  };

  const updateTodo = async ({ id, description, isComplete }) => {
    const todo = { id, description, isComplete };
    await axios.put(`/api/TodoItems/${todo.id}`, todo);
    setTodos((prev) => {
      const newTodos = [...prev];
      const index = newTodos.findIndex((todo) => todo.id === id);
      newTodos[index].description = description;
      newTodos[index].isComplete = isComplete;
      return newTodos;
    });
  };

  const deleteTodo = async (id) => {
    const res = await axios.delete(`/api/TodoItems/${id}`);
  };

  const providerData = { todos, createTodo, updateTodo, deleteTodo };

  return (
    <todosContext.Provider value={providerData}>
      {props.children}
    </todosContext.Provider>
  );
}
