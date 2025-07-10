import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        setError('Failed to load profile');
      }
    };

    if (token) fetchProfile();
    else setError('Not authorized');
  }, [token]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <h3>Your Posts</h3>
      {posts.length === 0 ? (
        <p>You haven’t written any posts yet.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}>
            <h4>{post.title}</h4>
            <p>{post.content.slice(0, 100)}...</p>
            <Link to={`/posts/${post._id}`}>View</Link>{' '}
            <Link to={`/edit/${post._id}`} style={{ marginLeft: '10px' }}>Edit</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default UserProfile;
