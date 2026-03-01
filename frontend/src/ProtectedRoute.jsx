import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const role = localStorage.getItem("role");

  // Not logged in
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // Wrong role
  if (role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;