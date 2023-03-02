import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const userContext = createContext();

export default function UserProvider(props) {
  const [token, setToken] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = () => {
    axios
      .get("/api/Users/Refresh")
      .then((res) => {
        const decoded = jwt_decode(res.data.accessToken);
        setToken(res.data.accessToken);
      })
      .catch((err) => {});
  };

  const signUp = (email, password) => {
    const payload = {
      email,
      password,
    };
    axios.post("/api/Users/", payload).then((res) => {
      const decoded = jwt_decode(res.data.accessToken);
      setToken(res.data.accessToken);
    });
  };

  const signIn = (email, password) => {
    const payload = {
      email,
      password,
    };
    axios.post("/api/Users/Login", payload).then((res) => {
      const decoded = jwt_decode(res.data.accessToken);
      setToken(res.data.accessToken);
    });
  };

  const signOut = () => {
    axios.post("/api/Users/Revoke").then((res) => {
      setToken("");
    });
  };

  const providerData = {
    token,
    signUp,
    signIn,
    signOut,
  };

  return (
    <userContext.Provider value={providerData}>
      {props.children}
    </userContext.Provider>
  );
}
