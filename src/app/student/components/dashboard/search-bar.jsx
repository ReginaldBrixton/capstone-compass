'use client';

import { SearchIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Check if we're on client side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };
      
      // Set initial value
      handleResize();
      
      // Add event listener
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search logic here
    console.log('Searching for:', e.target.value);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`relative flex items-center w-full transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
        <SearchIcon 
          className={`absolute left-3 w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
            isFocused ? 'text-blue-500' : 'text-gray-400'
          }`}
          aria-hidden="true"
        />
        <input
          type="search"
          placeholder={isMobile ? "Search..." : "Search assignments, subjects..."}
          value={searchQuery}
          onChange={handleSearch}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full h-10 pl-9 pr-3 text-sm rounded-lg border transition-all duration-300 
            bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-offset-0 shadow-sm
            ${isFocused 
              ? 'border-blue-300 dark:border-blue-700 focus:ring-blue-300 dark:focus:ring-blue-700' 
              : 'border-gray-200 dark:border-gray-700 focus:ring-gray-200 dark:focus:ring-gray-700'
            }`}
          aria-label="Search"
        />
      </div>
    </div>
  );
};

export default SearchBar;
