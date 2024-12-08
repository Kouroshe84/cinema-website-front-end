import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}`);
                if (!response.ok) throw new Error("Failed to fetch order details.");
                const data = await response.json();
                setOrder(data);
            } catch (err) {
                console.error("Error fetching order:", err);
                setError("Unable to load order details. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <h2>Loading order details...</h2>;
    if (error) return <h2>{error}</h2>;

    return (
        <div className="confirmation">
            <h1>Thank You for Your Purchase!</h1>
            <h2>Order Summary</h2>
            <p><strong>Movie:</strong> {order.movieTitle || "Unknown Movie"}</p>
            <p><strong>Showtime:</strong> {order.showTime || "Not available"}</p>
            <p><strong>Seats:</strong> {order.seats?.join(", ") || "No seats selected"}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice || "0.00"}</p>
        </div>
    );
};

export default Confirmation;