import React from "react";
import "./ViewDetails.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";

const ViewDetails = ({ anime, loading }) => {
  const navigate = useNavigate();

  const handlewishlist = async () => {
    if (!anime || !anime._id) {
      alert("Anime data is not available.");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add to your wishlist.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/addtowishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ animeid: anime._id })
      });
      const data = await response.json();

      if (response.ok) {
        alert("Anime added to your wishlist successfully!");
      } else {
        alert(`Failed to add to wishlist: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      alert("Something went wrong while adding to wishlist.");
    }
  };
   const handleWatchTogether = (anime) => {
    const animeId = anime._id;
    sessionStorage.setItem('isHost', 'true'); // mark this user as host
   
    navigate(`/watchTogether/${animeId}`, { state: { host: true } });
  };
  const watchanime = () => {
    if (anime?.anime_name) {
      const slug = anime.anime_name.toLowerCase().replace(/\s+/g, "-");
      navigate(`/watch/${slug}`);
    } else {
      alert("Anime name is not available.");
    }
  };

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
              <button className="action-button" onClick={handlewishlist}>Add to List</button>
              <button className="action-button" onClick={watchanime}>Watch Now</button>
              <button className="action-button" onClick={() => handleWatchTogether(anime)}>Watch Together</button>
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
