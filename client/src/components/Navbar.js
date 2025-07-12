import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo" onClick={() => navigate("/")}>VAGABOND'S DIARY</h1>
      </div>

      <div className="nav-center">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/left" className="nav-link">Left Sidebar</NavLink>
        <NavLink to="/right" className="nav-link">Right Sidebar</NavLink>
        <NavLink to="/no-sidebar" className="nav-link">No Sidebar</NavLink>
      </div>

      <div className="nav-right">
        <SearchBar />
        {token ? (
          <>
            <NavLink to="/create" className="nav-link">New Post</NavLink>
            <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
