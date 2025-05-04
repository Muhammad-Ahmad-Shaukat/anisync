import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './Navbar.css'; 

const Navbar = () => {

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      window.location.href = `/search/${searchTerm}`; 
    } else {
      alert("Please enter a search term.");
    }
  }

  return (
    <nav className="navbar">

      <div className="left-section">
        <Link to="/" className="logo">AniSync</Link>
        <div className="search-bar">
          <input type="search" placeholder="Search anime..." 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={(e) => {if(e.key === 'Enter'){handleSearch(e)}
            else if(e.key === 'Escape'){ e.target.blur();}}}
          />
          <FontAwesomeIcon icon={faSearch} className='icon' onClick={handleSearch}/>
        </div>
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
