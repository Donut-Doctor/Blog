import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import axios from "../services/axios";
import "./SidebarLayout.css";

function RightSidebarPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="sidebar-layout">
      <div className="content-area">
        <h2>Latest Posts</h2>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
      <Sidebar />
    </div>
  );
}

export default RightSidebarPage;
