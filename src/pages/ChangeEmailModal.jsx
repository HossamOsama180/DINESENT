import React, { useState } from 'react';
import '../Style/ChangeEmailModal.css'; // هنظبطه كمان تحت
import { IoClose } from 'react-icons/io5';

const ChangeEmailModal = ({ onClose }) => {
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:8000/api/email/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: newEmail,
          password: currentPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Email updated successfully!');
        setNewEmail('');
        setCurrentPassword('');
        setTimeout(() => onClose(), 1500); // يقفل بعد شوية
      } else {
        setError(data.message || 'Failed to update email.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Change Email</h3>
          <IoClose className="close-icon" onClick={onClose} />
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>New Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Enter new email"
            required
          />

          <label>Current Password:</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
            required
          />

          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="submit-btn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmailModal;
