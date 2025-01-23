'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create a MediaQueryList object
    const mediaQuery = window.matchMedia(query);
    
    // Set the initial value
    setMatches(mediaQuery.matches);

    // Define a callback function to handle changes
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Add the callback as a listener for changes to the media query
    mediaQuery.addEventListener('change', handleChange);

    // Clean up function to remove the listener
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]); // Only re-run the effect if the query changes

  return matches;
} 