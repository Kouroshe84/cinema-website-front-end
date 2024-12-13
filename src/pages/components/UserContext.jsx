import React, { createContext, useState, useContext } from "react";

// Create UserContext
const UserContext = createContext();

// Create a Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store logged-in user info

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom Hook to Use UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};