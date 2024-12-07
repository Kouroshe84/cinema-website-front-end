import React from 'react';
import { Box } from '@chakra-ui/react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onSelect }) => {
  return (
    <Box p={4}>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
      ))}
    </Box>
  );
};

export default MovieList;