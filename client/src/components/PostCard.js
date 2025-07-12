import React from "react";
import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <Link to={`/post/${post._id}`}>
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt={post.title}
          className="post-image"
        />
      </Link>
      <div className="post-content">
        <Link to={`/post/${post._id}`} className="post-title">
          {post.title}
        </Link>
        <p className="post-excerpt">
          {post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content}
        </p>
        <div className="post-meta">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span> | {post.category}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
