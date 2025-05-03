// src/pages/TaskList.jsx
import { useEffect, useState } from "react";
import { fetchTasks, updateTask } from "../services/taskServices";
import { fetchUsers } from "../services/userService";
import { updateTaskStatus } from "../services/statusService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Task List</h1>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showClosed}
            onChange={() => setShowClosed(!showClosed)}
            className="accent-blue-500"
          />
          <span className="text-sm">Show Closed</span>
        </label>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="overflow-x">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="px-4 py-2 font-medium">Company</th>
                <th className="px-4 py-2 font-medium">Created By</th>
                <th className="px-4 py-2 font-medium">Due Date</th>
                <th className="px-4 py-2 font-medium">Description</th>
                <th className="px-4 py-2 font-medium">Note</th>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Assign User</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr
                  key={task.uuid}
                  className="hover:bg-gray-100 cursor-pointer"
                  // onClick={() => navigate(`/task/${task.uuid}`)}
                >
                  <td className="px-4 py-3">{task.company_name}</td>
                  <td className="px-4 py-3">{task.created_by_name}</td>
                  <td className="px-4 py-3">
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString("en-GB")
                      : "--"}
                  </td>
                  <td className="px-4 py-3">{task.description}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {task.note}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={task.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusChange(task.uuid, e.target.value);
                      }}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={task.assigned_to_uuid || ""}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleAssignUser(task.uuid, e.target.value);
                      }}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="">Assign User</option>
                      {users.map((user) => (
                        <option key={user.value} value={user.value}>
                          {user.label}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-500 p-8">No tasks found.</div>
      )}
    </div>
  );
}
