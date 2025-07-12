import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const token = localStorage.getItem("token");

  return (
    <nav>
      <h1 className="logo">
        <Link to="/">VAGABOND’S DIARY</Link>
      </h1>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        {!token && <NavLink to="/login">Login</NavLink>}
        {!token && <NavLink to="/signup">Sign Up</NavLink>}
        {token && <NavLink to="/create">Create</NavLink>}
        {token && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="logout-btn"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
