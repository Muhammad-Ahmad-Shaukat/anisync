import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SuggestedAnime.css";

const SuggestedAnime = ({ anime }) => {
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/suggestedanime?animeid=${anime.animeid}&limit=20`);
        setSuggested(res.data);
      } catch (err) {
        console.error("Error fetching suggested anime:", err);
      } finally {
        setLoading(false);
      }
    };

    if (anime?.animeid) {
      fetchSuggestions();
    }
  }, [anime]);

  const handleClick = (name) => {
    const encodedName = encodeURIComponent(name);
    navigate(`/anime/${encodedName}`);
  };

  if (loading) return <p className="suggested-title">Loading suggested anime...</p>;
  if (suggested.length === 0) return null;

  return (
    <div className="suggested-container">
      <h3 className="suggested-title">You Might Also Like</h3>
      <div className="suggested-grid">
        {suggested.map((item) => (
          <div
            key={item.id}
            className="suggested-card"
            onClick={() => handleClick(item.title.english)}
          >
            <img src={item.coverImage.large} alt={item.title.english} className="suggested-img" />
            <p className="suggested-name">{item.title.english}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAnime;
