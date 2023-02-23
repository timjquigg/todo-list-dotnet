import { Paper } from "@mui/material";
import { Box, Container } from "@mui/system";
import Banner from "./components/banner";
import TodoList from "./components/todoList";
import useWindowDimensions from "./hooks/useWindowDimensions";
import TodosProvider from "./providers/todosProvider";

function App() {
  const { bannerHeight, bodyHeight } = useWindowDimensions();

  // const bodyHeight =
  //   windowdimensions.height -
  //   bannerHeight -
  //   6 * parseFloat(getComputedStyle(document.documentElement).fontSize);

  return (
    <Container
      className="App"
      sx={{ mx: "auto", my: "auto", width: "600px", maxWidth: "100%" }}
    >
      <Paper
        id="banner"
        sx={{ textAlign: "center", height: "auto", mt: "2rem", p: 0 }}
      >
        <Banner />
      </Paper>
      <Paper sx={{ textAlign: "center", height: bodyHeight, my: "2rem" }}>
        <TodosProvider>
          <TodoList />
        </TodosProvider>
      </Paper>
    </Container>
  );
}

export default App;
