import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import "../Style/Follow.css";
import { Link } from 'react-router-dom';

const Follow = () => {
    const [status, setStatus] = useState('');
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/api/delivery/orders', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Accept': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                setStatus(data[0].status);
                setOrderId(data[0].id);
            }
        })
        .catch(error => {
            console.error('Error fetching order status:', error);
        });
    }, []);

    const isCompleted = (step) => {
        const stepsOrder = ['placed', 'preparing', 'shipped', 'delivered'];
        return stepsOrder.indexOf(step) <= stepsOrder.indexOf(status);
    };

    return (
        <div>
            <NavBar />
            <div className="follow-container">
                <h2>Info about your order</h2>
                <p>Order #{orderId}</p>

                <div className="progress-track">
                    {['placed', 'preparing', 'shipped', 'delivered'].map((step) => (
                        <div className={`step ${isCompleted(step) ? 'completed' : ''}`} key={step}>
                            <div className="circle">{isCompleted(step) ? '✔' : ''}</div>
                            <p>{step}</p>
                        </div>
                    ))}
                </div>

                <Link to="/" style={{ textDecoration: "none" }}>
                    <button className="back-home">back to home</button>
                </Link>
            </div>
        </div>
    );
};

export default Follow;
