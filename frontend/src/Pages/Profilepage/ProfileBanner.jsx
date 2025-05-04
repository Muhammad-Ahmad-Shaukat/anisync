import React, { useState } from 'react';
import './ProfileBanner.css';
import {
  FaUser, FaRedoAlt, FaHeart, FaBell, FaCog, FaExternalLinkAlt, FaBars, FaTimes
} from 'react-icons/fa';

const ProfileBanner = ({ username }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="profile-banner">
      <div className="top-bar">
        <h1 className="greeting">Hi, {username}</h1>
        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className={`menu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-item"><FaUser className="icon" /><span>Profile</span></div>
        <div className="menu-item"><FaRedoAlt className="icon" /><span>Continue Watching</span></div>
        <div className="menu-item"><FaHeart className="icon" /><span>Watch List</span></div>
        <div className="menu-item"><FaBell className="icon" /><span>Notification</span></div>
        <div className="menu-item"><FaCog className="icon" /><span>Settings</span></div>
        <div className="menu-item"><FaExternalLinkAlt className="icon" /><span>MAL</span></div>
      </div>
    </div>
  );
};

export default ProfileBanner;
