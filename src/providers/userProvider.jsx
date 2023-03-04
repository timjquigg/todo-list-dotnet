import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const userContext = createContext();

export default function UserProvider(props) {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = () => {
    axios
      .get("/api/Users/Refresh")
      .then((res) => {
        setLoading(false);
        const decoded = jwt_decode(res.data.accessToken);
        setEmail(decoded.email);
        setToken(res.data.accessToken);
      })
      .catch((err) => {
        setLoading(false);
        setToken("");
        setEmail("");
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
        setEmail(decoded.email);
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
        setEmail(decoded.email);
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

  const updatePassword = (oldPassword, newPassword) => {
    const payload = {
      email,
      oldPassword,
      newPassword,
    };

    return axios
      .put(`/api/Users/${email}`, payload)
      .then((res) => {
        const decoded = jwt_decode(res.data.accessToken);
        setToken(res.data.accessToken);
        return Promise.resolve();
      })
      .catch((err) => {
        if (Array.isArray(err.response.data)) {
          return Promise.reject(err.response.data);
        }
        return Promise.reject([{ description: err.response.data }]);
      });
  };

  const providerData = {
    token,
    setToken,
    signUp,
    signIn,
    signOut,
    updatePassword,
    email,
    setEmail,
    loading,
    setLoading,
  };

  return (
    <userContext.Provider value={providerData}>
      {props.children}
    </userContext.Provider>
  );
}
