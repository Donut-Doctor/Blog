import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [post, setPost] = useState({ title: '', content: '', category: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError('You must be logged in');

    try {
      await axios.post('http://localhost:3008/api/posts', post, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Create New Post</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      /><br />

      <textarea
        rows="5"
        placeholder="Content"
        value={post.content}
        onChange={e => setPost({ ...post, content: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      /><br />

      <select
        value={post.category}
        onChange={e => setPost({ ...post, category: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      >
        <option value="">Select Category</option>
        <option value="Tech">Tech</option>
        <option value="Life">Life</option>
        <option value="Travel">Travel</option>
        <option value="Other">Other</option>
      </select><br />

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Create Post
      </button>
    </div>
  );
}

export default CreatePost;
