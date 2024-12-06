import React from 'react';
import { Container, Flex, Box, Link } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box bg="gray.100" shadow="md" mb={4}>
      <Container maxW="1140px" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box fontWeight="bold" fontSize="xl">
            CinematicHub
          </Box>
          <Flex gap={4}>
            <Link href="/">Home</Link>
            <Link href="/create">Create</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;