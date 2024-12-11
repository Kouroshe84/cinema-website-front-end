import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Account.css'; // Ensure you add the CSS for this file

const Account = ({ setUser }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = () => {
        if (isSignUp) {
            if (!formData.name || !formData.email || !formData.password) {
                alert('All fields are required!');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            alert('Sign-Up successful!');
            setUser(formData.name);
            navigate('/');
        } else {
            if (!formData.email || !formData.password) {
                alert('Email and Password are required!');
                return;
            }
            alert('Login successful!');
            setUser(formData.email);
            navigate('/');
        }
    };

    return (
        <div className="account-container">
            <div className="account-form">
                <h2>{isSignUp ? 'Create an Account' : 'Login to Your Account'}</h2>

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
