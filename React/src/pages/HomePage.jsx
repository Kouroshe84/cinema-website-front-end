import React, { useState, useEffect } from 'react';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import MovieCarousel from '../components/MovieCarousel';
import SearchMovies from '../components/SearchMovies';
import MovieList from '../components/MovieList';
import MovieCard from '../components/MovieCard';
import moviesData from '../data/movies.json'; // Import movie data

const HomePage = ({ onSelect }) => {
  const [movies, setMovies] = useState([]);

  // Load movies from the imported JSON data
  useEffect(() => {
    setMovies(moviesData);
  }, []);

  // // Dummy movie data for the individual MovieCard
  // const dummyMovie = {
  //   id: 1,
  //   title: "Inception",
  //   description: "A mind-bending thriller that explores the nature of dreams and reality.",
  //   poster: "https://via.placeholder.com/300x200?text=Inception"
  // };

  return (
    <Box>
      <SearchMovies onSearch={(query) => console.log(query)} />
      <MovieCarousel movies={movies} onSelect={onSelect} />
      
      <Heading as="h2" mt={8} mb={4}>Featured Movies</Heading>
      <MovieList movies={movies.slice(0, 4)} onSelect={onSelect} /> {/* Display the first 4 movies as featured */}

      <Heading as="h2" mt={8} mb={4}>All Movies</Heading>
      {/* Display the dummy movie as a card */}
      {/* <Box mt={8} display="flex" justifyContent="center">
        <MovieCard movie={dummyMovie} onSelect={onSelect} />
      </Box> */}

      {/* Display all movies as individual MovieCard components */}
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} mt={8}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={onSelect} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
