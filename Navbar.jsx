import React from 'react';
import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';

const Navbar = ({ user }) => {
  return (
    <Box bg="gray.100" shadow="md" mb={4}>
      <Container maxW="1140px" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Box fontWeight="bold" fontSize="xl">
            CinematicHub
          </Box>
          <Flex gap={4} alignItems="center">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            {user ? (
              <Text fontWeight="bold">{`Welcome, ${user}`}</Text>
            ) : (
              <Link href="/create">Account</Link>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
