import React, { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import movies from "../data/movies";
import "./SeatSelection.css";

const SeatSelection = () => {
    const { id } = useParams(); //movieId
    const movie = movies.find((m) => m.id === parseInt(id)); 

    const location = useLocation();
    const { selectedShowTime } = location.state || {};

    const [selectedSeats, setSelectedSeats] = useState([]); //set selected seats 
    const seatPrice = 10;

    const toggleSeat = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat)); //if seat is selected, set the selectedArray to exclude that seat
        } else {
            setSelectedSeats([...selectedSeats, seat]); //if seat is not selected, set the selectedSeat to the selectedArray
        }
    };

    const totalPrice = selectedSeats.length * seatPrice;

    if (!movie) {
        return <h2>Movie not found</h2>;
    }

    return (
        //Array.from() generates 30 slots with mapFunction to create 30 seat button with key S${i}
        <div className="seat-selection">
            <Link to={`/movies/${id}`}>Back to Movie Details</Link>
            <h1>Select Seats for {movie.title}</h1>
            <h1>Show Time: {selectedShowTime}</h1>
            <div className="seating">
                {Array.from({ length: 30 }, (_, i) => {
                    const seat = `S${i + 1}`;
                    return (
                        <button
                            key={seat}
                            className={`seat ${
                                selectedSeats.includes(seat) ? "selected" : ""
                            }`}
                            onClick={() => toggleSeat(seat)}
                        >
                            {seat}
                        </button>
                    );
                })}
            </div>
            <div className="summary">
                <h3>Selected Seats: {selectedSeats.join(", ") || "None"}</h3>
                <h3>Total Price: ${totalPrice}</h3>
                <Link 
                    to={`/movies/${id}/checkout`}
                    state={{ selectedSeats, selectedShowTime, totalPrice }} // Example showtime
>
                    <button disabled={selectedSeats.length === 0}>
                        Proceed to Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default SeatSelection;