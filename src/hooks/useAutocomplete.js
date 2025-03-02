
import { useQuery } from '@tanstack/react-query';

const fetchSuggestions = async (query) => {
  const response = await fetch(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  // Filter suggestions based on the query (optional)
  return data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
};

export const useAutocomplete = (query) => {
  return useQuery({
    queryKey: ['suggestions', query], // Query key as an array
    queryFn: () => fetchSuggestions(query), // Query function
    enabled: !!query, // Only fetch when query is not empty
  });
};