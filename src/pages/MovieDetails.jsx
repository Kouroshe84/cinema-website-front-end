import React, {useState} from "react";
import { useParams, Link } from "react-router-dom";
import movies from "../data/movies";
import "./MovieDetails.css";

const MovieDetails = () => {
    const { id } = useParams();
    const movie = movies.find((moviedata) => moviedata.id === parseInt(id)); //select movie from database where movieId = param

    const [selectedShowTime, setSelectedShowTime] = useState(null);

    const handleShowTimeSelection = (selectedShowTime) => {
        setSelectedShowTime(selectedShowTime);
    }

    return (
        //display movie details
        //show time is static for all movie now, we may need to update according to data store at a specific database
        //Link to select seats page 
        <div className="movie-details">
            <Link to="/">Back to Homepage</Link>
            <h1>{movie.title}</h1>
            <img src={movie.poster} alt={movie.title}/>
            <p>{movie.description}</p>
            <p><strong>Genre:</strong> Sci-Fi</p>
            <p><strong>Cast:</strong> Example Cast</p>
            <div className="showtimes">
                <h3>Showtimes:</h3>  
                <button onClick={() => handleShowTimeSelection("3:00PM")}>3:00 PM</button>
                <button onClick={() => handleShowTimeSelection("6:00PM")}>6:00 PM</button>
                <button onClick={() => handleShowTimeSelection("9:00PM")}>9:00 PM</button>
            </div>
            <Link 
                to={`/movies/${id}/seats`}
                state={
                    {selectedShowTime:selectedShowTime}
                    }>
                <button>Select Seats</button>
            </Link>
        </div>
    );
};

export default MovieDetails;