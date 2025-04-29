import { fetchFinYear } from "../services/finyearService";
// import { saveAs } from "file-saver";
import { toast } from "react-toastify";

// Function to fetch the logged-in user ID
export const getUserUuid = () => {
  return JSON.parse(localStorage.getItem("current_user") || "{}")?.userDetail
    ?.uuid;
};

// Function to format date input as "28-02-2025"
export const formatDateInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Function to format date input for text as "28/02/2025"
export const formatDateInputForText = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to format date output "28/02/2025"
export const formatDateOutput = (dateString) => {
  if (!dateString) return "";
  return dateString.split("T")[0];
};

// Function to fetch the current financial year
export const getCurrentFinYear = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const startYear = currentMonth < 4 ? currentYear - 1 : currentYear;
  const endYear = startYear + 1;
  return `${startYear}-${endYear.toString().slice(-2)}`;
};

// Function to fetch and store the financial year UUID on login
export const storeFinYear = async () => {
  try {
    const finYearData = await fetchFinYear();
    if (finYearData?.data) {
      const currentFinYear = getCurrentFinYear();
      const finYearUuid = finYearData.data.find(
        (finyear) => finyear.financial_year === currentFinYear
      );
      if (finYearUuid) {
        localStorage.setItem("financialYearUuid", finYearUuid.uuid);
      }
    }
  } catch {
    console.error("Error fetching year uuid");
  }
};

// Function to fetch the financial year UUID
export const getFinYearUuid = () => {
  const financialYearUuid = localStorage.getItem("financialYearUuid");
  return financialYearUuid;
};

// Function to handle API errors
export const handleApiError = (error) => {
  const errors = error;
  return {
    error: true,
    message: errors.response.data.message,
    errors: errors.response.data.errors || {},
  };
};

// Handling 422 Error Function
export const resolveApiResponse = async (responseData, callbacks) => {
  if (responseData?.error) {
    toast.error(responseData?.message);
    if (responseData.errors) {
      return callbacks.onValidationError?.(responseData.errors);
    } else {
      return callbacks.onError?.(responseData.errors);
    }
  } else {
    toast.success(responseData?.message);
    return callbacks.onSuccess?.(responseData?.data);
  }
};
