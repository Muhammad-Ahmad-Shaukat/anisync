import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/authslice';
import SearchBar from '../SearchBar/SearchBar';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check token on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setIsAuthenticated(false);
    navigate('/login');
    setIsMenuOpen(false); // Close menu after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
      
      <div className="left-section">
        <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>AniSync</Link>
        <SearchBar />
      </div>
      
      <div className="nav-links center-links">
        <Link to="/top" onClick={() => setIsMenuOpen(false)}>Top Airing</Link>
        <Link to="/trending" onClick={() => setIsMenuOpen(false)}>Trending</Link>
        <Link to="/friends" onClick={() => setIsMenuOpen(false)}>Friends</Link>
        <Link to="/watchTogether" onClick={() => setIsMenuOpen(false)}>Watch Together</Link>
      </div>
      
      <div className="nav-links right-links">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="signout-btn">Sign Out</button>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;