import React, { useEffect, useState } from 'react';

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/posts/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error loading categories', err));
  }, []);

  return (
    <select
      value={selectedCategory}
      onChange={e => setSelectedCategory(e.target.value)}
      style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
    >
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
