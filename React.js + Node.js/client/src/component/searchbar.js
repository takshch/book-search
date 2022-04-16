import React from 'react';
import './searchbar.scss';

function Searchbar({ placeholder, onInput }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        aria-label="search-keyword"
        placeholder={placeholder}
        onInput={onInput}
        data-test-input
      />
    </div>
  );
};

export default Searchbar;