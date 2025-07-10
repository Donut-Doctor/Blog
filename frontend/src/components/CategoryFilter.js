import React from 'react';

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Tech', 'Life', 'News', 'Education']; // Add or update as needed

  return (
    <select
      value={selectedCategory}
      onChange={e => setSelectedCategory(e.target.value === 'All' ? '' : e.target.value)}
      style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
    >
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
