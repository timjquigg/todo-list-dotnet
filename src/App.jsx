// import { useTheme } from "@emotion/react";
import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import { useContext } from "react";
import Banner from "./components/banner";
import Landing from "./components/landing";
import TodoList from "./components/todoList";
import useWindowDimensions from "./hooks/useWindowDimensions";
import { userContext } from "./providers/userProvider";
import FeedbackMessage from "./components/feedbackMessage";

function App() {
  const { bodyHeight } = useWindowDimensions();
  const { token } = useContext(userContext);

  return (
    <Container
      className="App"
      sx={{ mx: "auto", my: "auto", width: "600px", maxWidth: "100%" }}
    >
      <Banner />
      {token ? (
        <Paper
          elevation={8}
          sx={{ textAlign: "center", minHeight: bodyHeight, my: "2rem" }}
        >
          <TodoList />
        </Paper>
      ) : (
        <Landing />
      )}
      <FeedbackMessage />
    </Container>
  );
}

export default App;
