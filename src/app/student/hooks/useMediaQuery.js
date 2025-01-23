import { useEffect, useState } from 'react';

export const useMediaQuery = (query) => {
  const [match, setMatch] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = () => setMatch(mediaQuery.matches);

    setMatch(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]); // Only re-run if the query changes

  return match;
};
