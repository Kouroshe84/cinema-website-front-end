import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch movie and showtime details
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                
                // Fetch movie details
                const movieResponse = await fetch(`${apiBaseUrl}/api/movies/${id}`);
                const movieData = await movieResponse.json();
                setMovie(movieData);

                // Fetch showtimes for the movie
                const showtimesResponse = await fetch(`${apiBaseUrl}/api/movies/${id}/showtimes`);
                const showtimesData = await showtimesResponse.json();
                setShowtimes(showtimesData);
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setError("Failed to load movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    const handleShowTimeSelection = (selectedShowTime) => {
        setSelectedShowTime(selectedShowTime);
    };

    if (loading) return <h2>Loading movie details...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="movie-details">
            <Link to="/">Back to Homepage</Link>
            <h1>{movie.title}</h1>
            <img src={movie.posterUrl || "https://via.placeholder.com/300x450"} alt={movie.title} />
            <p>{movie.description}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Duration:</strong> {movie.duration} minutes</p>
            <div className="showtimes">
                <h3>Showtimes:</h3>
                {showtimes.map((showtime) => (
                    <button
                        key={showtime._id}
                        onClick={() => handleShowTimeSelection(showtime.time)}
                    >
                        {showtime.time}
                    </button>
                ))}
            </div>
            <Link
                to={`/movies/${id}/seats`}
                state={{ selectedShowTime }}
            >
                <button disabled={!selectedShowTime}>Select Seats</button>
            </Link>
        </div>
    );
};

export default MovieDetails;