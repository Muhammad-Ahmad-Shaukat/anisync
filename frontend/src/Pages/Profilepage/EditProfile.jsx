import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { FaUser, FaKey, FaEdit, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const EditProfile = ({ user, onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatarUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [isOpen, setIsOpen] = useState(true);

  const resetForm = () => {
    setPassword('');
    setConfirmPassword('');
    setAvatarFile(null);
    setAvatarPreview(user.avatarUrl);
    setShowPasswordFields(false);
    setShowPassword(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (showPasswordFields) {
      if (password && password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append("id", user.username);
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
      handleClose();
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert(error.message || "Error updating profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      <div className={`edit-profile-wrapper ${isOpen ? 'active' : ''}`}>
        <div className="edit-profile-container" onClick={(e) => e.stopPropagation()}>
          
          
          <div className="edit-header">
            <FaUser className="icon" />
            <h2>Edit Profile</h2>
          </div>

          <div className="edit-form-box">
            <form className="edit-form" onSubmit={handleSave}>
              <label>Email Address</label>
              <div className="email-readonly">{user.email}</div>

              <label>Username</label>
              <div className="email-readonly">{user.username}</div>

              <div 
                className="change-password-btn" 
                onClick={() => setShowPasswordFields(!showPasswordFields)}
              >
                <FaKey className="icon" /> 
                {showPasswordFields ? 'Hide password fields' : 'Change password'}
              </div>

              {showPasswordFields && (
                <>
                  <label>New Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    <button 
                      type="button" 
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <div className="error-message">{errors.password}</div>}

                  <label>Confirm Password</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                    />
                  </div>
                  {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                </>
              )}

              <div className="profile-picture-box">
                <div className="avatar-wrapper">
                  <img src={avatarPreview} alt="avatar" className="avatar" />
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
                {avatarFile && (
                  <div className="file-info">Selected: {avatarFile.name}</div>
                )}
              </div>

              <button 
                type="submit" 
                className="save-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;