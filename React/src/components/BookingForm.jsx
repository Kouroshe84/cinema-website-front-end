import React from 'react';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const BookingForm = () => {
  return (
    <Box p={4}>
      <FormControl id="booking" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Your Name" />
        <FormLabel mt={4}>Email</FormLabel>
        <Input type="email" placeholder="Your Email" />
        <Button mt={4} colorScheme="teal" type="submit">Book Now</Button>
      </FormControl>
    </Box>
  );
};

export default BookingForm;