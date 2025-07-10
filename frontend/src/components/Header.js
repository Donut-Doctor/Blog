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
    <div style={{
      background: '#333',
      padding: '10px 20px',
      color: '#fff',
      marginBottom: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>Home</Link>
        {token && (
          <Link to="/create" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>Create Post</Link>
        )}
      </div>
      <div>
        {token ? (
          <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '6px 10px', cursor: 'pointer' }}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
