import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import CreatePage from "./pages/CreatePage";
import Footer from "./pages/components/Footer";
import './App.css';

const App = () => {
    return (
            <div className="content">
                {/* Navigation Bar */}
                <nav className="navbar">
                    <Link to="/">Home Page</Link>
                    <Link to="/create">Create New Movie</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
                </nav>

                {/* Page Routes */}
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/movies/:id/seats" element={<SeatSelection />} />
                    <Route path="/movies/:id/checkout" element={<Checkout />} />
                    <Route path="/confirmation/:id" element={<Confirmation />} />
                    <Route path="/about" element={<AboutUs/>} />
                    <Route path="/contact" element={<ContactUs/>} />
                    <Route path="/create" element={<CreatePage />} />
                </Routes>

                {/* Footer */}
                <div>
                    <Footer/>
                </div>
            </div>
    );
};

export default App;