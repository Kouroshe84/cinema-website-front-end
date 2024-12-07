import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

const ContactUs = () => {
  return (
    <Box p={4}>
      <FormControl id="contact" isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Your Name" />
        <FormLabel mt={4}>Email</FormLabel>
        <Input type="email" placeholder="Your Email" />
        <FormLabel mt={4}>Message</FormLabel>
        <Textarea placeholder="Your Message" />
        <Button mt={4} colorScheme="teal" type="submit">Send Message</Button>
      </FormControl>
    </Box>
  );
};

export default ContactUs;