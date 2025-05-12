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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      fetch('http://localhost:5000/api/auth/getuser', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.user);
        })
        .catch((err) => {
          console.error('Failed to fetch user:', err);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setIsAuthenticated(false);
    navigate('/login');
    setIsMenuOpen(false);
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
        <Link to="/new" onClick={() => setIsMenuOpen(false)}>Newly Release</Link>
      </div>

      <div className="nav-links right-links">
        {isAuthenticated ? (
          <>
           <button onClick={handleLogout} className="signout-btn">Sign Out</button>
            {user && user.profilePic && (
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <img
                  src={user.profilePic}
                  alt="User"
                  className="nav-user-img"
                />
              </Link>
            )}
           
          </>
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
