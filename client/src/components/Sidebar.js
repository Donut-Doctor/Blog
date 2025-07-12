import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axios";
import "./Sidebar.css";

function Sidebar() {
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/posts?limit=3").then((res) => setRecentPosts(res.data));
    axios.get("/posts").then((res) => {
      const uniqueCats = [...new Set(res.data.map((post) => post.category))];
      setCategories(uniqueCats);
    });
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-section">
        <h3>Search</h3>
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="sidebar-section">
        <h3>Recent Posts</h3>
        <ul>
          {recentPosts.map((post) => (
            <li key={post._id}>
              <a href={`/post/${post._id}`}>{post.title}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>Categories</h3>
        <ul>
          {categories.map((cat, i) => (
            <li key={i}>
              <a href={`/category/${cat}`}>{cat}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3>About</h3>
        <p>
          Vagabond’s Diary is a blog that captures the beauty of travel, nature,
          and urban life — through personal stories and shared experiences.
        </p>
      </div>

      <div className="sidebar-section">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
