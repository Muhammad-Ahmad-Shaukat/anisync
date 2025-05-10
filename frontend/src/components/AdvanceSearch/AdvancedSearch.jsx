import React, { useState } from 'react';
import './AdvanceSearch.css';

const genres = [
  'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama',
  'Fantasy', 'Game', 'Historical', 'Horror', 'Isekai', 'Josei', 'Kids', 'Magic',
  'Martial Arts', 'Mecha', 'Military', 'Music', 'Mystery', 'Parody', 'Police', 'Psychological',
  'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen', 'Shoujo', 'Shoujo Ai', 'Shounen',
  'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural',
  'Thriller', 'Vampire'
];

const AdvancedSearch = ({ selectedGenres, setSelectedGenres }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const applyFilters = () => {
    setIsOpen(false);
  };

  return (
    <div className="advanced-search-container">
      <button 
        className="filter-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter  {selectedGenres.length > 0 ? `(${selectedGenres.length})` : ''}
      </button>

      {isOpen && (
        <div className="filter-overlay">
          <div className="filter-content">
            <div className="genre-section">
              <h3>Select Genres</h3>
              <div className="genre-tags">
                {genres.map(genre => (
                  <button
                    key={genre}
                    className={`genre-tag ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                    onClick={() => toggleGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-actions">
              <button 
                className="apply-button"
                onClick={applyFilters}
              >
                Done
              </button>
              <button 
                className="clear-button"
                onClick={() => {
                  setSelectedGenres([]);
                  setIsOpen(false);
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;