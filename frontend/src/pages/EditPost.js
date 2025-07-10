import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', category: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async () => {
    if (!token) return setError('Not authorized');

    try {
      await axios.put(`/api/posts/${id}`, post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError('Update failed');
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
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      /><br />
      <textarea
        rows="5"
        placeholder="Content"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      /><br />
      <select
        value={post.category}
        onChange={(e) => setPost({ ...post, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Technology">Technology</option>
        <option value="Travel">Travel</option>
        <option value="Health">Health</option>
      </select><br /><br />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditPost;
