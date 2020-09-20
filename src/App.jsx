import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField, Container, Button } from "@material-ui/core";
import Todos from "./components/Todos";

import db from "./firebase";

export default function App() {
  // All Todos
  const [todos, setTodos] = useState([]);

  // Set Input For Add New Todo
  const [input, setInput] = useState("");

  useEffect(() => {
    // Get Todos From Firebase and Store in state
    db.collection("todos").onSnapshot((snapshot) => {
      setTodos(
        snapshot.docs.map((doc) => ({ _id: doc.id, todo: doc.data().todo }))
      );
    });
  }, []);

  // Add Todo to Firebase
  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
    });
    setInput("");
  };

  return (
    <Container>
      <h1>🔥 Suresh Ramani 💻</h1>
      <form onSubmit={(e) => addTodo(e)}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label="Task"
        />
        <Button
          disabled={!input}
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Todo
        </Button>
      </form>

      <Todos todos={todos} />
    </Container>
  );
}
