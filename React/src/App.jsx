import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';

function App() {
  const [movies, setMovies] = useState([]); 

  useEffect(() => {
    // Fetch movie data from API (replace with your actual API call)
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies'); // Example API endpoint
        const data = await response.json();
        setMovies(data); 
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Router>
      <Box minH="100vh">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage movies={movies} />} /> 
          <Route path="/create" element={<CreatePage />} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} /> 
          <Route path="/seat-selection/:movieId" element={<SeatSelection />} /> 
          <Route path="/checkout" element={<Checkout />} /> 
        </Routes>
      </Box>
    </Router>
  );
}

export default App;