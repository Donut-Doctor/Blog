import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../services/axios";
import "./CategoryPage.css";

function CategoryPage() {
  const { name } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`/posts/category/${name}`).then((res) => {
      setPosts(res.data);
    });
  }, [name]);

  return (
    <div className="category-page container">
      <h2 className="category-heading">{name} Blogs</h2>
      <div className="category-posts">
        {posts.length === 0 ? (
          <p>No blog posts found in this category yet.</p>
        ) : (
          posts.map((post) => (
            <Link to={`/post/${post._id}`} className="category-post" key={post._id}>
              <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
              <div className="category-post-info">
                <h3>{post.title}</h3>
                <p>{post.content.slice(0, 120)}...</p>
                <span className="read-more">Read more →</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPage;
