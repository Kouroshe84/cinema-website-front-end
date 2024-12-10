import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
    const { id } = useParams();
    console.log(id);
    const [movie, setMovie] = useState(null);
    const [showtimes, setShowtimes] = useState([]);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

                if (!apiBaseUrl) {
                    throw new Error("API base URL is not defined in .env file");
                }

                // Fetch movie details
                const movieResponse = await fetch(`${apiBaseUrl}/api/movies/${id}`);
                if (!movieResponse.ok) {
                    throw new Error(`Failed to fetch movie details: ${movieResponse.status}`);
                }
                const movieData = await movieResponse.json();
                setMovie(movieData);

                // Fetch showtimes
                const showtimesResponse = await fetch(`${apiBaseUrl}/api/showtimes/movie/${id}`);
                if (!showtimesResponse.ok) {
                    throw new Error(`Failed to fetch showtimes: ${showtimesResponse.status}`);
                }
                const showtimesData = await showtimesResponse.json();
                setShowtimes(showtimesData);
            } catch (err) {
                console.error("Error fetching movie details:", err);
                setError(err.message || "Failed to load movie details.");
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
            {movie && (
                <>
                    <h1>{movie.title}</h1>
                    <img
                        src={movie.posterUrl || "https://via.placeholder.com/300x450"}
                        alt={movie.title}
                    />
                    <p>{movie.description}</p>
                    <p><strong>Genre:</strong> {movie.genre}</p>
                    <p><strong>Duration:</strong> {movie.duration} minutes</p>
                </>
            )}
            <div className="showtimes">
                <h3>Showtimes:</h3>
                {showtimes.length > 0 ? (
                    showtimes.map((showtime) => (
                        <button
                            key={showtime._id}
                            onClick={() => handleShowTimeSelection(showtime.time)}
                        >
                            {showtime.time}
                        </button>
                    ))
                ) : (
                    <p>No showtimes available</p>
                )}
            </div>
            <Link
                // to={`/movies/${id}/seats`}
                to={`/seat-selection/${id}`}
                state={{ selectedShowTime }}
            >
                <button disabled={!selectedShowTime}>Select Seats</button>
            </Link>
        </div>
    );
};

export default MovieDetails;
