import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchUserData = async () => {
      try {
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
        setMyPosts(res.data.posts); // assuming your API returns user posts here
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <hr />
      <h3>Your Posts:</h3>
      {myPosts.length === 0 ? (
        <p>You haven’t posted anything yet.</p>
      ) : (
        myPosts.map(post => <PostCard key={post._id} post={post} />)
      )}
    </div>
  );
}

export default UserDashboard;
