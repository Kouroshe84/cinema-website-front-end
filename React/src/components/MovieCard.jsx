import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';

const MovieCard = ({ movie, onSelect }) => {
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
      <Button mt={4} colorScheme="teal" onClick={() => onSelect(movie.id)}>
        View Details
      </Button>
    </Box>
  );
};

export default MovieCard;
