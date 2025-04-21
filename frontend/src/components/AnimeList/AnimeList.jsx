import React, { useEffect, useState } from "react";
import "./AnimeList.css"; // Make sure this file contains your styles

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch top anime from your API
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/top-anime");
        const data = await response.json();
        setAnimeList(data);
      } catch (error) {
        console.error("Error fetching anime:", error);
      }
    };

    fetchAnime();
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % animeList.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [animeList]);

  if (animeList.length === 0) return <div>Loading...</div>;

  const anime = animeList[currentSlide];

  return (
    <div className="anime-list-container">
      <img
        src={anime.bannerImage || anime.coverImage.large}
        alt={anime.title.romaji}
        className="anime-slide fade-in"
      />

      <div className="anime-list-content">
        <h1>{anime.title.english || anime.title.romaji}</h1>
        <p>{anime.description}</p>
        <button>View Details</button>
      </div>

      {/* Dot navigation */}
      <div className="dot-container">
        {animeList.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
