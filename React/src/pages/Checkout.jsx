import React from 'react';
import { Box, Text, Grid, Button } from '@chakra-ui/react';

const Checkout = () => {
  // ... (access selected seats, showtime, and user data from state or context) ...

  return (
    <Box p={4}>
      <Heading as="h2">Order Summary</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
        <Box>
          {/* Display selected seats and showtime details */}
        </Box>
        <Box>
          <Text>Total: ${totalPrice}</Text> 
        </Box>
      </Grid>
      <Button mt={4} colorScheme="teal">
        Proceed to Payment
      </Button>
    </Box>
  );
};

export default Checkout;