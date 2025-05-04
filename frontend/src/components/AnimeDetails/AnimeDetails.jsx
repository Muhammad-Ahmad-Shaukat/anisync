import { useLocation } from "react-router-dom";

const AnimeDetails = () => {
  const location = useLocation();
  const { anime } = location.state || {};

  if (!anime) return <p>No anime data available.</p>;

  return (
    <div className="anime-details">
      <h1>{anime.title.english || anime.title.romaji}</h1>
      <img src={anime.coverImage.large} alt={anime.title.english || anime.title.romaji} />
      <p>{anime.description}</p>
    </div>
  );
};

export default AnimeDetails;
