import React from "react";
import "./AnimeCard.css"; // Assuming styles are in AnimeCard.css

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <div className="anime-image-wrapper">
        <img
          src={anime.image}
          alt={anime.anime_name}
          className="anime-image"
        />
      </div>
      <div className="anime-body">
        <h3 className="anime-title">{anime.anime_name}</h3>
        <p className="anime-description">
          {anime.description?.slice(0, 80) || "No description available"}...
        </p>
        <div className="anime-genres">
          {anime.genres.slice(0, 3).map((genre, i) => (
            <span className="genre" key={i}>
              {genre}
            </span>
          ))}
        </div>
        <div className="anime-rating">⭐ {anime.rating}</div>
        {anime.trailer && (
          <a
            href={anime.trailer}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="watch-trailer-btn">Watch Trailer</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default AnimeCard;
