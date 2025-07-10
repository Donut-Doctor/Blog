import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState({ title: '', content: '', category: '' });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3008/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => setError('Failed to load post'));
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) return setError('Unauthorized');

    try {
      await axios.put(`http://localhost:3008/api/posts/${id}`, post, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/post/${id}`);
    } catch (err) {
      setError('Update failed');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Edit Post</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="text"
        value={post.title}
        onChange={e => setPost({ ...post, title: e.target.value })}
        placeholder="Title"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      /><br />

      <textarea
        rows="5"
        value={post.content}
        onChange={e => setPost({ ...post, content: e.target.value })}
        placeholder="Content"
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      /><br />

      <select
        value={post.category}
        onChange={e => setPost({ ...post, category: e.target.value })}
        style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
      >
        <option value="">Select Category</option>
        <option value="Tech">Tech</option>
        <option value="Lifestyle">Lifestyle</option>
        <option value="News">News</option>
        <option value="Other">Other</option>
      </select><br />

      <button
        onClick={handleUpdate}
        style={{
          backgroundColor: '#28a745',
          color: '#fff',
          padding: '10px 15px',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Update Post
      </button>
    </div>
  );
}

export default EditPost;
