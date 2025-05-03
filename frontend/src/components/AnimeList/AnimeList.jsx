import React, { useEffect, useState } from "react";
import "./AnimeList.css";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/findanime?id=trending&limit=5`);
        const data = await response.json();
  
        if (data.result) {
          setAnimeList(data.result);
        } else {
          throw new Error(data.message || "No anime found.");
        }
      } catch (error) {
        console.error("Error fetching anime:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchAnime();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (animeList.length ? (prev + 1) % animeList.length : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, [animeList]);

  if (loading) return <div>Loading...</div>;
  if (!animeList.length) return <div>No anime found.</div>;

  const anime = animeList[currentSlide];

  return (
    <div className="anime-list-container">
      <img
        src={anime.image}
        alt={anime.anime_name}
        className="anime-slide fade-in"
      />

      <div className="anime-list-content">
        <h1>{anime.anime_name}</h1>
        <p>{anime.description || "No description available."}</p>
        <button>View Details</button>
      </div>

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
