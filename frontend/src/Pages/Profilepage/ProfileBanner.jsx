import React, { useState } from 'react';
import './ProfileBanner.css';
import {
  FaUserFriends, FaHeart, FaCog, FaBars, FaTimes,FaCommentDots
} from 'react-icons/fa';
import EditProfile from './EditProfile';
import Friends from '../../components/Friends/Friends';
import Wishlist from "../../components/WishList/WishList";
import Chats from '../../components/Chatting/Chats';

const ProfileBanner = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('watchlist');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="profile-banner">
      {/* Left Sidebar */}
      <div className="menu-container">
        <div className="top-bar">
          <button className="hamburger" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <div className={`menu ${menuOpen ? 'open' : ''}`}>
          <div
            className={`menu-item ${activeSection === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveSection('watchlist')}
          >
            <FaHeart className="icon" />
            <span>Watch List</span>
          </div>

          <div
            className={`menu-item ${activeSection === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveSection('friends')}
          >
            <FaUserFriends className="icon" />
            <span>Friends</span>
          </div>

          <div
            className={`menu-item ${activeSection === 'edit-profile' ? 'active' : ''}`}
            onClick={() => setActiveSection('edit-profile')}
          >
            <FaCog className="icon" />
            <span>Edit Profile</span>
          </div>

          <div
            className={`menu-item ${activeSection === 'chats' ? 'active' : ''}`}
            onClick={() => setActiveSection('chats')}
          >
            <FaCommentDots className="icon" />
            <span>Chats</span>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="content-container">
        {activeSection === 'edit-profile' && <EditProfile user={user} />}
        {activeSection === 'friends' && <Friends />}
        {activeSection === 'watchlist' && <Wishlist />}
        {activeSection === 'chats' && <Chats/>}
      </div>
    </div>
  );
};

export default ProfileBanner;