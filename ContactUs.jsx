import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Stack, Text, IconButton, useToast, VStack, Grid, GridItem, Image, HStack, Container } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaTwitter, FaStar } from 'react-icons/fa'; // Social media icons

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0); // Track the rating value
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  // Handle form submission for message
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      toast({
        title: 'Message Sent.',
        description: 'Your message has been successfully sent!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setName('');
      setEmail('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };

  // Handle rating submission
  const handleRating = () => {
    if (rating === 0) {
      toast({
        title: 'No Rating Selected.',
        description: 'Please select a rating before submitting.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Rating Submitted.',
        description: `Thank you for your rating of ${rating} stars!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%" 
      h="100vh"  // Full screen height
      p={0}
      bg="gray.50"
    >
      <Container maxW="100%" p={4}> {/* Full width container */}
        {/* Page Title */}
        <Text fontSize="3xl" fontWeight="bold" textAlign="center" color="teal.600" mb={6}>
          Contact Us
        </Text>
        <Text fontSize="xl" textAlign="center" maxW="100%" color="gray.600" mb={8}>
          We’d love to hear from you! Drop us a message, and we’ll get back to you as soon as possible.
        </Text>

        {/* Feedback and Rating Section */}
        <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={8}>
          <GridItem>
            <Box p={4} bg="white" borderRadius="md" boxShadow="lg" textAlign="center">
              <Text fontSize="xl" fontWeight="bold" color="teal.600">Customer Feedback</Text>
              <HStack justify="center" spacing={2} mt={2}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <IconButton 
                    key={star} 
                    icon={<FaStar />} 
                    color={star <= rating ? "yellow.400" : "gray.300"} 
                    variant="ghost"
                    onClick={() => setRating(star)}
                    aria-label={`rating star ${star}`}
                  />
                ))}
              </HStack>

              <Text fontSize="md" mt={2} color="gray.600">
                "Great experience! Will definitely book again. The site is very user-friendly. Please give us your feedback. It will be very helpful."
              </Text>

              <Button 
                mt={4} 
                colorScheme="teal" 
                onClick={handleRating}
              >
                Submit Rating
              </Button>
            </Box>
          </GridItem>

          {/* Offers Section */}
          <GridItem>
            <Box p={4} bg="white" borderRadius="md" boxShadow="lg">
              <Text fontSize="xl" fontWeight="bold" color="teal.600" mb={4} textAlign="center">
                Our Offers
              </Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                <Image 
                  src='../images/img1.png'
                  alt="Offer 1" 
                  borderRadius="md" 
                />
                <Image 
                  src='../images/img2.png'
                  alt="Offer 2" 
                  borderRadius="md" 
                />
                <Image 
                  src='../images/img3.png' 
                  alt="Offer 3" 
                  borderRadius="md" 
                />
              </Grid>
            </Box>
          </GridItem>
        </Grid>

        {/* Contact Form */}
        <Box p={6} boxShadow="lg" borderRadius="md" bg="white" mb={8}>
          <FormControl id="contact" isRequired onSubmit={handleSubmitMessage}>
            <Stack spacing={4}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isRequired
              />

              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              />

              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                isRequired
              />

              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Sending"
                onClick={handleSubmitMessage}
              >
                Send Message
              </Button>
            </Stack>
          </FormControl>
        </Box>

        {/* Social Media Links */}
        <Text fontSize="lg" textAlign="center" color="gray.600" mt={8}>
          Follow us on social media:
        </Text>
        <Stack direction="row" justify="center" spacing={6}>
          <IconButton
            as="a"
            href="https://www.instagram.com"
            target="_blank"
            aria-label="Instagram"
            icon={<FaInstagram />}
            colorScheme="pink"
            size="lg"
            variant="ghost"
          />
          <IconButton
            as="a"
            href="https://www.facebook.com"
            target="_blank"
            aria-label="Facebook"
            icon={<FaFacebook />}
            colorScheme="facebook"
            size="lg"
            variant="ghost"
          />
          <IconButton
            as="a"
            href="https://www.twitter.com"
            target="_blank"
            aria-label="Twitter"
            icon={<FaTwitter />}
            colorScheme="twitter"
            size="lg"
            variant="ghost"
          />
        </Stack>

        {/* Footer Section */}
      <Box textAlign="center" py={4} borderTop="1px solid #ddd">
        <Text fontSize="sm" color="gray.500">
          © 2024 CinematicHub. All Rights Reserved.
        </Text>
      </Box>
      
      </Container>
    </Box>
  );
};

export default ContactUs;
