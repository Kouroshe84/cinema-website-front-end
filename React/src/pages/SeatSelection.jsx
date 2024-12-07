import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Text, Heading } from '@chakra-ui/react';

const CustomSeatLayout = ({ rows, onSeatSelect, selectedSeats }) => {
  return (
    <Box>
      {rows.map((row) => (
        <Box key={row.rowNumber} mb={4}>
          <Text>Row {row.rowNumber}</Text>
          <Box display="flex">
            {row.seats.map((seat) => (
              <Box
                key={seat.id}
                p={2}
                m={1}
                bg={selectedSeats.includes(seat.id) ? 'blue.400' : 'gray.200'}
                color={seat.isAvailable ? 'black' : 'gray.500'}
                cursor={seat.isAvailable ? 'pointer' : 'not-allowed'}
                onClick={() => seat.isAvailable && onSeatSelect(seat.id)}
              >
                {seat.id}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const SeatSelection = () => {
  const { movieId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatLayoutData, setSeatLayoutData] = useState(null);

  useEffect(() => {
    const fetchSeatLayout = async () => {
      try {
        const response = await fetch(`/api/movies/${movieId}/seats`);
        const data = await response.json();

        const seatMapData = data.layout.map((row) => ({
          rowNumber: row.row,
          seats: row.seats.map((seat) => ({
            id: seat.id,
            isAvailable: seat.isAvailable,
          })),
        }));

        setSeatLayoutData(seatMapData);
      } catch (error) {
        console.error('Error fetching seat layout:', error);
      }
    };

    fetchSeatLayout();
  }, [movieId]);

  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const calculateTotalPrice = () => selectedSeats.length * 10;

  return (
    <Box p={4}>
      {seatLayoutData ? (
        <>
          <Heading as="h2" mb={4}>
            Select Your Seats
          </Heading>
          <CustomSeatLayout
            rows={seatLayoutData}
            onSeatSelect={handleSeatSelect}
            selectedSeats={selectedSeats}
          />
          <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
            <Box>
              <Text>Selected Seats:</Text>
              <ul>
                {selectedSeats.map((seat) => (
                  <li key={seat}>{seat}</li>
                ))}
              </ul>
            </Box>
            <Box>
              <Text>Total Price: ${calculateTotalPrice()}</Text>
            </Box>
          </Grid>
        </>
      ) : (
        <Text>Loading seat layout...</Text>
      )}
    </Box>
  );
};

export default SeatSelection;
