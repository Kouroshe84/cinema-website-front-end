import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Homepage.css";
import MovieCarousel from "./components/MovieCarousel";

const Homepage = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(`${apiBaseUrl}/api/movies`);
                if (!response.ok) throw new Error("Failed to fetch movies.");
                const data = await response.json();
                setMovies(data);
            } catch (err) {
                console.error("Error fetching movies:", err);
                setError("Unable to load movies. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <h2>Loading movies...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="homepage">
            <header>
                <h1>CinematicHub</h1>
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </header>
            {/* Movie Carousel */}
            <div>
                <MovieCarousel />
            </div>
            {/* Movie Grid */}
            <div className="movie-grid">
                {filteredMovies.map((movie) => (
                    <div key={movie._id} className="movie-card">
                        <img src={movie.posterUrl || "https://via.placeholder.com/300x450"} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.genre}</p>
                        <Link to={`/movies/${movie._id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;