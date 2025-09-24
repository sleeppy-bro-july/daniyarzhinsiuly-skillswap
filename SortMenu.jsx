import React from 'react';
import './SortMenu.css';

function SortMenu({ sortBy, setSortBy, theme }) {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-liked', label: 'Most Liked' },
    { value: 'most-commented', label: 'Most Commented' }
  ];

  return (
    <div className={`sort-menu ${theme}`}>
      <div className="sort-menu-container">
        <label htmlFor="sort-select" className="sort-label">
          Sort by:
        </label>
        <select 
          id="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SortMenu;
