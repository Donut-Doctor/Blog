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

import './styles.css';

function App() {
  const [posts, setPosts] = useState([
    {
      _id: '1',
      title: 'How to Start Blogging',
      content: 'Blogging is a great way to express yourself and share your thoughts...',
      category: 'Tech',
      author: { username: 'Admin' }
    },
    {
      _id: '2',
      title: '10 Travel Tips You Need to Know',
      content: 'Traveling can be stressful, but these 10 tips can make your trip easier...',
      category: 'Travel',
      author: { username: 'JohnDoe' }
    },
    {
      _id: '3',
      title: 'Healthy Eating Habits',
      content: 'Nutrition plays a key role in how we feel and perform every day...',
      category: 'Health',
      author: { username: 'JaneSmith' }
    }
  ]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.warn('Backend not reachable. Showing dummy posts.');
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) &&
    (selectedCategory === '' || post.category === selectedCategory)
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
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
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
        </Routes>
      </div>
    </>
  );
}

export default App;
