// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();         // Clear auth state and sign out
    navigate('/');    // Redirect to home
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">EDU-HUB</Link>
      
      <div className="navbar-right">
        <Link to="/about">About Us</Link>
        <span className="divider">|</span>
        <Link to="/contact">Help</Link>

        {currentUser && (
          <>
            <span className="divider">|</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
