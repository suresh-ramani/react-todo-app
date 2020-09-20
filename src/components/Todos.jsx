import React, { useState } from "react";
import {
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  ListItemText,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import PencilIcon from "@material-ui/icons/Edit";

import db from "../firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Todos(props) {
  // For Open Model
  const [open, setOpen] = useState(false);

  // Set Current Todo
  const [todo, setTodo] = useState({});

  // Show Toast Message
  const [openSnackbar, setSnackbarVisi] = useState(false);

  // Set Toast Message
  const [toastMessage, setToastMessage] = useState("");

  // Open Model and Set Current Todo
  const openModal = ({ todo, _id }) => {
    setTodo({ todo, _id });
    setOpen(true);
  };

  // Clode Model and Remove Current Todo
  const closeModal = () => {
    setTodo({});
    setOpen(false);
  };

  // Update Current Todo, Close Model and Show Toast Message
  const updateTodo = () => {
    db.collection("todos").doc(todo._id).update({
      todo: todo.todo,
    });
    closeModal();
    setToastMessage("Task Updated Successfully!!");
    setSnackbarVisi(true);
  };

  // Delete Todo and Show Toast Message
  const deleteTodo = (_id) => {
    db.collection("todos").doc(_id).delete();
    setToastMessage("Task Deleted Successfully!!");
    setSnackbarVisi(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Todo"
            value={todo.todo || ""}
            onChange={(event) =>
              setTodo({ _id: todo._id, todo: event.target.value })
            }
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={updateTodo} disabled={!todo.todo} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <List>
        {props.todos.map(({ todo, _id }, key) => (
          <ListItem key={key}>
            <ListItemText primary={todo} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={(event) => openModal({ todo, _id })}
              >
                <PencilIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => deleteTodo(_id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={(event) => setSnackbarVisi(false)}
      >
        <Alert onClose={(event) => setSnackbarVisi(false)} severity="success">
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
