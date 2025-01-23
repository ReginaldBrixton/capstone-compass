# Project Notes

## Code Style Guidelines
- Remember to add a scrollbar to the main content area

## Current Setup
- Using Bun package manager


  <SearchInput id="search-input" className="search-input">
          
         
          <SearchLabel>Search anything...</SearchLabel>
        
</SearchInput>

 <SearchValue>searchValue</SearchValue>
          <SearchOnChange>handleSearchChange</SearchOnChange>
  <SearchIcon>
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </SearchIcon>