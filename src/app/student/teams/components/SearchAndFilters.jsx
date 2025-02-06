'use client';

import React from 'react';
import SearchInput, {
  SearchValue,
  SearchOnChange,
  SearchPlaceholder,
  SearchIcon,
  SearchLabel,
} from '@/components/input/SearchInput';
const SearchAndFilters = ({ searchQuery, setSearchQuery, activeFilter, setActiveFilter }) => {
  const filters = ['All Teams', 'My Teams', 'Leading', 'Member'];
  return (
    <>
      <div className="mb-6" id="search-bar" data-oid="lfwkk4.">
        <SearchInput id="teams-search" className="w-full" style="circle" data-oid="7yltzhw">
          {/* <SearchLabel>Search Teams</SearchLabel> */}
          <SearchValue data-oid="qkpxswq">{searchQuery}</SearchValue>
          <SearchOnChange data-oid="e2dle4_">
            {(e) => setSearchQuery(e.target.value)}
          </SearchOnChange>
          <SearchPlaceholder data-oid="ot11tkg">Search teams...</SearchPlaceholder>
          <SearchIcon data-oid="nd4a5g6">
            <span data-oid="48qts55">🔍</span>
          </SearchIcon>
        </SearchInput>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-2" id="filter-tabs" data-oid="8nuc40q">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            aria-pressed={activeFilter === filter}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all ${activeFilter === filter ? 'border border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : 'border border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            id={`filter-tab-${filter.replace(/\s+/g, '-').toLowerCase()}`}
            data-oid="9ezfb-m"
          >
            {filter}
          </button>
        ))}
      </div>
    </>
  );
};
export default SearchAndFilters;
