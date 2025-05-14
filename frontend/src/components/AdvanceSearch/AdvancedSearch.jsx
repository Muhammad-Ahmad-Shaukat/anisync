import React from 'react';
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
  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="advanced-search-container always-visible">
      <div className="filter-content">
        <div className="genre-section">
          <h3>Filter By Genres</h3>
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
            className="clear-button"
            onClick={() => setSelectedGenres([])}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;
