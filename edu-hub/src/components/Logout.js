// src/components/LogoutButton/LogoutButton.jsx
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out successfully');
        navigate('/login'); // Redirect to login page
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
