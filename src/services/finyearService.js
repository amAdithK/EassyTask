import { ERROR_MESSAGES } from "../constants/messages";
import api from "./apiServices";

export const fetchFinYear = async () => {
  try {
    const response = await api.get(`/financial-years`);
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

export const createFinYear = async () => {
  try {
    const response = await api.post(`/financial-years`);
    return {
      error: false,
      data: response.data,
    };
  } catch {
    return {
      error: true,
      message: ERROR_MESSAGES.RECORD_ADD,
    };
  }
};
