// src/pages/TaskList.jsx
import { useEffect, useState } from "react";
import { fetchTasks, updateTask } from "../services/taskServices";
import { fetchUsers } from "../services/userService";
import { updateTaskStatus } from "../services/statusService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import './Dashboard.css';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showClosed, setShowClosed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
    loadUsers();
  }, []);

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
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
          marginBottom: '15px'
        }}
      >
        <h1 className="headingTitle">Task List</h1>
        <FormGroup>
          <FormControlLabel control={<Switch
            checked={showClosed}
            onChange={() => setShowClosed(!showClosed)}
          />}
            label="Show Closed"
            labelPlacement="start"
            sx={{
              '&.MuiFormControlLabel-root': { marginRight: '0' },
              '& .MuiFormControlLabel-label': { fontSize: '14px' }
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
                  <div className="taskValue">{task.note}</div>
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
                        sx={{ '& .MuiSelect-select': { fontSize: '14px' } }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              '& .MuiSelect-select': {
                                fontSize: '14px',
                              },
                              '& .MuiMenuItem-root': {
                                fontSize: '14px',
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
                        sx={{ '& .MuiSelect-select': { fontSize: '14px' } }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              '& .MuiMenuItem-root': {
                                fontSize: '14px',
                              },
                            },
                          },
                        }}
                      >
                        {users.map((user) => (
                          <MenuItem key={user.value} value={user.value}>{user.label}</MenuItem>
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
