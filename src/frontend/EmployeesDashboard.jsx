import React, { useEffect, useState } from 'react';
import './EmployeesDash.css';

export const EmployeesDashboard = ({ onFormSwitch }) => {
    const [payments, setPayments] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('https://localhost:3001/api/payments');
                if (!response.ok) {
                    throw new Error('Failed to fetch payments');
                }
                const data = await response.json();
                setPayments(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setError('Error fetching payments');
                setPayments([]);
            }
        };

        fetchPayments();
    }, []);

    const handleApprove = async (paymentId) => {
        try {
            const response = await fetch(`https://localhost:3001/api/payments/${paymentId}/verify`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                setPayments(payments.map(payment => 
                    payment._id === paymentId ? { ...payment, verified: true } : payment
                ));
            } else {
                console.error('Failed to approve payment');
            }
        } catch (error) {
            console.error('Error approving payment:', error);
        }
    };

    const handleLogout = () => {
        onFormSwitch('login');
        alert('You have been logged out.');
    };

    // Separate pending and approved payments
    const pendingPayments = payments.filter(payment => !payment.verified);
    const approvedPayments = payments.filter(payment => payment.verified);

    return (
        <div className="employees-dashboard">
            <nav className="navbar">
                <span className="navbar-logo">Employees Dashboard</span>
                <span className="nav-link logout" onClick={handleLogout}>Log Out</span>
            </nav>
            <h1>Payments Approval</h1>
            {error && <p className="error-message">{error}</p>}

            <div className="tables-container">
                <div className="table-section">
                    <h2>Pending Payments</h2>
                    <table className="employees-table">
                        <thead>
                            <tr>
                                <th>Object ID</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>SWIFT Code</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingPayments.map(payment => (
                                <tr key={payment._id}>
                                    <td>{payment._id}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.currency}</td>
                                    <td>{payment.swiftCode}</td>
                                    <td>{new Date(payment.date).toLocaleString()}</td>
                                    <td>
                                        <button
                                            onClick={() => handleApprove(payment._id)}
                                            className="approve-button"
                                        >
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {pendingPayments.length === 0 && <p className="empty-message">No pending payments.</p>}
                </div>

                <div className="table-section">
                    <h2>Approved Payments</h2>
                    <table className="employees-table">
                        <thead>
                            <tr>
                                <th>Object ID</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>SWIFT Code</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {approvedPayments.map(payment => (
                                <tr key={payment._id}>
                                    <td>{payment._id}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.currency}</td>
                                    <td>{payment.swiftCode}</td>
                                    <td>{new Date(payment.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {approvedPayments.length === 0 && <p className="empty-message">No approved payments.</p>}
                </div>
            </div>
        </div>
    );
};
