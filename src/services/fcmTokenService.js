import { ERROR_MESSAGES } from "../constants/messages";
import api from "./apiServices";

// Post TaskStatus
export const updateFcmToken = async (fbToken) => {
  try {
    const response = await api.post(`/fcm/store`, {
      token: fbToken,
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
