import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

function App() {
  const [movies, setMovies] = useState([]); // Stores movie data
  const [user, setUser] = useState(null); // Tracks the logged-in user

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies'); // Replace with your API endpoint
        const data = await response.json();
        setMovies(data); // Store fetched movie data
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <Box minH="100vh" bg="gray.100">
        <Navbar user={user} /> {/* Pass the user to Navbar */}
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} /> {/* Home Page */}
          <Route path="/create" element={<CreatePage setUser={setUser} />} /> {/* Create or Login */}
          <Route path="/movie/:id" element={<MovieDetailsPage />} /> {/* Movie Details */}
          <Route path="/seat-selection/:movieId" element={<SeatSelection />} /> {/* Seat Selection */}
          <Route path="/checkout" element={<Checkout />} /> {/* Checkout */}
          <Route path="/about" element={<AboutUs />} /> {/* About Us */}
          <Route path="/contact" element={<ContactUs />} /> {/* Contact Us */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
