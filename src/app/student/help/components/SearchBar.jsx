import React from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ onSearch, value = '', className = '' }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className={`relative ${className}`} id="help-search">
      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="search"
          placeholder="Search help articles and FAQs..."
          value={value}
          onChange={handleChange}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                   transition-all duration-200 bg-white shadow-sm
                   placeholder:text-gray-400 text-gray-700"
          aria-label="Search help articles and FAQs"
        />
      </div>
      <div 
        className="absolute -bottom-6 left-4 text-sm text-gray-500"
        aria-live="polite"
      >
        {value && `Showing results for "${value}"`}
      </div>
    </div>
  );
}
