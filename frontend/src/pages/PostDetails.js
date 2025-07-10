import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching post:', err);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!token) return;
    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/');
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '8px' }}>
      <h2>{post.title}</h2>
      <p><b>Category:</b> {post.category}</p>
      <p><b>Author:</b> {post.author?.username || 'Unknown'}</p>
      <hr />
      <p>{post.content}</p>

      {post.author?._id === userId && (
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={() => navigate(`/edit/${post._id}`)}
            style={{ marginRight: '10px' }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            style={{ background: 'red', color: 'white' }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
