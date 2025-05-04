import React, { useState } from 'react';
import './EditProfile.css';
import { FaUser, FaKey, FaEdit } from 'react-icons/fa';

const EditProfile = ({ user }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // to trigger re-render

  const handleSave = async (e) => {
    e.preventDefault();

    if (showPasswordFields && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("id", user.username); // critical!
    if (showPasswordFields && password) {
      formData.append("password", password);
    }
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/updateuser", {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      alert("Profile updated successfully!");
      setPassword('');
      setConfirmPassword('');
      setAvatarFile(null);
      setShowPasswordFields(false);
      setRefreshKey(prev => prev + 1); // trigger re-render
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert(error.message || "Error updating profile. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  return (
    <div className="edit-profile-wrapper" key={refreshKey}>
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

            <div className="change-password-btn" onClick={() => setShowPasswordFields(!showPasswordFields)}>
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

            <div className="profile-picture-box">
              <div className="avatar-wrapper">
                <img src={user.avatarUrl} alt="avatar" className="avatar" />
                <div className="edit-icon">
                  <label htmlFor="file-upload" className="custom-file-upload">
                    <FaEdit />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="save-btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
