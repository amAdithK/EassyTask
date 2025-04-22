import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

export default function Task({ task }) {
  const handleStatusChange = async (newStatus) => {
    try {
      await updateDoc(doc(db, "tasks", task.id), { status: newStatus });
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task status");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Delete this task permanently?")) {
      try {
        await deleteDoc(doc(db, "tasks", task.id));
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task");
      }
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography color="textSecondary">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {task.status === "new" && (
            <>
              <Button
                variant="contained"
                onClick={() => handleStatusChange("in-progress")}
              >
                Start
              </Button>
              <Button variant="outlined" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
          {task.status === "in-progress" && (
            <>
              <Button
                variant="contained"
                onClick={() => handleStatusChange("done")}
              >
                Complete
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleStatusChange("new")}
              >
                Cancel
              </Button>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
