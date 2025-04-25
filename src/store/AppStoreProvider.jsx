import React, { useReducer } from "react";
import { AppStoreContext } from "./AppStore.jsx";
import { INITIAL_APP_STORE_STATE } from "./config.js";
import AppStoreReducer from "./AppStoreReducer.jsx";
import { sessionStorageGet } from "../utilities/sessionStorage.js";

// AppStoreProvider using useReducer and providing global state
const AppStoreProvider = ({ children }) => {
  const tokenExists = Boolean(sessionStorageGet("access_token"));
  const storedUser = localStorage.getItem("current_user");

  const initialUser = storedUser ? JSON.parse(storedUser) : null;

  const initialState = {
    ...INITIAL_APP_STORE_STATE,
    isAuthenticated: tokenExists,
    currentUser: initialUser,
  };

  const value = useReducer(AppStoreReducer, initialState);

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
};

export default AppStoreProvider;
