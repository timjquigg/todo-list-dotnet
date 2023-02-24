import { createContext, useState } from "react";

export const snackbarContext = createContext();

export default function SnackbarProvider(props) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [snackPack, setSnackPack] = useState([]);

  const providerData = {
    snackbarOpen,
    setSnackbarOpen,
    snackbarContent,
    setSnackbarContent,
    snackPack,
    setSnackPack,
  };

  return (
    <snackbarContext.Provider value={providerData}>
      {props.children}
    </snackbarContext.Provider>
  );
}
