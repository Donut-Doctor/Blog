import React from "react";
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import "./SidebarPages.css";

function LeftSidebarPage() {
  return (
    <>
      <Hero />
      <div className="sidebar-layout">
        <Sidebar />
        <div className="posts-column">
          <h2>Posts with Left Sidebar</h2>
          <PostCard sample />
          <PostCard sample />
        </div>
      </div>
    </>
  );
}

export default LeftSidebarPage;
