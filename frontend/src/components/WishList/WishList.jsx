import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import './WishList.css';

const Wishlist = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const userRes = await fetch("http://localhost:5000/api/auth/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userRes.ok) throw new Error("Failed to fetch user");

        const userData = await userRes.json();
        const userId = userData.user._id || userData.user.id; 

        const wishlistRes = await fetch("http://localhost:5000/api/auth/wishlistanime", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }), 
        });

        if (!wishlistRes.ok) throw new Error("Failed to fetch wishlist");

        const { animeIds } = await wishlistRes.json();
        const animeDetails = await Promise.all(
          animeIds.map(async (id) => {
            const animeRes = await fetch(`http://localhost:5000/api/auth/getanimebyid/${id}`);
            if (!animeRes.ok) return null;
            return await animeRes.json();
          })
        );

        setAnimeList(animeDetails.filter(Boolean));
      } catch (err) {
        console.error("Error loading wishlist:", err.message);
        alert("Could not load wishlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading watch List...</p>;

  return (
    <div>
      <h2>Your Watch List</h2>
      {animeList.length === 0 ? (
        <p>No anime in wishlist yet.</p>
      ) : (
        <div className="wishlist-grid">
          {animeList.map((anime) => (
            <div key={anime.id} className="anime-cards">
              <Link to={`/anime/${encodeURIComponent(anime.title)}`}>
                <img src={anime.imageSrc} alt={anime.title} width={200} />
                <h3>{anime.title}</h3>
                <p>{anime.status} • {anime.episodes} episodes</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
