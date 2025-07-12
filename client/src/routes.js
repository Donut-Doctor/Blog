import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import CategoryPage from "./pages/CategoryPage";
import LeftSidebarPage from "./pages/LeftSidebarPage";
import RightSidebarPage from "./pages/RightSidebarPage";
import NoSidebarPage from "./pages/NoSidebarPage";
import SearchResultsPage from "./pages/SearchResults";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/category/:name" element={<CategoryPage />} />
      <Route path="/search" element={<SearchResultsPage />} />
      <Route path="/left" element={<LeftSidebarPage />} />
      <Route path="/right" element={<RightSidebarPage />} />
      <Route path="/no-sidebar" element={<NoSidebarPage />} />
    </Routes>
  );
}

export default AppRoutes;
