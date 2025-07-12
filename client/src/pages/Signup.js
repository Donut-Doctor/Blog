import React, { useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup}>
        <input name="username" type="text" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Signup;
