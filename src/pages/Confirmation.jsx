import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Confirmation.css";

const Confirmation = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const response = await fetch(`${import.meta.env.VITE_BE_URL}/api/orders/${id}`);
            const data = await response.json();
            setOrder(data);
        };
        fetchOrder();
    }, [id]);

    if (!order) return <h2>Loading...</h2>;

    return (
        <div className="confirmation">
            <h1>Thank You for Your Purchase!</h1>
            <h2>Order Summary</h2>
            <p><strong>Movie:</strong> {order.movieid}</p>
            <p><strong>Showtime:</strong> {order.showTime}</p>
            <p><strong>Seats:</strong> {order.seats.join(", ")}</p>
            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
        </div>
    );
};

export default Confirmation;