import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      setLoading(true);
      const timer = setTimeout(() => {
        axios
          .get('http://localhost:5000/api/auth/searchanime', {
            params: { q: searchTerm.trim(), limit: 5 },
          })
          .then((response) => {
            setSuggestions(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
            setLoading(false);
          });
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setLoading(false);
    }
  }, [searchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSuggestions([]);
      navigate(`/search/${encodeURIComponent(searchTerm.trim())}`);
    } else {
      alert('Please enter a search term.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      e.target.blur();
      setSuggestions([]);
    }
  };

  const handleAnimeClick = (anime) => {
    const animeName = encodeURIComponent(anime.anime_name);
    setSuggestions([]); 
    setSearchTerm(''); 
    navigate(`/anime/${animeName}`);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="search"
          placeholder="Search anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Search anime"
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </button>
      </form>

      {loading && (
        <ul className="suggestions-list">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="suggestion-item skeleton-item">
              <div className="skeleton-poster"></div>
              <div className="skeleton-text"></div>
            </li>
          ))}
        </ul>
      )}


      {!loading && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((anime, index) => (
            <li
              key={anime.animeid || index}
              className="suggestion-item"
              onClick={() => handleAnimeClick(anime)}
            >
              <img
                src={anime.image}
                alt={anime.anime_name}
                className="suggestion-poster"
              />
              <span className="suggestion-text">{anime.anime_name}</span>
            </li>
          ))}
        </ul>
      )}


      {!loading && searchTerm.trim() !== '' && suggestions.length === 0 && (
        <ul className="suggestions-list">
          <li className="suggestion-item no-results">No Results found</li>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
