import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, theme }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`search-bar ${theme}`}>
      <div className="search-container">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search posts, skills, or categories..."
            value={searchTerm}
            onChange={handleInputChange}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-btn"
              onClick={handleClear}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
