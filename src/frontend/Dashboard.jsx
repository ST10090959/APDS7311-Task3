import React, { useState } from 'react';
import './Dash.css';

export const Dashboard = (props) => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('USD');
    const [swiftCode, setSwiftCode] = useState('');
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handleLogout = () => {
        props.onFormSwitch('login');
        alert('You have been logged out.');
    };

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        const paymentData = { amount, currency, swiftCode };

        try {
            const response = await fetch('https://localhost:3001/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (response.ok) {
                alert('Payment submitted successfully!');
            } else {
                alert('Failed to submit payment.');
            }
        } catch (error) {
            console.error('Error submitting payment:', error);
            alert('Error submitting payment.');
        }
    };

    return (
        <div className="dash-container">
            <nav className="navbar">
                <div className="navbar-right">
                    <span className="nav-link logout" onClick={handleLogout}>Log Out</span>
                </div>
            </nav>
            <div className="dashboard-content">
                <div className="payment-card">
                    <h1>Mastercard Payment Portal</h1>
                    <form className="payment-form" onSubmit={handlePaymentSubmit}>
                        <div className="form-group">
                            <label htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Enter amount"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currency">Currency</label>
                            <select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                                <option value="ZAR">ZAR</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="swiftCode">SWIFT Code</label>
                            <input
                                type="text"
                                id="swiftCode"
                                value={swiftCode}
                                onChange={(e) => setSwiftCode(e.target.value)}
                                placeholder="Enter SWIFT code"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardHolder">Card Holder Name</label>
                            <input
                                type="text"
                                id="cardHolder"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value)}
                                placeholder="Card holder name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="Enter card number"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input
                                type="month"
                                id="expiryDate"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                placeholder="CVV"
                                required
                            />
                        </div>
                        <button type="submit" className="pay-button">Pay Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
