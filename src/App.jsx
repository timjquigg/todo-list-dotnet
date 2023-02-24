import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import Banner from "./components/banner";
import TodoList from "./components/todoList";
import useWindowDimensions from "./hooks/useWindowDimensions";
import SnackbarProvider from "./providers/snackbarProvider";
import TodosProvider from "./providers/todosProvider";

function App() {
  const { bodyHeight } = useWindowDimensions();

  return (
    <Container
      className="App"
      sx={{ mx: "auto", my: "auto", width: "600px", maxWidth: "100%" }}
    >
      <Paper
        id="banner"
        elevation={4}
        sx={{ textAlign: "center", height: "auto", mt: "2rem", p: 0 }}
      >
        <Banner />
      </Paper>
      <Paper
        elevation={8}
        sx={{ textAlign: "center", height: bodyHeight, my: "2rem" }}
      >
        <TodosProvider>
          <SnackbarProvider>
            <TodoList />
          </SnackbarProvider>
        </TodosProvider>
      </Paper>
    </Container>
  );
}

export default App;
