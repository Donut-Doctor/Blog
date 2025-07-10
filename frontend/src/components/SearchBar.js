import React from 'react';

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={search}
      onChange={e => setSearch(e.target.value)}
      style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
    />
  );
}

export default SearchBar;

