import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import "./styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
      <div className="logo">
        <img src="./src/images/logo.svg" alt="AniSync Logo" className="logo-img" />
      </div>

        <input
          type="text"
          className="search-bar"
          placeholder="Search for anime..."
        />
      </div>

      <div className="header-right">
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
        </div>

        <button className="btn watch-btn">Watch Together</button>
        <button className="btn continue-btn">Continue Watching</button>

        <div className="auth-buttons">
          <button className="btn-outline">Sign In</button>
          <button className="btn-outline">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
