import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "./SeatSelection.css";

const SeatSelection = () => {
    const { id } = useParams(); // Movie ID from the URL
    //console.log(`movieId: ${id}`);
    const location = useLocation();
    const { selectedShowTime } = location.state || {}; // Selected showtime from MovieDetails
    const [movie, setMovie] = useState(null);
    const [bookedSeats, setBookedSeats] = useState([]); // List of booked seats
    const [selectedSeats, setSelectedSeats] = useState([]); // List of selected seats
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const seatPrice = 10;

    // Fetch movie and booked seats data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

                // Fetch movie details
                const movieResponse = await fetch(`${apiBaseUrl}/api/movies/${id}`);
                const movieData = await movieResponse.json();
                setMovie(movieData);
                //console.log(movieData);

                // Fetch booked seats for the selected showtime
                const seatsResponse = await fetch(`${apiBaseUrl}/api/orders/movie/${id}`);
                const orders = await seatsResponse.json();
                const seats = orders
                    .filter((order) => order.showTime === selectedShowTime)
                    .flatMap((order) => order.seats);
                setBookedSeats(seats);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load seating data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, selectedShowTime]);

    const toggleSeat = (seat) => {
        if (!bookedSeats.includes(seat) && selectedSeats.includes(seat)) {
            setSelectedSeats(selectedSeats.filter((s) => s !== seat)); // Deselect the seat
        } else {
            setSelectedSeats([...selectedSeats, seat]); // Select the seat
        }
    };

    const totalPrice = selectedSeats.length * seatPrice;

    if (loading) return <h2>Loading seating data...</h2>;
    if (error) return <h2>{error}</h2>;

    if (!movie) return <h2>Movie not found.</h2>;

    return (
        <div className="seat-selection">
            <Link to={`/movies/${id}`}>Back to Movie Details</Link>
            <h1>Select Seats for {movie.title}</h1>
            {selectedShowTime && <h2>Showtime: {selectedShowTime}</h2>}
            <div className="seating">
                {Array.from({ length: 30 }, (_, i) => {
                    const seat = `S${i + 1}`;
                    return (
                        <button
                            key={seat}
                            className={`seat ${
                                bookedSeats.includes(seat)
                                    ? "booked"
                                    : selectedSeats.includes(seat)
                                    ? "selected"
                                    : ""
                            }`}
                            disabled={bookedSeats.includes(seat)}
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
                    state={{ selectedSeats, selectedShowTime, totalPrice }}
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