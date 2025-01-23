"use client";

import { Input } from "../../../../components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add search logic here
    console.log("Searching for:", e.target.value);
  };

  return (
    <div 
      className="relative w-full max-w-[600px]"
      id="search-bar-container"
    >
      <SearchIcon
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
        id="search-icon"
      />
      <Input
        type="search"
        placeholder="Search..."
        className="pl-10 h-11 text-sm focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
        value={searchQuery}
        onChange={handleSearch}
        id="search-input"
      />
    </div>
  );
};

export default SearchBar;
