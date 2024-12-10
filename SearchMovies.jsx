import React from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

const SearchMovies = ({ onSearch }) => {
  const [query, setQuery] = React.useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box p={4}>
      <Input
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button mt={2} colorScheme="teal" onClick={handleSearch}>Search</Button>
    </Box>
  );
};

export default SearchMovies;