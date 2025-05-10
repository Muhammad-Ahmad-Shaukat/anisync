import { useParams } from "react-router-dom";
import ViewDetails from "../../components/AnimeViewDetails/ViewDetails";
import SuggestedAnime from "../../components/SuggestedAnime/SuggestedAnime";
import axios from "axios";
import { useEffect, useState } from "react";

function AnimeDetails() {
  const { animeName } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/auth/findanime?q=${animeName}`);
        if (res.data.length > 0) {
          setAnime(res.data[0]);
        } else {
          setAnime(null);
        }
      } catch (err) {
        console.error("Error fetching anime details:", err);
        alert("Failed to load anime details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [animeName]);

  return (
    <>
      <ViewDetails anime={anime} loading={loading} />
      {anime && <SuggestedAnime anime={anime} limit = {20}/>}
    </>
  );
}

export default AnimeDetails;
