import React, { useState } from 'react';
import './EditProfile.css';
import { FaUser, FaKey, FaEdit } from 'react-icons/fa';


const EditProfile = ({ user }) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (showPasswordFields && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    alert("Profile saved!");
  };

  return (
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
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
  );
};

export default EditProfile;
