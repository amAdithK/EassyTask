import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import api from "./apiServices";
import { handleApiError } from "../utilities/custom";

// Get Users
export const fetchUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return { error: false, data: response.data };
  } catch {
    return { error: true, data: null };
  }
};

// Get User By Id
export const fetchUserById = async (uuid) => {
  try {
    const response = await api.get(`/users/${uuid}`);
    return { error: false, data: response.data ? response.data : null };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.DATA_FETCH_ERROR,
    };
  }
};

// Create User
export const createUser = async (userData) => {
  try {
    const response = await api.post(`/users`, userData);
    return {
      error: false,
      message: SUCCESS_MESSAGES.RECORD_ADD,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Update User
export const updateUser = async (uuid, userData) => {
  try {
    const response = await api.put(`/users/${uuid}`, userData);
    return {
      error: false,
      message: SUCCESS_MESSAGES.RECORD_UPDATE,
      data: response.data,
    };
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete User
export const deleteUser = async (uuid) => {
  try {
    const response = await api.delete(`/users/${uuid}`);
    return { error: false, data: response.data };
  } catch {
    return { error: true, data: null };
  }
};

// Update User Password
export const updateUserPassword = async (uuid, userData) => {
  try {
    const response = await api.put(`/users/${uuid}/change-password`, userData);
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
