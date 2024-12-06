import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import MovieCard from './MovieCard'; // Import the MovieCard component
import movies from '../data/movies.json'; // Import JSON data

const MoviesPage = () => {
  const handleSelect = (movieId) => {
    console.log('Selected Movie ID:', movieId);
  };

  return (
    <Box p={6}>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={handleSelect} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MoviesPage;
