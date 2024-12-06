import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import MovieCarousel from '../components/MovieCarousel';
import SearchMovies from '../components/SearchMovies';
import MovieList from '../components/MovieList';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json'; // Import movie data

const HomePage = ({ onSelect }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(moviesData);

  // Load movies from the imported JSON data
  useEffect(() => {
    setMovies(moviesData);
    setFilteredMovies(moviesData); // Initialize filteredMovies
  }, []);

  // Handle search functionality
  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(lowercasedQuery) ||
      movie.description.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredMovies(filtered);
  };

  return (
    <Box>
      <SearchMovies onSearch={handleSearch} />
      <MovieCarousel movies={filteredMovies} onSelect={onSelect} />
      
      <Heading as="h2" mt={8} mb={4}>Featured Movies</Heading>
      <MovieList movies={filteredMovies.slice(0, 4)} onSelect={onSelect} /> {/* Display the first 4 movies as featured */}

      <Heading as="h2" mt={8} mb={4}>All Movies</Heading>
      {filteredMovies.length === 0 ? (
        <Text>No movies found.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={8}>
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default HomePage;