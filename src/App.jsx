import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import MovieDetails from "./pages/MovieDetails";
import SeatSelection from "./pages/SeatSelection";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/movies/:id/seats" element={<SeatSelection />} />
            <Route path="/movies/:id/checkout" element={<Checkout />} />
            <Route path="/confirmation/:id" element={<Confirmation />} />
        </Routes>
    );
};

export default App;