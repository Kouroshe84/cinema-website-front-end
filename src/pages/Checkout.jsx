import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import movies from "../data/movies";
import "./Checkout.css";

const Checkout = () => {
    const { id } = useParams();
    const movie = movies.find((m) => m.id === parseInt(id));

    // Retrieve passed state (selected seats and showtime) from the seat selection page
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, selectedShowTime, totalPrice } = location.state || {};

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    //update state of payment details when fields are changed
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handlePayment = async () => {
        const { cardNumber, expiryDate, cvv } = paymentDetails;
        
        //validate paymentDetails fields
        if (!cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all payment details.");
            return;
        }
    
        if (cardNumber.length < 16 || isNaN(cardNumber)) {
            alert("Invalid card number. Please enter a valid 16-digit number.");
            return;
        }
    
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            alert("Invalid expiry date format. Please use MM/YY.");
            return;
        }
    
        if (cvv.length < 3 || isNaN(cvv)) {
            alert("Invalid CVV. Please enter a 3-digit number.");
            return;
        }
    
        try{
            //try post order to database
            const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userid: "user_456", 
                    movieid: id,
                    seats: selectedSeats,
                    totalPrice: totalPrice,
                    showTime: selectedShowTime
                }),
            });

            //console.log(response);

        //if order successfully update
        const data = await response.json();
        console.log(data);
        
        if (data.order.orderid) {
            alert("Payment successful! Redirecting to confirmation page...");
            navigate(`/confirmation/${data.order.orderid}`);
        }   else{
            alert("Order failed. Please try again.");
        }
        } catch(error){
            console.error("Error: " + error);
            alert("An error occured during payment");
        }
        
    };

    if (!movie) {
        return <h2>Movie not found</h2>;
    }

    return (
        <div className="checkout">
            <h1>Checkout for {movie.title}</h1>
            <div className="ticket-summary">
                <h2>Ticket Summary</h2>
                <p><strong>Movie:</strong> {movie.title}</p>
                <p><strong>Showtime:</strong> {selectedShowTime || "Not selected"}</p>
                <p><strong>Seats:</strong> {selectedSeats?.join(", ") || "None"}</p>
                <p><strong>Total Price:</strong> ${totalPrice || 0}</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date (MM/YY)"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={paymentDetails.cvv}
                    onChange={handleChange}
                    required
                />
                <button type="submit" onClick={handlePayment}>
                    Complete Payment
                </button>
            </form>
        </div>
    );
};

export default Checkout;