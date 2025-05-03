import React from "react";

const AnimeCard = ({ anime }) => {
  return (
    <div className="anime-card">
      <div className="anime-rank">#{anime.rank}</div>
      <img src={anime.image_url} alt={anime.title} className="anime-image" />
      <div className="anime-title">{anime.title}</div>
    </div>
  );
};

export default AnimeCard;
