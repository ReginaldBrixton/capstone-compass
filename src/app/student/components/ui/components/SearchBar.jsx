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
      className="search-container relative mx-auto w-full max-w-[600px]"
      ref={searchRef}
      id={uniqueId}
      data-component="search-bar"
      data-oid=":q.iuei"
    >
      <div
        className={`search-bar-wrapper flex h-[clamp(40px,5vh,50px)] items-center rounded-[25px] border-2 border-transparent bg-white shadow-sm transition-all duration-200 ease-in-out ${isActive ? 'border-blue-500 shadow-lg shadow-blue-100' : ''}`}
        data-oid="uehsb28"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsActive(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="search-input h-full flex-1 rounded-[25px] border-none bg-transparent px-6 text-base text-gray-800 focus:outline-none"
          id={`${uniqueId}-input`}
          aria-label="Search"
          aria-expanded={isActive}
          aria-controls={suggestionsListId}
          aria-activedescendant={
            selectedIndex >= 0 ? `${uniqueId}-suggestion-${selectedIndex}` : undefined
          }
          data-testid="search-input"
          data-oid="5nasb5v"
        />
        <button
          className="search-submit h-full cursor-pointer border-none bg-transparent px-6 text-lg text-gray-600 transition-colors duration-200 hover:text-blue-500"
          onClick={handleSearch}
          aria-label="Submit search"
          id={`${uniqueId}-submit`}
          data-testid="search-submit"
          data-oid="786yxum"
        >
          🔍
        </button>
      </div>

      {isActive && filteredSuggestions.length > 0 && (
        <ul
          className="suggestions-list absolute left-0 right-0 top-[calc(100%+8px)] z-10 m-0 max-h-[300px] list-none overflow-y-auto rounded-xl bg-white py-2 shadow-lg"
          id={suggestionsListId}
          role="listbox"
          data-testid="suggestions-list"
          data-oid="w_1k14_"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className={`suggestion-item cursor-pointer px-6 py-3 transition-colors duration-200 ${index === selectedIndex ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={index === selectedIndex}
              id={`${uniqueId}-suggestion-${index}`}
              data-testid={`suggestion-${index}`}
              data-oid="m8mprdi"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
