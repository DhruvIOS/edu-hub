import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectToDashboard = () => {
  const { role } = useContext(useAuth);
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      navigate(`/dashboard/${role.toLowerCase()}`);
    } else {
      navigate("/login");
    }
  }, [role, navigate]);

  return null; // Optionally show a spinner here while redirecting
};

export default RedirectToDashboard;
