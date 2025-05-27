import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
