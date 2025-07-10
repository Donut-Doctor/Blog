import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostCard({ post }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.reload(); // refresh to reflect deletion
    } catch (err) {
      alert('Failed to delete post.');
    }
  };

  const isAuthor = token && JSON.parse(atob(token.split('.')[1])).userId === post.author?._id;

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      marginBottom: '15px',
      borderRadius: '8px',
      background: '#fff'
    }}>
      <h3>{post.title}</h3>
      <p>{post.content.slice(0, 100)}...</p>
      <p><b>Category:</b> {post.category}</p>
      <p><b>Author:</b> {post.author?.username || 'Unknown'}</p>
      <Link to={`/posts/${post._id}`}>Read More</Link>

      {isAuthor && (
        <>
          <button onClick={() => navigate(`/edit/${post._id}`)} style={{ marginLeft: '10px' }}>Edit</button>
          <button onClick={handleDelete} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PostCard;
