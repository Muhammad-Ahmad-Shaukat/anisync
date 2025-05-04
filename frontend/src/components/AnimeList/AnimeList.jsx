import React, { useEffect, useState } from "react";
import "./AnimeList.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/topanime");
        const data = await response.json();

        // Adjusted to directly use the array if backend returns plain array
        if (Array.isArray(data)) {
          setAnimeList(data);
        } else if (Array.isArray(data.result)) {
          setAnimeList(data.result); // if backend wraps in { result: [...] }
        } else {
          throw new Error("Invalid anime data format.");
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
      setCurrentSlide((prev) =>
        animeList.length ? (prev + 1) % animeList.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [animeList]);

  if (loading)
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="anime-list-container skeleton-mode">
          <div className="anime-slide">
            <Skeleton height="100%" width="100%" />
          </div>

          <div className="anime-list-content">
            <h1>
              <Skeleton width={300} height={40} />
            </h1>
            <p>
              <Skeleton count={3} />
            </p>
            <Skeleton width={120} height={40} />
          </div>

          <div className="dot-container">
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                <Skeleton circle width={10} height={10} />
              </span>
            ))}
          </div>
        </div>
      </SkeletonTheme>
    );

  if (!animeList.length) return <div>No anime found.</div>;

  const anime = animeList[currentSlide];

  return (
    <div className="anime-list-container">
      <img
        src={anime.bannerImage}
        alt={anime.title?.romaji || anime.title?.english || "Anime"}
        className="anime-slide fade-in"
      />

      <div className="anime-list-content">
        <h1>{anime.title?.english || anime.title?.romaji}</h1>
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
