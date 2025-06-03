// src/pages/TaskList.jsx
import { useEffect, useState } from "react";
import {
  updateTask,
  fetchTasksByUserID,
  fetchTasks,
} from "../services/taskServices";
import { fetchUsers } from "../services/userService";
import { updateTaskStatus } from "../services/statusService";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import CheckCircle from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Cancel";
import { getUserUuid } from "../utilities/custom";
import "./Dashboard.css";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showClosed, setShowClosed] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [tempNote, setTempNote] = useState("");

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, [showClosed]);

  useEffect(() => {
    const refreshHandler = () => {
      loadTasks();
    };
    window.addEventListener("refresh-task-list", refreshHandler);

    return () => {
      window.removeEventListener("refresh-task-list", refreshHandler);
    };
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const shouldRefresh = localStorage.getItem("refreshTaskList");
        if (shouldRefresh === "true") {
          loadTasks();
          localStorage.removeItem("refreshTaskList");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("refresh") === "true") {
      localStorage.setItem("refreshTaskList", "true");
      // Optionally remove query param from URL
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("refresh") === "true") {
      localStorage.setItem("refreshTaskList", "true");
      // Optionally remove query param from URL
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  const userUuid = getUserUuid();
  const loadTasks = async () => {
    try {
      setLoading(true);
      const response = await fetchTasks(showClosed);
      // const response = await fetchTasksByUserID(userUuid, 5);
      setTasks(response.data || []);
    } catch (error) {
      toast.error("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetchUsers();
      if (response?.data) {
        const formatted = response.data.map((user) => ({
          label: user.name,
          value: user.uuid,
        }));
        setUsers(formatted);
      }
    } catch (error) {
      console.error("User fetch failed", error);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
      toast.success("Status updated!");
      loadTasks();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleAssignUser = async (taskId, userId) => {
    try {
      await updateTask(taskId, { assigned_to_uuid: userId });
      toast.success("User assigned!");
      loadTasks();
    } catch (error) {
      toast.error("Failed to assign user.");
    }
  };

  const updateTaskNote = async (taskId, notes) => {
    try {
      await updateTask(taskId, { note: notes });
      toast.success("Notes Updated Successfully!");
      loadTasks();
    } catch (error) {
      toast.error("Failed to update notes.", error);
    }
  };

  const filteredTasks = showClosed
    ? tasks.filter((task) => task.status === "Closed")
    : tasks.filter((task) => task.status !== "Closed");

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="main">
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h1 className="headingTitle">Task List</h1>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showClosed}
                onChange={() => setShowClosed(!showClosed)}
              />
            }
            label="Show Closed"
            labelPlacement="start"
            sx={{
              "&.MuiFormControlLabel-root": { marginRight: "0" },
              "& .MuiFormControlLabel-label": { fontSize: "14px" },
            }}
          />
        </FormGroup>
      </Grid>

      {filteredTasks.length > 0 ? (
        <div className="taskContainer">
          {filteredTasks.map((task) => (
            <Box className="taskCard" key={task.uuid}>
              <Grid container spacing={2}>
                <Grid size={12}>
                  <label>Company</label>
                  <div className="taskValue">{task.company_name}</div>
                </Grid>
                <Grid size={6}>
                  <label>Created By</label>
                  <div className="taskValue">{task.created_by_name}</div>
                </Grid>
                <Grid size={6}>
                  <label>Due Date</label>
                  <div className="taskValue">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString("en-GB")
                      : "--"}
                  </div>
                </Grid>
                <Grid size={12}>
                  <label>Description</label>
                  <div className="taskValue">{task.description}</div>
                </Grid>
                <Grid size={12}>
                  <label>Note</label>
                  {editingNoteId === task.uuid ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "5px",
                      }}
                    >
                      <textarea
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        className="noteInput"
                        rows={2}
                        style={{
                          flexGrow: 1,
                          fontSize: "14px",
                          padding: "5px",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                        }}
                      />
                      <button
                        onClick={() => {
                          updateTaskNote(task.uuid, tempNote);
                          setEditingNoteId(null);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#4caf50",
                        }}
                        title="Update"
                      >
                        <CheckCircle />
                      </button>
                      <button
                        onClick={() => setEditingNoteId(null)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#f44336",
                        }}
                        title="Cancel"
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="taskValue"
                      onClick={() => {
                        setEditingNoteId(task.uuid);
                        setTempNote(task.note || "");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {task.note || (
                        <i style={{ color: "#888" }}>Click to add a note...</i>
                      )}
                    </div>
                  )}
                </Grid>

                <Grid size={6}>
                  <div className="taskValue">
                    <FormControl fullWidth size="small">
                      <InputLabel id="userStatus">Status</InputLabel>
                      <Select
                        labelId="userStatus"
                        label="Status"
                        value={task.status}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleStatusChange(task.uuid, e.target.value);
                        }}
                        sx={{ "& .MuiSelect-select": { fontSize: "14px" } }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              "& .MuiSelect-select": {
                                fontSize: "14px",
                              },
                              "& .MuiMenuItem-root": {
                                fontSize: "14px",
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value="Open">Open</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Closed">Closed</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
                <Grid size={6}>
                  <div className="taskValue">
                    <FormControl fullWidth size="small">
                      <InputLabel id="assignUser">Assign User</InputLabel>
                      <Select
                        labelId="assignUser"
                        label="Assign User"
                        value={task.assigned_to_uuid || ""}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleAssignUser(task.uuid, e.target.value);
                        }}
                        sx={{ "& .MuiSelect-select": { fontSize: "14px" } }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              "& .MuiMenuItem-root": {
                                fontSize: "14px",
                              },
                            },
                          },
                        }}
                      >
                        {users.map((user) => (
                          <MenuItem key={user.value} value={user.value}>
                            {user.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>
            </Box>
          ))}
        </div>
      ) : (
        <Alert severity="error">No tasks found.</Alert>
      )}
    </div>
  );
}
