import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Vagabond's Diary</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        {token && <Link to="/create">Create Blog</Link>}
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
