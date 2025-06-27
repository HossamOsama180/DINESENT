import React, { useState } from 'react';
import '../Style/ChangePasswordModal.css';

const ChangePasswordModal = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:8000/api/password/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    current_password: currentPassword,
                    password: newPassword,
                    password_confirmation: confirmPassword
                })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Password updated successfully");
                onClose(); // غلق المودال بعد التحديث
            } else {
                alert(data.message || "Failed to update password");
            }
        } catch (err) {
            console.error(err);
            alert("Error occurred while updating password");
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-box">
                <div className="modal-header">
                    <h3>Change Password</h3>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <label>Current Password:</label>
                    <input
                        type="password"
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />

                    <label>New Password:</label>
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <label>Re-type New Password:</label>
                    <input
                        type="password"
                        placeholder="Re-type new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <div className="modal-buttons">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;
