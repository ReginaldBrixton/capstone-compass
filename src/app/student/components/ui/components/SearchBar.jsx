'use client';

import React, { useEffect, useRef, useState } from 'react';

const generateUniqueId = (prefix) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

export function SearchBar({ onSearch, suggestions = [], placeholder = 'Search...', id }) {
  const [query, setQuery] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);
  const uniqueId = id || generateUniqueId('search');
  const suggestionsListId = `${uniqueId}-suggestions`;

  useEffect(() => {
    const filtered = suggestions
      .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
    setFilteredSuggestions(filtered);
  }, [query, suggestions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        handleSuggestionClick(filteredSuggestions[selectedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'Escape') {
      setIsActive(false);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setIsActive(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setIsActive(false);
  };

  return (
    <div
      className="search-container relative w-full max-w-[600px] mx-auto"
      ref={searchRef}
      id={uniqueId}
      data-component="search-bar"
    >
      <div className={`search-bar-wrapper flex items-center h-[clamp(40px,5vh,50px)] bg-white rounded-[25px] border-2 border-transparent shadow-sm transition-all duration-200 ease-in-out ${isActive ? 'border-blue-500 shadow-lg shadow-blue-100' : ''}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input flex-1 h-full px-6 border-none bg-transparent text-base text-gray-800 rounded-[25px] focus:outline-none"
          id={`${uniqueId}-input`}
          aria-label="Search"
          aria-expanded={isActive}
          aria-controls={suggestionsListId}
          aria-activedescendant={
            selectedIndex >= 0 ? `${uniqueId}-suggestion-${selectedIndex}` : undefined
          }
          data-testid="search-input"
        />
        <button
          className="search-submit h-full px-6 border-none bg-transparent cursor-pointer text-lg text-gray-600 hover:text-blue-500 transition-colors duration-200"
          onClick={handleSearch}
          aria-label="Submit search"
          id={`${uniqueId}-submit`}
          data-testid="search-submit"
        >
          🔍
        </button>
      </div>

      {isActive && filteredSuggestions.length > 0 && (
        <ul
          className="suggestions-list absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-lg py-2 max-h-[300px] overflow-y-auto z-10 list-none m-0"
          id={suggestionsListId}
          role="listbox"
          data-testid="suggestions-list"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`suggestion-item px-6 py-3 cursor-pointer transition-colors duration-200 ${
                index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={index === selectedIndex}
              id={`${uniqueId}-suggestion-${index}`}
              data-testid={`suggestion-${index}`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
