import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const userContext = createContext();

export default function UserProvider(props) {
  const [token, setToken] = useState("");
  // const [errorMessage, setErrorMessage] = useState([]);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = () => {
    axios
      .get("/api/Users/Refresh")
      .then((res) => {
        // setErrorMessage("");
        const decoded = jwt_decode(res.data.accessToken);
        setToken(res.data.accessToken);
      })
      .catch((err) => {
        // console.log(err);
        // setErrorMessage(err.response.data);
      });
  };

  const signUp = (email, password) => {
    const payload = {
      email,
      password,
    };
    return axios
      .post("/api/Users/", payload)
      .then((res) => {
        // setErrorMessage("");
        const decoded = jwt_decode(res.data.accessToken);
        setToken(res.data.accessToken);
        return Promise.resolve();
      })
      .catch((err) => {
        // setErrorMessage(err.response.data);
        return Promise.reject(err.response.data);
      });
  };

  const signIn = (email, password) => {
    const payload = {
      email,
      password,
    };
    return axios
      .post("/api/Users/Login", payload)
      .then((res) => {
        // setErrorMessage("");
        const decoded = jwt_decode(res.data.accessToken);
        setToken(res.data.accessToken);
        return Promise.resolve();
      })
      .catch((err) => {
        return Promise.reject([{ description: err.response.data }]);
        // setErrorMessage(err.response.data)
      });
  };

  const signOut = () => {
    axios
      .post("/api/Users/Revoke")
      .then((res) => {
        // setErrorMessage("");
        setToken("");
      })
      .catch((err) => {
        //  setErrorMessage(err.response.data)
      });
  };

  const providerData = {
    token,
    // errorMessage,
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
