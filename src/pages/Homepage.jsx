import React, { useState } from "react";
import { Link } from "react-router-dom";
import movies from "../data/movies";
import "./Homepage.css";
import MovieCarousel from "./components/MovieCarousel";

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <MovieCarousel/>
            </div>
            {/* Movie Grid */}
            <div className="movie-grid">
                {filteredMovies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <img src={movie.poster} alt={movie.title} />
                        <h2>{movie.title}</h2>
                        <p>{movie.description}</p>
                        <Link to={`/movies/${movie.id}`}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;