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
        <div className="menu-item"><FaHeart className="icon" /><span>Watch List</span></div>
      </div>
    </div>
  );
};

export default ProfileBanner;
