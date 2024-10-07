import React from 'react';
import './Dash.css';

export const Dashboard = (props) => {

    const handleLogout = () => {
        // Implement logout functionality here
        props.onFormSwitch('login');
        alert('You have been logged out.');
    };

    return (
        <div className="dash-container">
            <nav className="navbar">
                <div className="navbar-left">
                    <a href="#home" className="nav-link">Home</a>
                    <a href="#payment-portal" className="nav-link">Payment Portal</a>
                </div>
                <div className="navbar-right">
                    <span className="nav-link logout" onClick={handleLogout}>Log Out</span>
                </div>
            </nav>
            <div className="dashboard-content">
                <h1>Dashboard</h1>
                <p>Welcome to your dashboard! Select an option from the navigation bar above.</p>
            </div>
        </div>
    );
};
