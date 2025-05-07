// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/" className="logo">AniSync</Link>
        <SearchBar />
      </div>
      <div className="nav-links center-links">
        <Link to="/Top Anime">Top Airing</Link>
        <Link to="/SignUp">Trending</Link>
        <Link to="/Friends">Friends</Link>
        <Link to="/watchTogether">Watch Together</Link>
      </div>
      <div className="nav-links right-links">
        <Link to="/login">Login</Link>
        <Link to="/SignUp">SignUp</Link>
      </div>
    </nav>
  );
};

export default Navbar;
