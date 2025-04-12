// /src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState("");

  const login = (roleType, userFirstName) => {
    setRole(roleType);
    setFirstName(userFirstName);
  };

  const logout = () => {
    setRole(null);
    setFirstName("");
  };

  return (
    <AuthContext.Provider value={{ role, firstName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
