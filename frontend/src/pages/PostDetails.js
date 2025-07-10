import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch post
    axios.get(`http://localhost:3008/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => setError('Failed to load post'));

    // Decode token to get current user ID (simple way)
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.userId);
      } catch {
        setUserId('');
      }
    }
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`http://localhost:3008/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch {
      setError('Failed to delete');
    }
  };

  if (!post) return <p>Loading post...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ marginBottom: '10px' }}>{post.title}</h2>
      <p><strong>Category:</strong> {post.category}</p>
      <p style={{ marginTop: '20px' }}>{post.content}</p>
      <p style={{ marginTop: '20px' }}><strong>Author:</strong> {post.author?.username || 'Unknown'}</p>

      {post.author?._id === userId && (
        <div style={{ marginTop: '20px' }}>
          <Link to={`/edit/${id}`}>
            <button style={{ padding: '8px 12px', background: '#007bff', color: '#fff', border: 'none', marginRight: '10px' }}>
              Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            style={{ padding: '8px 12px', background: 'red', color: '#fff', border: 'none' }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
