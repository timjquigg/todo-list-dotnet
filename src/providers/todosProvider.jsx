import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "./userProvider";

export const todosContext = createContext();

export default function TodosProvider(props) {
  const [todos, setTodos] = useState([]);

  const { token } = useContext(userContext);

  // const getAllTodos = useCallback(async () => {
  //   const res = await axios.get(`/api/TodoItems`);
  //   setTodos(res.data);
  // }, []);

  const getAllTodos = () => {
    axios
      .get("/api/TodoItems")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    if (token) {
      getAllTodos();
    }
  }, [token]);

  const createTodo = async (todo) => {
    const res = await axios.post("/api/TodoItems", todo);
    setTodos((prev) => {
      const newTodos = [...prev];
      newTodos.push(res.data);
      return newTodos;
    });
  };

  const updateTodo = async ({ id, description, isComplete }) => {
    const todo = { id, description, isComplete };
    const res = await axios.put(`/api/TodoItems/${todo.id}`, todo);
    setTodos((prev) => {
      const newTodos = [...prev];
      const index = newTodos.findIndex((todo) => todo.id === id);
      newTodos[index] = res.data;
      return newTodos;
    });
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/TodoItems/${id}`);
    setTodos((prev) => {
      const newTodos = prev.filter((el) => el.id !== id);
      return newTodos;
    });
  };

  const resetTodos = () => {
    setTodos([]);
  };

  const providerData = {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
    resetTodos,
  };

  return (
    <todosContext.Provider value={providerData}>
      {props.children}
    </todosContext.Provider>
  );
}
