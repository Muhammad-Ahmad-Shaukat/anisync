import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./AnimeCard.css";
import { useNavigate } from "react-router-dom";

const AnimeCard = ({ type = "trending", limit = 6, genres = [] }) => {
  const [animeList, setAnimeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const truncateTitle = (title, wordLimit = 3) => {
    const words = title.split(" ");
    if (words.length <= wordLimit) {
      return title;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        let url = `http://localhost:5000/api/auth/fetchAnime?type=${type.toLowerCase()}&limit=${limit}`;
        const res = await fetch(url);
        const data = await res.json();

        const uniqueAnime = data.filter(
          (anime, index, self) =>
            index === self.findIndex((a) => a.id === anime.id)
        );

        setAnimeList(uniqueAnime);
        setFilteredList(uniqueAnime); 
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [type, limit]);

  
  useEffect(() => {
    if (genres.length > 0) {
      const filtered = animeList.filter(anime => 
        genres.some(genre => 
          anime.genres?.map(g => g.toLowerCase()).includes(genre.toLowerCase())
        )
      );
      setFilteredList(filtered);
    } else {
      setFilteredList(animeList); 
    }
  }, [genres, animeList]);

  const handleAnimeClick = (anime) => {
    const animeName = encodeURIComponent(anime.title.english || anime.title.romaji);
    navigate(`/anime/${animeName}`);
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="anime-card-wrapper skeleton-mode">
          <Skeleton height="100%" width="100%" />
          <div className="anime-card-content">
            <Skeleton width={300} height={40} />
            <Skeleton count={3} />
            <Skeleton width={120} height={40} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (!filteredList.length) return <div>No anime found matching selected genres.</div>;

  return (
    <div className="anime-card-wrapper">
      <h2 className="anime-card-heading">
        {genres.length > 0 && ` (Filtered by: ${genres.join(", ")})`}
      </h2>

      <div className="anime-card-grid">
        {filteredList.map((anime) => (
          <div
            className="anime-card-item"
            key={anime.id}
            onClick={() => handleAnimeClick(anime)}
            style={{ cursor: "pointer" }}
          >
            <img
              src={anime.coverImage.large}
              alt={anime.title.english || anime.title.romaji}
              className="anime-card-image"
            />
            <div className="anime-card-title">
              {truncateTitle(anime.title.english || anime.title.romaji)}
            </div>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeCard;