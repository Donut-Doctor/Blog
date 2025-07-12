import React from "react";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import "./SidebarPages.css";

function NoSidebarPage() {
  return (
    <>
      <Hero />
      <div className="no-sidebar-layout">
        <h2>Posts without Sidebar</h2>
        <div className="post-grid">
          <PostCard sample />
          <PostCard sample />
          <PostCard sample />
          <PostCard sample />
        </div>
      </div>
    </>
  );
}

export default NoSidebarPage;
