import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import TaskItem from "./Task";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";

export default function TaskList({ status }) {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const q = query(collection(db, "tasks"), where("status", "==", status));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tasksData = [];
      querySnapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, [status]);

  const handleAddTask = async () => {
    if (!newTaskTitle || !dueDate) return alert("Fill all fields");
    try {
      await addDoc(collection(db, "tasks"), {
        title: newTaskTitle,
        dueDate: new Date(dueDate).toISOString(),
        status: "new",
        createdAt: serverTimestamp(),
      });
      setNewTaskTitle("");
      setDueDate("");
      // Trigger push notification here if desired
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <Box sx={{ mt: 3 }}>
      {status === "new" && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Add Task</Typography>
          <Stack spacing={2} direction="row">
            <TextField
              label="Task"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              size="small"
            />
            <TextField
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              size="small"
            />
            <Button variant="contained" onClick={handleAddTask}>
              Add
            </Button>
          </Stack>
        </Box>
      )}
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </Box>
  );
}
