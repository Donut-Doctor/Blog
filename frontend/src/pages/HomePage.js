import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SearchBar search={search} setSearch={setSearch} />
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}

export default HomePage;
