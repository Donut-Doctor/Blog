// frontend/src/pages/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
        setPosts(res.data.posts);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <h3>Your Posts</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post._id} style={{
            border: '1px solid #ccc',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '6px',
            background: '#f9f9f9'
          }}>
            <h4>{post.title}</h4>
            <p><b>Category:</b> {post.category}</p>
            <p>{post.content.slice(0, 100)}...</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
