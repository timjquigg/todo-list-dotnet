import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserProvider from "./providers/userProvider";
import ColorModeProvider from "./providers/themeProvider";
// import ColorMode

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <>
    <ColorModeProvider>
      <CssBaseline enableColorScheme />
      <UserProvider>
        <App />
      </UserProvider>
    </ColorModeProvider>
  </>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
