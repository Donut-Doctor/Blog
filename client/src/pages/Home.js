import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import Categories from "../components/Categories";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import Loader from "../components/Loader";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/posts?page=${page}&limit=6`);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...res.data]);
      }
    } catch (err) {
      console.error("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <>
      <Hero />
      <Welcome />
      <Categories />

      <div className="main-layout">
        <div className="posts-section">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
          {loading && <Loader />}
          {hasMore && !loading && (
            <button className="load-more" onClick={() => setPage((p) => p + 1)}>
              Load More
            </button>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Home;
