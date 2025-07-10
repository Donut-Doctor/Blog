import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post }) {
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
      <Link to={`/post/${post._id}`}>Read More</Link>
    </div>
  );
}

export default PostCard;
