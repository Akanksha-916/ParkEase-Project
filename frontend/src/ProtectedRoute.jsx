import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roleRequired }) => {

  const role = localStorage.getItem("role");

  if (!role) {

    if (roleRequired === "admin") {
      return <Navigate to="/admin-auth" replace />;
    }

    if (roleRequired === "owner") {
      return <Navigate to="/owner-auth" replace />;
    }

    return <Navigate to="/user-auth" replace />;
  }

  if (role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;