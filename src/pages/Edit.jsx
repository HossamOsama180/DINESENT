
import React, { useEffect, useState } from 'react';
import '../Style/Edit.css'; // اعمل ملف CSS مشابه لطالبات
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ChangePasswordModal from '../pages/ChangePasswordModal';
import ChangeEmailModal from '../Pages/ChangeEmailModal';


const MyAccount = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);


    useEffect(() => {
        const storedUser = localStorage.getItem('userAddress');
        if (storedUser) {
            setUserData(JSON.parse(storedUser));
        } else {
            navigate('/signup'); // لو مفيش بيانات يرجعه للتسجيل
        }
    }, []);

    if (!userData) return null;

    return (
        <>
            <NavBar />
            <div className="account-container">
                <div className="account-box">
                    <h2>My Account</h2>


                    <div className="info-row">
                        <div className="info-group">
                            <span className="info-label">First Name</span>
                            <div className="info-value">{userData.fname}</div>
                        </div>
                        <div className="info-group">
                            <span className="info-label">Last Name</span>
                            <div className="info-value">{userData.lname}</div>
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="info-group">
                            <span className="info-label">Email</span>
                            <div className="info-value">{userData.email}</div>
                        </div>
                        <div className="info-group">
                            <span className="info-label">Phone Number</span>
                            <div className="info-value">{userData.phone_number}</div>
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="info-group">
                            <span className="info-label">Second Phone</span>
                            <div className="info-value">{userData.second_phone_number || 'N/A'}</div>
                        </div>
                        <div className="info-group">
                            <span className="info-label">City</span>
                            <div className="info-value">{userData.address.city}</div>
                        </div>
                    </div>

                    <div className="info-row">
                        <div className="info-group">
                            <span className="info-label">District</span>
                            <div className="info-value">{userData.address.district || 'N/A'}</div>
                        </div>
                        <div className="info-group">
                            <span className="info-label">Street Address</span>
                            <div className="info-value">{userData.address.street_address}</div>
                        </div>
                    </div>
                    <div className="info-group">
                        <span className="info-label">Street Address</span>
                        <div className="info-value">{userData.password}</div>
                    </div>
                    <div className="button-row">
                        <button onClick={() => setShowModal(true)}>Change Password</button>
                        {showModal && <ChangePasswordModal onClose={() => setShowModal(false)} />}

                        {showChangeEmailModal && (
                            <ChangeEmailModal onClose={() => setShowChangeEmailModal(false)} />
                        )}

                        <button onClick={() => setShowChangeEmailModal(true)}>
                            Change Email
                        </button>                    </div>

                </div>

            </div>

        </>

    );
};

export default MyAccount;
