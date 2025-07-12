import React from "react";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import "./SidebarPages.css";

function RightSidebarPage() {
  return (
    <>
      <Hero />
      <div className="sidebar-layout">
        <div className="posts-column">
          <h2>Posts with Right Sidebar</h2>
          <PostCard sample />
          <PostCard sample />
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default RightSidebarPage;
