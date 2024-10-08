import {
  AppBar,
  Container,
  Stack,
  Toolbar,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import TodoItem from "./components/TodoItem";
import { getTodos, saveTodos } from "./utils/features";

const App = () => {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());
  const [title, setTitle] = useState<TodoItemType["title"]>("");

  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.isCompleted = !i.isCompleted;
      return i;
    });
    setTodos(newTodos);
  };

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((i) => i.id !== id);
    setTodos(newTodos);
  };

  const editHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    const newTodos: TodoItemType[] = todos.map((i) => {
      if (i.id === id) i.title = newTitle;
      return i;
    });
    setTodos(newTodos);
  };

  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };
    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "2rem",
      }}
    >
      <AppBar position="static" sx={{ mb: 4, backgroundColor: "#673ab7" }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack
        height={"60%"}
        width="100%"
        direction={"column"}
        spacing={"1rem"}
        p={"1rem"}
        sx={{
          overflowY: "auto",
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {todos.map((i) => (
          <TodoItem
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            key={i.id}
            todo={i}
            editHandler={editHandler}
          />
        ))}
      </Stack>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label={"New Task"}
        sx={{ mt: 2 }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") submitHandler();
        }}
      />

      <Button
        sx={{
          mt: 2,
          backgroundColor: "#673ab7",
          color: "white",
          ":hover": {
            backgroundColor: "#5e35b1",
          },
        }}
        fullWidth
        variant="contained"
        onClick={submitHandler}
        disabled={title === ""}
      >
        ADD
      </Button>
    </Container>
  );
};

export default App;
