import React from 'react';
import './AnimeSidebar.css';
import { Plus } from 'lucide-react';

const PopularAnimeList = ({ animeList, onAddToWishlist }) => {
  return (
    <div className="popular-anime-container">
      <h3 className="popular-title">Most Popular</h3>
      <div className="anime-list">
        {animeList.map((anime) => (
          <div key={anime.animeid} className="anime-card">
            <img src={anime.image} alt={anime.anime_name} className="anime-image" />
            <div className="anime-info">
              <div className="anime-title">{anime.anime_name}</div>
              <div className="anime-meta">{anime.status}</div>
              <div className="anime-badges">
                <span className="badge green">⭐ {anime.rating}</span>
                <span className="badge blue">🔥 {anime.popularity}</span>
                <span className="badge gray">🎬 {anime.episodes} eps</span>
              </div>
            </div>
            <button className="add-button" onClick={() => onAddToWishlist(anime)}>
              <Plus size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularAnimeList;
