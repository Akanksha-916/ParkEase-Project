import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/user-auth" replace />;
  }

  if (role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;