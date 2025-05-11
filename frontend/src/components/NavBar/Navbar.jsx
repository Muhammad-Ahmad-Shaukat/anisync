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
  };

  return (
    <nav className="navbar">
      <div className="left-section">
        <Link to="/" className="logo">AniSync</Link>
        <SearchBar />
      </div>
      <div className="nav-links center-links">
        <Link to="/top">Top Airing</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/friends">Friends</Link>
        <Link to="/watchTogether">Watch Together</Link>
      </div>
      <div className="nav-links right-links">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="signout-btn">Sign Out</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">SignUp</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
