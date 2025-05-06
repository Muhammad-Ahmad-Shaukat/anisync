import React, { useState } from 'react';
import './AdvanceSearch.css';

const genres = [
  'Action', 'Adventure', 'Cars', 'Comedy', 'Dementia', 'Demons', 'Drama', 'Ecchi',
  'Fantasy', 'Game', 'Harem', 'Historical', 'Horror', 'Isekai', 'Josei', 'Kids', 'Magic',
  'Martial Arts', 'Mecha', 'Military', 'Music', 'Mystery', 'Parody', 'Police', 'Psychological',
  'Romance', 'Samurai', 'School', 'Sci-Fi', 'Seinen', 'Shoujo', 'Shoujo Ai', 'Shounen',
  'Shounen Ai', 'Slice of Life', 'Space', 'Sports', 'Super Power', 'Supernatural',
  'Thriller', 'Vampire'
];

const AdvancedSearch = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genre) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="advanced-search-container">
      <h2>Filter by Genre</h2>

      <div className="genre-section">
        <h3>Genres</h3>
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

      <div className="filter-button-container">
        <button className="filter-button">Filter</button>
      </div>
    </div>
  );
};

export default AdvancedSearch;
