import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import CategoryPage from "./pages/CategoryPage";
import SearchResults from "./pages/SearchResults";

const LeftSidebar = () => <h2 style={{ padding: "2rem" }}>Left Sidebar Page</h2>;
const RightSidebar = () => <h2 style={{ padding: "2rem" }}>Right Sidebar Page</h2>;
const NoSidebar = () => <h2 style={{ padding: "2rem" }}>No Sidebar Page</h2>;

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/category/:name" element={<CategoryPage />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/left" element={<LeftSidebar />} />
      <Route path="/right" element={<RightSidebar />} />
      <Route path="/no-sidebar" element={<NoSidebar />} />
    </Routes>
  );
}

export default AppRoutes;
