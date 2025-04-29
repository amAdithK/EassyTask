import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import api from "./apiServices";
import { handleApiError } from "../utilities/custom";

// Get Tasks
export const fetchTasks = async () => {
  try {
    const response = await api.get(`/tasks`);
    return { error: false, data: response.data };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.DATA_FETCH_ERROR,
    };
  }
};

// Create Task
export const createTask = async (taskData) => {
  try {
    const response = await api.post(`/tasks`, taskData);
    return {
      error: false,
      message: SUCCESS_MESSAGES.RECORD_ADD,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Update Task
export const updateTask = async (uuid, taskData) => {
  try {
    const response = await api.put(`/tasks/${uuid}`, taskData);
    return {
      error: false,
      message: SUCCESS_MESSAGES.RECORD_UPDATE,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch Task by ID
export const fetchTaskByID = async (uuid) => {
  try {
    const response = await api.get(`/tasks/${uuid}`);
    return {
      error: false,
      data: response.data,
    };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.DATA_FETCH_ERROR,
    };
  }
};

// Delete Task
export const deleteTask = async (uuid) => {
  try {
    const response = await api.delete(`/tasks/${uuid}`);
    return {
      error: false,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch Tasks by User ID
export const fetchTasksByUserID = async (userUuid, limit) => {
  try {
    const response = await api.get(
      `/tasks?useruuid=${userUuid}&limit=${limit}`
    );
    return {
      error: false,
      data: response.data,
    };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.DATA_FETCH_ERROR,
    };
  }
};

// Fetch Tasks by Company ID
export const fetchTaskByCompany = async (uuid) => {
  try {
    const response = await api.get(`/companies/${uuid}/tasks`);
    return {
      error: false,
      data: response.data,
    };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.DATA_FETCH_ERROR,
    };
  }
};

// Fetch Task Log by Task ID
export const fetchTaskLogByID = async (task_id, limit) => {
  try {
    const response = await api.get(
      limit ? `/tasks/${task_id}/log?limit=${limit}` : `/tasks/${task_id}/log`
    );
    return {
      error: false,
      data: response.data,
    };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.DATA_FETCH_ERROR,
    };
  }
};
