import React, { useEffect, useState } from 'react';

const AniListAnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `
      query {
        Page(page: 3, perPage: 15) {
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              large
            }
            averageScore
          }
        }
      }
    `;

    fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(res => res.json())
      .then(data => {
        setAnimeList(data.data.Page.media);
        setLoading(false);
      })
      .catch(err => {
        console.error('AniList API Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading anime...</p>;

  return (
    <div>
      <h2>Top 10 Popular Anime</h2>
      <ul>
        {animeList.map(anime => (
          <li key={anime.id} style={{ marginBottom: '20px' }}>
            <img src={anime.coverImage.large} alt={anime.title.romaji} style={{ height: '150px' }} />
            <h3>{anime.title.romaji || anime.title.english}</h3>
            <p>Score: {anime.averageScore}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AniListAnimeList;
