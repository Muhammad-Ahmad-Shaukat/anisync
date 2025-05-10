import React, { useEffect, useState } from 'react';
import './AdminAnimeList.css';

const SKELETON_COUNT = 5; 

const SkeletonList = () => (
  <div className="skeleton-list">
    {Array.from({ length: SKELETON_COUNT }).map((_, idx) => (
      <div className="skeleton-card" key={idx}>
        <div className="skeleton-poster"></div>
        <div className="skeleton-details">
          <div className="skeleton-line long"></div>
          <div className="skeleton-line medium"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    ))}
  </div>
);

const AdminAnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Replace this with your actual API call
      setAnimeList([
        {
          id: 1,
          name: 'Naruto',
          image: 'https://posterwa.com/cdn/shop/files/NARUTO37_682fec30-603c-466e-9c5d-0033ee55d9b0.jpg?v=1691434731'
        },
        {
          id: 2,
          name: 'Attack on Titan',
          image: 'https://i5.walmartimages.com/seo/Attack-On-Titan-Japanese-Anime-Poster-Print-Key-Art-Regular-24-X-36_e74beab2-37a6-44a4-ac5c-b6f3d222bc35.968a847bd29fb37646da893eb1142793.jpeg'
        },
        {
          id: 4,
          name: 'Death Note',
          image: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg'
        }
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="admin-anime-list-container">
      <h1>Admin Anime List</h1>
      {loading ? (
        <SkeletonList />
      ) : animeList.length === 0 ? (
        <p className="no-anime">No anime available.</p>
      ) : (
        <div className="anime-list">
          {animeList.map((anime) => (
            <div key={anime.id} className="anime-card">
              <div className="poster-wrapper">
                <img src={anime.image} alt={anime.name} className="anime-poster" />
              </div>
              <div className="anime-details">
                <div className="anime-name">{anime.name}</div>
                <div className="action-buttons">
                  <button className="edit-button">Edit</button>
                  <button className="delete-button">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAnimeList;
