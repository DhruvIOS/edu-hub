// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // If you store roles in your database, you can get it here.
        // Example: you could use Firebase user metadata or other logic to fetch the role.
      } else {
        setCurrentUser(null);
        setRole(null);
        setFirstName(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = (role, firstName) => {
    setRole(role);
    setFirstName(firstName);
  };

  const logout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setCurrentUser(null); // Clear state
      setRole(null);
      setFirstName(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, role, firstName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
