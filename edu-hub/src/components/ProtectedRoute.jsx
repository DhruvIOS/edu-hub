import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role } = useAuth();

  if (!allowedRoles.includes(role)) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
