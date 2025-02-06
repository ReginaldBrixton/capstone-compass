'use client';

import { SearchIcon } from 'lucide-react';
import { useState } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search logic here
    console.log('Searching for:', e.target.value);
  };

  return (
    <div className="w-full max-w-screen-lg mx-auto px-4">
      <div className="relative flex items-center w-full">
        <SearchIcon 
          className="absolute left-4 w-5 h-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder="Search assignments, subjects..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full h-12 pl-12 pr-4 text-sm sm:text-base rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-gray-300 dark:focus:border-gray-600"
        />
      </div>
    </div>
  );
};

export default SearchBar;
