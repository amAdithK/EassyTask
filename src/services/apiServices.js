import axios from "axios";
import { URLS } from "../constants/urls";
import {
  sessionStorageDelete,
  sessionStorageGet,
} from "../utilities/sessionStorage";

const api = axios.create({
  baseURL: URLS.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const token = sessionStorageGet("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handling 401 Unauthorized error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 && localStorage.getItem("current_user")) {
      sessionStorageDelete("access_token"); // Clear token
      ["current_user", "financialYearUuid"].forEach((key) =>
        localStorage.removeItem(key)
      );
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default api; // Export axios instance
