import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

function CategoryPage() {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`/posts/category/${name}`).then((res) => setPosts(res.data));
  }, [name]);

  return (
    <div className="container">
      <h2>Category: {name}</h2>
      <div className="grid">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {posts.length === 0 && <p>No posts in this category.</p>}
      </div>
    </div>
  );
}

export default CategoryPage;
