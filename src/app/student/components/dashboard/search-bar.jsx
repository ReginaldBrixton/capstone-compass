'use client';

import { Input } from '../../../../components/ui/input';
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
    <div 
      className="relative w-full max-w-[600px] group"
      id="search-bar-container" 
      data-oid="g5-s5sl"
    >
      <div className="absolute inset-0 rounded-lg bg-blue-500/5 dark:bg-white/5 transition-opacity opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" />
      <SearchIcon
        className="pointer-events-none absolute left-3.5 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400 dark:text-slate-400 transition-colors"
        id="search-icon"
        data-oid="v:lo2lw"
      />
      <Input
        type="search"
        placeholder="Search assignments, subjects..."
        className="h-12 pl-11 pr-4 text-base border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white/80 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/30 dark:focus:ring-blue-400/40 focus:border-transparent focus:shadow-md transition-all placeholder:text-slate-400 dark:placeholder:text-slate-400 text-slate-900 dark:text-white"
        value={searchQuery}
        onChange={handleSearch}
        id="search-input"
        data-oid="bu51dmu"
      />
    </div>
  );
};

export default SearchBar;
