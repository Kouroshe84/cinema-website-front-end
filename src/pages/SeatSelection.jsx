import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import movies from "../data/movies";
import "./SeatSelection.css";

const SeatSelection = () => {
    const { id } = useParams(); // Movie ID from the URL
    const movie = movies.find((m) => m.id === parseInt(id)); // Find the movie based on ID
    
    const location = useLocation();
    const { selectedShowTime } = location.state || {}; // Show time from location.state

    const [bookedSeats, setBookedSeats] = useState([]); // List of available seats
    const [selectedSeats, setSelectedSeats] = useState([]); // List of selected seats
    const seatPrice = 10; 

    useEffect(() => {
        const fetchAvailableSeats = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/orders/movie/${movie.id}`);
                const data = await response.json();
                console.log("Fetched Orders:", data);
                const bookedSeats = data.filter((d) => d.showTime === selectedShowTime).flatMap((d) => d.seats);                
                setBookedSeats(bookedSeats);
                console.log(bookedSeats);
            } catch (error) {
                console.error("Error fetching available seats:", error);
            }
        };
    
        if (movie) {
            fetchAvailableSeats();
        }
    }, [movie]);

    const toggleSeat = (seat) => {
        if (!bookedSeats.includes(seat) && selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat)); // Deselect the seat
        } else {
            setSelectedSeats([...selectedSeats, seat]); // Select the seat
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
                                bookedSeats.includes(seat) ? "booked" : 
                                selectedSeats.includes(seat) ? "selected" : ""
                            }`}
                            disabled = {bookedSeats.includes(seat)}
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