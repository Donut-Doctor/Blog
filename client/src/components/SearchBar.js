import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery("");
    }
  };

  const handleClick = () => {
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}`);
      setQuery("");
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search blog posts..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleClick}>
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
}

export default SearchBar;
