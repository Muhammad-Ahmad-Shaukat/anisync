import React, { useState } from 'react';
import './EditProfile.css';
import { FaUser, FaKey, FaEdit } from 'react-icons/fa';

const EditProfile = ({ user }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!showPasswordFields) {
      return; 
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/updateuser", {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          id: user.username, 
          password: password 
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update password");
      }
      setPassword('');
      setConfirmPassword('');
      setShowPasswordFields(false);
      alert("Password updated successfully!");
  
    } catch (error) {
      console.error("Error saving password:", error.message);
      alert(error.message || "Error saving password. Please try again.");
    }
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="animated-dots-bg" />

      <div className="edit-profile-container">
        <div className="edit-header">
          <FaUser className="icon" />
          <h2>Edit Profile</h2>
        </div>

        <div className="edit-form-box">
          <form className="edit-form" onSubmit={handleSave}>
            <label>Email Address</label>
            <div className="email-readonly">{user.email}</div>

            <label>Your Name</label>
            <div className="email-readonly">{user.username}</div>

            <div
              className="change-password-btn"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
            >
              <FaKey className="icon" /> Change password
            </div>

            {showPasswordFields && (
              <>
                <label>New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Confirm Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div className="show-password-toggle">
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  /> Show Password
                </div>
              </>
            )}

            <button type="submit" className="save-btn">Save</button>
          </form>

          <div className="profile-picture-box">
            <div className="avatar-wrapper">
              <img src={user.avatarUrl} alt="avatar" className="avatar" />
              <div className="edit-icon"><FaEdit /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
