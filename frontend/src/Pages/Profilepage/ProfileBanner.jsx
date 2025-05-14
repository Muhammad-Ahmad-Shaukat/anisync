import React, { useState } from 'react';
import './ProfileBanner.css';
import {
  FaUserFriends,
  FaHeart,
  FaCog,
  FaBars,
  FaTimes,
  FaCommentDots,
} from 'react-icons/fa';
import EditProfile from './EditProfile';
import Friends from '../../components/Friends/Friends';
import Wishlist from '../../components/WishList/WishList';
import Chats from '../../components/Chatting/Chats';

const ProfileBanner = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('watchlist');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="profile-banner">
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

      <div className="content-container">
        <div
          style={{ display: activeSection === 'edit-profile' ? 'block' : 'none' }}
        >
          <EditProfile user={user} />
        </div>
        <div
          style={{ display: activeSection === 'friends' ? 'block' : 'none' }}
        >
          <Friends />
        </div>
        <div
          style={{ display: activeSection === 'watchlist' ? 'block' : 'none' }}
        >
          <Wishlist />
        </div>
        <div
          style={{ display: activeSection === 'chats' ? 'block' : 'none' }}
        >
          <Chats />
        </div>
      </div>
    </div>
  );
};

export default ProfileBanner;
