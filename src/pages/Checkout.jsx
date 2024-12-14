import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";
import axios from "axios";
import {useUser} from "./components/UserContext";

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = useUser();

  const { selectedSeats, selectedShowTime, totalPrice } = location.state || {};
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [userId, setUserId] = useState("default_user");

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiBaseUrl}/api/movies/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details.");
        setLoading(false);
      }
    };

    fetchMovie();
    if(user){
      const userEmail = user.email;
      console.log(`user: ${userEmail}`);

      const fetchUserid = async() => {
        try {
          const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
          const response = await axios.get(`${apiBaseUrl}/api/users`);
          const user = response.data.find(user => user.email === userEmail);
          setUserId(user._id);
        } catch (err){
          console.error("Error fetching user details:", err);
          setError("Failed to load user details.");
          setLoading(false);
        }
      };
  
      fetchUserid();
    }
    else{
      console.log(`guest user.`);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    const { cardNumber, expiryDate, cvv } = paymentDetails;

    // Validate payment details
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please fill in all payment details.");
      return;
    }

    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      alert("Invalid card number. Please enter a valid 16-digit number.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert("Invalid expiry date format. Please use MM/YY.");
      return;
    }

    if (cvv.length !== 3 || isNaN(cvv)) {
      alert("Invalid CVV. Please enter a 3-digit number.");
      return;
    }

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

      const order = {
        userid: user ? userId : "guest_user",
        movieid: id,
        seats: selectedSeats,
        totalPrice: totalPrice,
        showTime: selectedShowTime
      };

      const response = await axios.post(`${apiBaseUrl}/api/orders`, order);

      if (response.data.order.orderid) {
        alert("Payment successful! Redirecting to confirmation page...");
        navigate(`/confirmation/${response.data.order.orderid}`);
      } else {
        alert("Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred during payment.");
    }
  };

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="checkout">
      <h1>Checkout for {movie.title}</h1>
      <div className="ticket-summary">
        <h2>Ticket Summary</h2>
        <p><strong>Movie:</strong> {movie.title}</p>
        <p><strong>Showtime:</strong> {selectedShowTime || "Not selected"}</p>
        <p><strong>Seats:</strong> {selectedSeats?.join(", ") || "None"}</p>
        <p><strong>Total Price:</strong> ${totalPrice || 0}</p>
        {user 
        ? (<p><strong>Checkout as:</strong>{user.name}</p>)
        : (<p><strong>Checkout as:</strong>Guest</p>)
        }
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