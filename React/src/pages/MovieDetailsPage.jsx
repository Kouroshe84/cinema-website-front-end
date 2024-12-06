import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Text, Button, Image, Heading } from '@chakra-ui/react';
import BookingForm from '../components/BookingForm';

const MovieDetailsPage = ({ movies }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ... (error handling for undefined movies and movie not found)

  const movie = movies.find((movie) => movie.id === parseInt(id, 10));

  return (
    <Box p={4}>
      <Button onClick={() => navigate('/')} colorScheme="teal" mb={4}>
        Back to Home
      </Button>
      <Heading as="h2">{movie.title}</Heading>
      <Image src={movie.poster} alt={movie.title} width="300px" mb={4} /> 
      <Text mt={2}>{movie.description}</Text>
      <Heading as="h3" mt={4}>Showtimes</Heading> 
      {/* ... (logic to fetch and display showtimes) ... */}
      <Button mt={4} colorScheme="teal">
        Book Now
      </Button>
      <Box mt={4}>
        <BookingForm />
      </Box>
    </Box>
  );
};

export default MovieDetailsPage;