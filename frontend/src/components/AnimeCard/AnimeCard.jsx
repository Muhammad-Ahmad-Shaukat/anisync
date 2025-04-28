import React from "react";
import "./AnimeCard.css";

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <div className="anime-image-container">
        <img
          src={anime.image}
          alt={anime.title}
          className="anime-image"
        />
        <div className="anime-title-vertical">
          {anime.title}
        </div>
      </div>
      <div className="anime-number">
        {anime.number}
      </div>
    </div>
  );
};

export default AnimeCard;
