import React, { useState } from 'react';
import './ProfileBanner.css';
import {
  FaUserFriends, FaHeart, FaCog, FaBars, FaTimes
} from 'react-icons/fa';
import EditProfile from './EditProfile';
import Friends from '../../components/Friends/Friends';// Assuming you have this component

import Wishlist from "../../components/WishList/WishList"; // Assuming you have this component

const ProfileBanner = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('watchlist');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <div className="profile-banner">
        <div className="top-bar">
          <button className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          {/* Watch List */}
          <div
            className={`menu-item ${activeSection === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveSection('watchlist')}
          >
            <FaHeart className="icon" />
            <span>Watch List</span>
          </div>

          {/* Friends */}
          <div
            className={`menu-item ${activeSection === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveSection('friends')}
          >
            <FaUserFriends className="icon" />
            <span>Friends</span>
          </div>

          {/* Edit Profile */}
          <div
            className={`menu-item ${activeSection === 'edit-profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('edit-profile')}
          >
            <FaCog className="icon" />
            <span>Edit Profile</span>
          </div>
        </div>
      </div>

      {/* Conditional Section Rendering */}
      {activeSection === 'edit-profile' && <EditProfile user={user} />}
      {activeSection === 'friends' && <Friends  />}
      {activeSection === 'watchlist' && <Wishlist />}
    </>
  );
};

export default ProfileBanner;
