import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
        {token && <Link to="/create">Create</Link>}
        {token && <Link to="/dashboard">Dashboard</Link>}
        {token && <Link to="/profile">Profile</Link>}
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
