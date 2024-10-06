import React, { useState } from "react";
import DOMPurify from 'dompurify';  // For XSS prevention

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple email validation using RegEx
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert('Please enter a valid email.');
            return;
        }

        // Send the login request
        const response = await fetch('http://localhost:3000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies are included in the request
            body: JSON.stringify({ email, password: pass }),
        });

        const data = await response.text();
        if (response.status === 200) {
            alert('Login successful!');
        } else {
            alert('Invalid credentials. Please try again.');
        }
        console.log(data);
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    value={DOMPurify.sanitize(email)} // Sanitize the input to prevent XSS
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="yourEmail@gmail.com"
                    id="email"
                    name="email"
                />
                <label htmlFor="password">Password</label>
                <input
                    value={pass} // No need for sanitization here
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="***********"
                    id="password"
                    name="password"
                />
                <button type="submit">Log In</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('register')}>
                Don't have an account? Register
            </button>
        </div>
    );
};







