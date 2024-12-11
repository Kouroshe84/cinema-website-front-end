import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import './MovieCarousel.css';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/api/movies`);
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to load movies.");
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>{error}</p>;

  if (movies.length === 0) return <p>No movies available at the moment.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Featured Movies</h2>
      <Carousel
        activeIndex={currentIndex}
        onSelect={handleSelect}
        indicators={true}
        controls={true}
      >
        {movies.map((movie) => (
          <Carousel.Item key={movie._id}>
            <img
              className="d-block w-100 carousel-poster"
              src={movie.posterUrl || "https://via.placeholder.com/300x450"}
              alt={movie.title}
            />
            <Carousel.Caption>
              <h5>{movie.title}</h5>
              <p>{movie.genre}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;