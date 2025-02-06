import React from 'react';
import { FiSearch } from 'react-icons/fi';
export default function SearchBar({ onSearch, value = '', className = '' }) {
  const handleChange = (e) => {
    onSearch(e.target.value);
  };
  return (
    <div className={`relative ${className}`} id="help-search" data-oid="53boug-">
      <div className="relative" data-oid="qn:uerk">
        <FiSearch
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          data-oid="q6v::g7"
        />
        <input
          type="search"
          placeholder="Search help articles and FAQs..."
          value={value}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-4 text-gray-700 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          aria-label="Search help articles and FAQs"
          data-oid="_h4yx91"
        />
      </div>
      <div
        className="absolute -bottom-6 left-4 text-sm text-gray-500"
        aria-live="polite"
        data-oid="pvcor4-"
      >
        {value && `Showing results for "${value}"`}
      </div>
    </div>
  );
}
