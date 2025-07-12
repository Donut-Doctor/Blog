import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../services/axios";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import "./SearchResultsPage.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResultsPage() {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      axios.get(`/posts/search?q=${query}`).then((res) => {
        setResults(res.data);
        setLoading(false);
      });
    }
  }, [query]);

  return (
    <div className="search-results container">
      <h2>Search Results for: "{query}"</h2>
      {loading ? (
        <Loader />
      ) : results.length > 0 ? (
        <div className="results-grid">
          {results.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default SearchResultsPage;
