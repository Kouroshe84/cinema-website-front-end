import React, { useState } from "react";
import axios from "axios";

const CreatePage = () => {
    const [movieData, setMovieData] = useState({
        title: "",
        genre: "",
        duration: "",
        releaseDate: "",
        posterUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
            await axios.post(`${apiBaseUrl}/api/movies`, movieData);
            alert("Movie added successfully!");
        } catch (err) {
            console.error("Error adding movie:", err);
            alert("Failed to add the movie. Please try again.");
        }
    };

    return (
        <div>
            <h1>Create a New Movie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={movieData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="genre"
                    placeholder="Genre"
                    value={movieData.genre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="duration"
                    placeholder="Duration (minutes)"
                    value={movieData.duration}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="releaseDate"
                    placeholder="Release Date"
                    value={movieData.releaseDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="url"
                    name="posterUrl"
                    placeholder="Poster URL"
                    value={movieData.posterUrl}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default CreatePage;