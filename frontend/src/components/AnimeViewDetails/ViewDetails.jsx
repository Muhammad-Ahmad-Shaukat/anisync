import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewDetails.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ViewDetails = ({ animeName }) => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/findanime?q=${animeName}`);
        if (res.data.length > 0) {
          setAnime(res.data[0]);
          console.log(res.data[0]);
        } else {
          setAnime(null);
        }
      } catch (err) {
        console.error("Error fetching anime details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [animeName]);

  if (loading) {
    return (
      <SkeletonTheme baseColor="#303030" highlightColor="#505050">
        <div className="details-container">
          <div className="details-card">
            <div className="details-header">
              <h2 className="details-title">
                <Skeleton width={200} />
              </h2>
            </div>
            <div className="details-content">
              <div className="left-column">
                <Skeleton height={400} width={300} />
              </div>
              <div className="right-column">
                {[...Array(6)].map((_, idx) => (
                  <p className="info" key={idx}>
                    <Skeleton width={`80%`} />
                  </p>
                ))}
                <div className="actions">
                  <Skeleton width={120} height={40} style={{ borderRadius: "4px" }} />
                  <Skeleton width={100} height={40} style={{ borderRadius: "4px" }} />
                </div>
                <p className="description">
                  <Skeleton count={5} />
                </p>
                <div className="trailer-link">
                  <Skeleton width={150} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    );
  }
  
  if (!anime) return <div className="not-found">Anime not found.</div>;

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-header">
          <h2 className="details-title">{anime.anime_name}</h2>
        </div>
        <div className="details-content">
          <div className="left-column">
            <img src={anime.image} alt={`${anime.anime_name} Poster`} className="poster" />
          </div>
          <div className="right-column">
            <p className="info"><span className="label">Rating:</span> {anime.rating}</p>
            <p className="info"><span className="label">Episodes:</span> {anime.episodes}</p>
            <p className="info"><span className="label">Status:</span> {anime.status}</p>
            {anime.season && <p className="info"><span className="label">Season:</span> {anime.season}</p>}
            {anime.source && <p className="info"><span className="label">Source:</span> {anime.source}</p>}
            <p className="info"><span className="label">Popularity:</span> {anime.popularity}</p>
            <p className="info"><span className="label">Genres:</span> {anime.genres.join(", ")}</p>
            {anime.categories?.length > 0 && (
              <p className="info"><span className="label">Categories:</span> {anime.categories.join(", ")}</p>
            )}
            <div className="actions">
              <button className="action-button">Add to List</button>
              <button className="action-button">Share</button>
            </div>
            <p className="description">{anime.description}</p>
            {anime.trailer && (
              <div className="trailer-link">
                <a href={anime.trailer} target="_blank" rel="noopener noreferrer">
                  Watch Trailer
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
