import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PostCard.css';

function PostCard({ post }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.reload(); // refresh after deletion
    } catch (err) {
      alert('Failed to delete post.');
    }
  };

  const isAuthor = token && JSON.parse(atob(token.split('.')[1])).userId === post.author?._id;

  return (
    <div className="post-card fade-in">
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <p><b>Category:</b> {post.category}</p>
      <p><b>Author:</b> {post.author?.username || 'Unknown'}</p>

      <div className="post-card-actions">
        <Link to={`/posts/${post._id}`} className="read-more-btn">Read More</Link>

        {isAuthor && (
          <>
            <button className="edit-btn" onClick={() => navigate(`/edit/${post._id}`)}>Edit</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default PostCard;
