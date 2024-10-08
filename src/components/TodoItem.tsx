import {
  Paper,
  Typography,
  Checkbox,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

type PropsType = {
  todo: TodoItemType;
  deleteHandler: (id: TodoItemType["id"]) => void;
  completeHandler: (id: TodoItemType["id"]) => void;
  editHandler: (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ) => void;
};

const TodoItem = ({
  todo,
  completeHandler,
  deleteHandler,
  editHandler,
}: PropsType) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [textVal, setTextVal] = useState<string>(todo.title);

  return (
    <Paper
      sx={{
        padding: "1rem",
        transition: "all 0.3s",
        backgroundColor: todo.isCompleted ? "#e1bee7" : "#fff",
        ":hover": {
          backgroundColor: "#ede7f6",
        },
      }}
    >
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            value={textVal}
            onChange={(e) => setTextVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && textVal !== "") {
                editHandler(todo.id, textVal);
                setEditActive(false);
              }
            }}
            fullWidth
          />
        ) : (
          <Typography
            sx={{
              marginRight: "auto",
              textDecoration: todo.isCompleted ? "line-through" : "none",
              color: todo.isCompleted ? "#757575" : "#000",
            }}
          >
            {todo.title}
          </Typography>
        )}

        <Checkbox
          checked={todo.isCompleted}
          onChange={() => completeHandler(todo.id)}
          sx={{
            color: "#673ab7",
            "&.Mui-checked": {
              color: "#673ab7",
            },
          }}
        />

        <Button
          onClick={() => deleteHandler(todo.id)}
          sx={{ opacity: 0.7, color: "black", ml: 1 }}
        >
          <Delete />
        </Button>

        <Button
          sx={{
            fontWeight: "600",
            color: "#673ab7",
            ":hover": {
              backgroundColor: "#e1bee7",
            },
          }}
          onClick={() => setEditActive((prev) => !prev)}
        >
          {editActive ? "Done" : "Edit"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TodoItem;
