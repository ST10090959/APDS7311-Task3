import React, { useState } from "react";
import DOMPurify from 'dompurify';  // For XSS prevention

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simple RegEx pattern for email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailPattern.test(email)) {
            alert('Please enter a valid email.');
            return;
        }

        if (!passwordPattern.test(pass)) {
            alert('Password must be at least 8 characters long and contain at least one number.');
            return;
        }

        // Send the registration request
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Ensure cookies are included in the request
            body: JSON.stringify({ email, password: pass }),
        });

        const data = await response.text();
        if (response.status === 201) {
            alert('Registration successful!');
            props.onFormSwitch('login');
        } else {
            alert('Registration failed. Please try again.');
        }
        console.log(data);
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input
                    value={DOMPurify.sanitize(name)} // Sanitize the input to prevent XSS
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="name"
                    placeholder="John Doe"
                />
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
                <button type="submit">Register</button>
            </form>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}>
                Already have an account? Log In
            </button>
        </div>
    );
};



