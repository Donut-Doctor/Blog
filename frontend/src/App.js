// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import PostCard from './components/PostCard';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import CreatePost from './components/CreatePost';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import PostDetails from './pages/PostDetails';
import UserDashboard from './pages/UserDashboard';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HelpPage from './pages/HelpPage';

import './styles.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [visibleCount, setVisibleCount] = useState(5);

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
    post.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === '' || post.category === selectedCategory)
  );

  return (
    <>
      <Header />
      <div className="container" style={{ padding: '20px' }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar search={search} setSearch={setSearch} />
                <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                {filteredPosts.map(post => (
                  <PostCard key={post._id} post={post} />
                ))}
              </>
            }
          />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          
        </Routes>
      </div>
    </>
  );
}

export default App;
