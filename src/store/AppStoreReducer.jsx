// AppStoreReducer.js - Handle actions like LOG_IN, LOG_OUT, etc.
const AppStoreReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      localStorage.setItem("access_token", action.payload.token); // <-- Save token here
      localStorage.setItem("current_user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };

    case "LOG_OUT":
      localStorage.removeItem("access_token");
      localStorage.removeItem("current_user");
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
      };

    default:
      return state;
  }
};
export default AppStoreReducer;
