// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import PostCard from './components/PostCard';
import SearchBar from './components/SearchBar';
import CreatePost from './components/CreatePost';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar search={search} setSearch={setSearch} />
                {filteredPosts.map(post => (
                  <PostCard key={post._id} post={post} />
                ))}
              </>
            }
          />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
