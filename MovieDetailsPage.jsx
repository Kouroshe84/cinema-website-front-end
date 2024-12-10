import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  List,
  ListItem,
  Button,
  Spinner,
  Container,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

// Import movie data from movies.json
import moviesData from "../data/movies.json"; // Adjust the path as needed

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [isBookingEnabled, setIsBookingEnabled] = useState(false);

  useEffect(() => {
    const selectedMovie = moviesData.find((movie) => movie.id === parseInt(id));
    setMovie(selectedMovie);
  }, [id]);

  const handleSelectTime = (event) => {
    const time = event.target.value;
    setSelectedTime(time);
    setIsBookingEnabled(time !== "");
  };

  const handleBookNow = () => {
    if (selectedTime) {
      // Redirect to booking confirmation page
      navigate(`/booking-confirmation/${id}`);
    }
  };

  if (!movie)
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      bg="gray.50"
    >
      <Container
        maxW="container.lg"
        p={4}
        boxShadow="md"
        borderRadius="md"
        bg="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text fontSize="3xl" fontWeight="bold" mb={4} color="teal.600">
          {movie.title}
        </Text>

        {/* Movie Poster or Placeholder */}
        <Image
          src={movie.poster || "https://via.placeholder.com/300x200?text=No+Poster"}
          alt={movie.title}
          borderRadius="md"
          boxShadow="sm"
          mb={4}
          maxWidth="100%"
          height="auto"
        />

        <Box mb={6} textAlign="center">
          <Text fontSize="lg" color="gray.700" mb={2}>
            {movie.description}
          </Text>
          <Text fontWeight="bold" color="teal.500" fontSize="lg" mt={4}>
            Rating: {movie.rating} ⭐
          </Text>
        </Box>

        {/* Showtimes Selection */}
        <Box mb={6} width="100%">
          <Text fontSize="xl" fontWeight="bold" mb={3} color="teal.600">
            Select Showtime
          </Text>

          <FormControl isRequired>
            <FormLabel htmlFor="showtime" color="teal.600">
              Showtime:
            </FormLabel>
            <Select
              id="showtime"
              value={selectedTime}
              onChange={handleSelectTime}
              placeholder="Select a time"
              size="lg"
            >
              {movie.showtimes.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Booking Button */}
        <Box textAlign="center" mt={6}>
          <Button
            onClick={handleBookNow}
            colorScheme="teal"
            size="lg"
            isDisabled={!isBookingEnabled} // Disable the button unless a time is selected
          >
            Book Now
          </Button>
        </Box>

        {/* Back Button */}
        <Box textAlign="center" mt={4}>
          <Button as={Link} to="/" colorScheme="teal" size="lg">
            Back to Movie List
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MovieDetailsPage;
