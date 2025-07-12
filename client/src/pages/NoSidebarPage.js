import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import axios from "../services/axios";

function NoSidebarPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="container">
      <h2 style={{ marginTop: "2rem", color: "#3f51b5" }}>All Posts</h2>
      <div className="posts-section">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default NoSidebarPage;
