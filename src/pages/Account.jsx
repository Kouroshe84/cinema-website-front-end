import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Account.css'; // Ensure you add the CSS for this file

const Account = ({ setUser }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async () => {
        setErrorMessage(''); // Clear any existing errors
        try {
            if (isSignUp) {
                if (!formData.name || !formData.email || !formData.password) {
                    setErrorMessage('All fields are required!');
                    return;
                }
                if (formData.password !== formData.confirmPassword) {
                    setErrorMessage('Passwords do not match!');
                    return;
                }
                // Call the backend to create a new user
                const response = await axios.post('/api/users', {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                });
                alert('Sign-Up successful!');
                setUser(response.data.name);
                navigate('/');
            } else {
                if (!formData.email || !formData.password) {
                    setErrorMessage('Email and Password are required!');
                    return;
                }
                // Call the backend to authenticate the user
                const response = await axios.post('/api/users/login', {
                    email: formData.email,
                    password: formData.password,
                });
                alert('Login successful!');
                setUser(response.data.name);
                navigate('/');
            }
        } catch (error) {
            const message =
                error.response?.data?.message || 'An error occurred. Please try again.';
            setErrorMessage(message);
        }
    };

    return (
        <div className="account-container">
            <div className="account-form">
                <h2>{isSignUp ? 'Create an Account' : 'Login to Your Account'}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                {isSignUp && (
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                {isSignUp && (
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                )}

                <button className="submit-btn" onClick={handleSubmit}>
                    {isSignUp ? 'Sign Up' : 'Login'}
                </button>

                <div className="switch-account">
                    <span>
                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                    </span>
                    <button onClick={() => setIsSignUp((prev) => !prev)}>
                        {isSignUp ? 'Login here' : 'Create one'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;