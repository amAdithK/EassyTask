import api from "./apiServices";

// Login API Call
export const login = async (email, password) => {
  try {
    const response = await api.post("/login", { email, password });
    return { error: false, data: response.data };
  } catch (error) {
    return {
      error: true,
      data: {
        errors: { password: "Invalid Credentials" },
        error: error.message,
      },
    };
  }
};
