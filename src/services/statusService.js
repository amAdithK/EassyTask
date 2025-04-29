import { ERROR_MESSAGES } from "../constants/messages";
import api from "./apiServices";

// Get TaskStatus
export const fetchStatus = async () => {
  try {
    const response = await api.get(`/tasks/status`);
    return { error: false, data: response.data };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.DATA_FETCH_ERROR,
    };
  }
};

// Update TaskStatus
export const updateTaskStatus = async (uuid, newStatus) => {
  try {
    const response = await api.put(`/tasks/${uuid}/status`, {
      status: newStatus,
    });
    return {
      error: false,
      data: response.data,
    };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.RECORD_UPDATE,
    };
  }
};
