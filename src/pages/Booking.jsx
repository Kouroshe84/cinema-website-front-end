import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Booking.css";
import {useUser} from "./components/UserContext";
import {useNavigate} from "react-router-dom";

const Booking = () => {
    const [orders, setOrders] = useState([]);
    const [movies, setMovies] = useState({});
    const {user} = useUser();
    const userId = user.userid;


    useEffect(() => {
        //console.log(`UserId : ${userId}`);
        const fetchOrders = async () => {
            try {
                const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiBaseUrl}/api/orders`);
                const userOrders = response.data.filter(order => order.userid === userId);
                //console.log(userOrders);
                if(userOrders ? setOrders(userOrders) : setOrders([]));

                const moviePromises = userOrders.map((order) =>
                    fetch(`${apiBaseUrl}/api/movies/${order.movieid}`).then((resp) => resp.json())
                  );
                  
                  //Fetch movie data for each order
                  const moviesData = await Promise.all(moviePromises);
          
                  // Create a movie map (id -> movie data)
                  const moviesMap = {};
                  moviesData.forEach((movie) => {
                    moviesMap[movie._id] = movie;
                  });
                  setMovies(moviesMap);
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };

        fetchOrders();

        }, [""]);

        return (
            <div className="booking-container">
              <h1>Your Orders</h1>
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                <div className="orders-grid">
                  {orders.map((order) => {
                        const movie = movies[order.movieid];
                        return(
                            <div key={order._id} className="order-card">
                            <h3>Order ID: {order.orderid}</h3>
                            <p><strong>Seats:</strong> {order.seats.join(", ")}</p>
                            <p><strong>Total Price:</strong> ${order.totalPrice}</p>
                            <p><strong>Showtime:</strong> {order.showTime}</p>
                            <p><strong>Movie:</strong> {movie ? movie.title : order.movieid}</p>
                            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                        )
                  }
                  )}
                </div>
              )}
            </div>
          );
        };

export default Booking;