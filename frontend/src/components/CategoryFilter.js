import React from 'react';

function CategoryFilter({ category, setCategory }) {
  return (
    <select
      value={category}
      onChange={e => setCategory(e.target.value)}
      style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
    >
      <option value="">All Categories</option>
      <option value="Tech">Tech</option>
      <option value="Lifestyle">Lifestyle</option>
      <option value="News">News</option>
      <option value="Other">Other</option>
    </select>
  );
}

export default CategoryFilter;
