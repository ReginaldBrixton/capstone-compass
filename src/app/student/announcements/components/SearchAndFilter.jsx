'use client';

import React from 'react';

import { FilterButton, FilterGroup, SearchContainer, SearchInput } from '../styles';

const SearchAndFilter = ({ searchQuery, onSearchChange, activeFilter, onFilterChange }) => {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'urgent', label: 'Urgent' },
    { id: 'event', label: 'Events' },
    { id: 'info', label: 'Info' },
  ];

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Search announcements..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search announcements"
      />
      <FilterGroup role="group" aria-label="Filter announcements">
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
            aria-pressed={activeFilter === filter.id}
          >
            {filter.label}
          </FilterButton>
        ))}
      </FilterGroup>
    </SearchContainer>
  );
};

export default SearchAndFilter;
