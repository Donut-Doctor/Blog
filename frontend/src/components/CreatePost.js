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
      await axios.post('/api/posts', post, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError('Failed to create post');
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
      /><br />
      <textarea
        rows="5"
        placeholder="Content"
        value={post.content}
        onChange={e => setPost({ ...post, content: e.target.value })}
      /><br />
      <select
        value={post.category}
        onChange={e => setPost({ ...post, category: e.target.value })}
      >
        <option value="">Select category</option>
        <option value="Tech">Tech</option>
        <option value="Travel">Travel</option>
        <option value="Health">Health</option>
      </select><br />
      <button onClick={handleSubmit}>Create Post</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default CreatePost;
