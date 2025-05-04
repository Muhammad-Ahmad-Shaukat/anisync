import React, { useEffect, useRef, useState } from "react";
import "./AnimeSlider.css";

const AnimeSlider = ({ type = "trending", limit = 6, airing = false }) => {
  const [animeList, setAnimeList] = useState([]);
  const scrollRef = useRef();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/fetchAnime?type=${type.toLowerCase()}&limit=${limit}&airing=${airing}`);
        const data = await res.json();

        // Filter out duplicate anime based on id
        const uniqueAnime = data.filter((anime, index, self) =>
          index === self.findIndex((a) => a.id === anime.id)
        );

        setAnimeList(uniqueAnime);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchAnime();
  }, [type, limit]);

  useEffect(() => {
    const checkScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    checkScroll();
    scrollRef.current?.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      scrollRef.current?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [animeList]);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth / 1.2;
      scrollRef.current.scrollBy({
        left: dir === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="slider-wrapper">
      <h2 className="slider-heading">{type}</h2>

      <div className="slider-container">
        <div className="slider" ref={scrollRef}>
          {animeList.map((anime, index) => (
            <div className="anime-card" key={anime.id}>
              <div className="anime-info">
                <div className="anime-title">
                  {anime.title.english || anime.title.romaji}
                </div>
                <div className="anime-index">{String(index + 1).padStart(2, "0")}</div>
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
