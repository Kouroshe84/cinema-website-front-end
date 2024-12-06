import React from 'react';
import { Box, Link, Stack } from '@chakra-ui/react';

const QuickLinks = () => {
  return (
    <Box p={4}>
      <Stack spacing={2}>
        <Link href="/">Home</Link>
        <Link href="/create">Create</Link>
        <Link href="/about">About Us</Link>
        <Link href="/contact">Contact Us</Link>
      </Stack>
    </Box>
  );
};

export default QuickLinks;