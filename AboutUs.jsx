import React from 'react';
import { Box, Text, Container, Stack, Heading, Image } from '@chakra-ui/react';

const AboutUs = () => {
  return (
    <Container maxW="100%" p={4}> {/* Ensure container takes full width */}
      {/* Page Title */}
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        About CinematicHub
      </Heading>

      {/* Introduction Section */}
      <Stack spacing={4} mb={8}>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Welcome to CinematicHub, your go-to platform for booking movie tickets online. We aim to provide a seamless and delightful experience for movie lovers, ensuring that every movie ticket purchase is just a click away.
        </Text>
      </Stack>

      {/* Mission Section */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4} color="teal.600">
          Our Mission
        </Heading>
        <Text fontSize="lg" color="gray.700">
          At CinematicHub, our mission is to revolutionize the way people experience cinema. We aim to make movie booking easier, faster, and more accessible by leveraging modern technology to provide a user-friendly platform that caters to movie-goers' needs. Whether you're booking for a solo movie night or planning a group outing, we've got you covered.
        </Text>
      </Box>

      {/* Vision Section */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4} color="teal.600">
          Our Vision
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Our vision is to become the number one online movie ticket booking platform, known for providing a hassle-free and enjoyable experience. We want to connect cinema lovers worldwide, making sure that everyone has access to the best movie deals, showtimes, and seats at the click of a button.
        </Text>
      </Box>

      {/* Our Story Section */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4} color="teal.600">
          Our Story
        </Heading>
        <Text fontSize="lg" color="gray.700" mb={4}>
          CinematicHub was born out of a passion for movies and the frustration of long queues and complicated booking processes. Our founders, who were avid moviegoers themselves, saw an opportunity to simplify the way people book their tickets and provide them with a one-stop-shop for all their movie needs. Since its inception, CinematicHub has grown into a trusted platform where movie lovers can easily find movies, check showtimes, and book tickets – all from the comfort of their homes.
        </Text>
        {/* Updated Image Path and Full Width */}
        <Image
          src="/images/hub.png"  // Correct path to image in public/images
          width="100%"
          height="350px" // Ensure image takes full width
          objectFit="cover" // Maintain aspect ratio and cover the full width
          borderRadius="md"
        />
      </Box>

      {/* Contact Section */}
      <Box mb={8}>
        <Heading as="h2" size="lg" mb={4} color="teal.600">
          Get in Touch
        </Heading>
        <Text fontSize="lg" color="gray.700" mb={4}>
          We love to hear from our users! Whether you have questions, feedback, or just want to say hello, feel free to reach out to us at <b>support@cinematichub.com</b>.
        </Text>
      </Box>

      {/* Footer Section */}
      <Box textAlign="center" py={4} borderTop="1px solid #ddd">
        <Text fontSize="sm" color="gray.500">
          © 2024 CinematicHub. All Rights Reserved.
        </Text>
      </Box>
    </Container>
  );
};

export default AboutUs;
