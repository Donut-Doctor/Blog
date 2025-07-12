import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useLocation } from "react-router-dom";
import PostCard from "../components/PostCard";

function SearchResults() {
  const [results, setResults] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    if (query) {
      axios.get(`/posts/search?q=${query}`).then((res) => setResults(res.data));
    }
  }, [query]);

  return (
    <div className="container">
      <h2>Search results for: "{query}"</h2>
      <div className="grid">
        {results.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {results.length === 0 && <p>No posts found.</p>}
      </div>
    </div>
  );
}

export default SearchResults;
