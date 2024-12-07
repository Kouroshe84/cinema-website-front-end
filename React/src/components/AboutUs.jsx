import React from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Container maxW="1140px" p={4}>
      <Text fontSize="2xl" mb={4}>About Us</Text>
      <Text>
        Welcome to CinematicHub, your go-to platform for booking movie tickets online. We aim to provide a seamless experience for movie lovers.
      </Text>
    </Container>
  );
};

export default AboutUs;