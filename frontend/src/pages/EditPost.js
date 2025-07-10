import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', content: '', category: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPost(res.data);
      } catch (err) {
        setError('Failed to load post');
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/posts/${id}`, post, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError('Failed to update post');
    }
  };

  return (
    <div>
      <h2>Edit Post</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <input
        type="text"
        placeholder="Category"
        value={post.category}
        onChange={e => setPost({ ...post, category: e.target.value })}
      /><br />
      <button onClick={handleUpdate}>Update Post</button>
    </div>
  );
}

export default EditPost;
