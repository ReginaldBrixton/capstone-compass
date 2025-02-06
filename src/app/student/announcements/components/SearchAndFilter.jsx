'use client';

import React from 'react';
import { FilterButton, FilterGroup, SearchContainer, SearchInput } from '../styles';
const SearchAndFilter = ({ searchQuery, onSearchChange, activeFilter, onFilterChange }) => {
  const filters = [
    {
      id: 'all',
      label: 'All',
    },
    {
      id: 'urgent',
      label: 'Urgent',
    },
    {
      id: 'event',
      label: 'Events',
    },
    {
      id: 'info',
      label: 'Info',
    },
  ];
  return (
    <SearchContainer data-oid="oou6jiu">
      <SearchInput
        type="text"
        placeholder="Search announcements..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search announcements"
        data-oid="1xj1hcs"
      />
      <FilterGroup role="group" aria-label="Filter announcements" data-oid="8.j9e1z">
        {filters.map((filter) => (
          <FilterButton
            key={filter.id}
            active={activeFilter === filter.id}
            onClick={() => onFilterChange(filter.id)}
            aria-pressed={activeFilter === filter.id}
            data-oid="_6lwxh4"
          >
            {filter.label}
          </FilterButton>
        ))}
      </FilterGroup>
    </SearchContainer>
  );
};
export default SearchAndFilter;
