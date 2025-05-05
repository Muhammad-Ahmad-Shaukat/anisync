import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <section className="footer-about">
          <h2 className="footer-logo">Anisync</h2>
          <p className="footer-description">
            Dive into the world of anime! Stream, review, and discover your next favorite show.
          </p>
        </section>

        <section className="footer-links">
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/anime">All Anime</a></li>
              <li><a href="/genres">Genres</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact">Contact Us</a></li>
            </ul>
          </nav>
        </section>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Anisync. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
