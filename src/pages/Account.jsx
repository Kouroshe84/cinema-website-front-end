import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useUser} from './components/UserContext';
import axios from 'axios';
import './Account.css'; // Ensure you add the CSS for this file

const Account = () => {
    const {setUser} = useUser();
    const [username, setUsername] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); //prevent duplicate submissions
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validForm = () =>{
        if(isSignUp){
            if(!formData.name) return "Name is required";
            if(formData.password !== formData.confirmPassword) return "Passwords do not match";
        }
        if(!formData.email.includes("@")) return "Invalid email address";
        if(formData.password.length < 6) return "Password must be at leat 6 characters";
        if(!formData.email || !formData.password || (isSignUp && !formData.name)) return "All fields are required";
        return null;
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const validationError = validForm();
        if(validationError){
            setErrorMessage(validationError);
            return;
        }
        setErrorMessage(""); //clear Error message before fetch
        setIsLoading(true); //prevent duplicate submission        
        if (isSignUp) {
            await handleSignUp();
        } else {
            await handleLogin();
        }
    }

    const handleSignUp = async () => {

        try {
            // Call the backend to create a new user
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
            const userRegInfo = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            }

            const response = await axios.post(`${apiBaseUrl}/api/users`, userRegInfo);
            console.log(response.data);
            alert("Sign-up successful!");
        } catch (error) {
            const message =
                error.response?.data?.message || 'An error occurred. Please try again.';
            setErrorMessage(message);
        }
        finally {
            setIsLoading(false);
        }
    };


    const handleLogin = async() => {
        try {
            // Call the backend to retrieve a user
            const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
            const inputInfo = {
                email: formData.email,
                password: formData.password
            }

            const response = await axios.get(`${apiBaseUrl}/api/users`);
            const user = response.data.find(user => user.email === inputInfo.email);
                if(user){
                    console.log(response.data);
                    if(user.password === inputInfo. password){
                    setUser({name: user.name});
                    navigate("/");
                    alert("Login successful!");
                }
                    else{
                        setErrorMessage("Incorrect Login Information.");
                    }
                }
                else{
                    setErrorMessage("Incorrect Login Information.");  
                }
        } catch (error) {
            const message =
                error.response?.data?.message || 'An error occurred. Please try again.';
            setErrorMessage(message);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="account-container">
            <div className="account-form">
                <h2>{isSignUp ? 'Create an Account' : 'Login to Your Account'}</h2>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {/* Use form element to prevent DOM warning for type password */}
                <form> 
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

                    <button type= "button"
                    className="submit-btn" onClick={handleSubmit} disabled={isLoading}>
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </button>

                </form>
                
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