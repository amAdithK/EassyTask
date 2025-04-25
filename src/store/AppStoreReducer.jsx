// AppStoreReducer.js - Handle actions like LOG_IN, LOG_OUT, etc.
const AppStoreReducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN":
      localStorage.setItem("current_user", JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.payload,
      };
    case "LOG_OUT":
      localStorage.removeItem("current_user");
      sessionStorage.clear();
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
