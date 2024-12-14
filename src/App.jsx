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
import Account from "./pages/Account";
import Booking from "./pages/Booking";
import Footer from "./pages/components/Footer";
import {useUser} from "./pages/components/UserContext";
import './App.css';

const App = () => {
    const {user} = useUser();
    const handleLogout = () =>{
        localStorage.removeItem('user');
        window.location.href="/";
    }

    return (
        <div className="content">
            {/* Navigation Bar */}
            <nav className="navbar">
            <div className="navbar-left">
                {user ? (
                    <>
                        <a>Welcome, {user.name}!</a>
                        <a href="/" onClick={handleLogout}>Logout</a>
                        <Link to="/booking" element={<Booking/>}>Booking</Link>
                    </>
                ) : (
                    <Link to="/account">Login</Link>
                )}
            </div>
            <div className="navbar-right">
                <Link to="/">Home Page</Link>
                <Link to="/create">Create New Movie</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/account">Account</Link>
            </div>
            </nav>

            {/* Page Routes */}
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/movies/:id" element={<MovieDetails />} />
                <Route path="/seat-selection/:id" element={<SeatSelection />} /> {/* Updated route, use :id instead of :movieId*/}
                <Route path="/movies/:id/checkout" element={<Checkout />} />
                <Route path="/confirmation/:id" element={<Confirmation />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/create" element={<CreatePage />} />
                <Route path="/account" element={<Account/>} />
                <Route path="/booking" element={<Booking/>}/>
            </Routes>

            {/* Footer */}
            <Footer className="footer"/>
        </div>
    );
};

export default App;