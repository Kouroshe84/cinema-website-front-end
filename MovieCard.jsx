import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const MovieCard = ({ movie }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m={2}
      textAlign="center" // Center content within the card
    >
      <Image src={movie.poster} alt={movie.title} height="200px" objectFit="cover" />
      <Text fontWeight="bold" mt={2}>{movie.title}</Text>
      <Text fontSize="sm">{movie.description}</Text>
      {/* Add a Link to the MovieDetailsPage */}
      <Link to={`/movie/${movie.id}`}>
        <Button mt={4} colorScheme="teal">
          View Details
        </Button>
      </Link>
    </Box>
  );
};

export default MovieCard;
