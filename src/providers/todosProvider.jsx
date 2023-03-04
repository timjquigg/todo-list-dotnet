import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "./userProvider";

export const todosContext = createContext();

export default function TodosProvider(props) {
  const [todos, setTodos] = useState([]);

  const { token, setToken, email, setEmail, setLoading } =
    useContext(userContext);

  // const getAllTodos = useCallback(async () => {
  //   const res = await axios.get(`/api/TodoItems`);
  //   setTodos(res.data);
  // }, []);

  const getAllTodos = () => {
    axios
      .get("/api/TodoItems")
      .then((res) => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setToken("");
        setEmail("");
      });
  };

  useEffect(() => {
    if (token) {
      getAllTodos();
    }
  }, [token]);

  const createTodo = async (todo) => {
    return axios
      .post("/api/TodoItems", todo)
      .then((res) => {
        setTodos((prev) => {
          const newTodos = [...prev];
          newTodos.push(res.data);
          return newTodos;
        });
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const updateTodo = async ({ id, description, isComplete }) => {
    const todo = { id, description, isComplete };
    return axios
      .put(`/api/TodoItems/${todo.id}`, todo)
      .then((res) => {
        setTodos((prev) => {
          const newTodos = [...prev];
          const index = newTodos.findIndex((todo) => todo.id === id);
          newTodos[index] = res.data;
          return newTodos;
        });
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  const deleteTodo = async (id) => {
    return axios
      .delete(`/api/TodoItems/${id}`)
      .then((res) => {
        setTodos((prev) => {
          const newTodos = prev.filter((el) => el.id !== id);
          return newTodos;
        });
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject(err);
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
