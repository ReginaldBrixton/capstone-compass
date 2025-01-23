'use client';

import React from 'react';
import SearchInput, { SearchValue, SearchOnChange, SearchPlaceholder, SearchIcon, SearchLabel } from '@/components/input/SearchInput';

const SearchAndFilters = ({ searchQuery, setSearchQuery, activeFilter, setActiveFilter }) => {
  const filters = ['All Teams', 'My Teams', 'Leading', 'Member'];

  return (
    <>
      <div className="mb-6" id="search-bar">
        <SearchInput 
          id="teams-search"
          className="w-full"
          style="circle"
        >
          {/* <SearchLabel>Search Teams</SearchLabel> */}
          <SearchValue>{searchQuery}</SearchValue>
          <SearchOnChange>{(e) => setSearchQuery(e.target.value)}</SearchOnChange>
          <SearchPlaceholder>Search teams...</SearchPlaceholder>
          <SearchIcon>
            <span>🔍</span>
          </SearchIcon>
        </SearchInput>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2" id="filter-tabs">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all
              ${
                activeFilter === filter
                  ? 'bg-blue-600 text-white border border-blue-600 hover:bg-blue-700'
                  : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }`}
            id={`filter-tab-${filter.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </>
  );
};

export default SearchAndFilters;
