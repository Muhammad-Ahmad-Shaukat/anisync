/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./AnimeSlider.css";
import { useNavigate } from "react-router-dom";

const AnimeSlider = ({ type = "trending", limit = 6, genre }) => {
  const [animeList, setAnimeList] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        let url = `http://localhost:5000/api/auth/fetchAnime?type=${type.toLowerCase()}&limit=${limit}`;
        if (type === "genre" && genre) {
          url += `&genre=${genre}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        console.log("Fetched data:", data);

        const uniqueAnime = data.filter(
          (anime, index, self) =>
            index === self.findIndex((a) => a.id === anime.id)
        );

        setAnimeList(uniqueAnime);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [type, limit, genre]);

  useEffect(() => {
    const checkScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    checkScroll();
    const scrollElement = scrollRef.current;

    scrollElement?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      scrollElement?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [animeList]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth / 1.2;
    el.scrollBy({
      left: dir === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleAnimeClick = (anime) => {
    const animeName = encodeURIComponent(anime.title.english || anime.title.romaji);
    navigate(`/anime/${animeName}`);
  };

  if (loading) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="slider-wrapper skeleton-mode">
          <Skeleton height="100%" width="100%" />
          <div className="slider-content">
            <Skeleton width={300} height={40} />
            <Skeleton count={3} />
            <Skeleton width={120} height={40} />
          </div>
        </div>
      </SkeletonTheme>
    );
  }

  if (!animeList.length) return <div>No anime found.</div>;

  return (
    <div className="slider-wrapper">
      <h2 className="slider-heading">
        {type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      </h2>

      <div className="slider-container">
        <div className="slider" ref={scrollRef}>
          {animeList.map((anime, index) => (
            <div
              className={`anime-card ${index === currentSlide ? "fade-in" : ""}`}
              key={anime.id}
              onClick={() => handleAnimeClick(anime)}
              style={{ cursor: "pointer" }}
            >
              <div className="anime-info">
                <div className="anime-title">
                  {anime.title.english || anime.title.romaji}
                </div>
                <div className="anime-index">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <img
                src={anime.coverImage.large}
                alt={anime.title.english || anime.title.romaji}
                className="anime-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeSlider;
