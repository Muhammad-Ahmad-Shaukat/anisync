import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoPlayer from "../../components/VideoSComponent/VideoPlayer";
import CommentSection from "../../components/comments/CommentsSection";

function WatchAnime() {
  const { animeName } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);
      setError(null);

      try {

        const normalizedName = animeName.replace(/[-_]/g, " ").trim();

        const res = await axios.get(`http://localhost:5000/api/auth/searchanime?q=${normalizedName}`);
        
        if (res.data.length > 0) {
          setAnime(res.data[0]);
        } else {
          setAnime(null);
        }
      } catch (err) {
        console.error("Error fetching anime details:", err);
        setError("Failed to load anime details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [animeName]);


  if (loading) return <div>Loading anime...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!anime) return <div>No anime data found.</div>;

  return <>
  <VideoPlayer anime={anime} />;
  </>

}

export default WatchAnime;
