import React from 'react';
import { Box, Text, Container } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box bg="gray.100" p={4} mt={4}>
      <Container maxW="1140px">
        <Text textAlign="center">© 2023 CinematicHub. All rights reserved.</Text>
      </Container>
    </Box>
  );
};

export default Footer;